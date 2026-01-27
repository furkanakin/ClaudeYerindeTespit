export interface PackageIncludeItem {
  title: string;
  details?: string[];
}

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
  whatIncludes?: PackageIncludeItem[];
  deliveryTime: string;
  price: string;
  basePrice: number;
  extraServices?: string[];
  addOns?: PackageAddOn[];
  isPopular?: boolean;
  modalDescription?: string;
  kimlerIcin?: string[];
  addOnsTitle?: string;
}

export const packages: Package[] = [
  {
    id: "on-analiz",
    title: "Ön Analiz",
    subtitle: "Temel Paket",
    description:
      "Ön analiz verilerini yerinde yapılan mimari ve teknik incelemelerle derinleştiren kapsamlı bir değerlendirmedir.",
    modalDescription:
      "**Ön Analiz Paketi**, bir arsa ya da yapının **konumu**, **çevresel bağlamı**, **temel riskleri** ve **imar durumunu** mevcut dijital veriler üzerinden genel çerçevede değerlendirerek, karar sürecinin başlangıcında yol gösterici bir çerçeve sunar.",
    whatIncludes: [
      {
        title: "Konum ve çevresel bağlam",
        details: [
          "Parselin genel konumu ve ulaşım",
          "Yakın çevre kullanımı, yoğunluk ve fonksiyonlar",
        ],
      },
      {
        title: "Potansiyeller ve temel riskler",
        details: [
          "Sit ve koruma alanları ile taşkın, heyelan ve deprem gibi başlıca kısıtlar",
        ],
      },
      {
        title: "İmar durumu incelemesi",
        details: [
          "Dijital erişim olan veriler üzerinden bölgenin plan notlarıyla birlikte imar durumu incelenmesi",
        ],
      },
    ],
    kimlerIcin: [
      '"Bu arsa ya da konut değerlendirmeye değer mi?" sorusuna hızlı yanıt arayanlar',
      "Bir yerin beklentileriyle örtüşüp örtüşmediğini ilk aşamada görmek isteyenler",
      "İlan bilgilerini doğrulayıp temel imar ve riskleri öğrenmek isteyenler",
      "Yerinde inceleme öncesi ölçülü bir ilk değerlendirme isteyenler",
    ],
    forWhom: [
      '"Bu arsa ya da konut değerlendirmeye değer mi?" sorusuna hızlı yanıt arayanlar',
      "Bir yerin beklentileriyle örtüşüp örtüşmediğini ilk aşamada görmek isteyenler",
      "İlan bilgilerini doğrulayıp temel imar ve riskleri öğrenmek isteyenler",
      "Yerinde inceleme öncesi ölçülü bir ilk değerlendirme isteyenler",
    ],
    includes: [
      "Konum ve çevresel bağlam",
      "Potansiyeller ve temel riskler",
      "İmar durumu incelemesi",
    ],
    deliveryTime: "Max. 2 gün",
    price: "4.500 TL + KDV",
    basePrice: 4500,
    addOnsTitle: "Raporla Birlikte Alınabilecek Hizmetler",
    addOns: [
      {
        id: "ek-gayrimenkul",
        name: "Ek Gayrimenkul İncelemesi",
        description: "Aynı bölgede birden fazla gayrimenkul incelemesi için teklif alın. Teslim süresi duruma göre değişiklik gösterebilir.",
        price: 0,
        priceLabel: "Teklif Alın",
      },
      {
        id: "online-30dk",
        name: "Online Görüşme - 30 dk",
        description: "Teslim edilen rapor hakkında kısa soru cevap",
        price: 1000,
        priceLabel: "+1.000 TL + KDV",
      },
      {
        id: "online-60dk",
        name: "Online Görüşme - 60 dk",
        description: "Teslim edilen rapor hakkında kapsamlı görüşme",
        price: 2000,
        priceLabel: "+2.000 TL + KDV",
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
      "Bir arsa ya da yapıyla ilgili karar vermeden önce ön analiz verilerini yerinde yapılan mimari ve teknik incelemelerle derinleştiren kapsamlı bir değerlendirmedir.",
    modalDescription:
      "**Yerinde Analiz Paketi**, ön analiz kapsamında elde edilen verileri **yerinde yapılan mimari ve teknik incelemelerle** birleştirerek, arsa ya da yapının **mevcut durumuna** ilişkin daha kapsamlı bir değerlendirme sunar.",
    whatIncludes: [
      {
        title: "Ön Analiz kapsamının tamamı",
        details: [],
      },
      {
        title: "Saha ziyareti",
        details: [
          "Mimar ve inşaat mühendisi tarafından birlikte yerinde inceleme",
          "Yakın çevre ve komşu kullanımlarının, topoğrafyanın gözlemi",
          "Fiziksel ölçümler ve teknik tespitler",
          "Yerinde incelemeyle tespit edilen ek potansiyel ve riskler",
          "Görsel belgeleme",
        ],
      },
      {
        title: "Proje ve belgelerin incelenmesi ve kontrolü (iletilmesi halinde)",
        details: [],
      },
      {
        title: "Online değerlendirme görüşmesi (60 dk)",
        details: [],
      },
    ],
    kimlerIcin: [
      "Alım öncesinde gayrimenkulün gerçek durumunu ayrıntılı olarak öğrenmek isteyenler",
      "İlan bilgileriyle yetinmeyip yerinde tespitlere göre bilinçli karar vermek isteyenler",
      "Gayrimenkulü bizzat görmeye gidemeyen, ancak almayı düşündüğü gayrimenkulün yerinde incelenmesini isteyenler",
      "Yerinde incelemenin bir mimar ve bir mühendis gözüyle, ister birlikte ister müşteri adına yapılmasını önemseyenler",
    ],
    forWhom: [
      "Alım öncesinde gayrimenkulün gerçek durumunu ayrıntılı olarak öğrenmek isteyenler",
      "İlan bilgileriyle yetinmeyip yerinde tespitlere göre bilinçli karar vermek isteyenler",
      "Gayrimenkulü bizzat görmeye gidemeyen, ancak almayı düşündüğü gayrimenkulün yerinde incelenmesini isteyenler",
      "Yerinde incelemenin bir mimar ve bir mühendis gözüyle, ister birlikte ister müşteri adına yapılmasını önemseyenler",
    ],
    includes: [
      "Ön Analiz kapsamının tamamı",
      "Saha ziyareti",
      "Proje ve belgelerin incelenmesi ve kontrolü",
      "Online değerlendirme görüşmesi (60 dk)",
    ],
    deliveryTime: "Saha ziyareti gerçekleştikten sonra max. 3-4 iş günü",
    price: "15.000 TL + KDV",
    basePrice: 15000,
    addOnsTitle: "Raporla Birlikte Alınabilecek Hizmetler",
    addOns: [
      {
        id: "drone-temel",
        name: "Drone ile Görüntüleme - Temel",
        description: "Havadan genel çekim ve fotoğraflama",
        price: 0,
        priceLabel: "Teklif Alın",
      },
      {
        id: "drone-kapsamli",
        name: "Drone ile Görüntüleme - Kapsamlı",
        description: "Havadan detaylı fotoğraf ve video çekimi",
        price: 0,
        priceLabel: "Teklif Alın",
      },
      {
        id: "drone-haritalama",
        name: "Drone ile Haritalama, Ortofoto, 3D Model (Sınırlı)",
        description: "Parselin sınırlarını, eğimini, ilişkilerini daha net görmek için ölçüm hassasiyeti 'ön değerlendirme' seviyesinde ortofoto veya basit 3D yüzey modeli",
        price: 0,
        priceLabel: "Teklif Alın",
      },
      {
        id: "ek-gayrimenkul-yerinde",
        name: "Ek Gayrimenkul İncelemesi",
        description: "Aynı bölgede birden fazla gayrimenkul incelemesi için teklif alın. Teslim süresi duruma göre değişiklik gösterebilir.",
        price: 0,
        priceLabel: "Teklif Alın",
      },
      {
        id: "hizli-teslimat",
        name: "Hızlı Teslimat",
        description: "Rapor teslimini saha ziyareti sonrası 2 iş gününe indirin.",
        price: 7000,
        priceLabel: "+7.000 TL + KDV",
      },
    ],
    extraServices: [
      "Muğla dışı bölgeler için fiyat ayrıca belirlenir",
    ],
    isPopular: true,
  },
  {
    id: "ozel-danismanlik",
    title: "Premium Analiz / Danışmanlık",
    subtitle: "Premium Danışmanlık",
    description:
      "Standart paketlerin dışında kalan tamamen kişiselleştirilmiş, esnek ve kapsamı birlikte belirlenebilen bir çalışmadır.",
    modalDescription:
      "**Premium Analiz / Danışmanlık Paketi**, standart paketlerin ötesinde, belirli bir gayrimenkul ya da duruma özgü ihtiyaçlar doğrultusunda kurgulanan; **kişiye özel**, **derinleştirilmiş** ve **çok adımlı** bir değerlendirme ve danışmanlık hizmetidir.",
    whatIncludes: [
      {
        title: "İhtiyaca göre kurgulanan kişiye özel danışmanlık süreci",
        details: [],
      },
      {
        title: "Gayrimenkule ve senaryoya özgü derinleştirilmiş mimari ve teknik incelemeler",
        details: [],
      },
      {
        title: "Planlama, imar ve mevzuat başlıklarında detaylı değerlendirmeler",
        details: [],
      },
      {
        title: "Sürece yayılmış yüz yüze ve/veya online değerlendirme görüşmeleri",
        details: [],
      },
      {
        title: "Talep edilmesi halinde, mimari tasarım ve kontrol hizmetleri",
        details: [],
      },
    ],
    kimlerIcin: [
      '"Standart paketler benim ihtiyacıma tam uymuyor" diyen ve duruma özel bir çalışma arayanlar',
      "Daha kapsamlı, uzun soluklu veya karmaşık bir karar süreci olanlar (imar değişikliği ihtimali, özel izinler, ileri düzey mimari/teknik görüş gerektiren durumlar gibi)",
      "Mimari ve teknik açıdan daha derinlemesine değerlendirme ihtiyacı olanlar",
      "Birden fazla seçenek arasında karşılaştırmalı ve bütüncül analiz isteyenler",
      "Yerinde Analiz paketinin ötesinde daha detaylı saha çalışması gerektiren durumlar",
      "Yer seçimi konusunda danışmanlık isteyenler",
      "Mimari tasarım ve mühendislik hizmetleri talep edenler",
    ],
    forWhom: [
      '"Standart paketler benim ihtiyacıma tam uymuyor" diyen ve duruma özel bir çalışma arayanlar',
      "Daha kapsamlı, uzun soluklu veya karmaşık bir karar süreci olanlar",
      "Mimari ve teknik açıdan daha derinlemesine değerlendirme ihtiyacı olanlar",
      "Birden fazla seçenek arasında karşılaştırmalı ve bütüncül analiz isteyenler",
      "Yer seçimi konusunda danışmanlık isteyenler",
      "Mimari tasarım ve mühendislik hizmetleri talep edenler",
    ],
    includes: [
      "Kişiye özel danışmanlık süreci",
      "Derinleştirilmiş mimari ve teknik incelemeler",
      "Planlama, imar ve mevzuat değerlendirmeleri",
      "Yüz yüze ve/veya online görüşmeler",
      "Mimari tasarım ve kontrol hizmetleri (talep halinde)",
    ],
    deliveryTime: "Çalışmanın kapsamına göre belirlenir",
    price: "Kapsama göre belirlenir",
    basePrice: 0,
    addOnsTitle: "Danışmanlıklar ve Hizmetler",
    addOns: [
      {
        id: "mimari-proje",
        name: "Mimari Proje Çizimi",
        description: "Avan proje hazırlanması",
        price: 0,
        priceLabel: "Teklif Alın",
      },
      {
        id: "uygulama-kontrolluk",
        name: "Uygulama Kontrollüğü",
        description: "Uygulama sürecinin proje ve teknik kriterlere uygunluğunun yerinde takibi ve raporlaması",
        price: 0,
        priceLabel: "Teklif Alın",
      },
      {
        id: "3d-modelleme",
        name: "3D Modelleme ve Görselleştirme",
        description: "Projenizin 3 boyutlu görselleştirilmesi",
        price: 0,
        priceLabel: "Teklif Alın",
      },
      {
        id: "imar-danismanlik",
        name: "İmar Danışmanlığı",
        description: "İmar değişikliği ve izin süreçleri danışmanlığı",
        price: 0,
        priceLabel: "Teklif Alın",
      },
      {
        id: "tadilat-danismanlik",
        name: "Tadilat Proje Yönetimi",
        description: "Tadilat sürecinin proje ve teknik kriterlere uygunluğunun yerinde takibi ve raporlaması",
        price: 0,
        priceLabel: "Teklif Alın",
      },
      {
        id: "coklu-gayrimenkul",
        name: "Çoklu Gayrimenkul Karşılaştırması",
        description: "Birden fazla seçenek için karşılaştırmalı analiz",
        price: 0,
        priceLabel: "Teklif Alın",
      },
    ],
  },
];
