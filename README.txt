WARUNG NASI AYAM RINDU — POS PWA V3

KEMAS KINI V3:
- Tambah variasi minuman Sweet Treats, Hot Drinks, Cold Drinks dan Extra Joss.
- Cawan dan Bungkus dipaparkan sebagai pilihan menu berasingan dengan harga masing-masing.
- Pilihan meja diselaraskan kepada Meja 01 hingga Meja 08.
- Kekalkan Split Bill, Cash/QR Pay, rekod jualan, laporan dan backup/restore.
- Data sedia ada pada peranti dikekalkan; menu minuman baharu ditambah secara automatik selepas kemas kini.

CARA KEMAS KINI GITHUB PAGES:
1. Simpan backup POS dahulu menggunakan butang Backup Data.
2. Ekstrak ZIP ini. Buka folder pospwa.
3. Muat naik fail di dalam folder pospwa ke repositori GitHub yang sama, gantikan fail lama.
4. Pastikan index.html, app.js, style.css, sw.js, manifest.webmanifest, icon-192.png dan icon-512.png berada di root repositori (bukan di dalam folder tambahan).
5. Commit changes dan tunggu GitHub Pages selesai diterbitkan.
6. Buka semula pautan POS. Jika versi lama masih muncul, tutup app sepenuhnya dan buka semula; service worker V3 akan mengambil cache baharu.

PENTING:
- POS menyimpan data pada peranti/browser masing-masing; tiada sync automatik ke PC.
- Simpan backup sebelum kemas kini sebagai langkah berjaga-jaga.
