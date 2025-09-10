import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'hi' | 'as';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translations object
const translations = {
  en: {
    // Auth
    'auth.login': 'Login',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.role': 'Select Role',
    'auth.asha_worker': 'ASHA Worker',
    'auth.health_officer': 'Health Officer',
    'auth.admin': 'Administrator',
    'auth.logout': 'Logout',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.reports': 'Reports',
    'nav.alerts': 'Alerts',
    'nav.analytics': 'Analytics',
    'nav.settings': 'Settings',
    
    // Dashboard
    'dashboard.welcome': 'Welcome',
    'dashboard.overview': 'System Overview',
    'dashboard.active_alerts': 'Active Alerts',
    'dashboard.water_quality': 'Water Quality',
    'dashboard.health_reports': 'Health Reports',
    
    // Forms
    'form.submit': 'Submit',
    'form.cancel': 'Cancel',
    'form.save': 'Save',
    'form.required': 'Required',
    
    // Status
    'status.low_risk': 'Low Risk',
    'status.medium_risk': 'Medium Risk',
    'status.high_risk': 'High Risk',
    'status.critical': 'Critical',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.village': 'Village',
    'common.district': 'District',
    'common.date': 'Date',
    'common.time': 'Time',
  },
  hi: {
    // Auth
    'auth.login': 'लॉगिन',
    'auth.email': 'ईमेल',
    'auth.password': 'पासवर्ड',
    'auth.role': 'भूमिका चुनें',
    'auth.asha_worker': 'आशा कार्यकर्ता',
    'auth.health_officer': 'स्वास्थ्य अधिकारी',
    'auth.admin': 'प्रशासक',
    'auth.logout': 'लॉगआउट',
    
    // Navigation
    'nav.dashboard': 'डैशबोर्ड',
    'nav.reports': 'रिपोर्ट',
    'nav.alerts': 'अलर्ट',
    'nav.analytics': 'विश्लेषण',
    'nav.settings': 'सेटिंग्स',
    
    // Dashboard
    'dashboard.welcome': 'स्वागत',
    'dashboard.overview': 'सिस्टम अवलोकन',
    'dashboard.active_alerts': 'सक्रिय अलर्ट',
    'dashboard.water_quality': 'पानी की गुणवत्ता',
    'dashboard.health_reports': 'स्वास्थ्य रिपोर्ट',
    
    // Status
    'status.low_risk': 'कम जोखिम',
    'status.medium_risk': 'मध्यम जोखिम',
    'status.high_risk': 'उच्च जोखिम',
    'status.critical': 'गंभीर',
    
    // Common
    'common.village': 'गांव',
    'common.district': 'जिला',
    'common.date': 'तारीख',
    'common.time': 'समय',
  },
  as: {
    // Auth
    'auth.login': 'লগিন',
    'auth.email': 'ইমেইল',
    'auth.password': 'পাছৱৰ্ড',
    'auth.role': 'ভূমিকা নিৰ্বাচন কৰক',
    'auth.asha_worker': 'আশা কৰ্মী',
    'auth.health_officer': 'স্বাস্থ্য বিষয়া',
    'auth.admin': 'প্ৰশাসক',
    'auth.logout': 'লগআউট',
    
    // Navigation
    'nav.dashboard': 'ডেচবৰ্ড',
    'nav.reports': 'প্ৰতিবেদন',
    'nav.alerts': 'সতৰ্কতা',
    'nav.analytics': 'বিশ্লেষণ',
    'nav.settings': 'ছেটিংছ',
    
    // Dashboard
    'dashboard.welcome': 'স্বাগতম',
    'dashboard.overview': 'চিস্টেম অৱলোকন',
    'dashboard.active_alerts': 'সক্ৰিয় সতৰ্কতা',
    'dashboard.water_quality': 'পানীৰ গুণগত মান',
    'dashboard.health_reports': 'স্বাস্থ্য প্ৰতিবেদন',
    
    // Status
    'status.low_risk': 'কম বিপদ',
    'status.medium_risk': 'মধ্যম বিপদ',
    'status.high_risk': 'উচ্চ বিপদ',
    'status.critical': 'গুৰুতৰ',
    
    // Common
    'common.village': 'গাঁও',
    'common.district': 'জিলা',
    'common.date': 'তাৰিখ',
    'common.time': 'সময়',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};