from google import genai
from app.core.config import settings

client = genai.Client(api_key=settings.GEMINI_API_KEY)

async def generate_upcycling_guide(material: str):
    prompt = f"""
    Create a structured 3-tier upcycling guide for an item made of {material}.
    Levels: Easy, Medium, Hard.
    Format: JSON with keys 'easy', 'medium', 'hard'.
    Each level should have a 'title' and 'instructions'.
    """
    
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt,
        config={
            "response_mime_type": "application/json",
        }
    )
    return response.text
