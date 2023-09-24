import json
from handler import textHandler

if __name__ == "__main__":
    event = {}
    event["queryStringParameters"] = {
        "text": "",
        "link": "https://www.cnn.com/2023/08/25/politics/haley-ramaswamy-gop-debate-iowa-voters/index.html"
    }
    context = {}

    response = textHandler(json.dumps(event), context)
    print(response)