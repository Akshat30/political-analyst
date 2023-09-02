import fetch from "node-fetch";
import { question } from "readline-sync";
import tiktoken from "tiktoken";
import { OpenAI } from "openai";
import { config } from "dotenv"; // Import dotenv if not imported already

config(); // Load environment variables from .env file

class BiasDetector {
  constructor() {
    // Load your API key from an environment variable or secret management service
    // Set your OpenAI API key

    this.openai = new OpenAI({});

    // Directions for GPT
    this.criteria =
      "Examine the speech transcript provided below with a keen focus on identifying any biases, inconsistencies, and false information present. Craft a comprehensive summary that elucidates these biases, discrepancies, and inaccuracies, if detected. Detail the points that are the most biased. Additionally, furnish an approximate percentage representing the extent of objective content rooted in facts versus the portion containing biases or inaccuracies. Transcript: ";
  }

  numTokensFromString(string) {
    const encoding = tiktoken.encoding_for_model("gpt-3.5-turbo");
    const numTokens = encoding.encode(string).length;
    return numTokens;
  }

  async getTranscript(url) {
    const extractApi = process.env.EXTRACTER_API_KEY;
    const endpoint = "https://extractorapi.com/api/v1/extractor";
    const params = `apikey=${extractApi}&url=${url}`;

    const response = await fetch(endpoint + "?" + params);
    const data = await response.json();
    return data.text; // Assuming "text" is the key in the response containing the transcript
  }

  async summarize(transcript, percent = 100) {
    if (percent === 100) {
      return transcript;
    }

    // const url =
    //   "https://text-analysis12.p.rapidapi.com/summarize-text/api/v1.1";
    // const options = {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //     "X-RapidAPI-Key": "370f129b86msh4cfc9f14064026bp1c2f3djsn0213cbec04ff",
    //     "X-RapidAPI-Host": "text-analysis12.p.rapidapi.com",
    //   },
    //   body: {
    //     language: "english",
    //     summary_percent: percent,
    //     text: transcript,
    //   },
    // };

    // try {
    //   const response = await fetch(url, options);
    //   const result = await response.text();
    //   return result;
    // } catch (error) {
    //   console.error(error);
    //   return "";
    // }
      
      return transcript;
  }

  genPrompt(text) {
    const MAX_TOKENS = 3500;
    const criteriaNumTokens = this.numTokensFromString(this.criteria);

    // Calculate the max amount of tokens we can input into the prompt after criteria
    const maxTextTokens = MAX_TOKENS - criteriaNumTokens;

    // Current tokens the original text holds
    const currTextTokens = this.numTokensFromString(text);

    console.log(
      `Current amount of total tokens: ${criteriaNumTokens + currTextTokens}`
    );

    // Summarize text by 20% each time until it fits into GPT
    const percents = [60, 50, 40, 30, 20, 15, 10, 5];
    let idx = 0;
    let summarized = text;
    while (idx < percents.length && currTextTokens > maxTextTokens) {
      summarized = this.summarize(text, percents[idx]);
      console.log(summarized);
      currTextTokens = this.numTokensFromString(summarized);
      idx++;
    }

    console.log(
      `Final amount of total tokens: ${criteriaNumTokens + currTextTokens}`
    );

    return this.criteria + summarized;
  }

  async send(prompt) {
    const chatCompletion = await this.openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    return chatCompletion.choices[0].message["content"];
  }
}

(async () => {
  console.log("Enter the link to a transcript/article:");
  const url = question();

  const detector = new BiasDetector();
  const transcript = await detector.getTranscript(url);

  const prompt = detector.genPrompt(transcript);
  //   console.log(
  //     `Number of Tokens Calculated: ${detector.numTokensFromString(prompt)}`
  //   );

  console.log(await detector.send(prompt));
})();
