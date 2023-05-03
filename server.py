from fastapi import FastAPI, Request
from pydantic import BaseModel
import requests
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
API_ENDPOINT = "https://api.openai.com/v1/chat/completions"

class ChatGPTRequest(BaseModel):
    prompt: str
    key:str


@app.post("/chatgpt")
async def chatgpt(request: Request, chat_gpt_request: ChatGPTRequest):
    print(f"Received request: {request.method} {request.url.path}")

    prompt = chat_gpt_request.prompt
    key = chat_gpt_request.key
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {key}",
    }

    data = {
       
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": prompt}]
  
    }

    response = requests.post(API_ENDPOINT, headers=headers, json=data)

    if response.status_code == 200:
        response_data = response.json()
        return {"response": response_data['choices'][0]['message']["content"]}
    else:
        return {"error": "Unable to generate a response."}, 500
