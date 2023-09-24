import json
import os
import urllib
from bs4 import BeautifulSoup
import validators
import requests
from dotenv import load_dotenv
import openai
import tiktoken

class Extractor:
    def __init__(self, extractor_api_key=None):
        if not extractor_api_key:
            load_dotenv()
            extractor_api_key = os.environ.get('EXTRACTER_API_KEY')
        self.extractor_api_key = extractor_api_key

    def getLinks(self, listing_url):
        # Fetching the html
        try:
            request = urllib.request.Request(listing_url)
            content = urllib.request.urlopen(request)
            # Parsing the html
            parse = BeautifulSoup(content, 'html.parser')
        except urllib.error.URLError as e:
            print(f"An error occurred: {e}")
            return None

        # Provide html elements' attributes to extract the data
        div_tags = parse.find_all('div', attrs={'fl-post-column'})
        links = []

        for div_tag in div_tags:
            a_tag = div_tag.find('a')
            if a_tag:
                link = a_tag['href']
                links.append(link)

        return links

    # Returns the transcript of speech from the given link for rev
    def getTranscript(self, url):
        if not validators.url(url):
            raise ValueError("Invalid link: {0}".format(url))

        if 'rev.com' in url:
            print('[Using hard-coded function for rev.com]')        

            # Fetching the html
            req = urllib.request.Request(url)
            print(req)
            con = urllib.request.urlopen(req)

            # Parsing the html
            soup = BeautifulSoup(con, 'html.parser')

            div_tags = soup.find_all('div', attrs={'fl-callout-text'})

            # Extract and format the text from each <p> tag
            formatted_text = ""

            for div_tag in div_tags:
                text = div_tag.get_text(strip=True)
                if text:
                    # Add two newline characters to separate transcript entries
                    formatted_text += text + "\n\n"

            return formatted_text
        else:
            print('[Using extractor api]')
            endpoint = "https://extractorapi.com/api/v1/extractor"

            params = {
                "apikey": self.extractor_api_key,
                "url": url
            }

            r = requests.get(endpoint, params=params)
            formatted_text =  r.json()['text']
            return formatted_text.replace("\n", "")

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
            extractor_api_key = os.getenv("EXTRACTER_API_KEY")

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

"""
Helper functions for the text processing pipeline
"""
def scrapeText(bias_detector: BiasDetector, link: str) -> str:
    return bias_detector.getTranscript(link)

def generatePrompt(bias_detector: BiasDetector, original_text: str) -> str:
    return bias_detector.genPrompt(original_text)

def sendProcessedPrompt(bias_detector: BiasDetector, prompt: str) -> json:
    return bias_detector.send(prompt)

def processLLMResponse(bias_detector: BiasDetector, response: json) -> json:
    return response


"""
Main lambda function that handles the text processing pipeline
If text is given, it will process the text and generate the prompt
If text is not given, it will scrape text from the link provided, process the text, and generate prompt

After processing the text, it will send the processed text to the LLM API
It will then process the response from the LLM API and return a response with analysis

In summary: scrape text -> process text and generate prompt -> send processed text -> process response -> return response

Input:
    - text: string
    - link: string
Output:
    - response: json
"""
def textHandler(event, context):
    # Extract necessary keys
    OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
    X_RAPIDAPI_KEY = os.environ.get('X_RAPIDAPI_KEY')
    EXTRACTOR_API_KEY = os.environ.get('EXTRACTER_API_KEY')

    response = {}
    extractor = Extractor(EXTRACTOR_API_KEY)
    bias_detector = BiasDetector(OPENAI_API_KEY, X_RAPIDAPI_KEY, EXTRACTOR_API_KEY)

    # Extract text from event
    decoded_event = json.loads(event)
    decoded_body = decoded_event["body"]
    text = None
    if 'text' in decoded_body and decoded_body['text']:
        text = decoded_body['text']
    elif 'link' in decoded_body:
        link = decoded_body['link']
        text = scrapeText(bias_detector, link)
    else:
        response['statusCode'] = 400
        response['body'] = json.dumps({'message': 'No text or link provided'})
        return response
    
    # Process text
    prompt = generatePrompt(bias_detector, text)

    # Send processed text to LLM API
    llm_response = sendProcessedPrompt(bias_detector, prompt)

    # Process response from LLM API
    analysis = processLLMResponse(bias_detector, llm_response)

    # Return response
    response['statusCode'] = 200
    response['headers'] = {}
    response['headers']['Content-Type'] = 'application/json'
    response['body'] = json.dumps(analysis)

    return response
