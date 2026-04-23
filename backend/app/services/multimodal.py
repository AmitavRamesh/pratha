import os
import time
from google import genai
from app.core.config import settings
from app.schemas.product import ProductScanResult
import json

client = genai.Client(api_key=settings.GEMINI_API_KEY)

async def process_multimodal_with_gemini(file_path: str, mime_type: str) -> ProductScanResult:
    """
    Process an image or video file using Gemini 3 Flash Preview to extract product details.
    """
    # 1. Upload to Gemini Files API
    # Note: genai SDK handle local file paths directly in upload
    uploaded_file = client.files.upload(file=file_path)
    
    # 2. Wait for processing if it's a video
    if mime_type.startswith("video"):
        while uploaded_file.state.name == "PROCESSING":
            time.sleep(2)
            uploaded_file = client.files.get(name=uploaded_file.name)
        if uploaded_file.state.name == "FAILED":
            raise Exception("Gemini file processing failed")

    # 3. Generate content with structured JSON prompt
    prompt = """
    Analyze this product media. Extract product details in JSON format.
    Required keys:
    - product_name (string)
    - barcode (string or "unknown")
    - eco_score (single letter a-e or null)
    - nutriscore (single letter a-e or null)
    - ingredients (list of strings)
    - warnings (list of helpful health/eco warnings, e.g. "contains palm oil", "high sugar")
    - sustainability_tips (list of strings for upcycling or recycling)

    Return ONLY valid JSON.
    """

    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=[prompt, uploaded_file],
        config={
            "response_mime_type": "application/json",
        }
    )

    # 4. Clean up Files API (optional but good practice)
    # client.files.delete(name=uploaded_file.name)

    data = json.loads(response.text)
    
    return ProductScanResult(
        barcode=data.get("barcode", "unknown"),
        product_name=data.get("product_name", "Unknown Product"),
        eco_score=data.get("eco_score"),
        nutriscore=data.get("nutriscore"),
        ingredients=data.get("ingredients", []),
        warnings=data.get("warnings", []),
        sustainability_tips=data.get("sustainability_tips", [])
    )
