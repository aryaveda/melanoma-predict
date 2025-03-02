"use client"

import { type FormEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

interface MetadataFormProps {
  onSubmit: (formData: FormData) => void
  isSubmitting: boolean
  selectedImage: File | null
}

export function MetadataForm({ onSubmit, isSubmitting, selectedImage }: MetadataFormProps) {
  const [patientId, setPatientId] = useState("")
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [anatomicalSite, setAnatomicalSite] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!selectedImage) {
      alert("Silakan unggah gambar terlebih dahulu")
      return
    }

    const formData = new FormData()
    formData.append("image", selectedImage)
    formData.append("patientId", patientId)
    formData.append("name", name)
    formData.append("age", age)
    formData.append("gender", gender)
    formData.append("anatomicalSite", anatomicalSite)

    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-lg font-medium text-gray-900">Metadata Pasien</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="patientId">ID Pasien</Label>
          <Input
            id="patientId"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            placeholder="Masukkan ID pasien (opsional)"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Nama Pasien</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama pasien (opsional)"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">Usia</Label>
          <Input
            id="age"
            type="number"
            min="0"
            max="120"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Masukkan usia (opsional)"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Jenis Kelamin</Label>
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger id="gender">
              <SelectValue placeholder="Pilih jenis kelamin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pria">Pria</SelectItem>
              <SelectItem value="Wanita">Wanita</SelectItem>
              <SelectItem value="Tidak Diketahui">Tidak Diketahui</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="anatomicalSite">Lokasi Anatomis</Label>
          <Select value={anatomicalSite} onValueChange={setAnatomicalSite}>
            <SelectTrigger id="anatomicalSite">
              <SelectValue placeholder="Pilih lokasi anatomis" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Kepala/Leher">Kepala/Leher</SelectItem>
              <SelectItem value="Ekstremitas Atas">Ekstremitas Atas</SelectItem>
              <SelectItem value="Ekstremitas Bawah">Ekstremitas Bawah</SelectItem>
              <SelectItem value="Torso">Torso</SelectItem>
              <SelectItem value="Telapak Tangan/Kaki">Telapak Tangan/Kaki</SelectItem>
              <SelectItem value="Mulut/Genital">Mulut/Genital</SelectItem>
              <SelectItem value="Tidak Diketahui">Tidak Diketahui</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting || !selectedImage}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Memproses...
          </>
        ) : (
          "Prediksi"
        )}
      </Button>
    </form>
  )
}

