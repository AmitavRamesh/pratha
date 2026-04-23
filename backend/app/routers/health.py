from fastapi import APIRouter
from app.schemas.response import BaseResponse

router = APIRouter()

@router.get("/health", response_model=BaseResponse)
async def health_check():
    return BaseResponse(
        status="success",
        message="Service is healthy",
        data={"healthy": True}
    )
