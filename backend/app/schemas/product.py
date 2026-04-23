from typing import List, Optional
from pydantic import BaseModel

class UserProfile(BaseModel):
    name: str
    medical_conditions: List[str] # e.g. ["hypertension", "diabetes"]
    allergies: List[str]
    sustainability_priority: str # e.g. "low-carbon", "plastic-free"

class ProductScanResult(BaseModel):
    barcode: str
    product_name: str
    eco_score: Optional[str] = None
    nutriscore: Optional[str] = None
    ingredients: List[str] = []
    warnings: List[str] = []
    sustainability_tips: List[str] = []
