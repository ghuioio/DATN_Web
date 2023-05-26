from llama_index import SimpleDirectoryReader,GPTListIndex,GPTVectorStoreIndex,LLMPredictor,PromptHelper,ServiceContext,StorageContext,load_index_from_storage
from langchain import OpenAI
import sys, requests, pandas as pd
import os, io
import openai
os.environ["OPENAI_API_KEY"] = "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"
# def create_index(path):
#     max_input = 4096
#     tokens = 200
#     chunk_size = 600 #for LLM, we need to define chunk size
#     max_chunk_overlap = 20
    
#     #define prompt
#     promptHelper = PromptHelper(max_input,tokens,max_chunk_overlap,chunk_size_limit=chunk_size)
    
#     #define LLM — there could be many models we can use, but in this example, let’s go with OpenAI model
#     llmPredictor = LLMPredictor(llm=OpenAI(temperature=0, model_name="text-ada-001",max_tokens=tokens))
    
#     #load data — it will take all the .txtx files, if there are more than 1
#     docs = SimpleDirectoryReader(path).load_data()

#     #create vector index
#     service_context = ServiceContext.from_defaults(llm_predictor=llmPredictor,prompt_helper=promptHelper)
        
#     vectorIndex = GPTVectorStoreIndex.from_documents(documents=docs,service_context=service_context)
#     vectorIndex.storage_context.persist(persist_dir = 'ChatGPT')

# def answerMe(question):
#     storage_context = StorageContext.from_defaults(persist_dir = 'ChatGPT')
#     index = load_index_from_storage(storage_context)
#     query_engine = index.as_query_engine()
#     response = query_engine.query(question)
#     return response

# response =  answerMe("Which was the recent release?")
# print(response)
# sheet_url = "1F8K6GNaz0Xo2Q7a9SjRsVZW8L58lBMTOCN9OyTVKye8"

# GOOGLE_SHEET_URL = f"https://docs.google.com/spreadsheets/d/{sheet_url}/export?format=csv&gid=0"
# s = requests.get(GOOGLE_SHEET_URL).content

# proxy_df = pd.read_csv(io.StringIO(s.decode('utf-8')))   

# print(proxy_df)
openai.api_key = "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"

def get_answers_from_chatgpt(user_text):
    # Use OpenAI API to get the response for the given user text and intent
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
# print(openai.api_key[:4] + "..." + openai.api_key[-4:])

print(get_answers_from_chatgpt('what is dog ?'))