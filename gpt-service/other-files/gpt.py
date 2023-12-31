from nltk.tokenize import sent_tokenize
import requests
import os
import openai
from extract import Extractor
import validators
import tiktoken
from dotenv import load_dotenv
import csv
from scipy.optimize import curve_fit
import numpy as np
import nltk
nltk.download('punkt')


class BiasDetector:

    def __init__(self):
        # Load your API key from an environment variable or secret management service
        load_dotenv()
        self.openai_api_key = os.getenv("OPENAI_API_KEY")
        openai.api_key = self.openai_api_key
        self.x_rapidapi_key = os.getenv("X_RAPIDAPI_KEY")

        # Directions for GPT
        self.criteria = "Examine the speech transcript provided below with a keen focus on identifying any biases, inconsistencies, and false information present. Craft a comprehensive summary that elucidates these biases, discrepancies, and inaccuracies, if detected. Detail the points that are the most biased. Additionally, furnish an approximate percentage representing the extent of objective content rooted in facts versus the portion containing biases or inaccuracies. Transcript: "

    def numTokensFromString(self, string: str) -> int:
        """Returns the number of tokens in a text string."""
        encoding = tiktoken.encoding_for_model("gpt-3.5-turbo")
        num_tokens = len(encoding.encode(string))
        return num_tokens

    def getTranscript(self, url):
        self.extractor = Extractor()
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
            idx+=1

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
    
    def genPrompt2(self, text, debug=False):
        MAX_TOKENS = 3500
        criteria_num_tokens = self.numTokensFromString(self.criteria)

        # Calculate the max amt of tokens we can input into prompt after criteria
        max_text_tokens = MAX_TOKENS - criteria_num_tokens

        # Current tokens the original text holds
        curr_text_tokens = self.numTokensFromString(text)

        print("Char length: " + str(len(text)) + "\n")
        print("Current amount of total tokens: {0}".format(
            criteria_num_tokens + curr_text_tokens))

        # Summarize text by 20% each time until it fits into GPT
        maxLength = max_text_tokens*4.8

        if(curr_text_tokens <= max_text_tokens):
            return self.criteria + text

        numSen = len(sent_tokenize(text))

        fivePer = self.summarize(text, 4)

        summary_percent = (
            maxLength/(len(fivePer)/len(sent_tokenize(fivePer))))/numSen * 100

        print("Max Length: " + str(maxLength) + "\n")
        print("Average sentence length: " +
              str(len(sent_tokenize(fivePer))) + "\n")
        print("Num Sentence length: " + str(numSen) + "\n")
        print("Max sentences: " + str((maxLength/len(sent_tokenize(fivePer)))) + "\n")
        print("Summary percent: " + str(summary_percent) + "\n")

        summarized = self.summarize(text, summary_percent)

        curr_text_tokens = self.numTokensFromString(summarized)
        print("Final amount of total tokens: {0}".format(
            criteria_num_tokens + curr_text_tokens))

        return self.criteria + summarized
    
    def testGenPrompt2(self, category_link):
        ex = Extractor()
        links = ex.getLinks(category_link)
        for link in links:
            print('Currently opening article at: ' + link + '\n')
            text = self.getTranscript(link)

            MAX_TOKENS = 3500
            criteria_num_tokens = self.numTokensFromString(self.criteria)

            # Calculate the max amt of tokens we can input into prompt after criteria
            max_text_tokens = MAX_TOKENS - criteria_num_tokens

            # Current tokens the original text holds
            curr_text_tokens = self.numTokensFromString(text)
            
            startTokens = criteria_num_tokens + curr_text_tokens

            # Summarize text by 20% each time until it fits into GPT
            maxLength = max_text_tokens*4.9
            reducedTokens = 0

            if(curr_text_tokens > max_text_tokens):
                numSen = len(sent_tokenize(text))

                fivePer = self.summarize(text, 2)

                summary_percent = (maxLength/(len(fivePer)/len(sent_tokenize(fivePer))))/numSen * 100
                print(str(maxLength/20))
                print(str(numSen))
                print(str(summary_percent))

                summarized = self.summarize(text, summary_percent)

                curr_text_tokens = self.numTokensFromString(summarized)
                
                reducedTokens = curr_text_tokens+criteria_num_tokens

            print("Max Tokens: {0}, Start Tokens: {1}, Reduced Tokens: {2}, Max - Reduced: {3}".format(MAX_TOKENS, startTokens, reducedTokens, MAX_TOKENS-reducedTokens))



    def summarizeFunctionData(self, category_link):
        ex = Extractor()
        links = ex.getLinks(category_link)
        data = [['Link', 'Summary Percent', 'OG TS Length',
                 'Summ. TS Length', 'Length Ratio', 'Sentence Length']]
        for link in links:
            print('Currently opening article at: ' + link + '\n')
            tscript = self.getTranscript(link)
            oglength = len(tscript)
            pers = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10]
            for p in pers:
                print('    Summary percent: ' + str(p) + '\n')
                dataRow = []
                summarizedTscript = self.summarize(tscript, p)
                sumlength = len(summarizedTscript)
                dataRow.append(link)
                dataRow.append(p)
                dataRow.append(oglength)
                dataRow.append(sumlength)
                dataRow.append(sumlength/oglength)
                dataRow.append(len(sent_tokenize(summarizedTscript)))
                data.append(dataRow)

        # File path
        csv_file_path = 'sentence_data.csv'

        # Writing to CSV file
        with open(csv_file_path, mode='w', newline='') as csv_file:
            writer = csv.writer(csv_file)
            writer.writerows(data)

    # def compareSummaries(self, summarized_transcripts):
    #     count = 100
    #     for tran in summarized_transcripts:
    #         # Generate prompt, check with user

    #         prompt = self.criteria + tran

    #         print(prompt + "\n")

    #         print("Confirm prompt (y for yes): ")
    #         answer = input()

    #         if(answer != "y"):
    #             exit()

    #         # Send prompt to chatgpt and display response
    #         response = openai.ChatCompletion.create(
    #             model="gpt-3.5-turbo", messages=[{"role": "user", "content": prompt}], temperature = 0)

    #         filetowrite = 'vivek2.txt'
    #         sumpercent = str(count)
    #         charcount = str(len(tran))
    #         ratio = str(len(tran)/len(summarized_transcripts[0]))
    #         gptresponse = response['choices'][0]['message']['content']

    #         with open(filetowrite, 'a') as fp:
    #             fp.write("Transcript Percentage {0} and Char Count: {1} and Length ratio: {2} \n\nTranscript: \n{3}\n\nResponse: \n{4}\n \n \n".format(sumpercent, charcount, ratio, tran, gptresponse))

    #         count-=20

    # def summarizeMultiple(self, text, percents):
    #     summarized_texts = []
    #     for percent in percents:
    #         summarized_texts.append(self.summarize(text, percent))

    #     return summarized_texts


if __name__ == "__main__":
    print("Enter the link to a transcript/article:")
    url = input()
    detector = BiasDetector()
    transcript = detector.getTranscript(url)

    prompt = detector.genPrompt(transcript)
    print("Number of Tokens Calculated: {0}".format(
        detector.numTokensFromString(prompt)))
    print(detector.send(prompt))

    # Generating summary data
    # print("Enter the link to a rev transcript category page:")
    # url = input()
    # detector = BiasDetector()
    # detector.testGenPrompt2(url)
    # # detector.summarizeFunctionData(url)

    # summarized_texts = detector.summarizeMultiple(transcript, [80, 60, 40, 20])
    # detector.testPrompt(summarized_texts)
