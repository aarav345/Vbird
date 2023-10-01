from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from models.bird_info import Bird_info
from config.database import collection_name
from schemas.schemas import list_serial, individual_serial
from pymongo.errors import DuplicateKeyError
import os
from typing import List



router = APIRouter()


# for getting the basic bird info
@router.get("/bird_info")
async def get_birds():
    bird_infos = list_serial(collection_name.find())
    return bird_infos


# adding data in database
@router.post("/add_bird", response_model=Bird_info)
async def add_bird_info(bird_info: Bird_info):
    try:
       collection_name.insert_one(dict(bird_info))
        
    except DuplicateKeyError:
        raise HTTPException(status_code=400, detail="Bird with the same name already exists")
    

# case insensitive search
@router.get("/get_bird/{bird_name}", response_model=Bird_info)
async def get_bird_info(bird_name: str):
    # Find the bird data in the MongoDB collection based on the name
    bird_info = collection_name.find_one({ "name": { "$regex": bird_name, "$options": "i" } })

    if bird_info is None:
        raise HTTPException(status_code=404, detail="Bird not found")
    
    return individual_serial(bird_info)



#for receiving audio file from application
@router.post("/process_audio/")
async def process_audio(audio_file: UploadFile):
    with open("uploaded_audio.wav", "wb") as f:
        f.write(audio_file.file.read())

    results = {"result": "data stored in api"}
    return JSONResponse(content=results)



@router.get("/get_all_bird_images", response_model=List[str])
async def get_all_bird_images():
    # List all files in the "image" folder within the "assets" folder
    image_folder_path = os.path.join("./assets/", "image")
    image_files = os.listdir(image_folder_path)

    # Construct URLs for each image file
    image_urls = [f"/get_bird_image/{os.path.splitext(file)[0]}" for file in image_files]

    return image_urls