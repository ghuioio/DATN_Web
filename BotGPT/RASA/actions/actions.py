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
@sio.event
def connect():
    print("I'm connected!")

@sio.on('sendDataToRasa')
def on_message(data):
    print('I received a message!')
    print(data)

@sio.event
def disconnect():
    print("I'm disconnected!")

sio.connect('http://localhost:5000')
def get_answers_from_chatgpt(user_text):
    return answerMe(user_text)

def print_intent_probabilities(tracker: Tracker):

  intent_rankings = tracker.latest_message['intent_ranking']

  print("Intent Probabilities:")
  for ranking in intent_rankings:
    intent_name = ranking['name']
    intent_prob = ranking['confidence']
    print(f"- {intent_name}: {intent_prob}")

class Simple_ChatGPT_Action(Action):
    def name(self) -> Text:
        return "action_chatgpt_fallback" 

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        # Get the latest user text 
        user_text = tracker.latest_message.get('text')

        # Dispatch the response from OpenAI to the user
        dispatcher.utter_message(get_answers_from_chatgpt(user_text))
        print_intent_probabilities(tracker)
        return []

class ActionAskBook(Action):
    def name(self) -> Text:
        return "action_hoi_sach"

    def run(self, dispatcher: CollectingDispatcher,
                tracker: Tracker,
                domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        user_text = tracker.latest_message.get('text')
        entities = tracker.latest_message.get('entities')
        clientId = tracker.sender_id
        response =  str (answerMe(user_text +"?, nếu có chỉ trả lời id của quyển sách, nếu không hãy chỉ trả lời -1") )
        print(entities, response)
        if len(response) > 10 :
            if ":" in response:
                id_string = response.split(":")[1].strip()
            else:
                id_string = response
            res= {
                'id': clientId ,
                'data': '/product/' + id_string 
            }
            sio.emit(Const_Rasa_To_Server, res)
            dispatcher.utter_message(text="Shop có quyển đấy, không biết đây có phải sách bạn cần tìm !!!" )
        else:
            dispatcher.utter_message(text="Rất tiếc, bạn có thể tìm quyển khác không?" )

            intent_rankings = tracker.latest_message['intent_ranking']

        # Get the confidence score of the predicted intent
        print_intent_probabilities(tracker)
        return []
    
class ActionAskBookByCategory(Action):
    def name(self) -> Text:
        return "action_hoi_sach_theo_the_loai"

    def run(self, dispatcher: CollectingDispatcher,
                tracker: Tracker,
                domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        user_text = tracker.latest_message.get('text')
        entities = tracker.latest_message.get('entities')
        clientId = tracker.sender_id
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
        print_intent_probabilities(tracker)
        return []

class ActionVỉewCart(Action):
    def name(self) -> Text:
        return "action_xem_gio_hang"

    def run(self, dispatcher: CollectingDispatcher,
                tracker: Tracker,
                domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        # print('tracker: ' + tracker.sender_id )
        clientId = tracker.sender_id
        response = {
                'id': clientId ,
                'data': '/cart'
            }
        sio.emit(Const_Rasa_To_Server, response)
        dispatcher.utter_message(text="Đây là giỏ hàng của bạn" )
        print_intent_probabilities(tracker)
        return [] 
class ActionVỉewBill(Action):
    def name(self) -> Text:
        return "action_xem_lich_su"

    def run(self, dispatcher: CollectingDispatcher,
                tracker: Tracker,
                domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        clientId = tracker.sender_id
        response = {
                'id': clientId ,
                'data': '/bill'
            }
        sio.emit(Const_Rasa_To_Server, response)
        dispatcher.utter_message(text="Đây là danh sách đơn hàng của bạn" )
        print_intent_probabilities(tracker)
        return [] 