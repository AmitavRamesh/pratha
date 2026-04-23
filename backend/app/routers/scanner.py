import os
import shutil
from fastapi import APIRouter, HTTPException, UploadFile, File
from app.services.food_facts import get_open_food_facts
from app.services.multimodal import process_multimodal_with_gemini
from app.schemas.response import BaseResponse
from app.schemas.product import ProductScanResult

router = APIRouter()

@router.get("/scan/{barcode}", response_model=BaseResponse[ProductScanResult])
async def scan_product(barcode: str):
    product_data = await get_open_food_facts(barcode)
    
    if not product_data:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Extract relevant fields
    result = ProductScanResult(
        barcode=barcode,
        product_name=product_data.get("product_name", "Unknown Product"),
        eco_score=product_data.get("ecoscore_grade"),
        nutriscore=product_data.get("nutrition_grades"),
        ingredients=product_data.get("ingredients_text", "").split(", ")
    )
    
    # Basic warning logic (example for hypertension)
    # In a real app, this would check user profile
    sodium_val = product_data.get("nutriments", {}).get("sodium_100g", 0)
    if sodium_val > 0.5:
        result.warnings.append("High sodium content detected!")

    return BaseResponse(
        status="success",
        message="Product scanned successfully",
        data=result
    )

@router.post("/scan/multimodal", response_model=BaseResponse[ProductScanResult])
async def scan_multimodal(file: UploadFile = File(...)):
    # Create temp directory if it doesn't exist
    temp_dir = "temp_uploads"
    os.makedirs(temp_dir, exist_ok=True)
    
    file_path = os.path.join(temp_dir, file.filename)
    
    try:
        # Save uploaded file locally temporarily
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Process with Gemini
        result = await process_multimodal_with_gemini(file_path, file.content_type)
        
        return BaseResponse(
            status="success",
            message="Media analyzed successfully",
            data=result
        )
        
    except Exception as e:
        print(f"Error in multimodal scan: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Cleanup
        if os.path.exists(file_path):
            os.remove(file_path)
