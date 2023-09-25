import requests
import os
import openai
from verumlib.extract import Extractor
import tiktoken
from dotenv import load_dotenv


class BiasDetector:

    def __init__(self, openai_api_key=None, x_rapidapi_key=None, extractor_api_key=None):
        # Load your API key from an environment variable or secret management service
        if not openai_api_key:
            load_dotenv()
            openai_api_key = os.getenv("OPENAI_API_KEY")
        if not x_rapidapi_key:
            load_dotenv()
            x_rapidapi_key = os.getenv("X_RAPIDAPI_KEY")
        if not extractor_api_key:
            load_dotenv()
            extractor_api_key = os.getenv("EXTRACTOR_API_KEY")

        self.openai_api_key = openai_api_key
        openai.api_key = self.openai_api_key
        self.x_rapidapi_key = x_rapidapi_key
        self.extractor_api_key = extractor_api_key

        # Directions for GPT
        self.criteria = "Examine the speech transcript provided below with a keen focus on identifying any biases, inconsistencies, and false information present. Craft a comprehensive summary that elucidates these biases, discrepancies, and inaccuracies, if detected. Detail the points that are the most biased. Additionally, furnish an approximate percentage representing the extent of objective content rooted in facts versus the portion containing biases or inaccuracies. Transcript: "

    def numTokensFromString(self, string: str) -> int:
        """Returns the number of tokens in a text string."""
        encoding = tiktoken.encoding_for_model("gpt-3.5-turbo")
        num_tokens = len(encoding.encode(string))
        return num_tokens

    def getTranscript(self, url):
        self.extractor = Extractor(self.extractor_api_key)
        transcript = self.extractor.getTranscript(url)
        return transcript

    def summarize(self, transcript, percent=100):

        if percent == 100:
            return transcript

        # Summarize transcript using rapidapi
        api_url = "https://text-analysis12.p.rapidapi.com/summarize-text/api/v1.1"

        payload = {
            "language": "english",
            "summary_percent": percent,
            "text": transcript
        }
        headers = {
            "content-type": "application/json",
            "X-RapidAPI-Key": self.x_rapidapi_key,
            "X-RapidAPI-Host": "text-analysis12.p.rapidapi.com"
        }

        response = requests.post(api_url, json=payload, headers=headers)
        if not response.json()['ok']:
            raise ValueError(response.json()['msg'])

        summarized_transcript = response.json()['summary']

        return summarized_transcript

    def genPrompt(self, text, debug=False):
        MAX_TOKENS = 3500
        criteria_num_tokens = self.numTokensFromString(self.criteria)

        # Calculate the max amt of tokens we can input into prompt after criteria
        max_text_tokens = MAX_TOKENS - criteria_num_tokens

        # Current tokens the original text holds
        curr_text_tokens = self.numTokensFromString(text)

        print("Current amount of total tokens: {0}".format(
            criteria_num_tokens + curr_text_tokens))

        # Summarize text by 20% each time until it fits into GPT
        percent = 60
        summarized = text
        percents = [60, 50, 40, 30, 20, 15, 10, 5]
        idx = 0
        while idx < len(percents) and curr_text_tokens > max_text_tokens:
            summarized = self.summarize(text, percents[idx])
            curr_text_tokens = self.numTokensFromString(summarized)
            idx += 1

        print("Final amount of total tokens: {0}".format(
            criteria_num_tokens + curr_text_tokens))
        return self.criteria + summarized

    def send(self, prompt, debug=False):
        # Send prompt to chatgpt and display response
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo", messages=[{"role": "user", "content": prompt}], temperature=0)

        if debug:
            print(response)

        return response['choices'][0]['message']['content']


if __name__ == "__main__":
    print("Enter the link to a transcript/article:")
    url = input()
    detector = BiasDetector()
    transcript = detector.getTranscript(url)

    prompt = detector.genPrompt(transcript)
    print("Number of Tokens Calculated: {0}".format(
        detector.numTokensFromString(prompt)))
    print(detector.send(prompt))
