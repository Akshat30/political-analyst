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

print("Original transcript estimated tokens:" + str(int(len(transcript) * 4.0/3.0)))

# Summarize transcript using rapidapi
url = "https://text-analysis12.p.rapidapi.com/summarize-text/api/v1.1"

payload = {
	"language": "english",
	"summary_percent": 10,
	"text": transcript
}
headers = {
	"content-type": "application/json",
	"X-RapidAPI-Key": "370f129b86msh4cfc9f14064026bp1c2f3djsn0213cbec04ff",
	"X-RapidAPI-Host": "text-analysis12.p.rapidapi.com"
}

response = requests.post(url, json=payload, headers=headers)

modifiedTranscript = response.json()['summary']

print("Modified transcript estimated tokens:" + str(int(len(modifiedTranscript) * 4.0/3.0)))

# Generate prompt, check with user
criteria = 'Examine the speech transcript provided below with a keen focus on identifying any biases, inconsistencies, and false information present. Craft a comprehensive summary that elucidates these biases, discrepancies, and inaccuracies, if detected. Additionally, furnish an approximate percentage representing the extent of objective content rooted in facts versus the portion containing biases or inaccuracies. Transcript: '

prompt = criteria + modifiedTranscript

print("\nYour generated prompt: \n" + prompt + "\n\n")

print("Confirm prompt (y for yes): ")
answer = input()

if(answer != "y"):
    exit()

# Send prompt to chatgpt and display response
response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo", messages=[{"role": "user", "content": prompt}], temperature=0)

print("Response from ChatGPT: \n" + response['choices'][0]['message']['content'])
