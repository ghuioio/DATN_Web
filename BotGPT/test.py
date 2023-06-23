import requests
import pandas as pd
import io, openai
import random, csv, json, os
from typing import Any, Text, Dict, List
import pandas as pd
import requests
os.environ["OPENAI_API_KEY"] = "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"

class BookAPI(object):

    def __init__(self):
        self.db = pd.read_csv("books.csv")

    def fetch_books(self):
        return self.db.head(10)

    def format_books(self, df, header=True) -> Text:
        return df.to_csv(index=False, header=header)


class ChatGPT(object):

    def __init__(self):
        self.url = "https://api.openai.com/v1/chat/completions"
        self.model = "gpt-3.5-turbo"
        self.headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {os.getenv('OPENAI_API_KEY')}"
        }
        self.prompt = "Answer the following question, based on the data shown. " \
            "Answer in a complete sentence and don't say anything else."

    def ask(self, restaurants, question):
        content  = self.prompt + "\n\n" + restaurants + "\n\n" + question
        body = {
            "model":self.model, 
            "messages":[{"role": "user", "content": content}]
        }
        result = requests.post(
            url=self.url,
            headers=self.headers,
            json=body,
        )
        return result.json()

book_api = BookAPI()
chatGPT = ChatGPT()

books = book_api.fetch_books()
results = book_api.format_books(books)
readable = book_api.format_books(books[['name', 'price']], header=False)
question = 'có quyển Nhà giả kim không?, nếu có hãy chỉ trả lời id của quyển sách, nếu không chỉ trả lời -1'
answer = chatGPT.ask(results, question)
print(answer)
