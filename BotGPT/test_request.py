import requests

rasa_url = 'http://localhost:5005/webhooks/rest/webhook'

header = {'Content-Type': 'application/json', 
          'Accept': 'application/json'}

message = {'sender': 'test', 
           'message': 'what is dog?'}


response = requests.post(rasa_url, headers=header, json=message)
print(response.json())