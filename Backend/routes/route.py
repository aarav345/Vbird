from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from models.bird_info import Bird_info
from config.database import collection_name, collection_name_audio
from schemas.schemas import list_serial


router = APIRouter()


# for getting the basic bird info
@router.get("/")
async def get_birds():
    bird_infos = list_serial(collection_name.find())
    return bird_infos



# for storing the bird info data in the database  
@router.post("/")
async def post_birds(bird_info: Bird_info):
    collection_name.insert_one(dict(bird_info))


#for receiving audio file from application
@router.post("/process_audio/")
async def process_audio(audio_file: UploadFile):
    with open("uploaded_audio.wav", "wb") as f:
        f.write(audio_file.file.read())

    results = {"result": "data stored in api"}
    return JSONResponse(content=results)