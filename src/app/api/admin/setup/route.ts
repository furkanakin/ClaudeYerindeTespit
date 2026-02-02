import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// All website content with Turkish and English translations
const seedContent = [
  // ========== ANASAYFA ==========
  { pageSlug: 'anasayfa', key: 'hero_location', tr: "Muğla'da", en: 'In Muğla' },
  { pageSlug: 'anasayfa', key: 'hero_title_prefix', tr: 'Gayrimenkul Yatırımlarınız İçin', en: 'For Your Real Estate Investments' },
  { pageSlug: 'anasayfa', key: 'hero_title_highlight', tr: 'Bağımsız, Teknik, Detaylı', en: 'Independent, Technical, Detailed' },
  { pageSlug: 'anasayfa', key: 'hero_title_suffix', tr: 'İncelemeler', en: 'Reviews' },
  { pageSlug: 'anasayfa', key: 'hero_desc1', tr: 'Gayrimenkul alım süreçlerinde tarafsız incelemelerle kapsamlı bilgi sunuyoruz.', en: 'We provide comprehensive information with impartial reviews in real estate purchasing processes.' },
  { pageSlug: 'anasayfa', key: 'hero_desc2', tr: 'Bağımsız analizlerle karar sürecinizi destekliyoruz.', en: 'We support your decision-making process with independent analysis.' },
  { pageSlug: 'anasayfa', key: 'hero_cta', tr: 'Paketleri İnceleyin', en: 'View Packages' },

  // Manifesto Section
  { pageSlug: 'anasayfa', key: 'manifesto_brand', tr: 'Yerinde Analiz', en: 'Yerinde Analiz' },
  { pageSlug: 'anasayfa', key: 'manifesto_text1', tr: ', yatırım sürecinizde uzun vadeli hedeflerinize en uygun yolu belirlemenize yardımcı olan, riskleri azaltan ve doğru kararları destekleyen profesyonel bir yönlendirme hizmetidir.', en: ' is a professional guidance service that helps you determine the most suitable path for your long-term goals in your investment process, reduces risks, and supports correct decisions.' },
  { pageSlug: 'anasayfa', key: 'manifesto_highlight', tr: 'Arazi, konut veya proje seçimlerinde', en: 'In land, housing, or project selections' },
  { pageSlug: 'anasayfa', key: 'manifesto_text2', tr: ' mevcut durumun analizini yapar ve size özel bir yol haritası sunar.', en: ' it analyzes the current situation and offers you a customized roadmap.' },

  // Why Us Section
  { pageSlug: 'anasayfa', key: 'whyus_title_prefix', tr: 'Neden', en: 'Why' },
  { pageSlug: 'anasayfa', key: 'whyus_title_highlight', tr: 'Yerinde Analiz', en: 'Yerinde Analiz' },
  { pageSlug: 'anasayfa', key: 'whyus_item1_title', tr: 'Gerçek Durum', en: 'Real Situation' },
  { pageSlug: 'anasayfa', key: 'whyus_item1_subtitle', tr: 'Gayrimenkulün gerçek durumunu ortaya çıkarır.', en: 'Reveals the real condition of the property.' },
  { pageSlug: 'anasayfa', key: 'whyus_item1_desc', tr: 'Arazi veya konutun fiziksel, teknik ve planlama açısından tüm kritik detaylarını yerinde inceleme ve masaüstü araştırmayla görünür kılar.', en: 'Makes visible all critical details of land or housing in terms of physical, technical and planning aspects through on-site inspection and desktop research.' },
  { pageSlug: 'anasayfa', key: 'whyus_item2_title', tr: 'Koruma', en: 'Protection' },
  { pageSlug: 'anasayfa', key: 'whyus_item2_subtitle', tr: 'Yanlış bir kararı en başında önler.', en: 'Prevents a wrong decision from the start.' },
  { pageSlug: 'anasayfa', key: 'whyus_item2_desc', tr: 'Erken tespit edilen risklerle olası maddi ve zamansal kayıpları engeller; arazi ya da konut alım sürecinizde güvenli bir zemin sağlar.', en: 'Prevents possible financial and time losses with early detected risks; provides a safe ground in your land or housing purchase process.' },
  { pageSlug: 'anasayfa', key: 'whyus_item3_title', tr: 'Netlik', en: 'Clarity' },
  { pageSlug: 'anasayfa', key: 'whyus_item3_subtitle', tr: 'Tarafsız ve anlaşılır bir karar çerçevesi sunar.', en: 'Offers an impartial and understandable decision framework.' },
  { pageSlug: 'anasayfa', key: 'whyus_item3_desc', tr: 'Yönlendirme yapmadan, sade ve objektif bilgilerle size en uygun araziyi veya konutu seçmenizi kolaylaştırır.', en: 'Without directing, it makes it easier for you to choose the most suitable land or housing with simple and objective information.' },

  // How We Work Section
  { pageSlug: 'anasayfa', key: 'howwework_title_prefix', tr: 'Nasıl', en: 'How Do We' },
  { pageSlug: 'anasayfa', key: 'howwework_title_highlight', tr: 'Çalışıyoruz', en: 'Work' },
  { pageSlug: 'anasayfa', key: 'howwework_subtitle', tr: 'Üç adımdan oluşan süreçte alanında uzman mimar ve mühendislerden oluşan ekibimiz titizlikle çalışıyor ve raporunuzu seçtiğiniz pakette belirtilen süreye göre teslim ediyoruz.', en: 'In a three-step process, our team of expert architects and engineers works meticulously and delivers your report according to the time specified in your chosen package.' },
  { pageSlug: 'anasayfa', key: 'howwework_step1_title', tr: 'Talep ve Kısa Görüşme', en: 'Request and Brief Meeting' },
  { pageSlug: 'anasayfa', key: 'howwework_step1_desc', tr: 'İletişim formu üzerinden ilettiğiniz talebe yönelik ihtiyacınız belirlenir. Gerekirse kısa bir görüşme yapılır. Sonrasında teklifiniz ve hizmet sözleşmesi onayınıza sunulur.', en: 'Your needs are determined based on the request you submit through the contact form. A brief meeting is held if necessary. Then your offer and service agreement are submitted for your approval.' },
  { pageSlug: 'anasayfa', key: 'howwework_step2_title', tr: 'Analiz ve Yerinde İnceleme', en: 'Analysis and On-Site Inspection' },
  { pageSlug: 'anasayfa', key: 'howwework_step2_desc', tr: 'Ödeme ve sözleşme onayı sonrasında ön analiz verileri toplanır. Bu verilerle saha ziyaretini gerçekleştirerek ihtiyaca yönelik yerinde mimari ve teknik incelemeler yapılır.', en: 'After payment and contract approval, preliminary analysis data is collected. With this data, site visit is made and on-site architectural and technical inspections are carried out according to needs.' },
  { pageSlug: 'anasayfa', key: 'howwework_step3_title', tr: 'Rapor ve Online Görüşme', en: 'Report and Online Meeting' },
  { pageSlug: 'anasayfa', key: 'howwework_step3_desc', tr: 'Tüm bulgular yazılı ve görsel olarak raporlanıp tarafınıza dijital olarak iletilir. Paketinizin içeriğine göre raporunuz hakkında online görüşme yapılır.', en: 'All findings are reported in written and visual form and delivered to you digitally. An online meeting is held about your report according to the content of your package.' },

  // ========== HAKKIMIZDA ==========
  { pageSlug: 'hakkimizda', key: 'page_title', tr: 'Hakkımızda', en: 'About Us' },
  { pageSlug: 'hakkimizda', key: 'page_subtitle', tr: 'Mimarlık ve mühendislik temelli, bağımsız ve tarafsız bilgi hizmeti sunan bir danışmanlık platformu', en: 'A consulting platform based on architecture and engineering that provides independent and impartial information services' },
  { pageSlug: 'hakkimizda', key: 'story_title', tr: 'Hikayemiz', en: 'Our Story' },
  { pageSlug: 'hakkimizda', key: 'story_content', tr: 'Yerinde Analiz, gayrimenkul sektöründe bağımsız ve profesyonel değerlendirme hizmeti sunmak amacıyla kurulmuştur. Mimarlık ve mühendislik alanlarında uzmanlaşmış ekibimiz, arazi ve konut alım süreçlerinde tarafsız incelemeler ve kapsamlı analizler sunarak müşterilerimizin doğru kararlar vermesine yardımcı olmaktadır.', en: 'Yerinde Analiz was established to provide independent and professional evaluation services in the real estate sector. Our team, specialized in architecture and engineering, helps our customers make the right decisions by providing impartial inspections and comprehensive analyses in land and housing purchase processes.' },
  { pageSlug: 'hakkimizda', key: 'mission_title', tr: 'Misyonumuz', en: 'Our Mission' },
  { pageSlug: 'hakkimizda', key: 'mission_content', tr: 'Gayrimenkul yatırımlarında şeffaflık ve güven sağlayarak, müşterilerimizin en doğru kararları vermelerine yardımcı olmak. Bağımsız, teknik ve detaylı incelemelerle riskleri minimize ederek, yatırım süreçlerinizde yanınızda olmak.', en: 'To help our customers make the best decisions by providing transparency and trust in real estate investments. To be by your side in your investment processes by minimizing risks with independent, technical and detailed inspections.' },

  // ========== PAKETLER PAGE ==========
  { pageSlug: 'paketler', key: 'page_title', tr: 'Paketlerimiz', en: 'Our Packages' },
  { pageSlug: 'paketler', key: 'page_subtitle', tr: 'İhtiyacınıza uygun paketi seçin, profesyonel danışmanlık hizmetimizden yararlanın', en: 'Choose the package that suits your needs and benefit from our professional consulting service' },
  { pageSlug: 'paketler', key: 'note_text', tr: 'Muğla il sınırları içinde geçerlidir. Muğla dışındaki bölgeler için fiyatlar ayrıca belirlenir.', en: 'Valid within Muğla province borders. Prices for regions outside Muğla are determined separately.' },
  { pageSlug: 'paketler', key: 'note_detail', tr: 'Detaylı bilgi ve özel talepleriniz için', en: 'For detailed information and special requests' },
  { pageSlug: 'paketler', key: 'note_contact', tr: 'iletişime geçin', en: 'contact us' },

  // UI Texts
  { pageSlug: 'paketler', key: 'ui_what_includes', tr: 'Neler İçerir?', en: "What's Included?" },
  { pageSlug: 'paketler', key: 'ui_for_whom', tr: 'Kimler için?', en: 'Who is it for?' },
  { pageSlug: 'paketler', key: 'ui_view_package', tr: 'Paketi İnceleyin', en: 'View Package' },
  { pageSlug: 'paketler', key: 'ui_popular_badge', tr: 'En Çok Tercih Edilen', en: 'Most Preferred' },
  { pageSlug: 'paketler', key: 'ui_more_features', tr: 'özellik daha', en: 'more features' },
  { pageSlug: 'paketler', key: 'ui_package_configurator', tr: 'Paket Yapılandırıcı', en: 'Package Configurator' },
  { pageSlug: 'paketler', key: 'ui_delivery_time', tr: 'Teslim Süresi', en: 'Delivery Time' },
  { pageSlug: 'paketler', key: 'ui_base_price', tr: 'Baz Fiyat', en: 'Base Price' },
  { pageSlug: 'paketler', key: 'ui_extra_services', tr: 'Ek Hizmetler', en: 'Extra Services' },
  { pageSlug: 'paketler', key: 'ui_total_estimated', tr: 'Toplam Tahmini Tutar', en: 'Total Estimated Amount' },
  { pageSlug: 'paketler', key: 'ui_get_quote', tr: 'Teklif Alın', en: 'Get Quote' },
  { pageSlug: 'paketler', key: 'ui_based_on_scope', tr: 'Kapsama Göre', en: 'Based on Scope' },
  { pageSlug: 'paketler', key: 'ui_no_addons', tr: 'Bu paket için ek hizmet bulunmamaktadır.', en: 'No additional services available for this package.' },

  // ========== ÖN ANALİZ (PKG1) ==========
  { pageSlug: 'paketler', key: 'pkg1_title', tr: 'Ön Analiz', en: 'Pre-Analysis' },
  { pageSlug: 'paketler', key: 'pkg1_subtitle', tr: 'Temel Paket', en: 'Basic Package' },
  { pageSlug: 'paketler', key: 'pkg1_desc', tr: 'Ön analiz verilerini yerinde yapılan mimari ve teknik incelemelerle derinleştiren kapsamlı bir değerlendirmedir.', en: 'A comprehensive evaluation that deepens pre-analysis data with on-site architectural and technical inspections.' },
  { pageSlug: 'paketler', key: 'pkg1_modal_desc', tr: '**Ön Analiz Paketi**, bir arsa ya da yapının **konumu**, **çevresel bağlamı**, **temel riskleri** ve **imar durumunu** mevcut dijital veriler üzerinden genel çerçevede değerlendirerek, karar sürecinin başlangıcında yol gösterici bir çerçeve sunar.', en: 'The **Pre-Analysis Package** offers a guiding framework at the beginning of the decision process by evaluating the **location**, **environmental context**, **basic risks**, and **zoning status** of a plot or building through existing digital data.' },
  { pageSlug: 'paketler', key: 'pkg1_delivery', tr: 'Max. 2 gün', en: 'Max. 2 days' },
  { pageSlug: 'paketler', key: 'pkg1_price', tr: '4.500 TL + KDV', en: '4,500 TL + VAT' },

  // Pkg1 - What Includes
  { pageSlug: 'paketler', key: 'pkg1_includes_1_title', tr: 'Konum ve çevresel bağlam', en: 'Location and environmental context' },
  { pageSlug: 'paketler', key: 'pkg1_includes_1_detail1', tr: 'Parselin genel konumu ve ulaşım', en: 'General location and transportation of the parcel' },
  { pageSlug: 'paketler', key: 'pkg1_includes_1_detail2', tr: 'Yakın çevre kullanımı, yoğunluk ve fonksiyonlar', en: 'Nearby land use, density and functions' },
  { pageSlug: 'paketler', key: 'pkg1_includes_2_title', tr: 'Potansiyeller ve temel riskler', en: 'Potentials and basic risks' },
  { pageSlug: 'paketler', key: 'pkg1_includes_2_detail1', tr: 'Sit ve koruma alanları ile taşkın, heyelan ve deprem gibi başlıca kısıtlar', en: 'Major constraints such as conservation areas, flood, landslide and earthquake' },
  { pageSlug: 'paketler', key: 'pkg1_includes_3_title', tr: 'İmar durumu incelemesi', en: 'Zoning status review' },
  { pageSlug: 'paketler', key: 'pkg1_includes_3_detail1', tr: 'Dijital erişim olan veriler üzerinden bölgenin plan notlarıyla birlikte imar durumu incelenmesi', en: 'Review of zoning status with regional plan notes through digitally accessible data' },

  // Pkg1 - For Whom
  { pageSlug: 'paketler', key: 'pkg1_kimler_1', tr: '"Bu arsa ya da konut değerlendirmeye değer mi?" sorusuna hızlı yanıt arayanlar', en: 'Those looking for a quick answer to "Is this land or house worth evaluating?"' },
  { pageSlug: 'paketler', key: 'pkg1_kimler_2', tr: 'Bir yerin beklentileriyle örtüşüp örtüşmediğini ilk aşamada görmek isteyenler', en: 'Those who want to see if a place meets their expectations in the first stage' },
  { pageSlug: 'paketler', key: 'pkg1_kimler_3', tr: 'İlan bilgilerini doğrulayıp temel imar ve riskleri öğrenmek isteyenler', en: 'Those who want to verify listing information and learn basic zoning and risks' },
  { pageSlug: 'paketler', key: 'pkg1_kimler_4', tr: 'Yerinde inceleme öncesi ölçülü bir ilk değerlendirme isteyenler', en: 'Those who want a measured initial assessment before on-site inspection' },

  // Pkg1 - Add-ons
  { pageSlug: 'paketler', key: 'pkg1_addons_title', tr: 'Raporla Birlikte Alınabilecek Hizmetler', en: 'Services Available with Report' },
  { pageSlug: 'paketler', key: 'pkg1_addon1_name', tr: 'Ek Gayrimenkul İncelemesi', en: 'Additional Property Review' },
  { pageSlug: 'paketler', key: 'pkg1_addon1_desc', tr: 'Aynı bölgede birden fazla gayrimenkul incelemesi için teklif alın. Teslim süresi duruma göre değişiklik gösterebilir.', en: 'Get a quote for multiple property reviews in the same area. Delivery time may vary depending on the situation.' },
  { pageSlug: 'paketler', key: 'pkg1_addon2_name', tr: 'Online Görüşme - 30 dk', en: 'Online Meeting - 30 min' },
  { pageSlug: 'paketler', key: 'pkg1_addon2_desc', tr: 'Teslim edilen rapor hakkında kısa soru cevap', en: 'Brief Q&A about the delivered report' },
  { pageSlug: 'paketler', key: 'pkg1_addon2_price', tr: '+1.000 TL + KDV', en: '+1,000 TL + VAT' },
  { pageSlug: 'paketler', key: 'pkg1_addon3_name', tr: 'Online Görüşme - 60 dk', en: 'Online Meeting - 60 min' },
  { pageSlug: 'paketler', key: 'pkg1_addon3_desc', tr: 'Teslim edilen rapor hakkında kapsamlı görüşme', en: 'Comprehensive meeting about the delivered report' },
  { pageSlug: 'paketler', key: 'pkg1_addon3_price', tr: '+2.000 TL + KDV', en: '+2,000 TL + VAT' },

  // ========== YERİNDE ANALİZ (PKG2) ==========
  { pageSlug: 'paketler', key: 'pkg2_title', tr: 'Yerinde Analiz', en: 'On-Site Analysis' },
  { pageSlug: 'paketler', key: 'pkg2_subtitle', tr: 'Kapsamlı Paket', en: 'Comprehensive Package' },
  { pageSlug: 'paketler', key: 'pkg2_desc', tr: 'Bir arsa ya da yapıyla ilgili karar vermeden önce ön analiz verilerini yerinde yapılan mimari ve teknik incelemelerle derinleştiren kapsamlı bir değerlendirmedir.', en: 'A comprehensive evaluation that deepens pre-analysis data with on-site architectural and technical inspections before making a decision about a plot or building.' },
  { pageSlug: 'paketler', key: 'pkg2_modal_desc', tr: '**Yerinde Analiz Paketi**, ön analiz kapsamında elde edilen verileri **yerinde yapılan mimari ve teknik incelemelerle** birleştirerek, arsa ya da yapının **mevcut durumuna** ilişkin daha kapsamlı bir değerlendirme sunar.', en: 'The **On-Site Analysis Package** offers a more comprehensive evaluation of the **current condition** of the plot or building by combining the data obtained within the scope of pre-analysis with **on-site architectural and technical inspections**.' },
  { pageSlug: 'paketler', key: 'pkg2_delivery', tr: 'Saha ziyareti gerçekleştikten sonra max. 3-4 iş günü', en: 'Max. 3-4 business days after site visit' },
  { pageSlug: 'paketler', key: 'pkg2_price', tr: '15.000 TL + KDV', en: '15,000 TL + VAT' },
  { pageSlug: 'paketler', key: 'pkg2_base_price_note', tr: '(1. Bölgede 250 m²\'ye kadar olan konutlar için)', en: '(For houses up to 250 m² in Zone 1)' },
  { pageSlug: 'paketler', key: 'pkg2_footer_note', tr: 'Yerinde Analiz hizmeti, saha mesafesi, yapı ölçeği ve parsel özellikleri dikkate alınarak planlanır. Fethiye merkez baz alınarak belirlenen bölgelere göre saha süresi ve çalışma yoğunluğu değişiklik gösterebilir.', en: 'On-Site Analysis service is planned considering field distance, building scale, and parcel characteristics. Field time and workload may vary according to zones determined based on Fethiye center.' },

  // Pkg2 - What Includes
  { pageSlug: 'paketler', key: 'pkg2_includes_1_title', tr: 'Ön Analiz kapsamının tamamı', en: 'Full Pre-Analysis scope' },
  { pageSlug: 'paketler', key: 'pkg2_includes_2_title', tr: 'Saha ziyareti', en: 'Site visit' },
  { pageSlug: 'paketler', key: 'pkg2_includes_2_detail1', tr: 'Mimar ve inşaat mühendisi tarafından birlikte yerinde inceleme', en: 'On-site inspection together by architect and civil engineer' },
  { pageSlug: 'paketler', key: 'pkg2_includes_2_detail2', tr: 'Yakın çevre ve komşu kullanımlarının, topoğrafyanın gözlemi', en: 'Observation of nearby environment, neighboring uses, and topography' },
  { pageSlug: 'paketler', key: 'pkg2_includes_2_detail3', tr: 'Fiziksel ölçümler ve teknik tespitler', en: 'Physical measurements and technical determinations' },
  { pageSlug: 'paketler', key: 'pkg2_includes_2_detail4', tr: 'Yerinde incelemeyle tespit edilen ek potansiyel ve riskler', en: 'Additional potentials and risks identified through on-site inspection' },
  { pageSlug: 'paketler', key: 'pkg2_includes_2_detail5', tr: 'Görsel belgeleme', en: 'Visual documentation' },
  { pageSlug: 'paketler', key: 'pkg2_includes_3_title', tr: 'Proje ve belgelerin incelenmesi ve kontrolü (iletilmesi halinde)', en: 'Project and document review and control (if provided)' },
  { pageSlug: 'paketler', key: 'pkg2_includes_4_title', tr: 'Online değerlendirme görüşmesi (60 dk)', en: 'Online evaluation meeting (60 min)' },

  // Pkg2 - For Whom
  { pageSlug: 'paketler', key: 'pkg2_kimler_1', tr: 'Alım öncesinde gayrimenkulün gerçek durumunu ayrıntılı olarak öğrenmek isteyenler', en: 'Those who want to learn the real condition of the property in detail before purchase' },
  { pageSlug: 'paketler', key: 'pkg2_kimler_2', tr: 'İlan bilgileriyle yetinmeyip yerinde tespitlere göre bilinçli karar vermek isteyenler', en: 'Those who want to make informed decisions based on on-site determinations, not just listing information' },
  { pageSlug: 'paketler', key: 'pkg2_kimler_3', tr: 'Gayrimenkulü bizzat görmeye gidemeyen, ancak almayı düşündüğü gayrimenkulün yerinde incelenmesini isteyenler', en: 'Those who cannot personally visit the property but want an on-site inspection of the property they are considering buying' },
  { pageSlug: 'paketler', key: 'pkg2_kimler_4', tr: 'Yerinde incelemenin bir mimar ve bir mühendis gözüyle yapılmasını önemseyenler', en: 'Those who care about on-site inspection being done by an architect and an engineer' },

  // Pkg2 - Zone Info
  { pageSlug: 'paketler', key: 'pkg2_zone1', tr: '1. Bölge | 0–50 km: Fethiye, Seydikemer (Standart fiyat geçerlidir)', en: 'Zone 1 | 0–50 km: Fethiye, Seydikemer (Standard price applies)' },
  { pageSlug: 'paketler', key: 'pkg2_zone2', tr: '2. Bölge | 50–100 km: Dalaman, Dalyan, Köyceğiz, Ortaca, Sarıgerme (Mesafe farkı uygulanır)', en: 'Zone 2 | 50–100 km: Dalaman, Dalyan, Köyceğiz, Ortaca, Sarıgerme (Distance difference applies)' },
  { pageSlug: 'paketler', key: 'pkg2_zone3', tr: '3. Bölge | 100–200 km: Akyaka, Ula, Marmaris Merkez, Muğla Merkez ve çevresi (Mesafe farkı uygulanır)', en: 'Zone 3 | 100–200 km: Akyaka, Ula, Marmaris Center, Muğla Center and surroundings (Distance difference applies)' },
  { pageSlug: 'paketler', key: 'pkg2_zone4', tr: '4. Bölge | 200 km üzeri: Bodrum, Milas, Marmaris (Söğüt, Bozburun, Hisarönü), Datça (Özel planlama yapılır)', en: 'Zone 4 | Over 200 km: Bodrum, Milas, Marmaris (Söğüt, Bozburun, Hisarönü), Datça (Special planning is done)' },

  // Pkg2 - Add-ons
  { pageSlug: 'paketler', key: 'pkg2_addons_title', tr: 'Raporla Birlikte Alınabilecek Hizmetler', en: 'Services Available with Report' },
  { pageSlug: 'paketler', key: 'pkg2_addon1_name', tr: 'Drone ile Görüntüleme - Temel', en: 'Drone Imaging - Basic' },
  { pageSlug: 'paketler', key: 'pkg2_addon1_desc', tr: 'Havadan genel çekim ve fotoğraflama', en: 'Aerial general shooting and photography' },
  { pageSlug: 'paketler', key: 'pkg2_addon2_name', tr: 'Drone ile Görüntüleme - Kapsamlı', en: 'Drone Imaging - Comprehensive' },
  { pageSlug: 'paketler', key: 'pkg2_addon2_desc', tr: 'Havadan detaylı fotoğraf ve video çekimi', en: 'Detailed aerial photo and video shooting' },
  { pageSlug: 'paketler', key: 'pkg2_addon3_name', tr: 'Drone ile Haritalama, Ortofoto, 3D Model (Sınırlı)', en: 'Drone Mapping, Orthophoto, 3D Model (Limited)' },
  { pageSlug: 'paketler', key: 'pkg2_addon3_desc', tr: 'Parselin sınırlarını, eğimini, ilişkilerini daha net görmek için ölçüm hassasiyeti ön değerlendirme seviyesinde ortofoto veya basit 3D yüzey modeli', en: 'Orthophoto or simple 3D surface model at preliminary evaluation level measurement accuracy to see parcel boundaries, slope, and relationships more clearly' },
  { pageSlug: 'paketler', key: 'pkg2_addon4_name', tr: 'Ek Gayrimenkul İncelemesi', en: 'Additional Property Review' },
  { pageSlug: 'paketler', key: 'pkg2_addon4_desc', tr: 'Aynı bölgede birden fazla gayrimenkul incelemesi için teklif alın. Teslim süresi duruma göre değişiklik gösterebilir.', en: 'Get a quote for multiple property reviews in the same area. Delivery time may vary depending on the situation.' },
  { pageSlug: 'paketler', key: 'pkg2_addon5_name', tr: 'Hızlı Teslimat', en: 'Fast Delivery' },
  { pageSlug: 'paketler', key: 'pkg2_addon5_desc', tr: 'Rapor teslimini saha ziyareti sonrası 2 iş gününe indirin.', en: 'Reduce report delivery to 2 business days after site visit.' },
  { pageSlug: 'paketler', key: 'pkg2_addon5_price', tr: '+7.000 TL + KDV', en: '+7,000 TL + VAT' },

  // ========== PREMIUM (PKG3) ==========
  { pageSlug: 'paketler', key: 'pkg3_title', tr: 'Premium Analiz / Danışmanlık', en: 'Premium Analysis / Consulting' },
  { pageSlug: 'paketler', key: 'pkg3_subtitle', tr: 'Premium Danışmanlık', en: 'Premium Consulting' },
  { pageSlug: 'paketler', key: 'pkg3_desc', tr: 'Standart paketlerin dışında kalan tamamen kişiselleştirilmiş, esnek ve kapsamı birlikte belirlenebilen bir çalışmadır.', en: 'A completely customized, flexible work that is outside of standard packages and the scope of which can be determined together.' },
  { pageSlug: 'paketler', key: 'pkg3_modal_desc', tr: '**Premium Analiz / Danışmanlık Paketi**, standart paketlerin ötesinde, belirli bir gayrimenkul ya da duruma özgü ihtiyaçlar doğrultusunda kurgulanan; **kişiye özel**, **derinleştirilmiş** ve **çok adımlı** bir değerlendirme ve danışmanlık hizmetidir.', en: 'The **Premium Analysis / Consulting Package** is a **personalized**, **in-depth** and **multi-step** evaluation and consulting service designed according to specific real estate or situation-specific needs beyond standard packages.' },
  { pageSlug: 'paketler', key: 'pkg3_delivery', tr: 'Çalışmanın kapsamına göre belirlenir', en: 'Determined according to the scope of work' },
  { pageSlug: 'paketler', key: 'pkg3_price', tr: 'Kapsama göre belirlenir', en: 'Determined according to scope' },

  // Pkg3 - What Includes
  { pageSlug: 'paketler', key: 'pkg3_includes_1_title', tr: 'İhtiyaca göre kurgulanan kişiye özel danışmanlık süreci', en: 'Personalized consulting process designed according to needs' },
  { pageSlug: 'paketler', key: 'pkg3_includes_2_title', tr: 'Gayrimenkule ve senaryoya özgü derinleştirilmiş mimari ve teknik incelemeler', en: 'In-depth architectural and technical inspections specific to real estate and scenario' },
  { pageSlug: 'paketler', key: 'pkg3_includes_3_title', tr: 'Planlama, imar ve mevzuat başlıklarında detaylı değerlendirmeler', en: 'Detailed evaluations in planning, zoning and legislation' },
  { pageSlug: 'paketler', key: 'pkg3_includes_4_title', tr: 'Sürece yayılmış yüz yüze ve/veya online değerlendirme görüşmeleri', en: 'Face-to-face and/or online evaluation meetings spread over the process' },
  { pageSlug: 'paketler', key: 'pkg3_includes_5_title', tr: 'Talep edilmesi halinde, mimari tasarım ve kontrol hizmetleri', en: 'Architectural design and control services, if requested' },

  // Pkg3 - For Whom
  { pageSlug: 'paketler', key: 'pkg3_kimler_1', tr: '"Standart paketler benim ihtiyacıma tam uymuyor" diyen ve duruma özel bir çalışma arayanlar', en: 'Those who say "Standard packages do not fully fit my needs" and are looking for situation-specific work' },
  { pageSlug: 'paketler', key: 'pkg3_kimler_2', tr: 'Daha kapsamlı, uzun soluklu veya karmaşık bir karar süreci olanlar', en: 'Those with a more comprehensive, long-term or complex decision process' },
  { pageSlug: 'paketler', key: 'pkg3_kimler_3', tr: 'Mimari ve teknik açıdan daha derinlemesine değerlendirme ihtiyacı olanlar', en: 'Those who need a more in-depth architectural and technical evaluation' },
  { pageSlug: 'paketler', key: 'pkg3_kimler_4', tr: 'Birden fazla seçenek arasında karşılaştırmalı ve bütüncül analiz isteyenler', en: 'Those who want comparative and holistic analysis among multiple options' },
  { pageSlug: 'paketler', key: 'pkg3_kimler_5', tr: 'Yerinde Analiz paketinin ötesinde daha detaylı saha çalışması gerektiren durumlar', en: 'Situations requiring more detailed fieldwork beyond the On-Site Analysis package' },
  { pageSlug: 'paketler', key: 'pkg3_kimler_6', tr: 'Yer seçimi konusunda danışmanlık isteyenler', en: 'Those who want location selection consulting' },
  { pageSlug: 'paketler', key: 'pkg3_kimler_7', tr: 'Mimari tasarım ve mühendislik hizmetleri talep edenler', en: 'Those who request architectural design and engineering services' },

  // Pkg3 - Add-ons
  { pageSlug: 'paketler', key: 'pkg3_addons_title', tr: 'Danışmanlıklar ve Hizmetler', en: 'Consulting and Services' },
  { pageSlug: 'paketler', key: 'pkg3_addon1_name', tr: 'Mimari Proje Çizimi', en: 'Architectural Project Drawing' },
  { pageSlug: 'paketler', key: 'pkg3_addon1_desc', tr: 'Avan proje hazırlanması', en: 'Preliminary project preparation' },
  { pageSlug: 'paketler', key: 'pkg3_addon2_name', tr: 'Uygulama Kontrollüğü', en: 'Application Control' },
  { pageSlug: 'paketler', key: 'pkg3_addon2_desc', tr: 'Uygulama sürecinin proje ve teknik kriterlere uygunluğunun yerinde takibi ve raporlaması', en: 'On-site monitoring and reporting of the application process for compliance with project and technical criteria' },
  { pageSlug: 'paketler', key: 'pkg3_addon3_name', tr: '3D Modelleme ve Görselleştirme', en: '3D Modeling and Visualization' },
  { pageSlug: 'paketler', key: 'pkg3_addon3_desc', tr: 'Projenizin 3 boyutlu görselleştirilmesi', en: '3D visualization of your project' },
  { pageSlug: 'paketler', key: 'pkg3_addon4_name', tr: 'İmar Danışmanlığı', en: 'Zoning Consulting' },
  { pageSlug: 'paketler', key: 'pkg3_addon4_desc', tr: 'İmar değişikliği ve izin süreçleri danışmanlığı', en: 'Zoning change and permit processes consulting' },
  { pageSlug: 'paketler', key: 'pkg3_addon5_name', tr: 'Tadilat Proje Yönetimi', en: 'Renovation Project Management' },
  { pageSlug: 'paketler', key: 'pkg3_addon5_desc', tr: 'Tadilat sürecinin proje ve teknik kriterlere uygunluğunun yerinde takibi ve raporlaması', en: 'On-site monitoring and reporting of the renovation process for compliance with project and technical criteria' },
  { pageSlug: 'paketler', key: 'pkg3_addon6_name', tr: 'Çoklu Gayrimenkul Karşılaştırması', en: 'Multiple Property Comparison' },
  { pageSlug: 'paketler', key: 'pkg3_addon6_desc', tr: 'Birden fazla seçenek için karşılaştırmalı analiz', en: 'Comparative analysis for multiple options' },

  // ========== SSS ==========
  { pageSlug: 'sss', key: 'page_title', tr: 'Sıkça Sorulan Sorular', en: 'Frequently Asked Questions' },
  { pageSlug: 'sss', key: 'page_subtitle', tr: 'Yerinde Analiz hakkında merak edilen her şey', en: 'Everything you wonder about Yerinde Analiz' },
  { pageSlug: 'sss', key: 'cta_text', tr: 'Sorunuzun cevabını bulamadınız mı?', en: "Couldn't find the answer to your question?" },
  { pageSlug: 'sss', key: 'cta_button', tr: 'Bize Ulaşın', en: 'Contact Us' },

  // ========== İLETİŞİM ==========
  { pageSlug: 'iletisim', key: 'page_title', tr: 'İletişim', en: 'Contact' },
  { pageSlug: 'iletisim', key: 'page_subtitle', tr: 'Stratejik danışmanlık ve yerinde analiz hizmetlerimiz için talebinizi oluşturun, en kısa sürede sizinle iletişime geçelim.', en: 'Create your request for our strategic consulting and on-site analysis services, and we will contact you as soon as possible.' },
  { pageSlug: 'iletisim', key: 'reach_us_title', tr: 'Bize Ulaşın', en: 'Reach Us' },
  { pageSlug: 'iletisim', key: 'reach_us_desc', tr: 'Sorularınız için aşağıdaki iletişim bilgilerini kullanabilir veya yanıdaki formu doldurarak talebinizi iletebilirsiniz.', en: 'You can use the contact information below for your questions or submit your request by filling out the form.' },
  { pageSlug: 'iletisim', key: 'email_label', tr: 'E-posta', en: 'Email' },
  { pageSlug: 'iletisim', key: 'email_value', tr: 'info@yerindeanaliz.com', en: 'info@yerindeanaliz.com' },
  { pageSlug: 'iletisim', key: 'location_label', tr: 'Konum', en: 'Location' },
  { pageSlug: 'iletisim', key: 'location_value', tr: 'Akarca Mah. Mustafa Kemal Bulvarı No:158A Fethiye/Muğla', en: 'Akarca Mah. Mustafa Kemal Bulvarı No:158A Fethiye/Muğla' },
  { pageSlug: 'iletisim', key: 'hours_label', tr: 'Çalışma Saatleri', en: 'Working Hours' },
  { pageSlug: 'iletisim', key: 'hours_value', tr: 'Hafta içi 09:00 - 18:00', en: 'Weekdays 09:00 - 18:00' },
  { pageSlug: 'iletisim', key: 'process_title', tr: 'Süreç Nasıl İşliyor?', en: 'How Does the Process Work?' },
  { pageSlug: 'iletisim', key: 'process_step1', tr: 'Formu doldurun ve talebinizi iletin', en: 'Fill out the form and submit your request' },
  { pageSlug: 'iletisim', key: 'process_step2', tr: 'Talebiniz 24 saat içerisinde değerlendirilir, gerekirse kısa görüşme yapılır (ücretsiz)', en: 'Your request is evaluated within 24 hours, a brief meeting is held if necessary (free)' },
  { pageSlug: 'iletisim', key: 'process_step3', tr: 'Teklifiniz ve hizmet sözleşmesi onayınıza sunulur', en: 'Your offer and service agreement are submitted for your approval' },
  { pageSlug: 'iletisim', key: 'process_step4', tr: 'Onayınız ve ödemenin tamamlanmasıyla birlikte rapor süreci başlamış olur', en: 'The report process begins with your approval and completion of payment' },

  // ========== FOOTER ==========
  { pageSlug: 'footer', key: 'copyright', tr: '© 2025 Yerinde Analiz. Tüm hakları saklıdır.', en: '© 2025 Yerinde Analiz. All rights reserved.' },
  { pageSlug: 'footer', key: 'privacy', tr: 'Gizlilik Politikası', en: 'Privacy Policy' },
  { pageSlug: 'footer', key: 'terms', tr: 'Kullanım Koşulları', en: 'Terms of Use' },
  { pageSlug: 'footer', key: 'tagline', tr: 'Stratejik Danışmanlık', en: 'Strategic Consulting' },

  // ========== NAVBAR ==========
  { pageSlug: 'navbar', key: 'home', tr: 'Ana Sayfa', en: 'Home' },
  { pageSlug: 'navbar', key: 'about', tr: 'Hakkımızda', en: 'About Us' },
  { pageSlug: 'navbar', key: 'packages', tr: 'Paketler', en: 'Packages' },
  { pageSlug: 'navbar', key: 'faq', tr: 'S.S.S.', en: 'FAQ' },
  { pageSlug: 'navbar', key: 'contact', tr: 'İletişim', en: 'Contact' },
]

