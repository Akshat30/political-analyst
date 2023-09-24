from verumlib.extract import Extractor
from verumlib.gpt import BiasDetector
import json
import os

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
    decoded_body = decoded_event["queryStringParameters"]
    
    if not decoded_body:
        response['statusCode'] = 400
        response['body'] = json.dumps({'message': 'No text or link provided'})
        return response
    
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
