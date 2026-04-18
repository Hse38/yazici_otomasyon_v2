"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  suggestions?: string[];
};

export type Language = "tr" | "en";

export type ChatbotContext = {
  messages: Message[];
  isOpen: boolean;
  isLoading: boolean;
  pageContext: string;
  language: Language;
  conversationMemory: {
    interests: string[];
    serviceType?: string;
    mentionedTopics: string[];
  };
  openChat: () => void;
  closeChat: () => void;
  sendMessage: (content: string) => Promise<void>;
  setPageContext: (context: string) => void;
  setLanguage: (lang: Language) => void;
  clearMemory: () => void;
};

const ChatbotContext = createContext<ChatbotContext | undefined>(undefined);

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageContext, setPageContextState] = useState("home");
  const [language, setLanguageState] = useState<Language>("en");
  const [conversationMemory, setConversationMemory] = useState({
    interests: [] as string[],
    serviceType: undefined as string | undefined,
    mentionedTopics: [] as string[],
  });

  const openChat = useCallback(() => {
    setIsOpen(true);
    // Restore open state from localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("chatbot-open", "true");
    }
    // Initialize with welcome message if empty
    if (messages.length === 0) {
      const welcomeMessages = {
        en: {
          content:
            "I'm the Yazıcı Otomasyon assistant. I can guide you through our industrial automation products, technical topics, and how to reach our team.\n\nHow can I help you today?",
          suggestions: [
            "What products do you offer?",
            "I need help choosing a drive or field device",
            "How do I request a quote or call you?",
          ],
        },
        tr: {
          content:
            "Yazıcı Otomasyon asistanıyım. Endüstriyel otomasyon ürünlerimiz, teknik konular ve ekibimize ulaşım hakkında yönlendirme yapabilirim.\n\nBugün nasıl yardımcı olabilirim?",
          suggestions: [
            "Hangi ürünleri sunuyorsunuz?",
            "Sürücü veya saha ekipmanı seçiminde yardım istiyorum",
            "Teklif veya telefon ile nasıl iletişime geçerim?",
          ],
        },
      };

      const welcomeMessage: Message = {
        id: "welcome",
        role: "assistant",
        content: welcomeMessages[language].content,
        timestamp: new Date(),
        suggestions: welcomeMessages[language].suggestions,
      };
      setMessages([welcomeMessage]);
    }
  }, [messages.length, language]);

  const closeChat = useCallback(() => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("chatbot-open", "false");
    }
  }, []);

  const setPageContext = useCallback((context: string) => {
    setPageContextState(context);
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    // Clear messages when language changes to show new welcome message
    setMessages([]);
  }, []);

  const clearMemory = useCallback(() => {
    setConversationMemory({
      interests: [],
      serviceType: undefined,
      mentionedTopics: [],
    });
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      // Update memory based on user message
      const lowerContent = content.toLowerCase();
      const newInterests: string[] = [];
      const newTopics: string[] = [];

      if (
        lowerContent.includes("sürücü") ||
        lowerContent.includes("drive") ||
        lowerContent.includes("vfd") ||
        lowerContent.includes("inverter") ||
        lowerContent.includes("frekans")
      ) {
        newInterests.push("motor drives");
        newTopics.push("drives");
        setConversationMemory((prev) => ({
          ...prev,
          serviceType: "motor drive / inverter",
        }));
      }
      if (
        lowerContent.includes("plc") ||
        lowerContent.includes("scada") ||
        lowerContent.includes("hmi") ||
        lowerContent.includes("operatör") ||
        lowerContent.includes("kontrolör")
      ) {
        newInterests.push("control");
        newTopics.push("plc hmi");
        setConversationMemory((prev) => ({
          ...prev,
          serviceType: "PLC / HMI / control",
        }));
      }
      if (lowerContent.includes("motor") || lowerContent.includes("redüktör") || lowerContent.includes("gearbox")) {
        newInterests.push("motion");
        newTopics.push("motors");
        setConversationMemory((prev) => ({ ...prev, serviceType: "motor & motion" }));
      }
      if (
        lowerContent.includes("sensor") ||
        lowerContent.includes("sensör") ||
        lowerContent.includes("encoder") ||
        lowerContent.includes("fieldbus") ||
        lowerContent.includes("saha")
      ) {
        newInterests.push("field");
        newTopics.push("sensors field");
        setConversationMemory((prev) => ({ ...prev, serviceType: "field devices & sensing" }));
      }
      if (lowerContent.includes("kablo") || lowerContent.includes("cable") || lowerContent.includes("konnektör")) {
        newInterests.push("connectivity");
        newTopics.push("cables");
        setConversationMemory((prev) => ({ ...prev, serviceType: "cables & connectivity" }));
      }
      if (lowerContent.includes("panel") || lowerContent.includes("pano") || lowerContent.includes("şalter")) {
        newInterests.push("panels");
        newTopics.push("electrical panels");
        setConversationMemory((prev) => ({ ...prev, serviceType: "panels & power" }));
      }
      if (
        lowerContent.includes("capacity") ||
        lowerContent.includes("kapasite") ||
        lowerContent.includes("stok") ||
        lowerContent.includes("stock") ||
        lowerContent.includes("lead time") ||
        lowerContent.includes("termin")
      ) {
        newInterests.push("availability");
        newTopics.push("stock lead time");
      }
      if (
        lowerContent.includes("quote") ||
        lowerContent.includes("teklif") ||
        lowerContent.includes("pricing") ||
        lowerContent.includes("fiyat")
      ) {
        newInterests.push("pricing");
        newTopics.push("quotation");
      }
      if (
        lowerContent.includes("spec") ||
        lowerContent.includes("teknik") ||
        lowerContent.includes("datasheet") ||
        lowerContent.includes("kurulum") ||
        lowerContent.includes("commissioning")
      ) {
        newTopics.push("technical specs");
      }
      if (
        lowerContent.includes("logistics") ||
        lowerContent.includes("lojistik") ||
        lowerContent.includes("delivery") ||
        lowerContent.includes("teslimat") ||
        lowerContent.includes("kargo")
      ) {
        newTopics.push("shipping");
      }

      setConversationMemory((prev) => ({
        ...prev,
        interests: [...new Set([...prev.interests, ...newInterests])],
        mentionedTopics: [...new Set([...prev.mentionedTopics, ...newTopics])],
      }));

      // Simulate AI response delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Generate intelligent response based on context and memory
      const response = generateResponse(content, pageContext, conversationMemory, language);

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response.content,
        timestamp: new Date(),
        suggestions: response.suggestions,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    },
    [pageContext, conversationMemory, language]
  );

  // Restore open state on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("chatbot-open");
      if (saved === "true") {
        setIsOpen(true);
      }
    }
  }, []);

  // Sync language with localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("lang");
      if (stored === "tr" || stored === "en") {
        setLanguageState(stored);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", language);
    }
  }, [language]);

  return (
    <ChatbotContext.Provider
      value={{
        messages,
        isOpen,
        isLoading,
        pageContext,
        language,
        conversationMemory,
        openChat,
        closeChat,
        sendMessage,
        setPageContext,
        setLanguage,
        clearMemory,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
}

export function useChatbot() {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error("useChatbot must be used within ChatbotProvider");
  }
  return context;
}

// Copy for industrial automation assistant (mock responses)
const t = {
  en: {
    serviceDetail: {
      process: (serviceType: string) => ({
        content: `For ${serviceType}, a typical engagement looks like this:\n\n1. Application review\n   • Load, environment, network/power constraints\n   • Standards and integration points\n\n2. Product selection\n   • Matching catalog items to your BOM\n   • Alternatives where stock or lead time matters\n\n3. Quotation & alignment\n   • Commercial terms and delivery schedule\n   • Optional commissioning support\n\n4. Supply & documentation\n   • Datasheets, certificates on request\n   • Packing and shipment coordination\n\n5. After-sales\n   • Technical questions via phone/WhatsApp\n   • Reorders and spare guidance\n\nWhich step should we go deeper on?`,
        suggestions: [
          "What do you need for a quote?",
          "Typical lead times?",
          "Do you support commissioning?",
        ],
      }),
      pricing: (serviceType: string) => ({
        content: `Pricing for ${serviceType} depends on:\n• Manufacturer, range, and options\n• Quantity and project framing\n• Warranty, certificates, and Incoterms\n• Stock vs. factory order\n\nThe fastest path is a short call or WhatsApp with your part list / motor plate photo. Shall we go there?`,
        suggestions: [
          "Yes — how do I send a part list?",
          "What details shorten quoting?",
          "Do you ship across Turkey?",
        ],
      }),
      capacity: (serviceType: string) => ({
        content: `For ${serviceType}, availability is case-by-case:\n• We optimize for honest lead times, not inflated guest counts.\n• Stock programs rotate; tell us priority lines.\n• Project bundles (drives + accessories) can ship together when planned.\n\nShare SKU or a photo of nameplates and we'll outline options.`,
        suggestions: [
          "I need something urgently",
          "Stock vs. factory order?",
          "Can you cross-reference brands?",
        ],
      }),
    },
    serviceList: {
      categories: {
        content: `We list six product lines on the site (Ürünler / Products):\n\n• Industrial drives & motion accessories\n• Control, PLC/HMI, and supervision building blocks\n• Motors, mechanics, and power transmission\n• Field devices, sensors, and industrial networking\n• Power, protection, and panel hardware\n• Cables, connectors, and installation consumables\n\nOpen each card for photos and narrative. Which line matches your project?`,
        suggestions: [
          "Compare drives vs. soft starters",
          "I need fieldbus device advice",
          "Walk me through requesting a quote",
        ],
      },
    },
    general: {
      process: {
        content: `How we usually work:\n\n1. Understand the application (motor data, voltage, environment).\n2. Shortlist products from our range or equivalent lines.\n3. Quote with lead time and commercial terms.\n4. Supply with documentation; support basic commissioning questions.\n5. Stay available for follow-up orders.\n\nTell me your voltage, power, and control platform if you want sharper guidance.`,
        suggestions: [
          "What info do you need up front?",
          "Typical response time?",
          "Do you visit sites?",
        ],
      },
      services: {
        content: `Yazıcı Otomasyon supplies industrial automation products with clear technical guidance:\n\n• Curated catalog-style offerings (six featured product families on the homepage)\n• Sizing and compatibility pointers for common drive/motor/control questions\n• Quotation and logistics handled directly by our team\n• Phone +90 553 056 89 39 and WhatsApp for fast answers\n\nWhich product family should we open first?`,
        suggestions: [
          "Show me the product list flow",
          "I have a motor plate photo",
          "Explain support after purchase",
        ],
      },
      capacity: {
        content: `We don't quote "guest capacity" — we align on electrical and mechanical limits per device:\n• Motor kW, voltage, duty, ambient\n• Network topology and cable lengths\n• Panel heat dissipation and protection degree\n\nSend the closest datasheet or nameplate snapshot and we'll reason from specs.`,
        suggestions: [
          "How to read a motor nameplate",
          "IP rating vs. cabinet cooling",
          "I need a bill of materials review",
        ],
      },
      menu: {
        content: `If you're asking about options and configurations:\n• We help map features (communications, filters, braking, STO, etc.) to your application.\n• Software/tooling compatibility varies by brand — mention what you already use.\n• For exotic requests, we may propose a substitute with shorter lead time.\n\nWhat equipment is already installed on site?`,
        suggestions: [
          "Profibus vs. Profinet in my plant",
          "Safe torque off requirements",
          "Harmonic mitigation options",
        ],
      },
      quote: {
        content: `To prepare a useful quotation, please share:\n• Part numbers or clear photos of nameplates\n• Required quantity and desired delivery window\n• Voltage, environment (temp/dust), and control system if relevant\n• Billing / ship-to city\n\nCall +90 553 056 89 39 or message on WhatsApp with the list — fastest turnaround.`,
        suggestions: [
          "I only have photos, no part numbers",
          "Corporate PO process",
          "Export / documentation needs",
        ],
      },
      logistics: {
        content: `Shipping & handling:\n• Domestic freight arranged per order size.\n• Packaging oriented to industrial goods (shock, moisture awareness).\n• Documents (invoice, packing list) as required.\n• For time-critical lines, say so up front — we'll flag stock paths first.\n\nWhich city should we plan delivery to?`,
        suggestions: [
          "Pickup vs. courier?",
          "Partial shipments OK?",
          "Insurance on high-value drives",
        ],
      },
      timeline: {
        content: `Lead times depend on manufacturer backlog and whether goods are local stock:\n• Same-day answers are realistic for product questions via phone/WhatsApp.\n• Quotation: often within one business day if data is complete.\n• Physical delivery: quoted per SKU after stock check.\n\nWhen do you need material on site?`,
        suggestions: [
          "I need material this week",
          "Factory order expectations",
          "Can you hold stock for a project?",
        ],
      },
      quality: {
        content: `Quality posture:\n\n• Source through reputable industrial channels.\n• Verify labeling, packing integrity, and accessories completeness on dispatch.\n• Support traceability requests where manufacturers allow.\n• Transparent communication if a substitute is proposed.\n\nAsk for any certificate or factory document you need for your QA process.`,
        suggestions: [
          "Warranty handling",
          "Counterfeit avoidance tips",
          "Returns / DOA policy",
        ],
      },
      unclear: {
        content: `I can help with:\n• Our six product categories and what's on each page\n• Drive/motor/control selection basics\n• Quotations, lead times, and delivery\n• How to reach us by phone or WhatsApp\n\nWhat part of your project should we tackle first?`,
        suggestions: [
          "List your product categories",
          "I need a human on the phone",
          "Explain the website sections",
        ],
      },
      clarify: {
        content: (userMessage: string) => `I see you're asking about "${userMessage}".\n\nTo give a precise answer, it helps to know:\n• Which machine or line (voltage, power, brand already installed)\n• Whether you need pricing, stock, or technical fit\n• Your timeline\n\nYou can also browse Ürünler and return here with a product name.`,
        suggestions: [
          "Open the products section topics",
          "I want a quote for a bill of materials",
          "Call me — I prefer voice",
        ],
      },
    },
  },
  tr: {
    serviceDetail: {
      process: (serviceType: string) => ({
        content: `${serviceType} için tipik süreç:\n\n1. Uygulama özeti\n   • Yük, ortam, şebeke/güç sınırları\n   • Standartlar ve entegrasyon noktaları\n\n2. Ürün seçimi\n   • BOM'unuzla uyumlu katalog kalemleri\n   • Stok/termin durumuna göre alternatifler\n\n3. Teklif ve netleştirme\n   • Ticari koşullar ve teslim planı\n   • İsteğe bağlı devreye alma desteği\n\n4. Tedarik ve dokümantasyon\n   • Data sheet, sertifika talepleri\n   • Paketleme ve sevkiyat koordinasyonu\n\n5. Satış sonrası\n   • Telefon/WhatsApp ile teknik sorular\n   • Yeniden sipariş ve yedek yönlendirmesi\n\nHangi adımı detaylandıralım?`,
        suggestions: [
          "Teklif için ne göndermeliyim?",
          "Terminler genelde nasıl?",
          "Devreye alma desteği var mı?",
        ],
      }),
      pricing: (serviceType: string) => ({
        content: `${serviceType} fiyatı şunlara bağlıdır:\n• Üretici, seri ve opsiyonlar\n• Miktar ve proje çerçevesi\n• Garanti, sertifika ve teslim şekli\n• Stok mu fabrika siparişi mi\n\nEn hızlı yol: kısa telefon veya WhatsApp + motor plakası / parça listesi. Oradan mı ilerleyelim?`,
        suggestions: [
          "Parça listesini nasıl iletirim?",
          "Teklifi hızlandıran bilgiler",
          "Türkiye geneli sevkiyat",
        ],
      }),
      capacity: (serviceType: string) => ({
        content: `${serviceType} için durum ürün bazlıdır:\n• “Misafir kapasitesi” yerine elektriksel/mekanik limitler konuşuruz.\n• Stok programı döner; öncelikli hatları belirtin.\n• Set siparişlerinde (sürücü + aksesuar) planlı sevkiyat mümkün.\n\nSKU veya etiket fotoğrafı paylaşırsanız seçenekleri özetleriz.`,
        suggestions: [
          "Acil ihtiyacım var",
          "Stok vs. fabrika siparişi",
          "Marka çapraz referans yapıyor musunuz?",
        ],
      }),
    },
    serviceList: {
      categories: {
        content: `Sitede altı ürün kartı (Ürünler) bulunur:\n\n• Endüstriyel sürücüler ve hareket aksesuarları\n• Kontrol, PLC/HMI ve gözetim bileşenleri\n• Motor, mekanik ve güç aktarımı\n• Saha cihazları, sensörler ve endüstriyel ağ\n• Güç, koruma ve pano donanımı\n• Kablo, konnektör ve montaj sarfı\n\nHer kartta görsel ve anlatım var. Projenize hangi hat daha yakın?`,
        suggestions: [
          "Sürücü ile yumuşak yol arası fark",
          "Saha veri yolu için öneri",
          "Teklif talebini adım adım anlat",
        ],
      },
    },
    general: {
      process: {
        content: `Genelde şöyle çalışıyoruz:\n\n1. Uygulamayı anlarız (motor verisi, gerilim, ortam).\n2. Ürün gamımızdan veya eşdeğer hatlardan kısa liste çıkarırız.\n3. Termin ve ticari koşullarla teklif veririz.\n4. Dokümantasyonla tedarik; temel devreye alma sorularında yönlendiririz.\n5. Sonraki siparişlerde yanınızda oluruz.\n\nNet yönlendirme için gerilim, güç ve kontrol platformunuzu yazın.`,
        suggestions: [
          "Başta hangi bilgiler şart?",
          "Dönüş süresi?",
          "Sahaya geliyor musunuz?",
        ],
      },
      services: {
        content: `Yazıcı Otomasyon; endüstriyel otomasyon ürünlerini net teknik yönlendirme ile sunar:\n\n• Ana sayfadaki altı öne çıkan ürün ailesi\n• Sürücü/motor/kontrol için sık sorulan uyumluluk konularında yol gösterme\n• Teklif ve lojistik doğrudan ekibimizle\n• +90 553 056 89 39 telefon ve WhatsApp ile hızlı iletişim\n\nÖnce hangi ürün ailesine bakalım?`,
        suggestions: [
          "Ürün listesinde nasıl gezerim?",
          "Motor plakası fotoğrafım var",
          "Satış sonrası destek",
        ],
      },
      capacity: {
        content: `“Kapasite”yi misafir sayısı olarak değil, cihazın elektriksel/mekanik sınırları olarak ele alırız:\n• Motor kW, gerilim, görev, ortam sıcaklığı\n• Ağ topolojisi ve kablo mesafeleri\n• Pano ısısı ve koruma derecesi (IP)\n\nEn yakın data sheet veya etiket fotoğrafı ile başlayın.`,
        suggestions: [
          "Motor etiketi nasıl okunur?",
          "IP ile kabinet soğutma",
          "Malzeme listesi (BOM) incelemesi",
        ],
      },
      menu: {
        content: `Seçenek ve konfigürasyon soruyorsanız:\n• Haberleşme, filtre, fren, STO gibi özellikleri uygulamaya göre eşleriz.\n• Yazılım/araç uyumluluğu markaya göre değişir — mevcut altyapınızı belirtin.\n• Özel taleplerde daha kısa terminli muadil önerebiliriz.\n\nSahada halihazırda hangi ekipmanlar var?`,
        suggestions: [
          "Profibus vs. Profinet",
          "Güvenli kapama (STO) ihtiyacı",
          "Harmonik giderme seçenekleri",
        ],
      },
      quote: {
        content: `Sağlıklı teklif için:\n• Parça numaraları veya net etiket fotoğrafları\n• Miktar ve hedef teslim tarihi\n• Gerilim, ortam (toz/sıcaklık), varsa kontrol sistemi\n• Fatura/sevk şehri\n\nListeyi +90 553 056 89 39 veya WhatsApp ile göndermeniz en hızlı yoldur.`,
        suggestions: [
          "Sadece fotoğrafım var, kod yok",
          "Kurumsal sipariş / PO süreci",
          "İhracat belgeleri",
        ],
      },
      logistics: {
        content: `Sevkiyat:\n• Sipariş hacmine göre yurtiçi nakliye planlanır.\n• Endüstriyel ürüne uygun paketleme (şok/nem bilinci).\n• Fatura, sevk irsaliyesi vb. ihtiyaçlarınıza göre.\n• Zaman kritikse baştan belirtin — önce stok yollarını söyleriz.\n\nTeslimat şehri neresi?`,
        suggestions: [
          "Elden teslim mümkün mü?",
          "Kısmi sevkiyat?",
          "Yüksek bedelli sürücü sigortası",
        ],
      },
      timeline: {
        content: `Termin; üretici yoğunluğu ve stok durumuna bağlıdır:\n• Ürün sorularına telefon/WhatsApp ile aynı gün dönüş hedeflenir.\n• Teklif: veri tam ise çoğu zaman bir iş günü içinde.\n• Fiziksel teslimat: stok kontrolü sonrası kaleme göre.\n\nMalzemenin sahada olması gereken tarih?`,
        suggestions: [
          "Bu hafta içi lazım",
          "Fabrika siparişi beklentisi",
          "Proje için stok tutulur mu?",
        ],
      },
      quality: {
        content: `Kalite yaklaşımı:\n\n• Güvenilir endüstriyel tedarik kanalları\n• Sevkiyatta etiket, ambalaj bütünlüğü ve aksesuar kontrolü\n• Üretici izin verdiği ölçüde izlenebilirlik talepleri\n• Muadil önerilirse şeffaf iletişim\n\nQA süreciniz için gereken sertifikayı sorun.`,
        suggestions: [
          "Garanti süreçleri",
          "Sahte ürün riskine karşı",
          "İade / DOA",
        ],
      },
      unclear: {
        content: `Şunlarda yardımcı olabilirim:\n• Altı ürün kategorisi ve sayfa içerikleri\n• Sürücü/motor/kontrol seçimi için başlangıç soruları\n• Teklif, termin, teslimat\n• Telefon ve WhatsApp ile ulaşım\n\nÖnce projenin hangi kısmını ele alalım?`,
        suggestions: [
          "Ürün kategorilerini özetle",
          "İnsanla telefonda konuşmak istiyorum",
          "Site bölümlerini anlat",
        ],
      },
      clarify: {
        content: (userMessage: string) => `"${userMessage}" konusunda yazdığınızı görüyorum.\n\nNet cevap için:\n• Hangi makine/hat (gerilim, güç, sahada kurulu marka)\n• Teklif mi, stok mu, teknik uyum mu\n• Zaman çizelgeniz\n\nÜrünler bölümünden bir isimle de dönebilirsiniz.`,
        suggestions: [
          "Ürünler bölümündeki başlıklar",
          "BOM için teklif istiyorum",
          "Sesli görüşmeyi tercih ederim",
        ],
      },
    },
  },
};

// Mock response generator (rule-based, no external AI)
function generateResponse(
  userMessage: string,
  pageContext: string,
  memory: ChatbotContext["conversationMemory"],
  language: Language = "en"
): { content: string; suggestions?: string[] } {
  const lowerMessage = userMessage.toLowerCase();
  const translations = t[language];

  if (pageContext === "product-detail") {
    const serviceType =
      memory.serviceType || (language === "tr" ? "bu ürün hattı" : "this product line");

    if (
      lowerMessage.includes("process") ||
      lowerMessage.includes("süreç") ||
      lowerMessage.includes("planning") ||
      lowerMessage.includes("planlama") ||
      lowerMessage.includes("nasıl") ||
      lowerMessage.includes("how")
    ) {
      return translations.serviceDetail.process(serviceType);
    }
    if (
      lowerMessage.includes("price") ||
      lowerMessage.includes("cost") ||
      lowerMessage.includes("quote") ||
      lowerMessage.includes("pricing") ||
      lowerMessage.includes("fiyat") ||
      lowerMessage.includes("teklif") ||
      lowerMessage.includes("maliyet")
    ) {
      return translations.serviceDetail.pricing(serviceType);
    }
    if (
      lowerMessage.includes("capacity") ||
      lowerMessage.includes("volume") ||
      lowerMessage.includes("scale") ||
      lowerMessage.includes("kapasite") ||
      lowerMessage.includes("hacim") ||
      lowerMessage.includes("stok") ||
      lowerMessage.includes("stock") ||
      lowerMessage.includes("lead time") ||
      lowerMessage.includes("termin") ||
      lowerMessage.includes("availability")
    ) {
      return translations.serviceDetail.capacity(serviceType);
    }
  }

  if (pageContext === "product-list" || pageContext === "home") {
    if (
      lowerMessage.includes("what") ||
      lowerMessage.includes("service") ||
      lowerMessage.includes("offer") ||
      lowerMessage.includes("category") ||
      lowerMessage.includes("hizmet") ||
      lowerMessage.includes("kategori") ||
      lowerMessage.includes("ürün") ||
      lowerMessage.includes("product") ||
      lowerMessage.includes("sunuyor") ||
      lowerMessage.includes("hangi") ||
      lowerMessage.includes("ne ")
    ) {
      return translations.serviceList.categories;
    }
  }

  if (
    lowerMessage.includes("process") ||
    lowerMessage.includes("süreç") ||
    lowerMessage.includes("planning") ||
    lowerMessage.includes("planlama") ||
    (lowerMessage.includes("how") && lowerMessage.includes("work"))
  ) {
    return translations.general.process;
  }

  if (
    lowerMessage.includes("service") ||
    lowerMessage.includes("hizmet") ||
    lowerMessage.includes("offer") ||
    lowerMessage.includes("sunuyor") ||
    lowerMessage.includes("company") ||
    lowerMessage.includes("şirket")
  ) {
    return translations.general.services;
  }

  if (
    lowerMessage.includes("capacity") ||
    lowerMessage.includes("kapasite") ||
    lowerMessage.includes("how many") ||
    lowerMessage.includes("kaç") ||
    lowerMessage.includes("stok") ||
    lowerMessage.includes("stock")
  ) {
    return translations.general.capacity;
  }

  if (
    lowerMessage.includes("menu") ||
    lowerMessage.includes("menü") ||
    lowerMessage.includes("spec") ||
    lowerMessage.includes("datasheet") ||
    lowerMessage.includes("seçenek") ||
    lowerMessage.includes("option") ||
    lowerMessage.includes("konfigür") ||
    lowerMessage.includes("configure")
  ) {
    return translations.general.menu;
  }

  if (
    lowerMessage.includes("quote") ||
    lowerMessage.includes("teklif") ||
    lowerMessage.includes("pricing") ||
    lowerMessage.includes("fiyat") ||
    lowerMessage.includes("cost") ||
    lowerMessage.includes("maliyet")
  ) {
    return translations.general.quote;
  }

  if (
    lowerMessage.includes("logistics") ||
    lowerMessage.includes("lojistik") ||
    lowerMessage.includes("delivery") ||
    lowerMessage.includes("teslimat") ||
    lowerMessage.includes("transport") ||
    lowerMessage.includes("taşıma") ||
    lowerMessage.includes("ship") ||
    lowerMessage.includes("sevkiyat")
  ) {
    return translations.general.logistics;
  }

  if (
    lowerMessage.includes("timeline") ||
    lowerMessage.includes("zaman çizelgesi") ||
    lowerMessage.includes("lead time") ||
    lowerMessage.includes("süre") ||
    lowerMessage.includes("how long") ||
    lowerMessage.includes("ne kadar") ||
    lowerMessage.includes("termin")
  ) {
    return translations.general.timeline;
  }

  if (
    lowerMessage.includes("quality") ||
    lowerMessage.includes("kalite") ||
    lowerMessage.includes("standard") ||
    lowerMessage.includes("standart") ||
    lowerMessage.includes("warranty") ||
    lowerMessage.includes("garanti")
  ) {
    return translations.general.quality;
  }

  if (
    lowerMessage.includes("sürücü") ||
    lowerMessage.includes("drive") ||
    lowerMessage.includes("vfd") ||
    lowerMessage.includes("inverter") ||
    lowerMessage.includes("frekans")
  ) {
    return {
      content:
        language === "tr"
          ? "Motor sürücüleri / frekans invertörleri için güç, gerilim, ortam ve haberleşme (ör. fieldbus) bilgisiyle başlarız. Motor plakası veya mevcut sürücü etiketi fotoğrafı teklifi hızlandırır.\n\nHız, tork limi, frenleme veya harmonik gibi özel bir kısıtınız var mı?"
          : "For drives / inverters we start from power, voltage, environment, and communications (e.g. fieldbus). A motor nameplate photo or existing drive label speeds quoting.\n\nAny constraints on speed, torque limits, braking, or harmonics?",
      suggestions:
        language === "tr"
          ? ["Motor plakası göndereceğim", "Haberleşme seçimi", "Teklif için arayın"]
          : ["I'll send a motor nameplate", "Fieldbus choice", "Call me for a quote"],
    };
  }

  if (lowerMessage.includes("plc") || lowerMessage.includes("hmi") || lowerMessage.includes("scada")) {
    return {
      content:
        language === "tr"
          ? "PLC / HMI tarafında mevcut marka, yazılım sürümü ve I/O sayısı netleştikçe doğru modül/ekran önerisi yapılır. Retrofit mi yeni hat mı olduğunu da yazın.\n\nSahada hangi platform kullanılıyor?"
          : "For PLC / HMI we narrow options once we know installed brand, software revision, and I/O counts. Note whether this is a retrofit or a greenfield line.\n\nWhich platform is running on site?",
      suggestions:
        language === "tr"
          ? ["Siemens kullanıyoruz", "Retrofit projesi", "Operatör paneli önerisi"]
          : ["We use Siemens", "Retrofit project", "Operator panel advice"],
    };
  }

  if (lowerMessage.includes("motor") || lowerMessage.includes("redüktör")) {
    return {
      content:
        language === "tr"
          ? "Motor seçiminde kW, gerilim, görev (S1/S4 vb.), montaj (B3/B5), flanş ve encoder ihtiyacı belirleyicidir. Sürücü ile birlikte düşünüyorsanız birlikte konuşmak en doğrusu.\n\nAC mi DC mi, servo mu asenkron mu?"
          : "Motors hinge on kW, voltage, duty (S1/S4…), mounting (B3/B5), flange, and encoder needs. If this pairs with a drive, we usually review both together.\n\nAC vs DC, servo vs induction?",
      suggestions:
        language === "tr"
          ? ["Asenkron + sürücü", "Servo hattı", "Teklif için veri listesi"]
          : ["Induction + drive", "Servo line", "Data list for quote"],
    };
  }

  if (
    lowerMessage.includes("phone") ||
    lowerMessage.includes("call") ||
    lowerMessage.includes("whatsapp") ||
    lowerMessage.includes("ara") ||
    lowerMessage.includes("telefon") ||
    lowerMessage.includes("iletişim")
  ) {
    return {
      content:
        language === "tr"
          ? "Doğrudan arayabilir veya WhatsApp üzerinden yazılı liste/fotoğraf gönderebilirsiniz:\n+90 553 056 89 39\n\nKısa bir özet: uygulama, gerilim/güç, istenen termin."
          : "Call or WhatsApp with a short list or photos:\n+90 553 056 89 39\n\nA one-line summary helps: application, voltage/power, required delivery window.",
      suggestions:
        language === "tr"
          ? ["Teklif istiyorum", "Sadece teknik soru", "Ürün sayfasına gitmek istiyorum"]
          : ["I need a quote", "Technical question only", "Point me to products"],
    };
  }

  if (lowerMessage.length < 5) {
    return translations.general.unclear;
  }

  return {
    content: translations.general.clarify.content(userMessage),
    suggestions: translations.general.clarify.suggestions,
  };
}
