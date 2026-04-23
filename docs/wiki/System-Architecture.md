# System Architecture

## Architecture Overview
The PRATHA system follows a modern **three-tier architecture** with a clear separation of concerns between the presentation, application, and AI/Data layers.

### 1. Presentation Layer (Frontend)
*   **Framework**: Next.js (App Router)
*   **Styling**: Vanilla CSS / Tailwind (Modern, responsive design)
*   **Role**: Handles user interaction, camera access for scanning, and data visualization.

### 2. Application Layer (Backend)
*   **Framework**: FastAPI (Python 3.12+)
*   **Role**: Manages API routes, file uploads, logic for processing results, and interfacing with external services.

### 3. Intelligence & Data Layer
*   **AI Engine**: Google Gemini (Multimodal LLM) for processing images and videos.
*   **Data Provider**: Open Food Facts API for structured product information.

## Architecture Diagram
*(Placeholder: Upload your `architecture.png` here and link it in the wiki)*
![System Architecture](https://via.placeholder.com/800x400.png?text=PRATHA+System+Architecture)

## Modules / Components Description
*   **Scanner Module**: Orchestrates the logic between barcode scanning and multimodal scan.
*   **Multimodal Service**: Configures the Gemini API client and handles the structured JSON prompt engineering.
*   **Food Facts Service**: A specialized client to fetch and parse data from the Open Food Facts database.
*   **Response Schema**: Standardized JSON wrappers to ensure consistent communication between frontend and backend.
