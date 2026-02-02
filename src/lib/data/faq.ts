export interface FAQ {
  id: number;
  question: string;
  answer: string;
  questionEn?: string;
  answerEn?: string;
}

export const faqs: FAQ[] = [
  {
    id: 1,
    question: "Yerinde Analiz nedir?",
    answer:
      "Yerinde Analiz, satın almayı düşündüğünüz ev, arsa veya yatırım amaçlı taşınmazın yerinde incelenmesi, teknik-mimari değerlendirmesi, imar durumunun analiz edilmesi ve risk-potansiyel tespitlerinin yapılması hizmetidir. Amacımız, karar verirken gerçek bilgiye dayalı, güvenli ve şeffaf bir değerlendirme sunmaktır.",
    questionEn: "What is Yerinde Analiz?",
    answerEn: "Yerinde Analiz is a service that involves on-site inspection, technical-architectural evaluation, zoning status analysis, and risk-potential identification of the house, land, or investment property you are considering purchasing. Our goal is to provide a safe and transparent evaluation based on real information when making decisions.",
  },
  {
    id: 2,
    question: "Hangi hizmet paketlerini sunuyorsunuz?",
    answer:
      "Üç ana hizmetimiz vardır: Ön Analiz, Yerinde Analiz ve Premium Analiz / Danışmanlık (ihtiyaca göre şekillenir). Her paketin kapsamı ve teslim süresi Paketler sayfasında detaylı olarak belirtilmiştir.",
    questionEn: "Which service packages do you offer?",
    answerEn: "We have three main services: Pre-Analysis, On-Site Analysis, and Premium Analysis / Consulting (shaped according to needs). The scope and delivery time of each package are detailed on the Packages page.",
  },
  {
    id: 3,
    question: "Hangi bölgelerde hizmet veriyorsunuz?",
    answer:
      "Muğla'nın bütün ilçelerinde ve çevresinde çalışıyoruz. Talep olduğu takdirde Ege'nin farklı bölgelerine ve tüm Türkiye'de hizmet verebiliriz; Muğla dışı talepleriniz için lütfen iletişime geçin.",
    questionEn: "In which regions do you provide services?",
    answerEn: "We work in all districts of Muğla and its surroundings. Upon request, we can provide services in different regions of the Aegean and all over Turkey; please contact us for requests outside Muğla.",
  },
  {
    id: 4,
    question: "Hizmetlerden kimler yararlanabilir?",
    answer:
      "Ev almak isteyenler, arsa yatırımı düşünenler, bölgeyi uzaktan takip edenler (İstanbul, Ankara, İzmir vb.), yazlık almak isteyen aileler, otel/turizm yatırımcıları, profesyonel danışmanlık arayan yabancı müşteriler... Kısacası, karar vermeden önce gerçek bir bilgi temeli oluşturmak isteyen herkes.",
    questionEn: "Who can benefit from the services?",
    answerEn: "Those who want to buy a house, those considering land investment, those following the region from afar (Istanbul, Ankara, Izmir, etc.), families who want to buy a summer house, hotel/tourism investors, foreign customers looking for professional consulting... In short, everyone who wants to establish a real information base before making a decision.",
  },
  {
    id: 5,
    question: "Raporlarınızı nasıl hazırlıyorsunuz?",
    answer:
      "Her rapor; sahada yaptığımız incelemeler, belediye ve resmi plan incelemeleri, teknik/mimari değerlendirmeler ve bölgesel analizlerin birleşimiyle hazırlanır. Fotoğraflar, ölçümler, risk tespitleri, imar analizi ve öneriler yer alır.",
    questionEn: "How do you prepare your reports?",
    answerEn: "Each report is prepared with a combination of on-site inspections, municipal and official plan reviews, technical/architectural evaluations, and regional analyses. It includes photographs, measurements, risk identifications, zoning analysis, and recommendations.",
  },
  {
    id: 6,
    question: "Raporu ne kadar sürede teslim ediyorsunuz?",
    answer:
      "Ön Analiz: 1-2 iş günü. Yerinde Analiz: 3-4 iş günü. Premium Analiz / Danışmanlık: Talebin kapsamına göre belirlenir.",
    questionEn: "How long does it take to deliver the report?",
    answerEn: "Pre-Analysis: 1-2 business days. On-Site Analysis: 3-4 business days. Premium Analysis / Consulting: Determined according to the scope of the request.",
  },
  {
    id: 7,
    question: "Sahaya gerçekten gidiyor musunuz?",
    answer:
      'Evet. "Yerinde Analiz" adının temel sebebi budur. Ön analiz haricindeki her analizi bizzat sahada yapıyoruz. Fotoğraflar, gözlemler, ölçümler ve yerleşim ilişkileri yerinde, deneyimli mimar ve inşaat mühendisinden oluşan bir ekip tarafından değerlendirilir.',
    questionEn: "Do you actually go to the field?",
    answerEn: 'Yes. This is the main reason for the name "Yerinde Analiz" (On-Site Analysis). We perform every analysis personally on-site, except for pre-analysis. Photographs, observations, measurements, and settlement relationships are evaluated on-site by a team consisting of experienced architects and civil engineers.',
  },
  {
    id: 8,
    question: "Uzakta yaşıyorum, yine de hizmet alabilir miyim?",
    answer:
      "Elbette. Hizmet alan müşterilerimizin büyük kısmı Muğla dışında yaşıyor. Süreci tamamen online yürütüyoruz, raporlar PDF olarak teslim ediliyor ve gerektiğinde/istendiğinde online görüşme sağlıyoruz.",
    questionEn: "I live far away, can I still get the service?",
    answerEn: "Of course. Most of our customers live outside Muğla. We manage the process completely online, reports are delivered as PDF, and we provide online meetings when necessary/requested.",
  },
  {
    id: 9,
    question: "Rapora ek olarak danışmanlık veriyor musunuz?",
    answer:
      "Evet. İstenirse rapor teslimi sonrası online görüşme yaparak sorularınızı cevaplıyoruz.",
    questionEn: "Do you provide consulting in addition to the report?",
    answerEn: "Yes. If requested, we answer your questions by having an online meeting after the report delivery.",
  },
  {
    id: 10,
    question: "Raporlar hukuken geçerli midir?",
    answer:
      "Raporlarımız teknik ve bilgilendirme amaçlıdır. Tapu, belediye kararları, imar hakları gibi resmi işlemlerde yol gösterir fakat bir resmi rapor yerine geçmez. Ancak karar sürecinde kapsamlı bir değerlendirme sağlar.",
    questionEn: "Are the reports legally valid?",
    answerEn: "Our reports are for technical and informational purposes. They provide guidance in official transactions such as title deeds, municipal decisions, and zoning rights, but do not replace an official report. However, they provide a comprehensive evaluation during the decision process.",
  },
  {
    id: 11,
    question: "Ödeme nasıl yapılıyor?",
    answer:
      "Site üzerinden ilettiğiniz talebiniz bir hizmet sözleşmesine dönüştürülür ve sonrasında onayınıza sunulur. Onayınız ve belirtilen hesaba yapılan ödeme sonrasında adınıza fatura düzenlenir, sözleşme süreci ve analiz çalışması başlamış olur.",
    questionEn: "How is the payment made?",
    answerEn: "The request you submit through the site is turned into a service agreement and سپس submitted for your approval. After your approval and payment to the specified account, an invoice is issued in your name, and the contract process and analysis work begin.",
  },
  {
    id: 12,
    question: "Hizmetinizi aldıktan sonra vazgeçersem iade olur mu?",
    answer: "Hizmet sözleşmesi onaylandıktan sonra iade söz konusu değildir.",
    questionEn: "If I change my mind after getting the service, is there a refund?",
    answerEn: "There is no refund after the service agreement is approved.",
  },
  {
    id: 13,
    question: "Analiz ettiğiniz mülkü satın alıp almama kararını siz mi söylüyorsunuz?",
    answer:
      "Biz objektif bilgi ve teknik değerlendirme sağlıyoruz, kararı siz veriyorsunuz. Raporda net bir şekilde yer alan artılar, eksiler, riskler ve potansiyellere bakarak incelenmesini istediğiniz gayrimenkulün beklentilerinizi karşılayıp karşılamadığını görmüş oluyorsunuz.",
    questionEn: "Do you tell me the decision to buy or not buy the property you analyzed?",
    answerEn: "We provide objective information and technical evaluation, you make the decision. By looking at the clearly stated pros, cons, risks, and potentials in the report, you can see if the property you want examined meets your expectations.",
  },
  {
    id: 14,
    question: "Aynı gün içinde birden fazla yer bakabilir misiniz?",
    answer:
      "Mümkün olduğu durumlarda evet. Bakılması istenen yerlerin konumları bu konuda belirleyicidir. Zaman planlaması ve mesafelere göre günlük program oluşturuyoruz.",
    questionEn: "Can you look at more than one place on the same day?",
    answerEn: "Yes, when possible. The locations of the places requested to be viewed are decisive in this regard. We create a daily schedule based on time planning and distances.",
  },
  {
    id: 15,
    question: "Gayrimenkul danışmanlarıyla çalışıyor musunuz?",
    answer:
      "Tarafsızlığı korumak adına herhangi bir emlakçıyla ortaklık veya komisyon ilişkisi kurmuyoruz. Danışmanlarla iletişim kurabiliriz, ancak rapor tamamen bağımsızdır.",
    questionEn: "Do you work with real estate consultants?",
    answerEn: "To maintain impartiality, we do not establish partnerships or commission relationships with any real estate agent. We can communicate with consultants, but the report is completely independent.",
  },
  {
    id: 16,
    question: "Hizmetiniz buna gerçekten değer mi?",
    answer:
      "Emlak veya arazi alımı, çoğu zaman yüzbinlerce hatta milyonlarca liralık bir yatırım anlamına gelir. Böyle büyük bir karar aşamasında yapılacak küçük bir hata bile uzun vadede çok daha yüksek maliyetlere yol açabilir. Bizim yaptığımız analizler, birçok müşterimizin yanlış bir alım yapmasını önledi. Kimi zaman da gözden kaçabilecek doğru fırsatları yakalamalarına yardımcı oldu. Bu nedenle hizmetimizin değeri, çoğu zaman kazandırdığı güvenli karar süreci ve gerçek maliyet tasarrufu ile kendini fazlasıyla gösterir.",
    questionEn: "Is your service really worth it?",
    answerEn: "Real estate or land purchase often means an investment of hundreds of thousands or even millions of liras. Even a small mistake made at such a major decision stage can lead to much higher costs in the long run. The analyses we perform have prevented many of our customers from making a wrong purchase. Sometimes it helped them catch the right opportunities that could be overlooked. Therefore, the value of our service manifests itself more than enough with the secure decision process and real cost savings it provides.",
  },
  {
    id: 17,
    question: "Çalışmalarınız sırasında drone kullanıyor musunuz?",
    answer:
      "Gerektiğinde kullanıyoruz. Arazinin konumu, eğimi ve çevre ilişkisinin detaylı görülmesi gereken durumlarda tercih ediyoruz. İstek üzerine ek hizmet olarak sunabiliyoruz.",
    questionEn: "Do you use drones during your work?",
    answerEn: "We use them when necessary. We prefer them in cases where the location, slope, and environmental relationship of the land need to be seen in detail. We can offer it as an additional service upon request.",
  },
  {
    id: 18,
    question: "Rapor örneği görebilir miyim?",
    answer:
      "Örnek rapor kişisel veriler çıkarılmış şekilde talep üzerine gösterilebilir.",
    questionEn: "Can I see a sample report?",
    answerEn: "A sample report can be shown upon request with personal data removed.",
  },
];
