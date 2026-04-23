# Literature Survey

## Summary of Research and Articles

1.  **AI in Food Image Recognition**  
    Recent studies show that Large Multimodal Models (LMMs) like GPT-4V and Gemini outperform traditional CNN-based models in OCR and semantic understanding of food labels due to their vast pre-training on diverse visual contexts.

2.  **Sustainability Informatics**  
    Research highlights the impact of "Eco-Scores" on consumer behavior, suggesting that visual cues (color-coded grades A-E) significantly shift purchasing decisions toward more sustainable options.

3.  **Open Data for Nutrition**  
    The Open Food Facts project has demonstrated the power of crowdsourced data in monitoring the global food supply, providing a standardized JSON API that facilitates the development of third-party health apps.

## Existing Tools/Technologies
*   **Yuka**: Excellent for barcode scanning but lacks multimodal AI for non-database products.
*   **Google Lens**: Great for generic OCR but lacks specialized health/sustainability scoring logic.
*   **Open Food Facts App**: The baseline for database lookups; however, the UI is often cited as dated.

## Comparison Table

| Feature | Yuka | Google Lens | **PRATHA** |
|---------|------|-------------|------------|
| Barcode Lookup | Yes | Limited | **Yes** |
| Multi-Modal AI | No | Yes | **Yes** |
| Health Warnings | Yes | No | **Yes** |
| Eco-Score | Yes | No | **Yes** |
| Sustainability Tips| No | No | **Yes** |
