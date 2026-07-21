from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.generate import router as generate_router

app = FastAPI(
    title="CommitForge AI API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",

        # Replace this after deploying your frontend
        "https://your-project-name.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(generate_router)


@app.get("/")
def root():
    return {
        "status": "online",
        "service": "CommitForge AI API",
        "version": "1.0.0"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }