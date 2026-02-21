<div align="center">
  <img src="public/favicon.svg" alt="POSBul Logo" width="100"/>
  <h1>POSBul — Yeni Nesil Sanal POS Rehberi</h1>
  <p>Şirketiniz veya bireysel şahıs şirketiniz için en uygun sanal POS firmalarını (PayTR, Iyzico, Sipay vb.) komisyon ve ödeme sürelerine göre anında karşılaştıran modern bir rehber platformudur.</p>

  [![React](https://img.shields.io/badge/React-19.0-blue.svg?logo=react)](https://react.dev/)
  [![Vite](https://img.shields.io/badge/Vite-6.0-646CFF.svg?logo=vite)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC.svg?logo=tailwindcss)](https://tailwindcss.com/)
  [![Zustand](https://img.shields.io/badge/Zustand-5.0-brown.svg?logo=react)](https://github.com/pmndrs/zustand)
</div>

<br/>

## 🌟 Özellikler

- ⚡️ **Gerçek Zamanlı Karşılaştırma:** Gelişmiş Taksit, Ciro ve Kart Ailesine göre dinamik komisyon hesaplayıcısı.
- 🎨 **Modern ve Pürüzsüz Arayüz:** Tamamen Responsive yapı ve *Framer Motion* ile desteklenen pürüzsüz miko-animasyonlar.
- 🔐 **Yönetim Paneli (Admin Portal):** Sağlayıcıların modifiye edilmesi ve Gelen yorumların onaylanması/yayınlanması için Code Splitting mimarisine oturtulmuş gizli `/admin` portalları.
- 📱 **PWA ve Mobil Uyum:** Kurulabilir uygulama mimarisi ile kusursuz mobil görünüm.
- 🚀 **Sıfır Performans Kaybı (%100 Lighthouse):** Lazy Loading Image yapıları, Chunk Ayrımı (Vendor Splitting) ve Render Optimizasyonu (`useDeferredValue`).

## 🛠 Kullanılan Teknolojiler

- **Core:** React 19, TypeScript, Vite
- **Stil & UI:** Tailwind CSS v4, Framer Motion
- **State Management:** Zustand
- **Test:** Vitest, React Testing Library
- **Architecture:** React Router DOM (Lazy Loading, Guarded Custom Layouts)

## 📦 Kurulum ve Çalıştırma

Local ortamınızda projeyi ayağa kaldırmanız için aşağıdaki adımları kullanabilirsiniz:

```bash
# 1. Repoyu bilgisayarınıza klonlayın
git clone https://github.com/kullanici-adiniz/posbul.git

# 2. Klasöre gidin
cd posbul

# 3. Bağımlılıkları yükleyin
npm install

# 4. Geliştirici sunucusunu başlatın
npm run dev
```

Uygulamanız varsayılan olarak `http://localhost:5173` adresinde açılacaktır. 

> **Admin Paneline Erişim:** (Demo) `/admin` rotasına gitmeniz ve `admin@posbul.com` / `admin123` bilgileriyle giriş yapmanız yeterlidir.

## ✅ Testleri Çalıştırmak
Projeye dahil edilen 30'u aşkın birim (unit) testini koşturmak için:
```bash
npm run test
```

## 🏗️ Üretim (Build)
Production seviyesi, son derece optimize edilmiş bir çıktı elde etmek isterseniz:
```bash
npm run build
```
Oluşturulan `dist` kalsörü GitHub Pages, Vercel, Netlify veya dilediğiniz sunucuya (*ör. nginx*) yüklenerek canlıya alınabilir.
