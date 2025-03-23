"use client";

import { useState, useEffect } from "react";

// Language type
type Language = "de" | "en" | "gr";

// Cookie preferences type
type CookiePreferences = {
  essential: boolean;
  performance: boolean;
  functional: boolean;
  targeting: boolean;
};

// Translations for the cookie consent popup
const translations = {
  title: {
    de: "Cookie-Einstellungen",
    en: "Cookie Settings",
    gr: "Ρυθμίσεις Cookies",
  },
  description: {
    de: "Wir verwenden Cookies, um Ihnen die beste Erfahrung auf unserer Website zu bieten. Weitere Informationen finden Sie in unserer Cookie-Richtlinie.",
    en: "We use cookies to provide you with the best experience on our website. For more information, please see our Cookies Policy.",
    gr: "Χρησιμοποιούμε cookies για να σας παρέχουμε την καλύτερη εμπειρία στον ιστότοπό μας. Για περισσότερες πληροφορίες, δείτε την Πολιτική Cookies μας.",
  },
  essentialCookies: {
    title: {
      de: "Notwendige Cookies",
      en: "Essential Cookies",
      gr: "Απαραίτητα Cookies",
    },
    description: {
      de: "Diese Cookies sind für das Funktionieren der Website unerlässlich und können nicht deaktiviert werden.",
      en: "These cookies are essential for the website to function and cannot be disabled.",
      gr: "Αυτά τα cookies είναι απαραίτητα για τη λειτουργία του ιστότοπου και δεν μπορούν να απενεργοποιηθούν.",
    },
  },
  performanceCookies: {
    title: {
      de: "Leistungs-Cookies",
      en: "Performance Cookies",
      gr: "Cookies Απόδοσης",
    },
    description: {
      de: "Diese Cookies sammeln Informationen darüber, wie Sie unsere Website nutzen.",
      en: "These cookies collect information about how you use our website.",
      gr: "Αυτά τα cookies συλλέγουν πληροφορίες σχετικά με το πώς χρησιμοποιείτε τον ιστότοπό μας.",
    },
  },
  functionalCookies: {
    title: {
      de: "Funktionelle Cookies",
      en: "Functional Cookies",
      gr: "Λειτουργικά Cookies",
    },
    description: {
      de: "Diese Cookies ermöglichen erweiterte Funktionalität und Personalisierung.",
      en: "These cookies enable enhanced functionality and personalization.",
      gr: "Αυτά τα cookies επιτρέπουν βελτιωμένη λειτουργικότητα και εξατομίκευση.",
    },
  },
  targetingCookies: {
    title: {
      de: "Targeting-Cookies",
      en: "Targeting Cookies",
      gr: "Cookies Στόχευσης",
    },
    description: {
      de: "Diese Cookies werden verwendet, um Ihnen personalisierte Werbung anzuzeigen.",
      en: "These cookies are used to show you personalized advertising.",
      gr: "Αυτά τα cookies χρησιμοποιούνται για να σας δείξουν εξατομικευμένες διαφημίσεις.",
    },
  },
  buttons: {
    acceptAll: {
      de: "Alle akzeptieren",
      en: "Accept All",
      gr: "Αποδοχή Όλων",
    },
    saveSettings: {
      de: "Einstellungen speichern",
      en: "Save Settings",
      gr: "Αποθήκευση Ρυθμίσεων",
    },
    acceptEssential: {
      de: "Nur notwendige akzeptieren",
      en: "Accept Only Essential",
      gr: "Αποδοχή Μόνο των Απαραίτητων",
    },
    cookiePolicy: {
      de: "Cookie-Richtlinie",
      en: "Cookies Policy",
      gr: "Πολιτική Cookies",
    },
  },
};

// Default cookie preferences
const defaultPreferences: CookiePreferences = {
  essential: true, // Essential cookies are always enabled
  performance: false,
  functional: false,
  targeting: false,
};

