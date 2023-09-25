from pydantic import BaseModel
from typing import Optional

   

class Bird_info(BaseModel):
    name:str
    species: str
    description:str
    location:str

