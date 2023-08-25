import os
import openai
from extract import getTranscript
import validators

# Load your API key from an environment variable or secret management service
openai.api_key = os.getenv("OPENAI_API_KEY")
print("Enter a VALID link to a transcript from rev.com: ")
link=input()
if not validators.url(link):
    print("invalid link")
    exit()

transcript = getTranscript(
    link)

criteria = 'Present a summary with all the biases present, any inconsistencies, and false information, if any. Give an estimate percentage of the speech that is objective(based on facts) vs biased / falsified information. Here is the transcript to the speech: '

prompt = 'I will be giving you the transcript to a speech. ' + criteria + transcript

print("User Prompt: " + prompt + "\n\n\n")

print("Are you sure the prompt above is correct (y for yes, anything else terminate)? ")
answer = input()

if(answer != "y"):
    exit()

response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo", messages=[{"role": "user", "content": prompt}])

print(response['choices'][0]['message']['content'])
