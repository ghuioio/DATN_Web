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
import asyncio
import json
import websockets
import traceback

all_clients = []


async def send_message(client_socket, message):
    await client_socket.send(message)


async def new_client_connected(client_socket, path):
    print("New client connected!")
    all_clients.append(client_socket)
    try:
        while True:
            message = await client_socket.recv()
            data = json.loads(message)
            command = data['command']
            if (command == 'detect_pose'):
                update_start = data['update_start']
            elif (command == 'login'):
                await send_message(client_socket, json.dumps({
                    'command': command,
                    'response': 'login'
                }))
            elif (command == 'register'):
                await send_message(client_socket, json.dumps({
                    'command': command,
                    'response': 'rgistration'
                }))
            elif (command == 'get_levels'):
                await send_message(client_socket, json.dumps({
                    'command': command,
                    'response': 'get_levels'
                }))
            elif (command == 'update_result'):
                await send_message(client_socket, json.dumps({
                    'command': command,
                    'response': 'update_result'
                }))
            elif (command == 'get_all_results'):
                await send_message(client_socket, json.dumps({
                    'command': command,
                    'response':'get_result'
                }))
                
    except Exception as ex:
        print('='*10, 'ERROR', ex)
        traceback.print_tb(ex.__traceback__)
        print('='*20)


async def start_server():
    print('Server started')
    await websockets.serve(new_client_connected, 'localhost', 5000)


if __name__ == '__main__':
    event_loop = asyncio.get_event_loop()
    event_loop.run_until_complete(start_server())
    event_loop.run_forever()



