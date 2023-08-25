import requests
import os
import openai
from extract import getTranscript
import validators

# Load your API key from an environment variable or secret management service
openai.api_key = os.getenv("OPENAI_API_KEY")

# Prompt and check for link
print("Enter a VALID link to a transcript from rev.com: ")
link=input()
if not validators.url(link):
    print("invalid link")
    exit()

# Load transcript from link
transcript = getTranscript(
    link)

# Summarize transcript using rapidapi
url = "https://text-analysis12.p.rapidapi.com/summarize-text/api/v1.1"

payload = {
	"language": "english",
	"summary_percent": 5,
	"text": transcript
}
headers = {
	"content-type": "application/json",
	"X-RapidAPI-Key": "370f129b86msh4cfc9f14064026bp1c2f3djsn0213cbec04ff",
	"X-RapidAPI-Host": "text-analysis12.p.rapidapi.com"
}

response = requests.post(url, json=payload, headers=headers)

modifiedTranscript = response.json()['summary']

# Generate prompt, check with user
criteria = 'Present a summary with all the biases present, any inconsistencies, and false information, if any. Give an estimate percentage of the speech that is objective(based on facts) vs biased / falsified information. Here is the transcript to the speech: '

prompt = 'I will be giving you the transcript to a speech. ' + criteria + modifiedTranscript

print("\nYour generated prompt: \n" + prompt + "\n\n")

print("Are you sure the prompt above is correct (y for yes, anything else terminate)? ")
answer = input()

if(answer != "y"):
    exit()

# Send prompt to chatgpt and display response
response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo", messages=[{"role": "user", "content": prompt}])

print("Response from ChatGPT: \n" + response['choices'][0]['message']['content'])
