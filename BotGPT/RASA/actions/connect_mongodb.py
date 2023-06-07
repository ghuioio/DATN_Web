from pymongo import MongoClient

client = MongoClient("mongodb+srv://nguyenhungson:sn31101999@cluster0.9ympp.mongodb.net/webbookdatabase?retryWrites=true&w=majority")

db = client['webbookdatabase'] 
collection = db['books'] 
# print(collection.count)
# for i, doc in enumerate(collection.find()):
#     print(doc)
#     if i == 4:  # Stop after printing 5 documents
#         break

