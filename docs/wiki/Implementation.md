# Implementation

## Project Setup Steps

### Backend Setup
1.  Navigate to the `backend` folder.
2.  Create a virtual environment: `python -m venv venv`.
3.  Install dependencies: `pip install -r requirements.txt`.
4.  Configure `.env`: Add `GEMINI_API_KEY`.
5.  Run server: `uvicorn main:app --reload`.

### Frontend Setup
1.  Navigate to the `frontend` folder.
2.  Install packages: `npm install`.
3.  Run development server: `npm run dev`.

## Code Structure

```bash
PRATHA/
├── backend/
│   ├── app/
│   │   ├── core/      # Config and settings
│   │   ├── routers/   # API endpoints (scanner.py)
│   │   ├── services/  # Business logic (multimodal.py, food_facts.py)
│   │   └── schemas/   # Pydantic models
│   └── main.py
└── frontend/
    ├── src/
    │   ├── app/       # Pages and routing
    │   └── components/# UI components
    └── public/        # Static assets
```

## Key Code Snippets

### Multimodal AI Analysis (backend/app/services/multimodal.py)
```python
async def process_multimodal_with_gemini(file_path: str, mime_type: str) -> ProductScanResult:
    # 1. Upload to Gemini
    uploaded_file = client.files.upload(file=file_path)
    
    # 2. Generate structured analysis
    prompt = "Analyze this product media... Extract product details in JSON format."
    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=[prompt, uploaded_file],
        config={"response_mime_type": "application/json"}
    )
    return parse_response(response.text)
```

## Integration Details
The system integrates frontend and backend via standard RESTful calls. The Next.js frontend uses `fetch` to send FormData (for images) or Barcode strings to the FastAPI endpoints.

## Repository Link
[https://github.com/AmitavRamesh/pratha](https://github.com/AmitavRamesh/pratha)
