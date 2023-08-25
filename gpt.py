import os
import openai

# Load your API key from an environment variable or secret management service
openai.api_key = os.getenv("OPENAI_API_KEY")
print("Enter your prompt:")
prompt=input()
response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo", messages=[{"role": "user", "content": prompt}])

print(response['choices'][0]['message']['content'])