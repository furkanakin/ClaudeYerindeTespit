require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const content = [
    // Anasayfa
    { pageSlug: 'anasayfa', key: 'hero_subtitle', label: 'Hero Alt Başlık', tr: "Muğla'da", en: "In Muğla" },
    { pageSlug: 'anasayfa', key: 'hero_title_main', label: 'Hero Ana Başlık', tr: "Gayrimenkul Yatırımlarınız İçin", en: "For Your Real Estate Investments" },
    { pageSlug: 'anasayfa', key: 'hero_title_highlight', label: 'Hero Vurgulu Başlık', tr: "Bağımsız, Teknik, Detaylı", en: "Independent, Technical, Detailed" },
    { pageSlug: 'anasayfa', key: 'hero_title_suffix', label: 'Hero Başlık Sonu', tr: "İncelemeler", en: "Analyses" },
    { pageSlug: 'anasayfa', key: 'hero_description_1', label: 'Hero Açıklama 1', tr: "Gayrimenkul alım süreçlerinde tarafsız incelemelerle kapsamlı bilgi sunuyoruz.", en: "We provide comprehensive information through impartial reviews in real estate acquisition processes." },
    { pageSlug: 'anasayfa', key: 'hero_description_2', label: 'Hero Açıklama 2', tr: "Bağımsız analizlerle karar sürecinizi destekliyoruz.", en: "We support your decision-making process with independent analyses." },
    { pageSlug: 'anasayfa', key: 'hero_cta', label: 'Hero Buton Yazısı', tr: "Paketleri İnceleyin", en: "Inspect Packages" },

    // Manifesto
    { pageSlug: 'anasayfa', key: 'manifesto_text_1', label: 'Manifesto Metni 1', tr: " yatırım sürecinizde uzun vadeli hedeflerinize en uygun yolu belirlemenize yardımcı olan, riskleri azaltan ve doğru kararları destekleyen profesyonel bir yönlendirme hizmetidir.", en: " is a professional guidance service that helps you determine the most suitable path for your long-term goals in your investment process, reduces risks, and supports correct decisions." },
    { pageSlug: 'anasayfa', key: 'manifesto_text_2_bold', label: 'Manifesto Vurgu 2', tr: "Arazi, konut veya proje seçimlerinde", en: "In land, housing or project selections" },
    { pageSlug: 'anasayfa', key: 'manifesto_text_3', label: 'Manifesto Metni 3', tr: " mevcut durumun analizini yapar ve size özel bir yol haritası sunar.", en: " analyzes the current situation and offers you a special roadmap." },

    // Hakkımızda
    { pageSlug: 'hakkimizda', key: 'header_title', label: 'Sayfa Başlığı', tr: 'Hakkımızda', en: 'About Us' },
    {
        pageSlug: 'hakkimizda',
        key: 'header_description',
        label: 'Sayfa Alt Başlığı',
        tr: 'Mimarlık ve mühendislik temelli, bağımsız ve tarafsız bilgi hizmeti sunan bir danışmanlık platformu',
        en: 'A consultancy platform based on architecture and engineering, providing independent and impartial information services'
    },
    { pageSlug: 'hakkimizda', key: 'story_title', label: 'Hikayemiz Başlık', tr: 'Hikayemiz', en: 'Our Story' },
    {
        pageSlug: 'hakkimizda',
        key: 'story_p1',
        label: 'Hikaye Paragraf 1',
        tr: 'Uzun yıllar boyunca mimarlık ve mühendislik alanlarında edindiğimiz profesyonel deneyimin ardından İstanbul’dan Muğla’ya taşındık. Hem kendi yer arayışımızda hem de çevremize destek verdiğimiz dönemlerde fark ettik ki, birçok kişi çoğu zaman güvenilir bilgiye, tarafsız değerlendirmeye ve profesyonel bakış açısına ulaşmakta zorlanıyor.',
        en: 'After years of professional experience in architecture and engineering, we moved from Istanbul to Muğla. During our own search for a place and while supporting those around us, we noticed that many people often struggle to access reliable information, impartial evaluation, and a professional perspective.'
    },
    {
        pageSlug: 'hakkimizda',
        key: 'story_p2',
        label: 'Hikaye Paragraf 2',
        tr: 'Yerinde Analiz, tam da bu ihtiyaçtan doğdu.',
        en: 'Yerinde Analiz was born out of this very need.'
    },
    {
        pageSlug: 'hakkimizda',
        key: 'story_p3',
        label: 'Hikaye Paragraf 3',
        tr: 'Bir bölgenin, yapının veya arsanın görünen ve görünmeyen tüm yönlerini titizlikle inceliyoruz. Mimari, kentsel, çevresel, teknik ve hukuki pek çok veriyi bir araya getirerek anlaşılır ve yol gösterici raporlara dönüştüren bir danışmanlık hizmeti sunuyoruz.',
        en: 'We meticulously examine all visible and invisible aspects of a region, structure, or plot. We provide a consultancy service that combines various architectural, urban, environmental, technical, and legal data into clear and guiding reports.'
    },
    {
        pageSlug: 'hakkimizda',
        key: 'story_p4',
        label: 'Hikaye Paragraf 4',
        tr: 'Amacımız, gayrimenkul kararlarında kişiye “ne yapması gerektiğini söylemek” değil, kişinin en doğru kararı verebilmesi için sağlam bir bilgi zemini oluşturmaktır. Böylece satın alma, yatırım, yerleşme ya da yenileme kararlarında ihtiyaç duyulan bilgileri kapsamlı, anlaşılır ve uygulanabilir biçimde aktarıyoruz.',
        en: 'Our goal is not to "tell the person what to do" in real estate decisions, but to create a solid information base so that the person can make the most accurate decision. Thus, we convey the information needed in purchase, investment, settlement, or renovation decisions in a comprehensive, clear, and applicable way.'
    },
    {
        pageSlug: 'hakkimizda',
        key: 'story_p5',
        label: 'Hikaye Paragraf 5',
        tr: 'Yerinde Analiz danışmanlık hizmetleriyle “bilgiye ulaşmak zor” algısını değiştirerek herkes için güvenilir, profesyonel ve erişilebilir bir yol arkadaşlığı sunuyoruz.',
        en: 'With Yerinde Analiz consultancy services, we change the perception that "information is hard to reach" and offer a reliable, professional, and accessible companionship for everyone.'
    },
    {
        pageSlug: 'hakkimizda',
        key: 'story_p6',
        label: 'Hikaye Paragraf 6',
        tr: 'Tüm bu analitik sürecin yanı sıra, ihtiyaç duyan kullanıcılar için mimari tasarım, uygulama ve mühendislik hizmetleriyle de süreci bütünsel olarak destekleyebiliyoruz.',
        en: 'In addition to all this analytical process, we can also support the process holistically with architectural design, application, and engineering services for users who need them.'
    },
    {
        pageSlug: 'hakkimizda',
        key: 'story_signature',
        label: 'Hikaye İmza',
        tr: 'Yerinde Analiz, bağımsız ve tarafsız bilgi hizmeti sunan bir danışmanlık platformudur.',
        en: 'Yerinde Analiz is a consultancy platform providing independent and impartial information services.'
    },

    // İletişim
    { pageSlug: 'iletisim', key: 'header_title', label: 'Sayfa Başlığı', tr: 'İletişim', en: 'Contact' },
    {
        pageSlug: 'iletisim',
        key: 'header_description',
        label: 'Sayfa Alt Başlığı',
        tr: 'Stratejik danışmanlık ve yerinde analiz hizmetlerimiz için talebinizi oluşturun, en kısa sürede sizinle iletişime geçelim.',
        en: 'Create your request for our strategic consultancy and on-site analysis services, we will contact you as soon as possible.'
    },
    { pageSlug: 'iletisim', key: 'info_title', label: 'Bilgi Başlığı', tr: 'Bize Ulaşın', en: 'Contact Us' },
    {
        pageSlug: 'iletisim',
        key: 'info_description',
        label: 'Bilgi Açıklaması',
        tr: 'Sorularınız için aşağıdaki iletişim bilgilerini kullanabilir veya yandaki formu doldurarak talebinizi iletebilirsiniz.',
        en: 'You can use the contact information below for your questions or submit your request by filling out the form on the side.'
    },

    // Paketler
    { pageSlug: 'paketler', key: 'header_title', label: 'Sayfa Başlığı', tr: 'Paketlerimiz', en: 'Our Packages' },
    {
        pageSlug: 'paketler',
        key: 'header_description',
        label: 'Sayfa Alt Başlığı',
        tr: 'İhtiyacınıza uygun paketi seçin, profesyonel danışmanlık hizmetimizden yararlanın',
        en: 'Choose the package that suits your needs, benefit from our professional consultancy service'
    },

    // SSS
    { pageSlug: 'sss', key: 'header_title', label: 'Sayfa Başlığı', tr: 'Sıkça Sorulan Sorular', en: 'Frequently Asked Questions' },
    {
        pageSlug: 'sss',
        key: 'header_description',
        label: 'Sayfa Alt Başlığı',
        tr: 'Yerinde Analiz hakkında merak edilen her şey',
        en: 'Everything you wonder about Yerinde Analiz'
    },
];

async function main() {
    for (const item of content) {
        await prisma.pageContent.upsert({
            where: { pageSlug_key: { pageSlug: item.pageSlug, key: item.key } },
            update: { tr: item.tr, en: item.en },
            create: {
                pageSlug: item.pageSlug,
                key: item.key,
                tr: item.tr,
                en: item.en
            },
        });
    }
    console.log('Page content seeded successfully.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
