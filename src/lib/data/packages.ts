export interface Package {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  forWhom: string[];
  includes: string[];
  deliveryTime: string;
  price: string;
  extraServices?: string[];
  isPopular?: boolean;
}

export const packages: Package[] = [
  {
    id: "on-analiz",
    title: "Ön Analiz",
    subtitle: "Temel Paket",
    description:
      "Gayrimenkul alımında karar sürecinin ilk adımıdır. Bir yerle ilgili uygunluk, potansiyel ve riskleri masa başı araştırmayla temel verilerle değerlendirir.",
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
    extraServices: [
      "Birden fazla gayrimenkul incelemesi: gayrimenkul başına +1.200 TL",
      "Online görüşme: 20 dk - 900 TL, 40 dk - 1.200 TL, 60 dk - 1.500 TL",
      "Muğla dışı bölgeler için fiyat ayrıca belirlenir",
    ],
  },
  {
    id: "yerinde-analiz",
    title: "Yerinde Analiz",
    subtitle: "Kapsamlı Paket",
    description:
      "Ön analiz verilerini sahadaki gözlemlerle birleştirir ve daha somut bir karar zemini sunar.",
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
    extraServices: [
      "Drone ile görüntüleme: Çalışmanın kapsamına göre fiyatlandırılır",
      "60 dk üzeri online görüşme ek hizmete tabidir",
      "Muğla dışı bölgeler için fiyat ayrıca belirlenir",
    ],
    isPopular: true,
  },
  {
    id: "ozel-danismanlik",
    title: "Özel Yerinde Analiz",
    subtitle: "Premium Danışmanlık",
    description:
      "Standart paketlerin dışında kalan tamamen kişiselleştirilmiş, esnek ve kapsamı birlikte belirlenen bir çalışmadır.",
    forWhom: [
      '"Paketlerden birine tam uymuyorum ama özel bir ihtiyacım var" diyenler',
      "Daha kapsamlı, uzun soluklu veya karışık bir karar süreci olanlar",
      "İmar değişikliği ihtimali, özel izinler, ileri düzey mimari/teknik görüş gereken durumlar",
      "Mimari/teknik açıdan daha derin değerlendirme isteyenler",
      "Yatırımcılar (birden fazla seçenek analiz edenler, karşılaştırma ve bütüncül değerlendirmeler isteyenler)",
      "Mimari tasarım ve mühendislik hizmetleri isteyenler",
    ],
    includes: [
      "Kişiye özel danışmanlık: yer seçimi, tadilat işleri, mimari ve teknik görüşme",
      "Özel formatta rapor",
      "Yüz yüze / online görüşme",
      "Talep edilirse projelendirme, yerinde uygulama ve raporlama hizmetleri",
    ],
    deliveryTime: "Çalışmanın kapsamına göre belirlenir",
    price: "Kapsama göre belirlenir",
  },
];