interface CookieConsentProps {
  language: Language;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ language }) => {
  const [showConsent, setShowConsent] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  // Check if the user has already made a choice on cookies
  useEffect(() => {
    const hasConsented = localStorage.getItem("cookieConsent");
    if (!hasConsented) {
      setShowConsent(true);
    } else {
      try {
        const savedPreferences = JSON.parse(localStorage.getItem("cookiePreferences") || "");
        setPreferences(savedPreferences);
      } catch (e) {
        // If there's an error parsing, use default preferences
        localStorage.setItem("cookiePreferences", JSON.stringify(defaultPreferences));
      }
    }
  }, []);

  // Accept all cookies
  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      performance: true,
      functional: true,
      targeting: true,
    };
    localStorage.setItem("cookieConsent", "true");
    localStorage.setItem("cookiePreferences", JSON.stringify(allAccepted));
    setPreferences(allAccepted);
    setShowConsent(false);
  };

  // Accept only essential cookies
  const acceptEssential = () => {
    localStorage.setItem("cookieConsent", "true");
    localStorage.setItem("cookiePreferences", JSON.stringify(defaultPreferences));
    setPreferences(defaultPreferences);
    setShowConsent(false);
  };

  // Save custom cookie settings
  const saveSettings = () => {
    localStorage.setItem("cookieConsent", "true");
    localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
    setShowConsent(false);
  };

  // Toggle a specific cookie preference
  const togglePreference = (type: keyof CookiePreferences) => {
    if (type === "essential") return; // Essential cookies can't be toggled
    setPreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t border-gray-200 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2 md:mb-0">{translations.title[language]}</h2>
          {showDetails && (
            <button
              type="button"
              onClick={() => setShowDetails(false)}
              className="text-sm text-amber-600 hover:text-amber-700"
            >
              {showDetails ? "« " : ""}
              {language === "de" ? "Weniger anzeigen" : language === "en" ? "Show less" : "Λιγότερες λεπτομέρειες"}
            </button>
          )}
        </div>

        <p className="text-gray-600 mb-4">
          {translations.description[language]}{" "}
          <a href="/cookies" className="text-amber-600 hover:underline">
            {translations.buttons.cookiePolicy[language]}
          </a>
        </p>

        {showDetails ? (
          <div className="space-y-4 mb-6">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="essential"
                  type="checkbox"
                  checked={preferences.essential}
                  disabled
                  className="focus:ring-amber-500 h-4 w-4 text-amber-600 border-gray-300 rounded cursor-not-allowed opacity-60"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="essential" className="font-medium text-gray-900 cursor-not-allowed">
                  {translations.essentialCookies.title[language]}
                </label>
                <p className="text-gray-500">{translations.essentialCookies.description[language]}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="performance"
                  type="checkbox"
                  checked={preferences.performance}
                  onChange={() => togglePreference("performance")}
                  className="focus:ring-amber-500 h-4 w-4 text-amber-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="performance" className="font-medium text-gray-900">
                  {translations.performanceCookies.title[language]}
                </label>
                <p className="text-gray-500">{translations.performanceCookies.description[language]}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="functional"
                  type="checkbox"
                  checked={preferences.functional}
                  onChange={() => togglePreference("functional")}
                  className="focus:ring-amber-500 h-4 w-4 text-amber-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="functional" className="font-medium text-gray-900">
                  {translations.functionalCookies.title[language]}
                </label>
                <p className="text-gray-500">{translations.functionalCookies.description[language]}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="targeting"
                  type="checkbox"
                  checked={preferences.targeting}
                  onChange={() => togglePreference("targeting")}
                  className="focus:ring-amber-500 h-4 w-4 text-amber-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="targeting" className="font-medium text-gray-900">
                  {translations.targetingCookies.title[language]}
                </label>
                <p className="text-gray-500">{translations.targetingCookies.description[language]}</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowDetails(true)}
            className="text-sm text-amber-600 hover:text-amber-700 mb-4"
          >
            {language === "de" ? "Mehr anzeigen" : language === "en" ? "Show more" : "Περισσότερες λεπτομέρειες"} »
          </button>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={acceptAll}
            className="flex-1 sm:flex-none px-4 py-2 min-w-[120px] bg-amber-500 hover:bg-amber-600 text-white rounded-md text-sm font-medium transition-colors"
          >
            {translations.buttons.acceptAll[language]}
          </button>
          
          {showDetails ? (
            <button
              type="button"
              onClick={saveSettings}
              className="flex-1 sm:flex-none px-4 py-2 min-w-[120px] bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md text-sm font-medium transition-colors"
            >
              {translations.buttons.saveSettings[language]}
            </button>
          ) : (
            <button
              type="button"
              onClick={acceptEssential}
              className="flex-1 sm:flex-none px-4 py-2 min-w-[120px] bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md text-sm font-medium transition-colors"
            >
              {translations.buttons.acceptEssential[language]}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieConsent; 