# Aplikasi Deteksi Melanoma

Aplikasi web untuk mendeteksi melanoma menggunakan model EfficientNet-B3 yang dilatih dengan dataset SIIM-ISIC Melanoma Classification.

## Tentang Model

Model yang digunakan adalah EfficientNet-B3 yang dilatih untuk mengklasifikasikan lesi kulit ke dalam 9 kategori:
- BKL (Benign Keratosis-like Lesions)
- DF (Dermatofibroma)
- Melanoma
- Nevus
- SCC (Squamous Cell Carcinoma)
- VASC (Vascular Lesions)
- AK (Actinic Keratosis)
- BCC (Basal Cell Carcinoma)
- Unknown

Model ini dilatih menggunakan teknik augmentasi data dan transfer learning untuk meningkatkan akurasi.

### Fitur Metadata

Model ini mendukung penggunaan metadata pasien untuk meningkatkan akurasi prediksi:
- **Jenis Kelamin**: Pria atau wanita
- **Usia**: Usia pasien dalam tahun
- **Lokasi Anatomi**: Lokasi lesi pada tubuh (kepala/leher, torso, ekstremitas atas/bawah, dll.)

Metadata ini digunakan sebagai fitur tambahan dalam model, yang telah terbukti meningkatkan akurasi prediksi melanoma.

## Prasyarat

- Node.js (versi 18 atau lebih baru)
- Python 3.8 atau lebih baru
- PyTorch dan dependensi lainnya

## Instalasi

1. Clone repositori ini
2. Instal dependensi JavaScript:

```bash
npm install
```

3. Instal dependensi Python:

```bash
pip install torch torchvision pillow python-multipart geffnet
```

## Menyiapkan Model

1. Letakkan file model PyTorch (.pth) Anda di direktori `public/models/` dengan nama `model.pth`.
   - Model ini harus berupa model EfficientNet-B3 yang dilatih dengan kode di `trainingCode.ipynb`
   - Pastikan model memiliki output 9 kelas sesuai dengan kategori lesi kulit yang disebutkan di atas

## Menjalankan Aplikasi

1. Jalankan server pengembangan:

```bash
npm run dev
```

2. Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## Cara Menggunakan

1. Unggah gambar lesi kulit menggunakan form yang disediakan.
2. (Opsional) Masukkan metadata pasien untuk meningkatkan akurasi:
   - Jenis kelamin
   - Usia
   - Lokasi anatomi lesi
3. Klik tombol "Analyze Image" untuk mendapatkan prediksi.
4. Hasil akan ditampilkan dengan:
   - Prediksi utama (Melanoma atau Non-Melanoma)
   - Tingkat kepercayaan prediksi
   - Probabilitas untuk setiap kelas lesi kulit

## Alur Kerja Aplikasi

User → Uploads image + metadata → API processes inputs → Model predicts → Results displayed

1. Pengguna mengunggah gambar lesi kulit dan metadata (opsional)
2. Gambar dan metadata dikirim ke API endpoint
3. API menyimpan gambar sementara dan menjalankan model PyTorch dengan metadata
4. Model melakukan prediksi dengan mempertimbangkan gambar dan metadata
5. Hasil prediksi dikembalikan dan ditampilkan kepada pengguna

## Struktur Proyek

- `app/` - Kode Next.js
- `app/api/predict/` - API endpoint untuk prediksi
- `components/` - Komponen React
- `lib/python/` - Kode Python untuk menjalankan model
- `public/models/` - Direktori untuk menyimpan model PyTorch

## Catatan Penting

Aplikasi ini hanya untuk tujuan pendidikan dan tidak boleh digunakan sebagai pengganti nasihat medis profesional. Selalu konsultasikan dengan dokter kulit untuk diagnosis yang tepat.

## Teknologi yang Digunakan

- Next.js
- React
- PyTorch
- EfficientNet-B3
- TailwindCSS
