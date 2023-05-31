import requests

rasa_url = 'http:/localhost:5005/webhooks/rest/webhook'

header = {'Content-Type': 'application/json', 
          'Accept': 'application/json'}

message = {'sender': 'test', 
           'message': 'hello'}


response = requests.post(rasa_url, header, message)
print(response.json())