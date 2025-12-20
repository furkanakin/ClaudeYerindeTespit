export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: 1,
    question: "Yerinde Analiz nedir?",
    answer:
      "Yerinde Analiz, satın almayı düşündüğünüz ev, arsa veya yatırım amaçlı taşınmazın yerinde incelenmesi, teknik-mimari değerlendirmesi, imar durumunun analiz edilmesi ve risk-potansiyel tespitlerinin yapılması hizmetidir. Amacımız, karar verirken gerçek bilgiye dayalı, güvenli ve şeffaf bir değerlendirme sunmaktır.",
  },
  {
    id: 2,
    question: "Hangi hizmet paketlerini sunuyorsunuz?",
    answer:
      "Üç ana hizmetimiz vardır: Ön Analiz, Yerinde Analiz ve Özel Yerinde Analiz / Danışmanlık (ihtiyaca göre şekillenir). Her paketin kapsamı ve teslim süresi Paketler sayfasında detaylı olarak belirtilmiştir.",
  },
  {
    id: 3,
    question: "Hangi bölgelerde hizmet veriyorsunuz?",
    answer:
      "Muğla'nın bütün ilçelerinde ve çevresinde çalışıyoruz. Talep olduğu takdirde Ege'nin farklı bölgelerine ve tüm Türkiye'de hizmet verebiliriz; Muğla dışı talepleriniz için lütfen iletişime geçin.",
  },
  {
    id: 4,
    question: "Hizmetlerden kimler yararlanabilir?",
    answer:
      "Ev almak isteyenler, arsa yatırımı düşünenler, bölgeyi uzaktan takip edenler (İstanbul, Ankara, İzmir vb.), yazlık almak isteyen aileler, otel/turizm yatırımcıları, profesyonel danışmanlık arayan yabancı müşteriler... Kısacası, karar vermeden önce gerçek bir bilgi temeli oluşturmak isteyen herkes.",
  },
  {
    id: 5,
    question: "Raporlarınızı nasıl hazırlıyorsunuz?",
    answer:
      "Her rapor; sahada yaptığımız incelemeler, belediye ve resmi plan incelemeleri, teknik/mimari değerlendirmeler ve bölgesel analizlerin birleşimiyle hazırlanır. Fotoğraflar, ölçümler, risk tespitleri, imar analizi ve öneriler yer alır.",
  },
  {
    id: 6,
    question: "Raporu ne kadar sürede teslim ediyorsunuz?",
    answer:
      "Ön Analiz: 1-2 iş günü. Yerinde Analiz: 3-4 iş günü. Özel Yerinde Analiz/Danışmanlık: Talebin kapsamına göre belirlenir.",
  },
  {
    id: 7,
    question: "Sahaya gerçekten gidiyor musunuz?",
    answer:
      'Evet. "Yerinde Analiz" adının temel sebebi budur. Ön analiz haricindeki her analizi bizzat sahada yapıyoruz. Fotoğraflar, gözlemler, ölçümler ve yerleşim ilişkileri yerinde, deneyimli mimar ve inşaat mühendisinden oluşan bir ekip tarafından değerlendirilir.',
  },
  {
    id: 8,
    question: "Uzakta yaşıyorum, yine de hizmet alabilir miyim?",
    answer:
      "Elbette. Hizmet alan müşterilerimizin büyük kısmı Muğla dışında yaşıyor. Süreci tamamen online yürütüyoruz, raporlar PDF olarak teslim ediliyor ve gerektiğinde/istendiğinde online görüşme sağlıyoruz.",
  },
  {
    id: 9,
    question: "Rapora ek olarak danışmanlık veriyor musunuz?",
    answer:
      "Evet. İstenirse rapor teslimi sonrası online görüşme yaparak sorularınızı cevaplıyoruz.",
  },
  {
    id: 10,
    question: "Raporlar hukuken geçerli midir?",
    answer:
      "Raporlarımız teknik ve bilgilendirme amaçlıdır. Tapu, belediye kararları, imar hakları gibi resmi işlemlerde yol gösterir fakat bir resmi rapor yerine geçmez. Ancak karar sürecinde kapsamlı bir değerlendirme sağlar.",
  },
  {
    id: 11,
    question: "Ödeme nasıl yapılıyor?",
    answer:
      "Site üzerinden ilettiğiniz talebiniz bir hizmet sözleşmesine dönüştürülür ve sonrasında onayınıza sunulur. Onayınız ve belirtilen hesaba yapılan ödeme sonrasında adınıza fatura düzenlenir, sözleşme süreci ve analiz çalışması başlamış olur.",
  },
  {
    id: 12,
    question: "Hizmetinizi aldıktan sonra vazgeçersem iade olur mu?",
    answer: "Hizmet sözleşmesi onaylandıktan sonra iade söz konusu değildir.",
  },
  {
    id: 13,
    question: "Analiz ettiğiniz mülkü satın alıp almama kararını siz mi söylüyorsunuz?",
    answer:
      "Biz objektif bilgi ve teknik değerlendirme sağlıyoruz, kararı siz veriyorsunuz. Raporda net bir şekilde yer alan artılar, eksiler, riskler ve potansiyellere bakarak incelenmesini istediğiniz gayrimenkulün beklentilerinizi karşılayıp karşılamadığını görmüş oluyorsunuz.",
  },
  {
    id: 14,
    question: "Aynı gün içinde birden fazla yer bakabilir misiniz?",
    answer:
      "Mümkün olduğu durumlarda evet. Bakılması istenen yerlerin konumları bu konuda belirleyicidir. Zaman planlaması ve mesafelere göre günlük program oluşturuyoruz.",
  },
  {
    id: 15,
    question: "Gayrimenkul danışmanlarıyla çalışıyor musunuz?",
    answer:
      "Tarafsızlığı korumak adına herhangi bir emlakçıyla ortaklık veya komisyon ilişkisi kurmuyoruz. Danışmanlarla iletişim kurabiliriz, ancak rapor tamamen bağımsızdır.",
  },
  {
    id: 16,
    question: "Hizmetiniz buna gerçekten değer mi?",
    answer:
      "Emlak veya arazi alımı, çoğu zaman yüzbinlerce hatta milyonlarca liralık bir yatırım anlamına gelir. Böyle büyük bir karar aşamasında yapılacak küçük bir hata bile uzun vadede çok daha yüksek maliyetlere yol açabilir. Bizim yaptığımız analizler, birçok müşterimizin yanlış bir alım yapmasını önledi. Kimi zaman da gözden kaçabilecek doğru fırsatları yakalamalarına yardımcı oldu. Bu nedenle hizmetimizin değeri, çoğu zaman kazandırdığı güvenli karar süreci ve gerçek maliyet tasarrufu ile kendini fazlasıyla gösterir.",
  },
  {
    id: 17,
    question: "Çalışmalarınız sırasında drone kullanıyor musunuz?",
    answer:
      "Gerektiğinde kullanıyoruz. Arazinin konumu, eğimi ve çevre ilişkisinin detaylı görülmesi gereken durumlarda tercih ediyoruz. İstek üzerine ek hizmet olarak sunabiliyoruz.",
  },
  {
    id: 18,
    question: "Rapor örneği görebilir miyim?",
    answer:
      "Örnek rapor içeriği veya şablonu talep üzerine gösterilebilir (kişisel veriler çıkarılmış şekilde).",
  },
];
