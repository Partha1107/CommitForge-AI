from app.services.gemini_service import generate


def generate_ai(diff: str):
    return generate(diff)