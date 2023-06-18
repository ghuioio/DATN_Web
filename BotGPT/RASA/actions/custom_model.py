from llama_index import SimpleDirectoryReader,GPTListIndex,GPTVectorStoreIndex,LLMPredictor,PromptHelper,ServiceContext,StorageContext,load_index_from_storage
from langchain import OpenAI
import sys, requests, pandas as pd
import os, io
import openai
from dotenv import load_dotenv
os.environ["OPENAI_API_KEY"] = "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"
def create_index(path):
    max_input = 4096
    tokens = 200
    chunk_size = 600 #for LLM, we need to define chunk size
    max_chunk_overlap = 20
    
    #define prompt
    promptHelper = PromptHelper(max_input,tokens,max_chunk_overlap,chunk_size_limit=chunk_size)
    
    #define LLM — there could be many models we can use, but in this example, let’s go with OpenAI model
    llmPredictor = LLMPredictor(llm=OpenAI(temperature=0, model_name="text-ada-001",max_tokens=tokens))
    
    #load data — it will take all the .txtx files, if there are more than 1
    docs = SimpleDirectoryReader(path).load_data()

    #create vector index
    service_context = ServiceContext.from_defaults(llm_predictor=llmPredictor,prompt_helper=promptHelper)
        
    vectorIndex = GPTVectorStoreIndex.from_documents(documents=docs,service_context=service_context)
    vectorIndex.storage_context.persist(persist_dir = 'ChatGPT')

def answerMe(question):
    storage_context = StorageContext.from_defaults(persist_dir = 'D:\Code\AAA_github\DATN_Web\BotGPT\ChatGPT_1206')
    index = load_index_from_storage(storage_context)
    query_engine = index.as_query_engine()
    response = query_engine.query(question)
    return response

def build_storage(data_dir):
    documents = SimpleDirectoryReader(data_dir).load_data()

    index = GPTVectorStoreIndex.from_documents(documents)
    index.storage_context.persist()
    return index

def read_from_storage(persist_dir):
    storage_context = StorageContext.from_defaults(persist_dir=persist_dir)
    return load_index_from_storage(storage_context)

def adding_data_to_GPT():
    load_dotenv()
    persist_dir = "./storage"
    data_dir = "./data"
    index = None
    if os.path.exists(persist_dir):
        index = read_from_storage(persist_dir)
    else:
        index = build_storage(data_dir)
        query_engine = index.as_query_engine()

    response = query_engine.query(
        "When did Ran Bar-Zik create his first pull request in CyberArk?"
    )
    print(response)
# response =  answerMe("có quyển  Năng đoạn kim cương không?, nếu có hãy chỉ trả lời id của quyển sách, nếu không chỉ trả lời -1")
# print(response)
# print(extract_entities('có bán quyển Chết vì chứng khoán ko?'))
response =  answerMe("cuốn Kinh Doanh Thời Trang Thành Công Từ A-Z đắt nhất")
print(response)