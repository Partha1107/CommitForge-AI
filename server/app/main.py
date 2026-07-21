from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.generate import router as generate_router

app = FastAPI(title="CommitForge AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(generate_router)


@app.get("/")
def home():
    return {
        "message": "CommitForge AI Backend Running 🚀"
    }