from pymongo.mongo_client import MongoClient
from gridfs import GridFS


client = MongoClient("mongodb+srv://admin:Aaswon1%4034@cluster0.umdlv7g.mongodb.net/?retryWrites=true&w=majority")

db = client.bird_info

collection_name = db["bird_collection"]

# Create a GridFS object for storing binary data (e.g., audio files)
fs = GridFS(db)