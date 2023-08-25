import requests

endpoint = "https://extractorapi.com/api/v1/extractor"
params = {
    "apikey": "418285cde14600f1a120861a1198d0dd273d7fe4",
    "url": "https://www.cnn.com/2023/08/25/politics/haley-ramaswamy-gop-debate-iowa-voters/index.html"
}

r = requests.get(endpoint, params=params)
print(r.json()['text'])