export async function GET() {
  const results: string[] = []

  try {
    // Test connection
    await prisma.$connect()
    results.push('✅ Database connection successful')

    // Create tables using raw SQL
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "User" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "username" TEXT NOT NULL UNIQUE,
        "password" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `)
    results.push('✅ User table created')

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Session" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "userId" TEXT NOT NULL,
        "token" TEXT NOT NULL UNIQUE,
        "expiresAt" TIMESTAMP(3) NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
      )
    `)
    results.push('✅ Session table created')

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "ContactSubmission" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "firstName" TEXT NOT NULL,
        "lastName" TEXT NOT NULL,
        "phone" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "package" TEXT NOT NULL,
        "propertyType" TEXT NOT NULL,
        "purpose" TEXT,
        "parcelInfo" TEXT,
        "listingUrl" TEXT,
        "notes" TEXT,
        "kvkkAccepted" BOOLEAN NOT NULL DEFAULT false,
        "isRead" BOOLEAN NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `)
    results.push('✅ ContactSubmission table created')

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "PageContent" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "pageSlug" TEXT NOT NULL,
        "key" TEXT NOT NULL,
        "tr" TEXT NOT NULL,
        "en" TEXT NOT NULL,
        CONSTRAINT "PageContent_pageSlug_key_key" UNIQUE ("pageSlug", "key")
      )
    `)
    results.push('✅ PageContent table created')

    // Create admin user
    const existingUser = await prisma.user.findUnique({
      where: { username: 'yerindeanaliz' }
    })

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('analizyerindeqwer1928', 10)
      await prisma.user.create({
        data: {
          username: 'yerindeanaliz',
          password: hashedPassword
        }
      })
      results.push('✅ Admin user created (yerindeanaliz)')
    } else {
      results.push('ℹ️ Admin user already exists')
    }

    // Seed all content
    let contentCreated = 0

    for (const content of seedContent) {
      try {
        await prisma.pageContent.upsert({
          where: {
            pageSlug_key: {
              pageSlug: content.pageSlug,
              key: content.key,
            }
          },
          create: {
            pageSlug: content.pageSlug,
            key: content.key,
            tr: content.tr,
            en: content.en,
          },
          update: {
            tr: content.tr,
            en: content.en,
          }
        })
        contentCreated++
      } catch (e) {
        console.error(`Error seeding ${content.key}:`, e)
      }
    }

    results.push(`✅ Content seeded: ${contentCreated} items created/updated`)

    return NextResponse.json({
      success: true,
      message: 'Database setup and content seeding completed!',
      results,
      contentCount: seedContent.length
    })

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    results.push(`❌ Error: ${errorMessage}`)

    return NextResponse.json({
      success: false,
      error: errorMessage,
      results
    }, { status: 500 })
  }
}
