# import requests
# import json
# rasa_url = 'http://localhost:5005/webhooks/rest/webhook'

# header = {'Content-Type': 'application/json', 
#           'Accept': 'application/json'}
# book_id = "6294784b498c7a6524551c35"
# message = { "type": "navigate",
#             "route": f"/{book_id}"}


# response = requests.post(rasa_url, headers=header, json=message)
# print(response.json())

# Python backend (Flask with Flask-SocketIO)
import socketio

sio = socketio.Client()

@sio.event
def connect():
    print("I'm connected!")
    # sio.emit("sendDataClient", '62a202428801b54984b83460')

@sio.on('sendDataServer')
def on_message(data):
    print('I received a message!')
    print(data)

@sio.event
def disconnect():
    print("I'm disconnected!")

sio.connect('http://localhost:5000')




