// src/utils/languages.ts
import { Language, Translation } from '../types';

export const supportedLanguages: Language[] = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'zh', name: '中文', flag: '🇨🇳' }
];

export const translations: Record<string, Translation> = {
  tr: {
    // Navigation
    dashboard: 'Kontrol Paneli',
    mining: 'Madencilik',
    packages: 'Paketler',
    withdrawal: 'Para Çekme',
    profile: 'Profil',
    admin: 'Yönetici',
    support: 'Destek',
    logout: 'Çıkış Yap',
    settings: 'Ayarlar',
    
    // Auth
    login: 'Giriş Yap',
    register: 'Kayıt Ol',
    email: 'E-posta',
    password: 'Şifre',
    forgotPassword: 'Şifremi Unuttum',
    resetPassword: 'Şifre Sıfırla',
    confirmPassword: 'Şifre Tekrar',
    selectLanguage: 'Dil Seçin',
    backToHome: 'Ana Sayfaya Dön',
    loginWelcome: 'Madenciliğe tekrar hoşgeldiniz',
    registerWelcome: 'Madencilik yolculuğunuzu başlatın',
    resetWelcome: 'Şifrenizi sıfırlayın',
    emailPlaceholder: 'E-posta adresinizi girin',
    passwordPlaceholder: 'Şifrenizi girin',
    referralCode: 'Referans Kodu (İsteğe Bağlı)',
    referralPlaceholder: 'Referans kodunu girin',
    processing: 'İşleniyor...',
    noAccount: 'Hesabınız yok mu?',
    haveAccount: 'Zaten hesabınız var mı?',
    wantToLogin: 'Giriş yapmak ister misiniz?',
    freeTrialIncluded: 'Ücretsiz Deneme Dahil!',
    freeTrialMonths: '3 ay ücretsiz madencilik',
    freeTrialEarnings: '25 USDT\'ye kadar kazanç',
    freeTrialCoins: 'Tüm coinler kullanılabilir',
    freeTrialNoPayment: 'Ödeme gerekmez',
    sslSecure: 'SSL Güvenli',
    fastProcessing: 'Hızlı İşlem',
    trusted: 'Güvenilir',
    
    // Dashboard
    totalBalance: 'Toplam Bakiye',
    trialEarnings: 'Deneme Kazancı',
    activePackage: 'Aktif Paket',
    freeTrial: 'Ücretsiz Deneme',
    welcomeBack: 'Tekrar hoşgeldiniz',
    quickActions: 'Hızlı İşlemler',
    recentActivity: 'Son Aktiviteler',
    
    // Mining
    startMining: 'Madenciliği Başlat',
    stopMining: 'Madenciliği Durdur',
    hashRate: 'Hash Hızı',
    earnings: 'Kazanç',
    miningActive: 'Madencilik Aktif',
    selectCoin: 'Coin Seçin',
    miningRules: 'Madencilik Kuralları',
    
    // Packages
    selectPackage: 'Paket Seç',
    paymentInstructions: 'Ödeme Talimatları',
    copyAddress: 'Adresi Kopyala',
    paymentNotification: 'Ödeme Bildirimi',
    
    // Profile
    accountInfo: 'Hesap Bilgileri',
    balanceEarnings: 'Bakiye ve Kazançlar',
    trialStatus: 'Deneme Durumu',
    
    // Support
    contactSupport: 'Destek İletişim',
    supportEmail: 'Destek E-posta',
    createTicket: 'Destek Talebi Oluştur',
    subject: 'Konu',
    message: 'Mesaj',
    priority: 'Öncelik',
    
    // Company
    companyName: 'CryptoCloud Mining GmbH',
    companyAddress: 'Berliner Allee 12, 40212 Düsseldorf, Germany',
    
    // Landing Page
    heroTitle: 'Kripto Para Madenciliği ile Pasif Gelir Elde Edin',
    heroSubtitle: 'Bitcoin, Ethereum, Solana ve 8+ kripto para madenciliği ile günlük kazanç sağlayın. Profesyonel bulut madenciliği hizmeti ile güvenli yatırım yapın.',
    freeBonus: 'Ücretsiz $25 Bonus Al',
    howItWorks: 'Nasıl Çalışır?',
    whyChooseUs: 'Neden CryptoCloud Mining?',
    blog: 'Blog',
    features: 'Özellikler',
    packages2: 'Paketler',
    faq: 'SSS',
    secureTitle: '100% Güvenli',
    secureDesc: 'SSL şifreleme ve çok katmanlı güvenlik sistemleri ile verileriniz tamamen korunur.',
    highPerformanceTitle: 'Yüksek Performans',
    highPerformanceDesc: 'Son teknoloji madencilik donanımları ile maksimum hash rate ve verimlilik.',
    dailyPaymentsTitle: 'Günlük Ödemeler',
    dailyPaymentsDesc: 'Kazançlarınız günlük olarak hesaplanır ve bakiyenize eklenir.',
    
    // Common
    loading: 'Yükleniyor...',
    save: 'Kaydet',
    cancel: 'İptal',
    submit: 'Gönder',
    close: 'Kapat',
    success: 'Başarılı',
    error: 'Hata',
    warning: 'Uyarı',
    info: 'Bilgi',
    yes: 'Evet',
    no: 'Hayır',
    confirm: 'Onayla',
    delete: 'Sil',
    edit: 'Düzenle',
    view: 'Görüntüle',
    back: 'Geri',
    next: 'İleri',
    previous: 'Önceki',
    
    // Status
    active: 'Aktif',
    inactive: 'Pasif',
    pending: 'Beklemede',
    approved: 'Onaylandı',
    rejected: 'Reddedildi',
    completed: 'Tamamlandı',
    
    // Time
    today: 'Bugün',
    yesterday: 'Dün',
    thisWeek: 'Bu Hafta',
    thisMonth: 'Bu Ay',
    days: 'gün',
    hours: 'saat',
    minutes: 'dakika',
    seconds: 'saniye'
  },
  
  en: {
    // Navigation
    dashboard: 'Dashboard',
    mining: 'Mining',
    packages: 'Packages',
    withdrawal: 'Withdrawal',
    profile: 'Profile',
    admin: 'Admin',
    support: 'Support',
    logout: 'Logout',
    settings: 'Settings',
    
    // Auth
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot Password',
    resetPassword: 'Reset Password',
    confirmPassword: 'Confirm Password',
    selectLanguage: 'Select Language',
    backToHome: 'Back to Home',
    loginWelcome: 'Welcome back to mining',
    registerWelcome: 'Start your mining journey',
    resetWelcome: 'Reset your password',
    emailPlaceholder: 'Enter your email address',
    passwordPlaceholder: 'Enter your password',
    referralCode: 'Referral Code (Optional)',
    referralPlaceholder: 'Enter referral code',
    processing: 'Processing...',
    noAccount: 'Don\'t have an account?',
    haveAccount: 'Already have an account?',
    wantToLogin: 'Want to login?',
    freeTrialIncluded: 'Free Trial Included!',
    freeTrialMonths: '3 months free mining',
    freeTrialEarnings: 'Up to 25 USDT earnings',
    freeTrialCoins: 'All coins available',
    freeTrialNoPayment: 'No payment required',
    sslSecure: 'SSL Secure',
    fastProcessing: 'Fast Processing',
    trusted: 'Trusted',
    
    // Dashboard
    totalBalance: 'Total Balance',
    trialEarnings: 'Trial Earnings',
    activePackage: 'Active Package',
    freeTrial: 'Free Trial',
    welcomeBack: 'Welcome back',
    quickActions: 'Quick Actions',
    recentActivity: 'Recent Activity',
    
    // Mining
    startMining: 'Start Mining',
    stopMining: 'Stop Mining',
    hashRate: 'Hash Rate',
    earnings: 'Earnings',
    miningActive: 'Mining Active',
    selectCoin: 'Select Coin',
    miningRules: 'Mining Rules',
    
    // Packages
    selectPackage: 'Select Package',
    paymentInstructions: 'Payment Instructions',
    copyAddress: 'Copy Address',
    paymentNotification: 'Payment Notification',
    
    // Profile
    accountInfo: 'Account Information',
    balanceEarnings: 'Balance & Earnings',
    trialStatus: 'Trial Status',
    
    // Support
    contactSupport: 'Contact Support',
    supportEmail: 'Support Email',
    createTicket: 'Create Support Ticket',
    subject: 'Subject',
    message: 'Message',
    priority: 'Priority',
    
    // Company
    companyName: 'CryptoCloud Mining GmbH',
    companyAddress: 'Berliner Allee 12, 40212 Düsseldorf, Germany',
    
    // Landing Page
    heroTitle: 'Earn Passive Income with Cryptocurrency Mining',
    heroSubtitle: 'Generate daily earnings by mining Bitcoin, Ethereum, Solana and 8+ cryptocurrencies. Secure investment with professional cloud mining service.',
    freeBonus: 'Get Free $25 Bonus',
    howItWorks: 'How It Works?',
    whyChooseUs: 'Why Choose CryptoCloud Mining?',
    blog: 'Blog',
    features: 'Features',
    packages2: 'Packages',
    faq: 'FAQ',
    secureTitle: '100% Secure',
    secureDesc: 'Your data is completely protected with SSL encryption and multi-layered security systems.',
    highPerformanceTitle: 'High Performance',
    highPerformanceDesc: 'Maximum hash rate and efficiency with state-of-the-art mining hardware.',
    dailyPaymentsTitle: 'Daily Payments',
    dailyPaymentsDesc: 'Your earnings are calculated daily and added to your balance.',
    
    // Common
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    submit: 'Submit',
    close: 'Close',
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    info: 'Info',
    yes: 'Yes',
    no: 'No',
    confirm: 'Confirm',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    
    // Status
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    completed: 'Completed',
    
    // Time
    today: 'Today',
    yesterday: 'Yesterday',
    thisWeek: 'This Week',
    thisMonth: 'This Month',
    days: 'days',
    hours: 'hours',
    minutes: 'minutes',
    seconds: 'seconds'
  },
  
  de: {
    // Navigation
    dashboard: 'Dashboard',
    mining: 'Mining',
    packages: 'Pakete',
    withdrawal: 'Auszahlung',
    profile: 'Profil',
    admin: 'Admin',
    support: 'Support',
    logout: 'Abmelden',
    settings: 'Einstellungen',
    
    // Auth
    login: 'Anmelden',
    register: 'Registrieren',
    email: 'E-Mail',
    password: 'Passwort',
    forgotPassword: 'Passwort vergessen',
    resetPassword: 'Passwort zurücksetzen',
    confirmPassword: 'Passwort bestätigen',
    selectLanguage: 'Sprache wählen',
    backToHome: 'Zurück zur Startseite',
    loginWelcome: 'Willkommen zurück zum Mining',
    registerWelcome: 'Starten Sie Ihre Mining-Reise',
    resetWelcome: 'Setzen Sie Ihr Passwort zurück',
    emailPlaceholder: 'Geben Sie Ihre E-Mail-Adresse ein',
    passwordPlaceholder: 'Geben Sie Ihr Passwort ein',
    referralCode: 'Empfehlungscode (Optional)',
    referralPlaceholder: 'Empfehlungscode eingeben',
    processing: 'Wird bearbeitet...',
    noAccount: 'Sie haben noch kein Konto?',
    haveAccount: 'Sie haben bereits ein Konto?',
    wantToLogin: 'Möchten Sie sich anmelden?',
    freeTrialIncluded: 'Kostenlose Testversion enthalten!',
    freeTrialMonths: '3 Monate kostenloses Mining',
    freeTrialEarnings: 'Bis zu 25 USDT Verdienst',
    freeTrialCoins: 'Alle Coins verfügbar',
    freeTrialNoPayment: 'Keine Zahlung erforderlich',
    sslSecure: 'SSL-Sicher',
    fastProcessing: 'Schnelle Verarbeitung',
    trusted: 'Vertrauenswürdig',
    
    // Dashboard
    totalBalance: 'Gesamtguthaben',
    trialEarnings: 'Testeinnahmen',
    activePackage: 'Aktives Paket',
    freeTrial: 'Kostenlose Testversion',
    welcomeBack: 'Willkommen zurück',
    quickActions: 'Schnellaktionen',
    recentActivity: 'Letzte Aktivitäten',
    
    // Mining
    startMining: 'Mining starten',
    stopMining: 'Mining stoppen',
    hashRate: 'Hash-Rate',
    earnings: 'Einnahmen',
    miningActive: 'Mining aktiv',
    selectCoin: 'Coin auswählen',
    miningRules: 'Mining-Regeln',
    
    // Packages
    selectPackage: 'Paket auswählen',
    paymentInstructions: 'Zahlungsanweisungen',
    copyAddress: 'Adresse kopieren',
    paymentNotification: 'Zahlungsbenachrichtigung',
    
    // Profile
    accountInfo: 'Kontoinformationen',
    balanceEarnings: 'Guthaben & Einnahmen',
    trialStatus: 'Test-Status',
    
    // Support
    contactSupport: 'Support kontaktieren',
    supportEmail: 'Support E-Mail',
    createTicket: 'Support-Ticket erstellen',
    subject: 'Betreff',
    message: 'Nachricht',
    priority: 'Priorität',
    
    // Company
    companyName: 'CryptoCloud Mining GmbH',
    companyAddress: 'Berliner Allee 12, 40212 Düsseldorf, Germany',
    
    // Landing Page
    heroTitle: 'Passives Einkommen durch Kryptowährungs-Mining',
    heroSubtitle: 'Erzielen Sie tägliche Einnahmen durch Mining von Bitcoin, Ethereum, Solana und 8+ Kryptowährungen. Sichere Investition mit professionellem Cloud-Mining-Service.',
    freeBonus: 'Kostenlosen $25 Bonus erhalten',
    howItWorks: 'Wie funktioniert es?',
    whyChooseUs: 'Warum CryptoCloud Mining wählen?',
    blog: 'Blog',
    features: 'Funktionen',
    packages2: 'Pakete',
    faq: 'Häufig gestellte Fragen',
    secureTitle: '100% Sicher',
    secureDesc: 'Ihre Daten sind vollständig geschützt durch SSL-Verschlüsselung und mehrschichtige Sicherheitssysteme.',
    highPerformanceTitle: 'Hohe Leistung',
    highPerformanceDesc: 'Maximale Hash-Rate und Effizienz mit modernster Mining-Hardware.',
    dailyPaymentsTitle: 'Tägliche Zahlungen',
    dailyPaymentsDesc: 'Ihre Einnahmen werden täglich berechnet und Ihrem Guthaben hinzugefügt.',
    
    // Common
    loading: 'Laden...',
    save: 'Speichern',
    cancel: 'Abbrechen',
    submit: 'Senden',
    close: 'Schließen',
    success: 'Erfolg',
    error: 'Fehler',
    warning: 'Warnung',
    info: 'Info',
    yes: 'Ja',
    no: 'Nein',
    confirm: 'Bestätigen',
    delete: 'Löschen',
    edit: 'Bearbeiten',
    view: 'Anzeigen',
    back: 'Zurück',
    next: 'Weiter',
    previous: 'Vorherige',
    
    // Status
    active: 'Aktiv',
    inactive: 'Inaktiv',
    pending: 'Ausstehend',
    approved: 'Genehmigt',
    rejected: 'Abgelehnt',
    completed: 'Abgeschlossen',
    
    // Time
    today: 'Heute',
    yesterday: 'Gestern',
    thisWeek: 'Diese Woche',
    thisMonth: 'Diesen Monat',
    days: 'Tage',
    hours: 'Stunden',
    minutes: 'Minuten',
    seconds: 'Sekunden'
  },
  
  ar: {
    // Navigation
    dashboard: 'لوحة التحكم',
    mining: 'التعدين',
    packages: 'الحزم',
    withdrawal: 'السحب',
    profile: 'الملف الشخصي',
    admin: 'المدير',
    support: 'الدعم',
    logout: 'تسجيل الخروج',
    settings: 'الإعدادات',

    // Auth
    login: 'تسجيل الدخول',
    register: 'التسجيل',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    forgotPassword: 'نسيت كلمة المرور',
    resetPassword: 'إعادة تعيين كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    selectLanguage: 'اختر اللغة',
    backToHome: 'العودة إلى الصفحة الرئيسية',
    loginWelcome: 'مرحباً بعودتك إلى التعدين',
    registerWelcome: 'ابدأ رحلة التعدين الخاصة بك',
    resetWelcome: 'إعادة تعيين كلمة المرور',
    emailPlaceholder: 'أدخل عنوان بريدك الإلكتروني',
    passwordPlaceholder: 'أدخل كلمة المرور',
    referralCode: 'رمز الإحالة (اختياري)',
    referralPlaceholder: 'أدخل رمز الإحالة',
    processing: 'جاري المعالجة...',
    noAccount: 'ليس لديك حساب؟',
    haveAccount: 'هل لديك حساب بالفعل؟',
    wantToLogin: 'هل تريد تسجيل الدخول؟',
    freeTrialIncluded: 'تجربة مجانية مضمنة!',
    freeTrialMonths: '3 أشهر تعدين مجاني',
    freeTrialEarnings: 'ما يصل إلى 25 USDT أرباح',
    freeTrialCoins: 'جميع العملات متاحة',
    freeTrialNoPayment: 'لا حاجة للدفع',
    sslSecure: 'آمن بـ SSL',
    fastProcessing: 'معالجة سريعة',
    trusted: 'موثوق',
    
    // Dashboard
    totalBalance: 'الرصيد الإجمالي',
    trialEarnings: 'أرباح التجربة',
    activePackage: 'الحزمة النشطة',
    freeTrial: 'التجربة المجانية',
    welcomeBack: 'مرحباً بعودتك',
    quickActions: 'الإجراءات السريعة',
    recentActivity: 'النشاط الأخير',
    
    // Mining
    startMining: 'بدء التعدين',
    stopMining: 'إيقاف التعدين',
    hashRate: 'معدل التجزئة',
    earnings: 'الأرباح',
    miningActive: 'التعدين نشط',
    selectCoin: 'اختر العملة',
    miningRules: 'قواعد التعدين',
    
    // Packages
    selectPackage: 'اختر الحزمة',
    paymentInstructions: 'تعليمات الدفع',
    copyAddress: 'نسخ العنوان',
    paymentNotification: 'إشعار الدفع',
    
    // Profile
    accountInfo: 'معلومات الحساب',
    balanceEarnings: 'الرصيد والأرباح',
    trialStatus: 'حالة التجربة',
    
    // Support
    contactSupport: 'اتصل بالدعم',
    supportEmail: 'بريد الدعم الإلكتروني',
    createTicket: 'إنشاء تذكرة دعم',
    subject: 'الموضوع',
    message: 'الرسالة',
    priority: 'الأولوية',
    
    // Company
    companyName: 'CryptoCloud Mining GmbH',
    companyAddress: 'Berliner Allee 12, 40212 Düsseldorf, Germany',
    
    // Landing Page
    heroTitle: 'احصل على دخل سلبي من تعدين العملات المشفرة',
    heroSubtitle: 'احصل على أرباح يومية من تعدين البيتكوين والإيثريوم وسولانا و8+ عملات مشفرة. استثمار آمن مع خدمة التعدين السحابي المهنية.',
    freeBonus: 'احصل على مكافأة $25 مجاناً',
    howItWorks: 'كيف يعمل؟',
    whyChooseUs: 'لماذا تختار CryptoCloud Mining؟',
    blog: 'المدونة',
    features: 'المميزات',
    packages2: 'الحزم',
    faq: 'الأسئلة الشائعة',
    secureTitle: '100% آمن',
    secureDesc: 'بياناتك محمية بالكامل بتشفير SSL وأنظمة الأمان متعددة الطبقات.',
    highPerformanceTitle: 'أداء عالي',
    highPerformanceDesc: 'أقصى معدل تجزئة وكفاءة مع أحدث أجهزة التعدين.',
    dailyPaymentsTitle: 'مدفوعات يومية',
    dailyPaymentsDesc: 'يتم حساب أرباحك يومياً وإضافتها إلى رصيدك.',
    
    // Common
    loading: 'جاري التحميل...',
    save: 'حفظ',
    cancel: 'إلغاء',
    submit: 'إرسال',
    close: 'إغلاق',
    success: 'نجح',
    error: 'خطأ',
    warning: 'تحذير',
    info: 'معلومات',
    yes: 'نعم',
    no: 'لا',
    confirm: 'تأكيد',
    delete: 'حذف',
    edit: 'تعديل',
    view: 'عرض',
    back: 'رجوع',
    next: 'التالي',
    previous: 'السابق',
    
    // Status
    active: 'نشط',
    inactive: 'غير نشط',
    pending: 'في الانتظار',
    approved: 'موافق عليه',
    rejected: 'مرفوض',
    completed: 'مكتمل',
    
    // Time
    today: 'اليوم',
    yesterday: 'أمس',
    thisWeek: 'هذا الأسبوع',
    thisMonth: 'هذا الشهر',
    days: 'أيام',
    hours: 'ساعات',
    minutes: 'دقائق',
    seconds: 'ثواني'
  },

  ru: {
    // Navigation
    dashboard: 'Панель управления',
    mining: 'Майнинг',
    packages: 'Пакеты',
    withdrawal: 'Вывод средств',
    profile: 'Профиль',
    admin: 'Администратор',
    support: 'Поддержка',
    logout: 'Выйти',
    settings: 'Настройки',

    // Auth
    login: 'Войти',
    register: 'Регистрация',
    email: 'Электронная почта',
    password: 'Пароль',
    forgotPassword: 'Забыли пароль',
    resetPassword: 'Сбросить пароль',
    confirmPassword: 'Подтвердите пароль',
    selectLanguage: 'Выберите язык',
    backToHome: 'Вернуться на главную',
    loginWelcome: 'С возвращением к майнингу',
    registerWelcome: 'Начните свой путь в майнинге',
    resetWelcome: 'Сбросьте свой пароль',
    emailPlaceholder: 'Введите ваш email',
    passwordPlaceholder: 'Введите ваш пароль',
    referralCode: 'Реферальный код (необязательно)',
    referralPlaceholder: 'Введите реферальный код',
    processing: 'Обработка...',
    noAccount: 'Нет аккаунта?',
    haveAccount: 'Уже есть аккаунт?',
    wantToLogin: 'Хотите войти?',
    freeTrialIncluded: 'Бесплатная пробная версия включена!',
    freeTrialMonths: '3 месяца бесплатного майнинга',
    freeTrialEarnings: 'До 25 USDT заработка',
    freeTrialCoins: 'Все монеты доступны',
    freeTrialNoPayment: 'Не требуется оплата',
    sslSecure: 'SSL-защита',
    fastProcessing: 'Быстрая обработка',
    trusted: 'Надежный',

    // Dashboard
    totalBalance: 'Общий баланс',
    trialEarnings: 'Пробные заработки',
    activePackage: 'Активный пакет',
    freeTrial: 'Бесплатная пробная версия',
    welcomeBack: 'С возвращением',
    quickActions: 'Быстрые действия',
    recentActivity: 'Последняя активность',

    // Mining
    startMining: 'Начать майнинг',
    stopMining: 'Остановить майнинг',
    hashRate: 'Хешрейт',
    earnings: 'Заработок',
    miningActive: 'Майнинг активен',
    selectCoin: 'Выбрать монету',
    miningRules: 'Правила майнинга',

    // Packages
    selectPackage: 'Выбрать пакет',
    paymentInstructions: 'Инструкции по оплате',
    copyAddress: 'Скопировать адрес',
    paymentNotification: 'Уведомление об оплате',

    // Profile
    accountInfo: 'Информация об аккаунте',
    balanceEarnings: 'Баланс и заработок',
    trialStatus: 'Статус пробной версии',

    // Support
    contactSupport: 'Связаться с поддержкой',
    supportEmail: 'Email поддержки',
    createTicket: 'Создать заявку в поддержку',
    subject: 'Тема',
    message: 'Сообщение',
    priority: 'Приоритет',

    // Company
    companyName: 'CryptoCloud Mining GmbH',
    companyAddress: 'Berliner Allee 12, 40212 Düsseldorf, Germany',

    // Landing Page
    heroTitle: 'Получайте пассивный доход с помощью майнинга криптовалют',
    heroSubtitle: 'Зарабатывайте ежедневно, добывая Bitcoin, Ethereum, Solana и более 8 криптовалют. Безопасные инвестиции с профессиональным сервисом облачного майнинга.',
    freeBonus: 'Получить бесплатный бонус $25',
    howItWorks: 'Как это работает?',
    whyChooseUs: 'Почему CryptoCloud Mining?',
    blog: 'Блог',
    features: 'Функции',
    packages2: 'Пакеты',
    faq: 'Часто задаваемые вопросы',
    secureTitle: '100% безопасно',
    secureDesc: 'Ваши данные полностью защищены с помощью SSL-шифрования и многоуровневых систем безопасности.',
    highPerformanceTitle: 'Высокая производительность',
    highPerformanceDesc: 'Максимальный хешрейт и эффективность с самым современным оборудованием для майнинга.',
    dailyPaymentsTitle: 'Ежедневные выплаты',
    dailyPaymentsDesc: 'Ваш заработок рассчитывается ежедневно и добавляется на ваш баланс.',

    // Common
    loading: 'Загрузка...',
    save: 'Сохранить',
    cancel: 'Отмена',
    submit: 'Отправить',
    close: 'Закрыть',
    success: 'Успешно',
    error: 'Ошибка',
    warning: 'Предупреждение',
    info: 'Информация',
    yes: 'Да',
    no: 'Нет',
    confirm: 'Подтвердить',
    delete: 'Удалить',
    edit: 'Редактировать',
    view: 'Просмотр',
    back: 'Назад',
    next: 'Далее',
    previous: 'Предыдущий',

    // Status
    active: 'Активно',
    inactive: 'Неактивно',
    pending: 'В ожидании',
    approved: 'Одобрено',
    rejected: 'Отклонено',
    completed: 'Завершено',

    // Time
    today: 'Сегодня',
    yesterday: 'Вчера',
    thisWeek: 'На этой неделе',
    thisMonth: 'В этом месяце',
    days: 'дней',
    hours: 'часов',
    minutes: 'минут',
    seconds: 'секунд'
  },

  zh: {
    // Navigation
    dashboard: '仪表板',
    mining: '挖矿',
    packages: '套餐',
    withdrawal: '提现',
    profile: '个人资料',
    admin: '管理员',
    support: '支持',
    logout: '退出',
    settings: '设置',

    // Auth
    login: '登录',
    register: '注册',
    email: '电子邮箱',
    password: '密码',
    forgotPassword: '忘记密码',
    resetPassword: '重置密码',
    confirmPassword: '确认密码',
    selectLanguage: '选择语言',
    backToHome: '返回首页',
    loginWelcome: '欢迎回到挖矿',
    registerWelcome: '开始您的挖矿之旅',
    resetWelcome: '重置您的密码',
    emailPlaceholder: '输入您的邮箱地址',
    passwordPlaceholder: '输入您的密码',
    referralCode: '推荐码（可选）',
    referralPlaceholder: '输入推荐码',
    processing: '处理中...',
    noAccount: '还没有账户？',
    haveAccount: '已有账户？',
    wantToLogin: '想要登录？',
    freeTrialIncluded: '包含免费试用！',
    freeTrialMonths: '3个月免费挖矿',
    freeTrialEarnings: '最高25 USDT收益',
    freeTrialCoins: '所有币种可用',
    freeTrialNoPayment: '无需付款',
    sslSecure: 'SSL安全',
    fastProcessing: '快速处理',
    trusted: '值得信赖',

    // Dashboard
    totalBalance: '总余额',
    trialEarnings: '试用收益',
    activePackage: '活跃套餐',
    freeTrial: '免费试用',
    welcomeBack: '欢迎回来',
    quickActions: '快捷操作',
    recentActivity: '最近活动',

    // Mining
    startMining: '开始挖矿',
    stopMining: '停止挖矿',
    hashRate: '算力',
    earnings: '收益',
    miningActive: '挖矿中',
    selectCoin: '选择币种',
    miningRules: '挖矿规则',

    // Packages
    selectPackage: '选择套餐',
    paymentInstructions: '支付说明',
    copyAddress: '复制地址',
    paymentNotification: '支付通知',

    // Profile
    accountInfo: '账户信息',
    balanceEarnings: '余额和收益',
    trialStatus: '试用状态',

    // Support
    contactSupport: '联系支持',
    supportEmail: '支持邮箱',
    createTicket: '创建支持工单',
    subject: '主题',
    message: '消息',
    priority: '优先级',

    // Company
    companyName: 'CryptoCloud Mining GmbH',
    companyAddress: 'Berliner Allee 12, 40212 Düsseldorf, Germany',

    // Landing Page
    heroTitle: '通过加密货币挖矿获得被动收入',
    heroSubtitle: '通过挖掘比特币、以太坊、索拉纳和8种以上加密货币获得每日收益。专业云挖矿服务的安全投资。',
    freeBonus: '获得免费$25奖金',
    howItWorks: '如何运作？',
    whyChooseUs: '为什么选择 CryptoCloud Mining？',
    blog: '博客',
    features: '功能',
    packages2: '套餐',
    faq: '常见问题',
    secureTitle: '100% 安全',
    secureDesc: '您的数据通过SSL加密和多层安全系统得到完全保护。',
    highPerformanceTitle: '高性能',
    highPerformanceDesc: '最先进的挖矿硬件提供最大算力和效率。',
    dailyPaymentsTitle: '每日支付',
    dailyPaymentsDesc: '您的收益每天计算并添加到您的余额中。',

    // Common
    loading: '加载中...',
    save: '保存',
    cancel: '取消',
    submit: '提交',
    close: '关闭',
    success: '成功',
    error: '错误',
    warning: '警告',
    info: '信息',
    yes: '是',
    no: '否',
    confirm: '确认',
    delete: '删除',
    edit: '编辑',
    view: '查看',
    back: '返回',
    next: '下一步',
    previous: '上一步',

    // Status
    active: '活跃',
    inactive: '不活跃',
    pending: '待处理',
    approved: '已批准',
    rejected: '已拒绝',
    completed: '已完成',

    // Time
    today: '今天',
    yesterday: '昨天',
    thisWeek: '本周',
    thisMonth: '本月',
    days: '天',
    hours: '小时',
    minutes: '分钟',
    seconds: '秒'
  }
};

export const detectUserLanguage = (): string => {
  // Check localStorage first
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage && supportedLanguages.some(lang => lang.code === savedLanguage)) {
    return savedLanguage;
  }
  
  // Browser language detection
  const browserLang = navigator.language.split('-')[0];
  const supportedCodes = supportedLanguages.map(lang => lang.code);
  
  if (supportedCodes.includes(browserLang)) {
    return browserLang;
  }
  
  // Default to Turkish
  return 'tr';
};

export const getTranslation = (key: string, lang: string = 'tr'): string => {
  const keys = key.split('.');
  let translation: any = translations[lang] || translations.tr;
  
  for (const k of keys) {
    translation = translation[k];
    if (!translation) break;
  }
  
  return translation || key;
};

export const setDocumentLanguage = (lang: string) => {
  document.documentElement.lang = lang;

  // RTL support for Arabic
  if (lang === 'ar') {
    document.documentElement.dir = 'rtl';
    document.body.style.fontFamily = 'Arial, sans-serif';
  } else {
    document.documentElement.dir = 'ltr';
    // Chinese fonts
    if (lang === 'zh') {
      document.body.style.fontFamily = '"PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif';
    } else {
      document.body.style.fontFamily = '';
    }
  }
};