import fetch from "node-fetch"; // api call
import { question } from "readline-sync"; // console input
import tiktoken from "tiktoken"; // gpt token estimator
import { OpenAI } from "openai"; // openai api
import { config } from "dotenv"; // Import dotenv if not imported already
import axios from "axios"; // api call
import cheerio from "cheerio"; // parse html code from rev.com
import validator from "validator"; // check urls

config(); // Load environment variables from .env file

class BiasDetector {
  constructor() {
    // Load your API key from an environment variable or secret management service
    // Set your OpenAI API key

    this.openai = new OpenAI({});

    // Directions for GPT
    this.criteria =
      "Examine the speech transcript provided below with a keen focus on identifying any biases, inconsistencies, and false information present. Craft a comprehensive summary that elucidates these biases, discrepancies, and inaccuracies, if detected. Detail the points that are the most biased. Additionally, furnish an approximate percentage representing the extent of objective content rooted in facts versus the portion containing biases or inaccuracies. Transcript: ";
    this.criteriaForFactCheck =
      "Examine the speech transcript provided. You will be fact checking important information, so give me a list of objective questions you would like answered, but only that you think google can actually provide a number or qualitative data for within the first few links. Transcript: ";
  }

  // Estimates the number of tokens the current string contains, for gpt
  numTokensFromString(string) {
    const encoding = tiktoken.encoding_for_model("gpt-3.5-turbo");
    const numTokens = encoding.encode(string).length;
    return numTokens;
  }

  // Returns the relevant text from any website, uses html parsing for rev.com, and extractor api for any other website [limited 1000 calls]
  async getTranscript(url) {
    if (validator.isURL(url) === false) {
      console.log("\n" + url + " is not a valid URL.");
      process.exit();
    }

    if (url.includes("rev.com")) {
      console.log("\n[Using hard-coded Cheerio function for rev]\n");
      try {
        // Fetch the HTML content
        const response = await axios.get(url);

        // Load the HTML content into Cheerio
        const $ = cheerio.load(response.data);

        // Find all div elements with the specified class
        const divTags = $("div.fl-callout-text");

        // Extract and format the text
        let formattedText = "";

        divTags.each((index, element) => {
          const text = $(element).text().trim();
          if (text) {
            // Add two newline characters to separate transcript entries
            formattedText += text + "\n\n";
          }
        });

        return formattedText;
      } catch (error) {
        console.error("Error fetching or parsing the HTML:", error);
        return null;
      }
    } else {
      // extactor api
      console.log("\n[Using extractor API]\n");
      const extractApi = process.env.EXTRACTER_API_KEY;
      const endpoint = "https://extractorapi.com/api/v1/extractor";
      const params = `apikey=${extractApi}&url=${url}`;
      const response = await fetch(endpoint + "?" + params);
      const data = await response.json();

      return data.text; // Assuming "text" is the key in the response containing the transcript
    }
  }

  // Uses a summarizer api from rapid api to summarize a piece of text, percent param is number of sentences to retain compared to original
  async summarize(transcript, percent = 100) {
    if (percent === 100) {
      return transcript;
    }
    const xrapidapikey = process.env.X_RAPIDAPI_KEY;
    // API call
    const options = {
      method: "POST",
      url: "https://text-analysis12.p.rapidapi.com/summarize-text/api/v1.1",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": xrapidapikey,
        "X-RapidAPI-Host": "text-analysis12.p.rapidapi.com",
      },
      data: {
        language: "english",
        summary_percent: percent,
        text: transcript,
      },
    };

    try {
      const response = await axios.request(options);
      return response.data.summary;
    } catch (error) {
      console.error(error);
      return "";
    }
  }

  // Generates a prompt that includes the criteria and a summarized version of the transcript that fits gpt model requirements
  async genPrompt(text, factCheck = false) {
    let question = this.criteria;
    if (factCheck) {
      question = this.criteriaForFactCheck;
    }
    const MAX_TOKENS = 3500;
    const criteriaNumTokens = this.numTokensFromString(question);

    // Calculate the max amount of tokens we can input into the prompt after criteria
    const maxTextTokens = MAX_TOKENS - criteriaNumTokens;

    // Current tokens the original text holds
    let currTextTokens = this.numTokensFromString(text);

    // Summarize text by 20% each time until it fits into GPT
    const percents = [60, 45, 30, 15, 5];
    let idx = 0;
    let summarized = text;

    while (idx < percents.length && currTextTokens > maxTextTokens) {
      let n = idx + 1;
      console.log(
        "\n[Summary attempt: " + n + ", Percent: " + percents[idx] + "]\n"
      );
      summarized = await this.summarize(text, percents[idx]);
      currTextTokens = this.numTokensFromString(summarized);
      idx++;
    }

    return question + summarized;
  }

  // Sends prompt to openai api for gpt-3.5-turbo to return response
  async send(prompt) {
    const chatCompletion = await this.openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    return chatCompletion.choices[0].message["content"];
  }
}

// main method prompts user and makes calls
(async () => {
  console.log("Enter the link to a transcript/article:");
  const url = question();

  const detector = new BiasDetector();
  const transcript = await detector.getTranscript(url);

  const factCheck = true;
  const prompt = await detector.genPrompt(transcript, factCheck);

  console.log(await detector.send(prompt));
})();
