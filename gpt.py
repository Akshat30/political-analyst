import requests
import os
import openai
from extract import Extractor
import validators
import tiktoken
from dotenv import load_dotenv

class BiasDetector:

    def __init__(self):
        # Load your API key from an environment variable or secret management service
        load_dotenv()
        self.api_key = os.getenv("OPENAI_API_KEY")
        openai.api_key = self.api_key

        # Directions for GPT
        self.criteria = "Examine the speech transcript provided below with a keen focus on identifying any biases, inconsistencies, and false information present. Craft a comprehensive summary that elucidates these biases, discrepancies, and inaccuracies, if detected. Detail the points that are the most biased. Additionally, furnish an approximate percentage representing the extent of objective content rooted in facts versus the portion containing biases or inaccuracies. Transcript: "

    def numTokensFromString(self, string: str) -> int:
        """Returns the number of tokens in a text string."""
        encoding = tiktoken.encoding_for_model("gpt-3.5-turbo")
        num_tokens = len(encoding.encode(string))
        return num_tokens

    def getTranscript(self, url):
        self.extractor = Extractor(url)
        transcript = self.extractor.getTranscript()
        return transcript

    def summarize(self, transcript, percent=80):
        # Summarize transcript using rapidapi
        api_url = "https://text-analysis12.p.rapidapi.com/summarize-text/api/v1.1"

        payload = {
            "language": "english",
            "summary_percent": percent,
            "text": transcript
        }
        headers = {
            "content-type": "application/json",
            "X-RapidAPI-Key": "370f129b86msh4cfc9f14064026bp1c2f3djsn0213cbec04ff",
            "X-RapidAPI-Host": "text-analysis12.p.rapidapi.com"
        }

        response = requests.post(api_url, json=payload, headers=headers)
        if not response.json()['ok']:   
            raise ValueError(response.json()['msg'])
        modified_transcript = response.json()['summary']

        return modified_transcript
    
    def summarizeMultiple(self, text, percents):
        summarized_texts = []
        summarized_texts.append(text)
        for percent in percents:
            summarized_texts.append(self.summarize(percent))

        return summarized_texts
    
    def genPrompt(self, text, debug=False):
        MAX_TOKENS = 4096
        criteria_num_tokens = self.numTokensFromString(self.criteria) 

        # Calculate the max amt of tokens we can input into prompt after criteria
        max_text_tokens = MAX_TOKENS - criteria_num_tokens 
        # Current tokens the original text holds
        curr_text_tokens = self.numTokensFromString(text)

        print("Current amount of total tokens: {0}".format(criteria_num_tokens + curr_text_tokens))

        # Summarize text by 20% each time until it fits into GPT
        percent = 80
        while percent > 0 and curr_text_tokens > max_text_tokens:
            summarized = self.summarize(text, percent)
            curr_text_tokens = self.numTokensFromString(summarized)
            percent -= 20
            
        print("Final amount of total tokens: {0}".format(criteria_num_tokens + curr_text_tokens))
        return self.criteria + summarized
    
    def send(self, prompt, debug=False):
        # Send prompt to chatgpt and display response
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo", messages=[{"role": "user", "content": prompt}], temperature = 0)
        
        if debug:
            print(response)

        return response['choices'][0]['message']['content']
        


    def testPrompt(self, summarized_transcripts):
        count = 100
        for tran in summarized_transcripts:
            # Generate prompt, check with user
            criteria = 'Examine the speech transcript provided below with a keen focus on identifying any biases, inconsistencies, and false information present. Craft a comprehensive summary that elucidates these biases, discrepancies, and inaccuracies, if detected. Detail the points that are the most biased. Additionally, furnish an approximate percentage representing the extent of objective content rooted in facts versus the portion containing biases or inaccuracies. Transcript: '

            prompt = criteria + tran

            print(prompt + "\n")

            print("Confirm prompt (y for yes): ")
            answer = input()

            if(answer != "y"):
                exit()

            # Send prompt to chatgpt and display response
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo", messages=[{"role": "user", "content": prompt}], temperature = 0)

            filetowrite = 'vivek2.txt'
            sumpercent = str(count)
            charcount = str(len(tran))
            ratio = str(len(tran)/len(summarized_transcripts[0]))
            gptresponse = response['choices'][0]['message']['content']
            
            with open(filetowrite, 'a') as fp:
                fp.write("Transcript Percentage {0} and Char Count: {1} and Length ratio: {2} \n\nTranscript: \n{3}\n\nResponse: \n{4}\n \n \n".format(sumpercent, charcount, ratio, tran, gptresponse))
            
            count-=20
        
if __name__ == "__main__":
    print("Enter a VALID link to a transcript from rev.com: ")
    url = input()
    detector = BiasDetector()
    transcript = detector.getTranscript(url)

    prompt = detector.genPrompt(transcript)
    print("Number of Tokens Calculated: {0}".format(detector.numTokensFromString(prompt)))
    print(detector.send(prompt))

    # summarized_texts = detector.summarizeMultiple(transcript, [80, 60, 40, 20])
    # detector.testPrompt(summarized_texts)
