def individual_serial(bird_info) -> dict:
    return {
        "id": str(bird_info["_id"]),
        "name": str(bird_info["name"]),
        "species": str(bird_info["species"]),
        "description": str(bird_info["description"]),
        "location" : str(bird_info["location"]),
        "audio_data" : bytes(bird_info["audio_data"])
    }


def list_serial(bird_infos) -> list:
    return [individual_serial(bird_info) for bird_info in bird_infos]