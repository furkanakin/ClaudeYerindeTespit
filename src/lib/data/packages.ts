export interface PackageAddOn {
  id: string;
  name: string;
  description?: string;
  price: number;
  priceLabel: string;
}

export interface Package {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  forWhom: string[];
  includes: string[];
  deliveryTime: string;
  price: string;
  basePrice: number;
  extraServices?: string[];
  addOns?: PackageAddOn[];
  isPopular?: boolean;
}

export const packages: Package[] = [
  {
    id: "on-analiz",
    title: "Ön Analiz",
    subtitle: "Temel Paket",
    description:
      "Gayrimenkul alım kararınızda riskleri minimuma indiren temel inceleme paketi.",
    forWhom: [
      'Henüz bir yerle ilgilenme aşamasında olan ve "Bu arsa ya da konut değerlendirmeye değer mi?" sorusuna yanıt arayanlar',
      '"Bu yer beklentilerimi karşılıyor mu?" sorusuna hızlı cevap arayanlar',
      "İlan bilgilerini doğrulamak, temel imar bilgilerini ve riskleri hızlıca görmek isteyenler",
      "Bütçesi sınırlı olan ancak alım öncesi bir ön kontrole ihtiyacı olanlar",
    ],
    includes: [
      "Konum ve ulaşım analizi: Çevresel bağlamın değerlendirilmesi",
      "Yakın çevre kullanımı, ulaşım, yoğunluk, fonksiyonlar",
      "Parselin konumu, kadastral yapısı, sınırları ve ada-parsel verisi",
      "Potansiyeller ve Riskler: Sit alanı, koruma alanı, taşkın-heyelan-deprem riskleri",
      "Bulunduğu bölgenin imar durumu-imar planı ve plan notlarının incelenmesi",
    ],
    deliveryTime: "Max 2 iş günü",
    price: "3.850 TL + KDV",
    basePrice: 3850,
    addOns: [
      {
        id: "ek-gayrimenkul",
        name: "Ek Gayrimenkul İncelemesi",
        description: "Birden fazla gayrimenkul incelemesi (her biri için)",
        price: 1200,
        priceLabel: "+1.200 TL",
      },
      {
        id: "online-20dk",
        name: "Online Görüşme - 20 dk",
        description: "Rapor hakkında kısa danışmanlık görüşmesi",
        price: 900,
        priceLabel: "+900 TL",
      },
      {
        id: "online-40dk",
        name: "Online Görüşme - 40 dk",
        description: "Rapor hakkında detaylı danışmanlık görüşmesi",
        price: 1200,
        priceLabel: "+1.200 TL",
      },
      {
        id: "online-60dk",
        name: "Online Görüşme - 60 dk",
        description: "Kapsamlı danışmanlık ve soru-cevap görüşmesi",
        price: 1500,
        priceLabel: "+1.500 TL",
      },
    ],
    extraServices: [
      "Muğla dışı bölgeler için fiyat ayrıca belirlenir",
    ],
  },
  {
    id: "yerinde-analiz",
    title: "Yerinde Analiz",
    subtitle: "Kapsamlı Paket",
    description:
      "Mimari ve teknik detayları içeren ön analiz verilerini sahadaki gözlemlerle birleştiren ve daha kapsamlı hazırlanmış raporlama hizmeti",
    forWhom: [
      "Bir yerle ciddi şekilde ilgilenen ama karar vermekte güçlük yaşayanlar",
      "'Bu arsada ne yapabilirim?' sorusuna net bir cevap arayanlar",
      "İlgilendiği gayrimenkulün imar durumunu, topoğrafyasını, çevresel etmenlerini ayrıntılı öğrenmek isteyenler",
      "Yeri bilinçli bir şekilde görmeden karar vermek istemeyenler",
      "Gayrimenkulü görmeye gidemeyenler, uzman kişiler tarafından bakılmasını isteyenler",
    ],
    includes: [
      "Ön analiz kapsamının tamamı",
      "Saha ziyareti: Mimar ve inşaat mühendisi tarafından yerinde inceleme",
      "Çevresel bağlamın yerinde gözlemi (Yakın çevre fonksiyonları, komşu kullanımlar vb.)",
      "Yerinde fiziksel ölçümler (lazer metre ile)",
      "Yerinde görülen ek potansiyel ve risklerin tespiti",
      "Yerinde görsel belgeleme",
      "Proje incelenmesi (Alıcı tarafından temin edilmelidir)",
      "Online görüşme (60 dk)",
    ],
    deliveryTime: "Saha ziyareti sonrası max 3 iş günü",
    price: "15.000 TL + KDV",
    basePrice: 15000,
    addOns: [
      {
        id: "drone-temel",
        name: "Drone ile Görüntüleme - Temel",
        description: "Havadan genel çekim ve fotoğraflama",
        price: 2500,
        priceLabel: "+2.500 TL",
      },
      {
        id: "drone-kapsamli",
        name: "Drone ile Görüntüleme - Kapsamlı",
        description: "Detaylı havadan video ve fotoğraf çekimi",
        price: 4500,
        priceLabel: "+4.500 TL",
      },
      {
        id: "ek-online-30dk",
        name: "Ek Online Görüşme - 30 dk",
        description: "60 dk üzeri ek danışmanlık görüşmesi",
        price: 1000,
        priceLabel: "+1.000 TL",
      },
      {
        id: "ek-online-60dk",
        name: "Ek Online Görüşme - 60 dk",
        description: "60 dk üzeri detaylı ek danışmanlık görüşmesi",
        price: 1800,
        priceLabel: "+1.800 TL",
      },
      {
        id: "ek-gayrimenkul-yerinde",
        name: "Ek Gayrimenkul İncelemesi",
        description: "Aynı bölgede ek gayrimenkul için yerinde inceleme",
        price: 5000,
        priceLabel: "+5.000 TL",
      },
      {
        id: "hizli-teslimat",
        name: "Hızlı Teslimat",
        description: "Rapor teslimini 1 iş gününe indirin",
        price: 3000,
        priceLabel: "+3.000 TL",
      },
    ],
    extraServices: [
      "Muğla dışı bölgeler için fiyat ayrıca belirlenir",
    ],
    isPopular: true,
  },
  {
    id: "ozel-danismanlik",
    title: "Danışmanlık",
    subtitle: "Premium Danışmanlık",
    description:
      "Standart paketlerin dışında kalan tamamen kişiselleştirilmiş, esnek ve kapsamı birlikte belirlenebilen bir çalışmadır.",
    forWhom: [
      '"Paketlerden birine tam uymuyorum ama özel bir ihtiyacım var" diyenler',
      "Daha kapsamlı, uzun soluklu veya karışık bir karar süreci olanlar",
      "İmar değişikliği ihtimali, özel izinler, ileri düzey mimari/teknik görüş gereken durumlar",
      "Mimari/teknik açıdan daha derin değerlendirme isteyenler",
      "Yatırımcılar (birden fazla seçenek analiz edenler, karşılaştırma ve bütüncül değerlendirmeler isteyenler)",
      "Mimari tasarım and mühendislik hizmetleri isteyenler",
    ],
    includes: [
      "Kişiye özel danışmanlık: yer seçimi, tadilat işleri, mimari ve teknik görüşme",
      "Özel formatta rapor",
      "Yüz yüze / online görüşme",
      "Talep edilirse projelendirme, yerinde uygulama ve raporlama hizmetleri",
    ],
    deliveryTime: "Çalışmanın kapsamına göre belirlenir",
    price: "Kapsama göre belirlenir",
    basePrice: 0,
    addOns: [
      {
        id: "mimari-proje",
        name: "Mimari Proje Çizimi",
        description: "Avan proje veya uygulama projesi hazırlanması",
        price: 0,
        priceLabel: "Teklif alın",
      },
      {
        id: "3d-modelleme",
        name: "3D Modelleme ve Görselleştirme",
        description: "Projenizin 3 boyutlu görselleştirilmesi",
        price: 0,
        priceLabel: "Teklif alın",
      },
      {
        id: "imar-danismanlik",
        name: "İmar Danışmanlığı",
        description: "İmar değişikliği ve izin süreçleri danışmanlığı",
        price: 0,
        priceLabel: "Teklif alın",
      },
      {
        id: "tadilat-danismanlik",
        name: "Tadilat Proje Yönetimi",
        description: "Tadilat sürecinin uçtan uca yönetimi",
        price: 0,
        priceLabel: "Teklif alın",
      },
      {
        id: "coklu-gayrimenkul",
        name: "Çoklu Gayrimenkul Karşılaştırması",
        description: "Birden fazla seçenek için karşılaştırmalı analiz",
        price: 0,
        priceLabel: "Teklif alın",
      },
    ],
  },
];
