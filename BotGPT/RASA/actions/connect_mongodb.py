from pymongo import MongoClient
import Levenshtein
import jellyfish
client = MongoClient("mongodb+srv://nguyenhungson:sn31101999@cluster0.9ympp.mongodb.net/webbookdatabase?retryWrites=true&w=majority")

db = client['webbookdatabase'] 
# Function to compute the Levenshtein distance between two strings
def levenshtein_distance(s1, s2):
    return Levenshtein.distance(s1, s2)

def jarowinkler_distance(s1, s2):
    return jellyfish.jaro_winkler_similarity(s1, s2)

def find_book_by_title(book_title, distance_threshold = 0.8):
    collection = db['books']
    for book in collection.find():
        title = book.get('name', '')
        distance = jarowinkler_distance(title, book_title)
        print(distance)
        if distance >= distance_threshold:
            print(distance, book['name'])
            return book['_id']
    return -1
def find_book_by_category(text):
    max_similarity = 100
    max_similarity_category_id = ''
    collection = db['categories']
    for category in collection.find():
        nameCategory = category.get('name', '')
        distance = jellyfish.damerau_levenshtein_distance(text, nameCategory)
        # print(distance, nameCategory)
        if distance < max_similarity:
            max_similarity = distance
            max_similarity_category_id = category['idCategory']
    return max_similarity_category_id

# response = find_book_by_title('trên đường băng')
# print(response)
# str1 = 'năng đoạn kim cương'
# str2 = 'Năng Đoạn Kim Cương (Tái Bản 2020)'
# jw_distance = jellyfish.jaro_winkler_similarity(str1, str2)
# print(jw_distance)
# print(find_book_by_category('sách sách y học'))


