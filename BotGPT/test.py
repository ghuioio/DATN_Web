import requests
import pandas as pd
import io
import random

def get_answers_from_chatgpt(user_text):
    # Dummy function, replace this with your actual ChatGPT function
    return "ChatGPT response"

def get_answers_from_sheets(intent, entity, user_text):
    # Connect to Google Sheets
    sheet_url = "1F8K6GNaz0Xo2Q7a9SjRsVZW8L58lBMTOCN9OyTVKye8"
    GOOGLE_SHEET_URL = f"https://docs.google.com/spreadsheets/d/{sheet_url}/export?format=csv&gid=0"
    s = requests.get(GOOGLE_SHEET_URL).content
        
    # Read the contents of the URL as a CSV file and store it in a dataframe
    proxy_df = pd.read_csv(io.StringIO(s.decode('utf-8')))        
    print(proxy_df)
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

# Test with dummy data
print(get_answers_from_sheets("intent_name", [{"value": "entity_value"}], "user text"))
