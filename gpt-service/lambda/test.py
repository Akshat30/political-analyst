import json
import time
from main import handler


if __name__ == "__main__":
    start = time.time()
    event = open('tests/post-event.json')
    response = handler(event=json.load(event), context=None)
    print(response)

    end = time.time()
    hours, rem = divmod(end-start, 3600)
    minutes, seconds = divmod(rem, 60)
    print("Time taken to complete: {:0>2}:{:0>2}:{:05.2f}".format(int(hours),int(minutes),seconds))