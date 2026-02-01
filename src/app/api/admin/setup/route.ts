import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// All website content with Turkish and English translations
const seedContent = [
  // ========== ANASAYFA ==========
  { pageSlug: 'anasayfa', key: 'hero_location', tr: "Muğla'da", en: 'In Muğla' },
  { pageSlug: 'anasayfa', key: 'hero_title', tr: 'Gayrimenkul Yatırımlarınız İçin Bağımsız, Teknik, Detaylı İncelemeler', en: 'Independent, Technical, Detailed Reviews for Your Real Estate Investments' },
  { pageSlug: 'anasayfa', key: 'hero_highlight', tr: 'Bağımsız, Teknik, Detaylı', en: 'Independent, Technical, Detailed' },
  { pageSlug: 'anasayfa', key: 'hero_desc1', tr: 'Gayrimenkul alım süreçlerinde tarafsız incelemelerle kapsamlı bilgi sunuyoruz.', en: 'We provide comprehensive information with impartial reviews in real estate purchasing processes.' },
  { pageSlug: 'anasayfa', key: 'hero_desc2', tr: 'Bağımsız analizlerle karar sürecinizi destekliyoruz.', en: 'We support your decision-making process with independent analysis.' },
  { pageSlug: 'anasayfa', key: 'hero_cta', tr: 'Paketleri İnceleyin', en: 'View Packages' },

  // Manifesto Section
  { pageSlug: 'anasayfa', key: 'manifesto_text', tr: 'Yerinde Analiz, yatırım sürecinizde uzun vadeli hedeflerinize en uygun yolu belirlemenize yardımcı olan, riskleri azaltan ve doğru kararları destekleyen profesyonel bir yönlendirme hizmetidir. Arazi, konut veya proje seçimlerinde mevcut durumun analizini yapar ve size özel bir yol haritası sunar.', en: 'Yerinde Analiz is a professional guidance service that helps you determine the most suitable path for your long-term goals in your investment process, reduces risks, and supports correct decisions. It analyzes the current situation in land, housing, or project selections and offers you a customized roadmap.' },

  // Why Us Section
  { pageSlug: 'anasayfa', key: 'whyus_title', tr: 'Neden Yerinde Analiz?', en: 'Why Yerinde Analiz?' },
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
  { pageSlug: 'anasayfa', key: 'howwework_title', tr: 'Nasıl Çalışıyoruz?', en: 'How Do We Work?' },
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

  // ========== PAKETLER ==========
  { pageSlug: 'paketler', key: 'page_title', tr: 'Hizmet Paketlerimiz', en: 'Our Service Packages' },
  { pageSlug: 'paketler', key: 'page_subtitle', tr: 'İhtiyacınıza uygun paketi seçin, profesyonel danışmanlık hizmetimizden yararlanın', en: 'Choose the package that suits your needs and benefit from our professional consulting service' },

  // Ön Analiz Package
  { pageSlug: 'paketler', key: 'pkg1_title', tr: 'Ön Analiz', en: 'Pre-Analysis' },
  { pageSlug: 'paketler', key: 'pkg1_subtitle', tr: 'Temel Paket', en: 'Basic Package' },
  { pageSlug: 'paketler', key: 'pkg1_desc', tr: 'Ön analiz verilerini yerinde yapılan mimari ve teknik incelemelerle derinleştiren kapsamlı bir değerlendirmedir.', en: 'A comprehensive evaluation that deepens pre-analysis data with on-site architectural and technical inspections.' },
  { pageSlug: 'paketler', key: 'pkg1_modal_desc', tr: 'Ön Analiz Paketi, bir arsa ya da yapının konumu, çevresel bağlamı, temel riskleri ve imar durumunu mevcut dijital veriler üzerinden genel çerçevede değerlendirerek, karar sürecinin başlangıcında yol gösterici bir çerçeve sunar.', en: 'The Pre-Analysis Package offers a guiding framework at the beginning of the decision process by evaluating the location, environmental context, basic risks, and zoning status of a plot or building through existing digital data.' },
  { pageSlug: 'paketler', key: 'pkg1_delivery', tr: 'Max. 2 gün', en: 'Max. 2 days' },
  { pageSlug: 'paketler', key: 'pkg1_price', tr: '4.500 TL + KDV', en: '4,500 TL + VAT' },

  // Yerinde Analiz Package
  { pageSlug: 'paketler', key: 'pkg2_title', tr: 'Yerinde Analiz', en: 'On-Site Analysis' },
  { pageSlug: 'paketler', key: 'pkg2_subtitle', tr: 'Kapsamlı Paket', en: 'Comprehensive Package' },
  { pageSlug: 'paketler', key: 'pkg2_desc', tr: 'Bir arsa ya da yapıyla ilgili karar vermeden önce ön analiz verilerini yerinde yapılan mimari ve teknik incelemelerle derinleştiren kapsamlı bir değerlendirmedir.', en: 'A comprehensive evaluation that deepens pre-analysis data with on-site architectural and technical inspections before making a decision about a plot or building.' },
  { pageSlug: 'paketler', key: 'pkg2_modal_desc', tr: 'Yerinde Analiz Paketi, ön analiz kapsamında elde edilen verileri yerinde yapılan mimari ve teknik incelemelerle birleştirerek, arsa ya da yapının mevcut durumuna ilişkin daha kapsamlı bir değerlendirme sunar.', en: 'The On-Site Analysis Package offers a more comprehensive evaluation of the current condition of the plot or building by combining the data obtained within the scope of pre-analysis with on-site architectural and technical inspections.' },
  { pageSlug: 'paketler', key: 'pkg2_delivery', tr: 'Saha ziyareti gerçekleştikten sonra max. 3-4 iş günü', en: 'Max. 3-4 business days after site visit' },
  { pageSlug: 'paketler', key: 'pkg2_price', tr: '15.000 TL + KDV', en: '15,000 TL + VAT' },

  // Premium Package
  { pageSlug: 'paketler', key: 'pkg3_title', tr: 'Premium Analiz / Danışmanlık', en: 'Premium Analysis / Consulting' },
  { pageSlug: 'paketler', key: 'pkg3_subtitle', tr: 'Premium Danışmanlık', en: 'Premium Consulting' },
  { pageSlug: 'paketler', key: 'pkg3_desc', tr: 'Standart paketlerin dışında kalan tamamen kişiselleştirilmiş, esnek ve kapsamı birlikte belirlenebilen bir çalışmadır.', en: 'A completely customized, flexible work that is outside of standard packages and the scope of which can be determined together.' },
  { pageSlug: 'paketler', key: 'pkg3_modal_desc', tr: 'Premium Analiz / Danışmanlık Paketi, standart paketlerin ötesinde, belirli bir gayrimenkul ya da duruma özgü ihtiyaçlar doğrultusunda kurgulanan; kişiye özel, derinleştirilmiş ve çok adımlı bir değerlendirme ve danışmanlık hizmetidir.', en: 'The Premium Analysis / Consulting Package is a personalized, in-depth and multi-step evaluation and consulting service designed according to specific real estate or situation-specific needs beyond standard packages.' },
  { pageSlug: 'paketler', key: 'pkg3_delivery', tr: 'Çalışmanın kapsamına göre belirlenir', en: 'Determined according to the scope of work' },
  { pageSlug: 'paketler', key: 'pkg3_price', tr: 'Kapsama göre belirlenir', en: 'Determined according to scope' },

  // ========== SSS ==========
  { pageSlug: 'sss', key: 'page_title', tr: 'Sık Sorulan Sorular', en: 'Frequently Asked Questions' },
  { pageSlug: 'sss', key: 'page_subtitle', tr: 'Merak ettiklerinizi yanıtlıyoruz', en: 'We answer your questions' },
  { pageSlug: 'sss', key: 'cta_text', tr: 'Başka sorularınız mı var?', en: 'Do you have other questions?' },
  { pageSlug: 'sss', key: 'cta_button', tr: 'Bize Ulaşın', en: 'Contact Us' },

  // ========== İLETİŞİM ==========
  { pageSlug: 'iletisim', key: 'page_title', tr: 'İletişim', en: 'Contact' },
  { pageSlug: 'iletisim', key: 'page_subtitle', tr: 'Sizinle iletişime geçmek için sabırsızlanıyoruz', en: 'We are looking forward to contacting you' },
  { pageSlug: 'iletisim', key: 'form_title', tr: 'Talep Formu', en: 'Request Form' },
  { pageSlug: 'iletisim', key: 'form_subtitle', tr: 'Formu doldurarak sizinle iletişime geçmemizi sağlayın', en: 'Fill out the form to allow us to contact you' },
  { pageSlug: 'iletisim', key: 'address_title', tr: 'Adres', en: 'Address' },
  { pageSlug: 'iletisim', key: 'address_value', tr: 'Tuzla Mah. 520 Sok. No:3 Kat:2/5 Fethiye/Muğla', en: 'Tuzla Mah. 520 Sok. No:3 Kat:2/5 Fethiye/Muğla' },
  { pageSlug: 'iletisim', key: 'email_title', tr: 'E-posta', en: 'Email' },
  { pageSlug: 'iletisim', key: 'phone_title', tr: 'Telefon', en: 'Phone' },

  // ========== FOOTER ==========
  { pageSlug: 'footer', key: 'copyright', tr: '© 2025 Yerinde Analiz. Tüm hakları saklıdır.', en: '© 2025 Yerinde Analiz. All rights reserved.' },
  { pageSlug: 'footer', key: 'privacy', tr: 'Gizlilik Politikası', en: 'Privacy Policy' },
  { pageSlug: 'footer', key: 'terms', tr: 'Kullanım Koşulları', en: 'Terms of Use' },
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
    let contentUpdated = 0

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
      } catch {
        contentUpdated++
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
