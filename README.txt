WARUNG NASI AYAM RINDU — POS PWA V5

Kandungan:
- Skrin utama DINE-IN / TAKEAWAY
- DINE-IN dengan 8 meja; meja lama yang tersimpan dalam data tidak dipadam
- TAKEAWAY memaparkan semua menu makanan serta pilihan minuman bungkus yang sesuai, nama pelanggan, pesanan tambahan dan badge merah sehingga dibayar
- Kaedah pembayaran Cash dan QR Pay berasingan
- Split Bill berasaskan item individu; seret item ke kolum pelanggan atau ketik item untuk memindahkannya pada telefon
- Rekod jualan, laporan, pengurusan menu, Backup/Restore
- Kekal guna storan setempat pada peranti dan boleh berfungsi offline selepas cache siap

CARA KEMAS KINI GITHUB PAGES
1. Buat Backup Data daripada POS lama dahulu jika ada jualan yang mahu disimpan.
2. Buka repo GitHub warung-nasi-ayam-rindu-pos.
3. Muat naik fail dalam folder ini ke root repo, gantikan index.html, app.js, style.css dan sw.js serta fail lain yang sepadan.
4. Commit changes dan tunggu GitHub Pages selesai deploy.
5. Buka semula URL PWA. Jika versi lama masih muncul, tutup aplikasi sepenuhnya dan buka semula selepas internet tersedia supaya service worker versi baharu dimuat turun.

PENTING:
- Jangan padam data browser/app untuk elakkan kehilangan data tempatan.
- Data pada telefon dan PC tidak sync secara automatik.
- Uji dahulu menggunakan salinan/backup dan pastikan aliran bayaran sesuai sebelum digunakan untuk jualan sebenar.
