from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "Sustain-ify"
    API_V1_STR: str = "/api/v1"
    
    # CORS
    BACKEND_CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        # Add Vercel production domains here
    ]
    
    # API Keys
    GEMINI_API_KEY: str = ""
    
    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True)

settings = Settings()
