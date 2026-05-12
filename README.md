# INS Arama - Gıda Katkıları Listesi

Bu proje, gıda katkı maddelerinin INS (International Numbering System) numaralarına göre arama yapabileceğiniz basit bir web uygulamasıdır. Teknofest için geliştirilmişti ancak katılmaktan vazgeçildi, bu yüzden GitHub'a yüklenmektedir.

## Özellikler

- **INS Numarası Arama**: INS numarasını girerek katkı maddelerini arayabilirsiniz (örneğin: 100, 150a).
- **Toleranslı Arama**: Tam eşleşme, başlangıç eşleşmesi, substring eşleşmesi ve temizlenmiş karşılaştırma desteklenir.
- **Sayfalama**: Sonuçlar sayfalandırılır, her sayfada 10 sonuç gösterilir.
- **Koyu/Açık Tema**: Kullanıcı tercihine göre tema değiştirilebilir.
- **Responsive Tasarım**: Mobil cihazlarda da kullanılabilir.

## Kullanım

Uygulamaya [k4g9.github.io/ins-arama-gida-katkilari](https://k4g9.github.io/ins-arama-gida-katkilari) adresinden erişebilirsiniz.

1. Arama kutusuna bir INS numarası girin (ör: 100 veya 150a).
2. "Ara" butonuna tıklayın veya Enter tuşuna basın.
3. Sonuçlar tablo halinde görüntülenecektir.
4. Sayfalama butonları ile sonuçlar arasında gezinebilirsiniz.
5. "Temizle" butonu ile aramayı sıfırlayabilirsiniz.
6. Tema değiştirme butonu ile koyu/açık tema arasında geçiş yapabilirsiniz.

## Veri Kaynağı

Veriler, [Wikipedia'nın Gıda Katkıları Listesi](https://tr.wikipedia.org/wiki/Gıda_katkıları_listesi#"E"_Kodlu_Sınıflandırma) sayfasından alınmıştır.

## Dosya Yapısı

```
main/
├── index.html      # Ana HTML dosyası
├── styles.css      # CSS stilleri ve tema değişkenleri
├── app.js          # JavaScript işlevselliği
└── veriler.json       # Gıda katkı maddeleri verisi
```

## Lisans

Bu proje MIT Lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## Geliştirici

- **GitHub**: [k4g9](https://github.com/k4g9)

## Not

Bu uygulama eğitim amaçlıdır ve veri doğruluğu garanti edilmez. Resmi kaynaklardan kontrol edin.
