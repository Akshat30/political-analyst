import requests
import os
import openai
from extract import Extractor
import validators

class BiasDetector:

    def __init__(self):
        # Load your API key from an environment variable or secret management service
        self.api_key = os.getenv("OPENAI_API_KEY")
        openai.api_key = self.api_key
        self.extractor = Extractor()
        self.transcript = ""
        self.criteria = "Examine the speech transcript provided below with a keen focus on identifying any biases, inconsistencies, and false information present. Craft a comprehensive summary that elucidates these biases, discrepancies, and inaccuracies, if detected. Detail the points that are the most biased. Additionally, furnish an approximate percentage representing the extent of objective content rooted in facts versus the portion containing biases or inaccuracies. Transcript: "

    def getTranscript(self, url):
        self.extractor = Extractor()
        self.transcript = self.extractor.getTranscript(url)

    def summarize(self, percent):
        # Extract transcript if not extracted already
        if not self.transcript:
            raise Exception("Please select a proper URL in object creation")

        # Summarize transcript using rapidapi
        api_url = "https://text-analysis12.p.rapidapi.com/summarize-text/api/v1.1"

        payload = {
            "language": "english",
            "summary_percent": percent,
            "text": self.transcript
        }
        headers = {
            "content-type": "application/json",
            "X-RapidAPI-Key": "370f129b86msh4cfc9f14064026bp1c2f3djsn0213cbec04ff",
            "X-RapidAPI-Host": "text-analysis12.p.rapidapi.com"
        }

        response = requests.post(api_url, json=payload, headers=headers)
        modified_transcript = response.json()['summary']

        print("Modified transcript estimated tokens:" + str(int(len(modified_transcript) * 4.0/3.0)))

        return modified_transcript
    
    def summarizeMultiple(self, transcript_url, percents):
        # Extract transcript if not extracted already
        if not transcript_url:
            self.transcript = self.extractor.getTranscript(transcript_url)

        summarized_transcripts = []
        summarized_transcripts.append(self.transcript)
        for percent in percents:
            summarized_transcripts.append(self.summarize(percent))

        return summarized_transcripts
    
    def testPrompt(self, summarized_transcripts):
        count = 100
        for tran in summarized_transcripts:
            # Generate prompt, check with user
            criteria = 'Examine the speech transcript provided below with a keen focus on identifying any biases, inconsistencies, and false information present. Craft a comprehensive summary that elucidates these biases, discrepancies, and inaccuracies, if detected. Detail the points that are the most biased. Additionally, furnish an approximate percentage representing the extent of objective content rooted in facts versus the portion containing biases or inaccuracies. Transcript: '

            prompt = criteria + tran

            # print("Confirm prompt (y for yes): ")
            # answer = input()

            # if(answer != "y"):
            #     exit()

            # Send prompt to chatgpt and display response
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo", messages=[{"role": "user", "content": prompt}], temperature = 0)

            filetowrite = 'trump.txt'
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
    summarized_transcripts = detector.summarizeMultiple(url, [80, 60, 40, 20])
    detector.testPrompt(summarized_transcripts)
