# 🌐 Cloudflare DNS Kurulum Rehberi

Bu rehber `docs.rott-ui.tansuk.dev` domain'ini GitHub Pages'e yönlendirmek için gerekli Cloudflare ayarlarını içerir.

## 📋 Hızlı Özet

```
Domain:  docs.rott-ui.tansuk.dev
Target:  tans-uk.github.io
Type:    CNAME
Proxy:   ✅ Proxied (Turuncu Bulut)
```

---

## 🎯 Adım Adım Kurulum

### 1️⃣ Cloudflare Dashboard'a Giriş

1. https://dash.cloudflare.com adresine git
2. **tansuk.dev** domain'ini seç
3. Sol menüden **DNS** → **Records** sekmesine tıkla

### 2️⃣ CNAME Kaydı Ekle

**"Add record"** butonuna tıkla ve şu bilgileri gir:

| Alan | Değer | Açıklama |
|------|-------|----------|
| **Type** | `CNAME` | Record tipi |
| **Name** | `docs.rott-ui` | Subdomain (otomatik olarak .tansuk.dev eklenir) |
| **Target** | `tans-uk.github.io` | GitHub Pages adresi |
| **Proxy status** | 🟠 **Proxied** | Turuncu bulut (ÖNERİLEN) |
| **TTL** | `Auto` | Otomatik |

**"Save"** butonuna tıkla.

### 3️⃣ SSL/TLS Ayarları (ÇOK ÖNEMLİ!)

1. Sol menüden **SSL/TLS** sekmesine git
2. **Overview** sayfasında:

```
Encryption mode: Full (strict) ✅
```

veya

```
Encryption mode: Full ✅
```

**❌ ASLA "Flexible" seçme!** (Sonsuz redirect loop olur)

### 4️⃣ Always Use HTTPS

1. **SSL/TLS** → **Edge Certificates** sekmesine git
2. **Always Use HTTPS** ayarını **ON** yap: ✅

---

## ✅ Doğrulama

### Terminal'den Kontrol

```bash
# DNS kaydını kontrol et
dig docs.rott-ui.tansuk.dev

# Beklenen çıktı:
# docs.rott-ui.tansuk.dev. 300 IN CNAME tans-uk.github.io.
```

```bash
# HTTPS erişimini test et
curl -I https://docs.rott-ui.tansuk.dev

# Beklenen: HTTP/2 200 OK
```

### Tarayıcıdan Kontrol

1. https://docs.rott-ui.tansuk.dev adresine git
2. Yeşil kilit simgesini gör ✅
3. Site yüklenmeli

---

## 🔧 İleri Seviye Ayarlar (Opsiyonel)

### Page Rules (Performans Optimizasyonu)

**SSL/TLS** → **Page Rules** → **Create Page Rule**

```
URL: docs.rott-ui.tansuk.dev/*

Settings:
- Cache Level: Cache Everything
- Browser Cache TTL: 4 hours
- Edge Cache TTL: 7 days
```

### Caching (Hız Optimizasyonu)

**Caching** → **Configuration**

```
Caching Level: Standard
Browser Cache TTL: Respect Existing Headers
```

### Security (Güvenlik)

**Security** → **Settings**

```
Security Level: Medium
Challenge Passage: 30 minutes
Browser Integrity Check: ON
```

---

## 🐛 Sorun Giderme

### Problem: "Too Many Redirects"

**Çözüm:**
1. **SSL/TLS** → **Overview**
2. Encryption mode'u **Full** veya **Full (strict)** yap
3. **Flexible** kullanıyorsan değiştir
4. 5 dakika bekle

### Problem: "DNS_PROBE_FINISHED_NXDOMAIN"

**Çözüm:**
1. CNAME kaydının doğru olduğunu kontrol et:
   - Name: `docs.rott-ui`
   - Target: `tans-uk.github.io`
2. DNS propagation için 10-15 dakika bekle
3. Tarayıcı cache'ini temizle (Cmd+Shift+R)

### Problem: "404 Not Found"

**Çözüm:**
1. GitHub Pages'in aktif olduğunu kontrol et
2. CNAME dosyasının `docs/static/CNAME` içinde olduğunu kontrol et
3. GitHub Actions workflow'unun başarıyla tamamlandığını kontrol et
4. 5-10 dakika bekle

### Problem: "Certificate Error"

**Çözüm:**
1. Cloudflare Proxy'nin **Proxied** (turuncu bulut) olduğunu kontrol et
2. **SSL/TLS** → **Edge Certificates** → **Always Use HTTPS**: ON
3. 5-10 dakika bekle (certificate provisioning)

---

## 📊 DNS Propagation Kontrolü

Online araçlarla DNS yayılımını kontrol et:

- https://www.whatsmydns.net/#CNAME/docs.rott-ui.tansuk.dev
- https://dnschecker.org/#CNAME/docs.rott-ui.tansuk.dev

Tüm dünyada yeşil ✅ görene kadar bekle (5-10 dakika).

---

## 🎉 Tamamlandı!

Cloudflare ayarları tamamlandı! Şimdi:

1. ✅ DNS kaydı eklendi
2. ✅ SSL/TLS yapılandırıldı
3. ✅ HTTPS zorunlu hale getirildi
4. ✅ Cloudflare CDN aktif

Site şu adreste yayında: **https://docs.rott-ui.tansuk.dev**

---

## 📞 Yardım

Sorun yaşarsan:
1. Bu dokümandaki sorun giderme bölümünü kontrol et
2. GitHub Actions loglarını kontrol et
3. Cloudflare Analytics'i kontrol et
