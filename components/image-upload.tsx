"use client"

import type { ChangeEvent } from "react"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ImageUploadProps {
  selectedImage: File | null
  imagePreview: string | null
  onImageChange: (file: File | null) => void
}

export function ImageUpload({ selectedImage, imagePreview, onImageChange }: ImageUploadProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    onImageChange(file)
  }

  const handleRemoveImage = () => {
    onImageChange(null)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Unggah Gambar Kanker Kulit</h2>

      {!imagePreview ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
          <Upload className="h-10 w-10 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500 mb-4">Unggah gambar .jpg atau .png</p>
          <Button
            variant="outline"
            onClick={() => document.getElementById("image-upload")?.click()}
            className="relative"
          >
            Pilih Gambar
            <input
              id="image-upload"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="sr-only"
            />
          </Button>
        </div>
      ) : (
        <div className="relative">
          <div className="relative h-64 w-full overflow-hidden rounded-lg">
            <Image
              src={imagePreview || "/placeholder.svg"}
              alt="Preview gambar kanker kulit"
              fill
              className="object-contain"
            />
          </div>
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
          <p className="mt-2 text-sm text-gray-500 truncate">{selectedImage?.name}</p>
        </div>
      )}
    </div>
  )
}

