"use client"

import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"

interface ResultsDisplayProps {
  results: {
    malignant: number
    benign: number
    other: number
  } | null
}

export function ResultsDisplay({ results }: ResultsDisplayProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Hasil Prediksi</h2>

      {!results ? (
        <div className="text-center py-8 text-gray-500">Hasil akan ditampilkan di sini</div>
      ) : (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Ganas</span>
                <span className="font-bold">{(results.malignant * 100).toFixed(2)}%</span>
              </div>
              <Progress value={results.malignant * 100} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Jinak</span>
                <span className="font-bold">{(results.benign * 100).toFixed(2)}%</span>
              </div>
              <Progress value={results.benign * 100} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Lainnya</span>
                <span className="font-bold">{(results.other * 100).toFixed(2)}%</span>
              </div>
              <Progress value={results.other * 100} className="h-2" />
            </div>

            <div className="pt-4 border-t mt-4">
              <div className="text-sm text-gray-500">
                <p className="font-medium">Interpretasi:</p>
                <p className="mt-1">
                  {results.malignant > 0.5
                    ? "Kemungkinan besar lesi ini ganas. Disarankan untuk konsultasi medis segera."
                    : "Kemungkinan besar lesi ini jinak. Tetap disarankan untuk konsultasi medis untuk konfirmasi."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="text-xs text-gray-500 text-center mt-4">
        <p>
          Catatan: Hasil prediksi ini hanya untuk tujuan demonstrasi dan tidak menggantikan diagnosis medis profesional.
        </p>
      </div>
    </div>
  )
}

