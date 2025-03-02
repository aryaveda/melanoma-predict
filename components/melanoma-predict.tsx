"use client"

import { useState } from "react"
import { ImageUpload } from "./image-upload"
import { MetadataForm } from "./metadata-form"
import { ResultsDisplay } from "./results-display"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function MelanomaPredict() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [results, setResults] = useState<null | {
    malignant: number
    benign: number
    other: number
  }>(null)

  const handleImageChange = (file: File | null) => {
    setSelectedImage(file)

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setImagePreview(null)
    }
  }

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)

    // Simulate API call with a timeout
    setTimeout(() => {
      // This is where you would integrate with your backend model
      // For now, we'll just set some placeholder results
      setResults({
        malignant: 0.78,
        benign: 0.18,
        other: 0.04,
      })
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="text-center border-b">
        <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900">
          MelanomaPredict: Klasifikasi Kanker Kulit
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-8">
          <ImageUpload selectedImage={selectedImage} imagePreview={imagePreview} onImageChange={handleImageChange} />

          <MetadataForm onSubmit={handleSubmit} isSubmitting={isSubmitting} selectedImage={selectedImage} />

          <ResultsDisplay results={results} />
        </div>
      </CardContent>
    </Card>
  )
}

