from pydantic import BaseModel
from typing import Optional
from fastapi import UploadFile,  File
   

class Bird_info(BaseModel):
    name:str
    species: str
    description:str
    location:str
    audio_file: UploadFile = File(..., description="Audio file in WAV format")