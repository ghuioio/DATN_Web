import os
import io
import openai
import random
import requests
import pandas as pd
from dotenv import load_dotenv
from rasa_sdk import Action, Tracker 
from typing import Any, Text, Dict, List
from rasa_sdk.executor import CollectingDispatcher
# OpenAI API Key

def get_answers_from_chatgpt(user_text):
    # openai.api_key = "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"
    openai.api_key = "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"
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt= user_text,
        max_tokens=1024,
        n=1,
        stop=None,
        temperature=0.5,
    ).choices[0].text

    # Return the response from OpenAI
    return response

class Simple_ChatGPT_Action(Action):

    """Rasa action to parse user text and pulls a corresponding answer 
    from ChatGPT."""

    def name(self) -> Text:
        return "action_gpt_default_fallback" 
        # return "simple_google_sheet_or_chatgpt_action" 

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        # Get the latest user text 
        user_text = tracker.latest_message.get('text')

        # Dispatch the response from OpenAI to the user
        # dispatcher.utter_message('ChatGPT (custom_action): ' + get_answers_from_chatgpt(user_text))
        event_data = {
            "type": "chatgpt_response",
            "data": 'ChatGPT (custom_action): ' + get_answers_from_chatgpt(user_text)
        }

        # Emit the custom event
        dispatcher.utter_message(json_message=event_data)

        return []
    
class Simple_Google_sheet_or_ChatGPT_Action(Action):

    """Rasa action to parse user text and pulls a corresponding answer 
    from google sheet based on the intent and entities.
    If there is no answer in the google sheet, it will use the ChatGPT API"""

    def name(self) -> Text:
        return "simple_google_sheet_or_chatgpt_action" 
        # return "action_gpt_default_fallback" 

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        # Get the latest user text and intent
        user_text = tracker.latest_message.get('text')
        intent = tracker.latest_message.get('intent').get('name')
        entities = tracker.latest_message.get('entities')
        
        # Dispatch the response from OpenAI to the user
        event_data = {
            "type": "chatgpt_response",
            "data": 'Google Sheets (custom_action): ' + str(self.get_answers_from_sheets(intent, entities, user_text))
        }

        # Emit the custom event
        dispatcher.utter_message(json_message=event_data)
        # dispatcher.utter_message('Google Sheets (custom_action): ' + str(self.get_answers_from_sheets(intent, entities, user_text)))

        return []
    
    def get_answers_from_sheets(self, intent, entity, user_text):

        # Connect to Google Sheets
        sheet_url = "1F8K6GNaz0Xo2Q7a9SjRsVZW8L58lBMTOCN9OyTVKye8"

        GOOGLE_SHEET_URL = f"https://docs.google.com/spreadsheets/d/{sheet_url}/export?format=csv&gid=0"
        s = requests.get(GOOGLE_SHEET_URL).content
        
        # Read the contents of the URL as a CSV file and store it in a dataframe
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

        # Return the answer list
        return answer
class ActionHelloWorld(Action):
    def name(self) -> Text:
        return "simple_action_hello_world"
        # return "simple_google_sheet_or_chatgpt_action"

    async def run(self, dispatcher: CollectingDispatcher,
                tracker: Tracker,
                domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        dispatcher.utter_message(text="Hello world! I dont feel so good")
        return []

# user_text = "What is a dog?" 
# print(user_text)
# print(get_answers_from_chatgpt(user_text))