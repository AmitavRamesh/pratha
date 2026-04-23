from typing import Any, Generic, Optional, TypeVar
from pydantic import BaseModel

T = TypeVar("T")

class BaseResponse(BaseModel, Generic[T]):
    status: str
    message: str
    data: Optional[T] = None
    error: Optional[Any] = None

class ErrorResponse(BaseModel):
    status: str = "error"
    message: str
    error: Optional[Any] = None
