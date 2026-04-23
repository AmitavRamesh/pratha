# Introduction

## Background of the Project
With the rise of lifestyle diseases and climate change concerns, people are becoming more conscious of what they consume. However, interpreting technical product labels remains a barrier for the average consumer. PRATHA aims to bridge this gap by using AI to "read" and "explain" products in a human-centric way.

## Motivation
The motivation behind PRATHA is to democratize access to health and environmental data. By simplifying the interaction to a simple scan or photo, we empower users to make better decisions every day without needing specialized knowledge in nutrition or environmental science.

## Existing System
Existing systems like Yuka or MyFitnessPal primarily rely on massive barcode databases. While effective for common products, they often fail when:
1.  A product is new and not in the database.
2.  The user only has a photo of the ingredients list but no barcode.
3.  The information is outdated or incomplete.

## Limitations of Existing Systems
*   **Database Dependency**: If the barcode isn't found, the app is useless.
*   **Static Data**: They don't analyze the actual visual evidence on the package.
*   **Limited Scope**: Most focus either on health OR environment, rarely both with deep AI analysis.

## Proposed Solution
PRATHA proposes a **Multimodal Hybrid Approach**. It combines traditional database lookups (Open Food Facts) with state-of-the-art Generative AI (Google Gemini). If a barcode isn't found, Gemini can still analyze the physical label to extract ingredients, health risks, and sustainability data, ensuring a high success rate and deeper insights.
