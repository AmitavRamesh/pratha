import httpx
from typing import Optional, Dict, Any

OPEN_FOOD_FACTS_API_URL = "https://world.openfoodfacts.org/api/v2/product"

async def get_open_food_facts(barcode: str) -> Optional[Dict[str, Any]]:
    """
    Fetch product details from Open Food Facts API asynchronously.
    """
    # Use httpx for asynchronous request
    async with httpx.AsyncClient(timeout=10.0) as client:
        try:
            response = await client.get(f"{OPEN_FOOD_FACTS_API_URL}/{barcode}")
            response.raise_for_status()
            data = response.json()
            
            if data.get("status") == 1:
                return data.get("product")
            return None
            
        except httpx.HTTPError as e:
            # Handle API timeouts and null results gracefully
            print(f"Error fetching data from Open Food Facts API: {e}")
            return None
