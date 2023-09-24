from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from models.bird_info import Bird_info
from config.database import collection_name
from schemas.schemas import list_serial
from typing import Optional
from config.database import fs


router = APIRouter()


@router.get("/")
async def get_birds():
    bird_infos = list_serial(collection_name.find())
    return bird_infos




@router.post("/add_bird/")
async def add_bird(bird_info: Bird_info, audio_file: UploadFile):
    try:
        # Save the uploaded audio file to GridFS
        audio_data = await audio_file.read()
        audio_file_id = fs.put(audio_data, filename=audio_file.filename)

        # Insert the bird information into the MongoDB collection
        bird_info_dict = bird_info.dict()
        bird_info_dict["audio_file_id"] = audio_file_id
        result = collection_name.insert_one(bird_info_dict)

        # Return the newly inserted document's ID
        return {"message": "Bird information added successfully", "bird_id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error adding bird information: {str(e)}")



#for receiving audio file from application
@router.post("/process_audio/")
async def process_audio(audio_file: UploadFile):
    with open("uploaded_audio.wav", "wb") as f:
        f.write(audio_file.file.read())

    results = {"result": "data stored in api"}
    return JSONResponse(content=results)


