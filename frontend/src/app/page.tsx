"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { type ProductScanResult, type ApiResponse } from "@/types/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export default function Home() {
  const [barcode, setBarcode] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProductScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleBarcodeScan = async () => {
    if (!barcode) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`${API_URL}/scan/${barcode}`);
      const data: ApiResponse<ProductScanResult> = await res.json();

      if (data.status === "success" && data.data) {
        setResult(data.data);
      } else {
        setError(data.message || "Product not found or error occurred.");
      }
    } catch (err) {
      setError("Failed to connect to the backend server.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_URL}/scan/multimodal`, {
        method: "POST",
        body: formData,
      });
      const data: ApiResponse<ProductScanResult> = await res.json();

      if (data.status === "success" && data.data) {
        setResult(data.data);
      } else {
        setError(data.message || "Could not analyze the media.");
      }
    } catch (err) {
      setError("Error uploading or processing the file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-green-700 dark:text-green-500">
            Sustain-ify
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Eco-conscious Health & Product Scanner
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Barcode Section */}
          <Card className="border-green-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Barcode Scanner</CardTitle>
              <CardDescription>Enter a product barcode manually</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Input 
                placeholder="Barcode..." 
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleBarcodeScan()}
              />
              <Button onClick={handleBarcodeScan} disabled={loading} className="bg-green-600">
                Scan
              </Button>
            </CardContent>
          </Card>

          {/* Media Upload Section */}
          <Card className="border-blue-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Visual Search</CardTitle>
              <CardDescription>Upload a photo or video of the product</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Input 
                type="file" 
                accept="image/*,video/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="cursor-pointer"
              />
              <Button onClick={handleFileUpload} disabled={loading || !file} variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Upload
              </Button>
            </CardContent>
          </Card>
        </section>

        {loading && (
          <Card className="border-slate-200">
            <CardContent className="py-10 text-center space-y-4">
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600"></div>
              </div>
              <p className="text-slate-500 animate-pulse">
                Gemini is processing your request...
              </p>
            </CardContent>
          </Card>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg shadow-sm">
            {error}
          </div>
        )}

        {result && (
          <Card className="border-green-200 shadow-xl border-t-4 border-t-green-500 animate-in fade-in zoom-in duration-500">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <Badge variant="secondary" className="bg-green-100 text-green-800 border-none">
                    Analysis Result
                  </Badge>
                  <CardTitle className="text-3xl text-slate-900 dark:text-white">
                    {result.product_name}
                  </CardTitle>
                </div>
                <div className="flex gap-2">
                  {result.eco_score && (
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Eco</span>
                      <Badge className={`w-8 h-8 flex items-center justify-center text-lg font-bold rounded-full ${
                        result.eco_score.toLowerCase() === 'a' ? 'bg-green-500' : 
                        result.eco_score.toLowerCase() === 'b' ? 'bg-lime-500' :
                        result.eco_score.toLowerCase() === 'c' ? 'bg-yellow-500' :
                        result.eco_score.toLowerCase() === 'd' ? 'bg-orange-500' : 'bg-red-500'
                      }`}>
                        {result.eco_score.toUpperCase()}
                      </Badge>
                    </div>
                  )}
                  {result.nutriscore && (
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Nutri</span>
                      <Badge className={`w-8 h-8 flex items-center justify-center text-lg font-bold rounded-full ${
                        result.nutriscore.toLowerCase() === 'a' ? 'bg-green-600' : 
                        result.nutriscore.toLowerCase() === 'b' ? 'bg-green-400' :
                        result.nutriscore.toLowerCase() === 'c' ? 'bg-yellow-400' :
                        result.nutriscore.toLowerCase() === 'd' ? 'bg-orange-400' : 'bg-red-400'
                      }`}>
                        {result.nutriscore.toUpperCase()}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              {result.warnings.length > 0 && (
                <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <h3 className="font-bold text-orange-800 flex items-center gap-2 mb-3">
                    ⚠️ Health & Eco Alerts
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.warnings.map((w, i) => (
                      <Badge key={i} variant="outline" className="bg-white border-orange-200 text-orange-700">
                        {w}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    📦 Ingredients & Materials
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {result.ingredients.map((ing, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md border border-slate-200">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-green-700 flex items-center gap-2">
                    ♻️ Upcycling Coach
                  </h3>
                  <ul className="space-y-2">
                    {result.sustainability_tips.length > 0 ? (
                      result.sustainability_tips.map((tip, i) => (
                        <li key={i} className="text-sm text-slate-600 flex gap-2">
                          <span className="text-green-500">✓</span> {tip}
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="text-sm text-slate-600 flex gap-2">
                          <span className="text-green-500 font-bold">Easy:</span> Clean and reuse as desktop storage.
                        </li>
                        <li className="text-sm text-slate-600 flex gap-2">
                          <span className="text-yellow-600 font-bold">Medium:</span> Transform into a hanging bird feeder.
                        </li>
                        <li className="text-sm text-slate-600 flex gap-2">
                          <span className="text-orange-600 font-bold">Hard:</span> Upcycle into a minimalist table lamp base.
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
