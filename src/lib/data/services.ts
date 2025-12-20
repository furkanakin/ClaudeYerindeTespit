import { FileSearch, Shield, Building2, Hammer } from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  details: string;
  icon: string;
}

export const services: Service[] = [
  {
    id: "imar-planlama",
    title: "İmar, Planlama ve Bilgi Kontrolü",
    description:
      "Parselin imar durumu, kullanım hakları, kısıtlamalar, çekme mesafeleri, yapılaşma koşulları ve resmi süreçlerle ilgili kritik bilgileri net ve anlaşılır şekilde ortaya koyuyoruz.",
    details: "Karar aşamasında sürprizlerin önüne geçiyoruz.",
    icon: "FileSearch",
  },
  {
    id: "yerinde-inceleme",
    title: "Yerinde Mimari ve Teknik İnceleme",
    description:
      "Arazinin veya yapının fiziksel durumunu, teknik risklerini, erişim ve altyapı koşullarını yerinde değerlendiriyoruz.",
    details:
      "Zemin, eğim, yapı durumu, çevresel etkenler ve olası problemler profesyonel yöntemlerle inceleniyor.",
    icon: "Building2",
  },
  {
    id: "kapsamli-raporlama",
    title: "Kapsamlı Bilgi Toplama ve Tarafsız Raporlama",
    description:
      "Sahadaki bulguları, fiziki koşulları, imar verilerini ve çevresel faktörleri bir araya getirerek bütüncül bir analiz oluşturuyoruz.",
    details:
      "Tüm bilgiler fotoğraflar, çizimler ve açıklamalarla desteklenen görsel ve yazılı bir raporda sunuluyor. Raporun sonunda yalnızca artılar ve eksiler üzerinden genel bir değerlendirme yapıyoruz. Değerleme veya yatırım yönlendirmesi kesinlikle yapmıyoruz. Kararınızı özgürce verebilmeniz için tarafsız bilgi sağlıyoruz.",
    icon: "Shield",
  },
  {
    id: "proje-danismanlik",
    title: "Proje, Tadilat ve Uygulama Danışmanlığı",
    description:
      "İhtiyaç halinde mimari proje çizimi, mevcut yapıda yapılacak değişikliklerin planlanması ve uygulama süreçlerinin yönetimi gibi teknik hizmetlerle süreci bütünsel olarak destekliyoruz.",
    details: "",
    icon: "Hammer",
  },
];

export const whyUs = [
  {
    id: "gercek-durum",
    title: "Gerçek Durum",
    subtitle: "Gayrimenkulün gerçek durumunu ortaya çıkarır.",
    description:
      "Arazi veya konutun fiziksel, teknik ve planlama açısından tüm kritik detaylarını yerinde inceleme ve masaüstü araştırmayla görünür kılar.",
    icon: "Search",
  },
  {
    id: "koruma",
    title: "Koruma",
    subtitle: "Yanlış bir kararı en başında önler.",
    description:
      "Erken tespit edilen risklerle olası maddi ve zamansal kayıpları engeller; arazi ya da konut alım sürecinizde güvenli bir zemin sağlar.",
    icon: "Shield",
  },
  {
    id: "netlik",
    title: "Netlik",
    subtitle: "Tarafsız ve anlaşılır bir karar çerçevesi sunar.",
    description:
      "Yönlendirme yapmadan, sade ve objektif bilgilerle size en uygun araziyi veya konutu seçmenizi kolaylaştırır.",
    icon: "Target",
  },
];

export const howWeWork = [
  {
    step: 1,
    title: "Talep ve Kısa Görüşme",
    description:
      "İletişim formu üzerinden ilettiğiniz talebe yönelik ihtiyacınız belirlenir. Gerekirse kısa bir görüşme yapılır. Sonrasında teklifiniz ve hizmet sözleşmesi onayınıza sunulur.",
    icon: "MessageSquare",
  },
  {
    step: 2,
    title: "Analiz ve Yerinde İnceleme",
    description:
      "Ödeme ve sözleşme onayı sonrasında ön analiz verileri toplanır. Bu verilerle saha ziyaretini gerçekleştirerek ihtiyaca yönelik yerinde mimari ve teknik incelemeler yapılır.",
    icon: "MapPin",
  },
  {
    step: 3,
    title: "Rapor ve Online Görüşme",
    description:
      "Tüm bulgular yazılı ve görsel olarak raporlanıp tarafınıza dijital olarak iletilir. Paketinizin içeriğine göre raporunuz hakkında online görüşme yapılır.",
    icon: "FileText",
  },
];
