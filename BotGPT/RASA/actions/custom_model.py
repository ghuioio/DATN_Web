from llama_index import SimpleDirectoryReader,GPTListIndex,GPTVectorStoreIndex,LLMPredictor,PromptHelper,ServiceContext,StorageContext,load_index_from_storage
from llama_index.langchain_helpers.agents import IndexToolConfig, LlamaIndexTool, LlamaToolkit, create_llama_chat_agent
from langchain import OpenAI
from langchain.chat_models import ChatOpenAI
from langchain.agents import Tool
from langchain.chains.conversation.memory import ConversationBufferMemory
import sys, requests, pandas as pd
import os, io
import openai
from dotenv import load_dotenv
openai.api_key = "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"
os.environ["OPENAI_API_KEY"] = openai.api_key
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


index_configs= []
storage_context = StorageContext.from_defaults(persist_dir = 'D:\Code\AAA_github\DATN_Web\BotGPT\ChatGPT_0307_4')
index = load_index_from_storage(storage_context)
query_engine = index.as_query_engine()
tool_config = IndexToolConfig(
    query_engine = query_engine,
    name=f"Chatbot",
    description=f"trả lời câu hỏi liên quan về sách, dữ liệu sách như giá tiền, id, thể loại",
    tool_kwargs={"return_direct": True}
)
index_configs.append(tool_config)
tool = LlamaIndexTool.from_tool_config(tool_config)
toolkit = LlamaToolkit(index_configs =  index_configs)
memory = ConversationBufferMemory(memory_key="chat_history")
# llm=OpenAI(model_name ="text-davinci-003" , temperature=0)
llm=ChatOpenAI(temperature=0)
agent_chain=create_llama_chat_agent(
    toolkit,
    llm,
    memory=memory,
    verbose=True
)

def answerMe(question):
    # storage_context = StorageContext.from_defaults(persist_dir = 'D:\Code\AAA_github\DATN_Web\BotGPT\ChatGPT_0307_4')
    # index = load_index_from_storage(storage_context)
    # query_engine = index.as_query_engine()
    response = query_engine.query(question)
    return response

def chatGPTwithMemory(question):
    return agent_chain.run(input=question)

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

response =  answerMe("có quyển Trên đường băng không?, nếu có hãy chỉ trả lời id của quyển sách, nếu không chỉ trả lời -1")
print(response)
# response =  answerMe("có quyển sách nào tên là năng đoạn kim cương không?, nếu có chỉ trả lời id của quyển sách, nếu không chỉ trả lời -1")
# print(response)