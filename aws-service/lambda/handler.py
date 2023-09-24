import json
import os

"""
Helper functions for the text processing pipeline
"""
def scrapeText(link: str) -> str:
    pass

def processText(original_text: str) -> str:
    pass

def sendProcessedText(text: str) -> json:
    pass

def processLLMResponse(response: json) -> json:
    pass

"""
Main lambda function that handles the text processing pipeline
If text is given, it will process the text and return the processed text
If text is not given, it will scrape text from the link provided

After processing the text, it will send the processed text to the LLM API
It will then process the response from the LLM API and return a response with analysis

In summary: scrape text -> process text -> send processed text -> process response -> return response

Input:
    - text: string
    - link: string
Output:
    - response: json
"""
def textHandler(event, context):
    return {
        'statusCode': 200,
        'body': 'Lambda was invoked successfully.'
    }
    # Extract necessary keys
    OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
    X_RAPIDAPI_KEY = os.environ.get('X_RAPIDAPI_KEY')
    EXTRACTER_API_KEY = os.environ.get('EXTRACTER_API_KEY')

    response = {}

    # Extract text from event
    decoded_event = json.loads(event['body'])
    text = None
    if 'text' in decoded_event:
        text = decoded_event['text']
    elif 'link' in decoded_event:
        link = decoded_event['link']
        text = scrapeText(link)
    else:
        response['statusCode'] = 400
        response['body'] = json.dumps({'message': 'No text or link provided'})
        return response
    
    # Process text
    processed_text = processText(text)

    # Send processed text to LLM API
    llm_response = sendProcessedText(processed_text)

    # Process response from LLM API
    analysis = processLLMResponse(llm_response)

    analysis = {"bias": 0.5, "inaccuracies": 0.5, "inconsistencies": 0.5} # To test lambda function

    # Return response
    response['statusCode'] = 200
    response['headers'] = {}
    response['headers']['Content-Type'] = 'application/json'
    response['body'] = json.dumps(analysis)

    return response

