from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routers import health, scanner

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set up CORS middleware
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(health.router, prefix=f"{settings.API_V1_STR}", tags=["health"])
app.include_router(scanner.router, prefix=f"{settings.API_V1_STR}", tags=["scanner"])

@app.get("/")
async def root():
    return {"message": "Welcome to Sustain-ify API"}
