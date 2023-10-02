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
      "Examine the transcript. You will be analyzing information. Give me a list of the FIVE most objective important questions you would like answered, but only that you think google can actually provide a number or qualitative data for within the first few links. Make sure the questions ask for general information and I want extreme detail in the questions, since Google won't know what you're talking about and doesn't have access to these questions. Give as a list. Transcript: ";
  }

  // Estimates the number of tokens the current string contains, for gpt

  async googleSearch(query) {
    const apiKey = process.env.GOOGLE_API_KEY;
    const cx = process.env.SEARCH_ENGINE_ID;

    const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}`;
    let resultLinks = [];
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      data.items.forEach((item, index) => {
        resultLinks.push(item.link);
      });
    } catch (error) {
      console.error("An error occurred:", error);
    }

    return resultLinks;
  }

  async performSearchSummarization(questionString) {
    const questions = questionString.split(/\d+\.\s+/);

    // Filter out any empty strings from the result.
    const filteredQuestions = questions
      .filter((question) => question.trim() !== "")
      .map((question) => question.trim());

    const dict = {};
    for (let i = 0; i < 2 && i < filteredQuestions.length; i++) {
      const results = await this.googleSearch(filteredQuestions[i]);
      console.log("\nQuestion: " + filteredQuestions[i] + "\n");

      console.log("Link 0: " + results[0] + "\n");
      console.log("Link 1: " + results[1] + "\n");
      console.log("Link 2: " + results[2] + "\n");
      const result0 = await this.summarize(
        await this.getTranscript(results[0]),
        5
      );
      const result1 = await this.summarize(
        await this.getTranscript(results[1]),
        5
      );
      const result2 = await this.summarize(
        await this.getTranscript(results[2]),
        5
      );
      dict[filteredQuestions[i]] = [result0, result1, result2];
    }

    return dict;
  }

  // Returns the relevant text from any website, uses html parsing for rev.com, and extractor api for any other website [limited 1000 calls]
  async getTranscript(url) {
    if (validator.isURL(url) === false) {
      console.log("\n" + url + " is not a valid URL.");
      process.exit();
    }

    // extactor api
    console.log("\n[Using extractor API]\n");
    const extractApi = process.env.EXTRACTOR_API_KEY;
    const endpoint = "https://extractorapi.com/api/v1/extractor";
    const params = `apikey=${extractApi}&url=${url}`;
    const response = await fetch(endpoint + "?" + params);
    const data = await response.json();
    return await data.text; // Assuming "text" is the key in the response containing the transcript
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

    // Summarize text by 20% each time until it fits into GPT
    let summarized = text;

    console.log("\n[Summary attempt: " + 1 + ", Percent: " + 8 + "]\n");
    summarized = await this.summarize(text, 8);

    return question + summarized;
  }

  async genPromptWithSearches(transcript, searches) {
    let question =
      "Examine the transcript focus on identifying any biases, inconsistencies, and false information present. The first part is a dictionary with questions you asked and internet results. Use that to craft a comprehensive summary that elucidates these biases, discrepancies, and inaccuracies, if detected. Detail the points that are the most biased. Additionally, furnish an approximate percentage representing the extent of objective content rooted in facts versus the portion containing biases or inaccuracies. Transcript: ";

    // Summarize text by 20% each time until it fits into GPT
    let summarized = transcript;

    console.log("\n[Summary attempt: " + 1 + ", Percent: " + 8 + "]\n");
    summarized = await this.summarize(transcript, 8);

    return question + searches + transcript;
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

export async function getFinalResult(url) {
  const detector = new BiasDetector();
  const transcript = await detector.getTranscript(url);
  console.log("transcript: " + transcript);
  const prompt = await detector.genPrompt(transcript, true);

  const questions = await detector.send(prompt);

    const searches = await detector.performSearchSummarization(questions);
    const searchesString = JSON.stringify(searches);

  const newprompt = await detector.genPromptWithSearches(
    transcript,
    searchesString
  );

  const answer = await detector.send(newprompt);
    console.log("\nPrompt sent to gpt: \n" + newprompt + "\n");
  console.log("\nUpdate to date chatgpt answer: \n" + answer);
  return answer;
}

// main method prompts user and makes calls
(async () => {
  console.log("Enter the link to a transcript/article:");
  const url = question();

  getFinalResult(url);
})();
