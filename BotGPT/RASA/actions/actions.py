import os, sys
import io
import openai
import random
import requests
import pandas as pd
from .custom_model import answerMe
from .connect_mongodb import find_book_by_title, find_book_by_category
from dotenv import load_dotenv
from rasa_sdk import Action, Tracker 
from typing import Any, Text, Dict, List
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet
import socketio

sio = socketio.Client()
Const_Rasa_To_Server = 'sendDataFromRasaToServer'
clientId = 'BLRMjdMQxu54MuMuAAAF'
@sio.event
def connect():
    print("I'm connected!")

@sio.on('sendDataToRasa')
def on_message(data):
    print('I received a message!')
    global clientId 
    clientId = data.id
    print(data)

@sio.event
def disconnect():
    print("I'm disconnected!")

sio.connect('http://localhost:5000')
def get_answers_from_chatgpt(user_text):
    # openai.api_key = "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"
    # response = openai.Completion.create(
    #     engine="text-davinci-003",
    #     prompt= user_text,
    #     max_tokens=1024,
    #     n=1,
    #     stop=None,
    #     temperature=0.5,
    # ).choices[0].text
    # return response
    return answerMe(user_text)

class Simple_ChatGPT_Action(Action):
    def name(self) -> Text:
        return "action_gpt_default_fallback" 

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        # Get the latest user text 
        user_text = tracker.latest_message.get('text')

        # Dispatch the response from OpenAI to the user
        dispatcher.utter_message('ChatGPT (custom_action): ' + get_answers_from_chatgpt(user_text))
        return []
    
class Simple_Google_sheet_or_ChatGPT_Action(Action):
    def name(self) -> Text:
        return "simple_google_sheet_or_chatgpt_action" 

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        user_text = tracker.latest_message.get('text')
        intent = tracker.latest_message.get('intent').get('name')
        entities = tracker.latest_message.get('entities')
        dispatcher.utter_message('Google Sheets (custom_action): ' + str(self.get_answers_from_sheets(intent, entities, user_text)))

        return []
    
    def get_answers_from_sheets(self, intent, entity, user_text):

        # Connect to Google Sheets
        sheet_url = "1F8K6GNaz0Xo2Q7a9SjRsVZW8L58lBMTOCN9OyTVKye8"

        GOOGLE_SHEET_URL = f"https://docs.google.com/spreadsheets/d/{sheet_url}/export?format=csv&gid=0"
        s = requests.get(GOOGLE_SHEET_URL).content
        proxy_df = pd.read_csv(io.StringIO(s.decode('utf-8')))        
        if entity:
            # Filter the dataframe by the intent column and retrieve the answer list
            filtered_df = proxy_df[(proxy_df['intent'] == intent) & (proxy_df['entity'] == entity[0]['value'])]

            if filtered_df.empty:
                answer = get_answers_from_chatgpt(user_text) 
            else:
                answers = filtered_df['answer'].tolist()
                answer = random.choice(answers)
        else:
            answer = get_answers_from_chatgpt(user_text)
        return answer
class ActionAskBook(Action):
    def name(self) -> Text:
        return "action_hoi_sach"

    def run(self, dispatcher: CollectingDispatcher,
                tracker: Tracker,
                domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        user_text = tracker.latest_message.get('text')
        entities = tracker.latest_message.get('entities')
        response =  str (answerMe(user_text +"?, nếu có hãy chỉ trả lời id của quyển sách, nếu không hãy chỉ trả lời -1") )
        print(entities, response)
        if len(response) > 5 :
            sio.emit(Const_Rasa_To_Server, '/product/' + response)
            dispatcher.utter_message(text="Shop có quyển đấy, không biết đây có phải sách bạn cần tìm !!!" )
        else:
            dispatcher.utter_message(text="Rất tiếc, bạn có thể tìm quyển khác không?" )
        return [SlotSet('book_name', response )]
    
class ActionAskBookByCategory(Action):
    def name(self) -> Text:
        return "action_hoi_sach_theo_the_loai"

    def run(self, dispatcher: CollectingDispatcher,
                tracker: Tracker,
                domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        user_text = tracker.latest_message.get('text')
        entities = tracker.latest_message.get('entities')
        print(entities)
        if entities != []:
            response = {
                'id': clientId ,
                'data': '/book-page/' + str(find_book_by_category('sách'+ entities[0]['value']))
            }
            sio.emit(Const_Rasa_To_Server, response)
            dispatcher.utter_message(text="Đây là danh sách thuộc thể loại bạn tìm." )
        else:
            dispatcher.utter_message(text="Rất tiếc, bạn có thể tìm thể loại khác không?" )
        return []

class ActionVỉewCart(Action):
    def name(self) -> Text:
        return "action_xem_gio_hang"

    def run(self, dispatcher: CollectingDispatcher,
                tracker: Tracker,
                domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        response = {
                'id': clientId ,
                'data': '/cart'
            }
        sio.emit(Const_Rasa_To_Server, response)
        dispatcher.utter_message(text="Đây là giỏ hàng của bạn" )
        return [] 
class ActionVỉewBill(Action):
    def name(self) -> Text:
        return "action_xem_lich_su"

    def run(self, dispatcher: CollectingDispatcher,
                tracker: Tracker,
                domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        response = {
                'id': clientId ,
                'data': '/bill'
            }
        sio.emit(Const_Rasa_To_Server, response)
        dispatcher.utter_message(text="Đây là danh sách đơn hàng của bạn" )
        return [] 
# class ActionAddBookToCart(Action):
#     def name(self) -> Text:
#         return "action_them_sach_vao_gio"

#     def run(self, dispatcher: CollectingDispatcher,
#                 tracker: Tracker,
#                 domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#         user_text = tracker.latest_message.get('text')
#         entities = tracker.latest_message.get('entities')
#         bookId = tracker.get_slot('book_name')
#         print(bookId, entities)
#         # sio.emit("sendDataClient", '/cart')
#         dispatcher.utter_message(text='nothing' )
#         return [] 

# user_text = "quyển Để con được ốm bao nhiêu tiền ?" 
# print(user_text)
# print(get_answers_from_chatgpt('quyển sách nào đắt nhất'))