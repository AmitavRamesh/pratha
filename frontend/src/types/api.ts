export interface ProductScanResult {
    barcode: string;
    product_name: string;
    eco_score?: string;
    nutriscore?: string;
    ingredients: string[];
    warnings: string[];
    sustainability_tips: string[];
}

export interface ApiResponse<T> {
    status: string;
    message: string;
    data?: T;
    error?: any;
}
