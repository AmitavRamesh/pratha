# Methodology

## Step-by-Step Working of System

### 1. Data Input
The user provides input through two main channels:
*   **Barcode Scanning**: Capturing a barcode from a product.
*   **Media Upload**: Uploading an image or a short video of the product's front or back panel.

### 2. Processing Path Selection
If a barcode is detected, the system first queries the **Open Food Facts API**. If the product is found, the system retrieves the verified data.
If no barcode is provided or the API returns a 404, the system triggers the **Multimodal AI Path**.

### 3. AI Analysis (Multimodal Path)
1.  The file (image/video) is uploaded to the **Google Gemini Files API**.
2.  A specialized prompt is sent to the `gemini-3-flash-preview` model, requesting a structured JSON response.
3.  The model analyzes the pixels to identify text, logos, and symbols (like Nutri-Score labels or recycling symbols).

### 4. Data Transformation
The raw data from either path is mapped to a standardized **ProductScanResult** schema, including ingredients, health warnings, and eco-scores.

### 5. Insight Generation
The system applies logic to generate health warnings (e.g., "High sodium") and sustainability tips based on the extracted information.

### 6. Visualization
The results are sent back to the Next.js frontend and displayed in a dashboard format.

## Flowcharts / Diagrams
*(Placeholder: Add your process flowchart here)*
![Methodology Flow](https://via.placeholder.com/600x600.png?text=PRATHA+Process+Flow)
