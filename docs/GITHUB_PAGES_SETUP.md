# GitHub Pages Deployment Guide

Bu dokümantasyon sitesi GitHub Pages üzerinde `docs.rott-ui.tansuk.dev` adresinde yayınlanmaktadır.

## 🚀 Otomatik Deployment

Her `main` veya `development` branch'ine push yapıldığında otomatik olarak deploy edilir.

## ⚙️ GitHub Repository Ayarları

### 1. GitHub Pages'i Aktifleştir

1. GitHub repo'ya git: https://github.com/Tans-uk/Rott-UI
2. **Settings** → **Pages** sekmesine git
3. **Source** kısmında **GitHub Actions** seç

### 2. Workflow Permissions

1. **Settings** → **Actions** → **General**
2. **Workflow permissions** kısmında:
   - ✅ **Read and write permissions** seç
3. **Save** butonuna tıkla

## 🌐 Cloudflare DNS Ayarları

### Adım 1: Cloudflare Dashboard'a Git

1. https://dash.cloudflare.com adresine git
2. `tansuk.dev` domain'ini seç
3. **DNS** → **Records** sekmesine git

### Adım 2: CNAME Kaydı Ekle

Aşağıdaki DNS kaydını ekle:

```
Type:    CNAME
Name:    docs.rott-ui
Content: tans-uk.github.io
Proxy:   🟠 Proxied (turuncu bulut - ÖNERİLEN)
TTL:     Auto
```

**Önemli Notlar:**
- ✅ **Proxied (turuncu bulut)** kullan - Cloudflare CDN ve SSL avantajları
- ❌ **DNS Only (gri bulut)** kullanma - Daha yavaş olur
- `tans-uk.github.io` GitHub username'in (organization name)

### Adım 3: SSL/TLS Ayarları (Önemli!)

1. **SSL/TLS** sekmesine git
2. **Overview** altında encryption mode'u ayarla:
   - ✅ **Full** veya **Full (strict)** seç
   - ❌ **Flexible** kullanma (sonsuz redirect loop olur)

### Adım 4: Always Use HTTPS

1. **SSL/TLS** → **Edge Certificates**
2. **Always Use HTTPS**: ✅ ON

## 🔍 Doğrulama

DNS değişikliği 5-10 dakika içinde yayılır. Kontrol için:

```bash
# DNS kaydını kontrol et
dig docs.rott-ui.tansuk.dev

# Site erişimini test et
curl -I https://docs.rott-ui.tansuk.dev
```

## 📝 İlk Deployment

1. Bu değişiklikleri commit et:
```bash
git add .
git commit -m "feat(docs): setup GitHub Pages deployment with custom domain"
git push origin development
```

2. GitHub Actions'da workflow'un çalıştığını kontrol et:
   - https://github.com/Tans-uk/Rott-UI/actions

3. 2-3 dakika sonra siteniz hazır:
   - https://docs.rott-ui.tansuk.dev

## 🐛 Sorun Giderme

### "404 - Page Not Found"
- GitHub Pages'in aktif olduğunu kontrol et
- Workflow'un başarıyla tamamlandığını kontrol et
- 5-10 dakika bekle (DNS propagation)

### "Too Many Redirects"
- Cloudflare SSL/TLS mode'u **Full** veya **Full (strict)** olmalı
- **Flexible** kullanıyorsan değiştir

### "DNS_PROBE_FINISHED_NXDOMAIN"
- CNAME kaydının doğru olduğunu kontrol et
- DNS propagation için 10-15 dakika bekle
- `dig` komutu ile DNS kaydını kontrol et

### Workflow Hatası
- Repository permissions'ı kontrol et
- `yarn.lock` dosyasının commit edildiğinden emin ol

## 🔄 Güncelleme

Dokümantasyonu güncellemek için:

```bash
cd docs
# Değişikliklerini yap
git add .
git commit -m "docs: update documentation"
git push
```

Otomatik olarak deploy edilecek!

## 📊 Monitoring

- **GitHub Actions**: https://github.com/Tans-uk/Rott-UI/actions
- **Cloudflare Analytics**: Dashboard → Analytics & Logs
- **Page Speed**: https://pagespeed.web.dev/

## 🎯 Avantajlar

✅ **Ücretsiz hosting**
✅ **Otomatik SSL**
✅ **Cloudflare CDN** (hızlı global erişim)
✅ **DDoS koruması**
✅ **Otomatik deployment**
✅ **Sınırsız bandwidth**
