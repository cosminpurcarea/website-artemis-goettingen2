"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Language type
type Language = "de" | "en" | "gr";

// Translations for the cookies policy
const translations = {
  title: {
    de: "Cookie-Richtlinie",
    en: "Cookies Policy",
    gr: "Πολιτική Cookies",
  },
  lastUpdated: {
    de: "Zuletzt aktualisiert",
    en: "Last updated",
    gr: "Τελευταία ενημέρωση",
  },
  intro: {
    de: "Diese Cookie-Richtlinie erklärt, wie Artemis Restaurant (\"wir\", \"uns\" oder \"unser\") Cookies und ähnliche Technologien verwendet, um Sie bei der Nutzung unserer Website zu erkennen und Ihnen ein besseres Erlebnis zu bieten.",
    en: "This Cookies Policy explains how Artemis Restaurant (\"we\", \"us\", or \"our\") uses cookies and similar technologies to recognize you when you visit our website and provides you with a better experience.",
    gr: "Αυτή η Πολιτική Cookies εξηγεί πώς το Εστιατόριο Artemis (\"εμείς\", \"εμάς\" ή \"μας\") χρησιμοποιεί cookies και παρόμοιες τεχνολογίες για να σας αναγνωρίσει όταν επισκέπτεστε τον ιστότοπό μας και να σας παρέχει καλύτερη εμπειρία.",
  },
  whatAreCookies: {
    title: {
      de: "Was sind Cookies?",
      en: "What are Cookies?",
      gr: "Τι είναι τα Cookies;",
    },
    content: {
      de: "Cookies sind kleine Datendateien, die auf Ihrem Computer oder mobilen Gerät platziert werden, wenn Sie eine Website besuchen. Cookies werden häufig verwendet, um Websites effizient funktionieren zu lassen und den Websitebetreibern Informationen bereitzustellen.\n\nCookies können von der Website, die Sie besuchen, gesetzt werden (\"Erstanbieter-Cookies\") oder von anderen Websites, die Inhalte auf der Seite betreiben, die Sie anzeigen (\"Drittanbieter-Cookies\").",
      en: "Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used to make websites work efficiently and to provide information to the website operators.\n\nCookies can be set by the website you are visiting (\"first-party cookies\") or by other websites that run content on the page you are viewing (\"third-party cookies\").",
      gr: "Τα cookies είναι μικρά αρχεία δεδομένων που τοποθετούνται στον υπολογιστή ή την κινητή συσκευή σας όταν επισκέπτεστε έναν ιστότοπο. Τα cookies χρησιμοποιούνται ευρέως για να λειτουργούν αποτελεσματικά οι ιστότοποι και να παρέχουν πληροφορίες στους διαχειριστές του ιστότοπου.\n\nΤα cookies μπορούν να οριστούν από τον ιστότοπο που επισκέπτεστε (\"cookies πρώτου μέρους\") ή από άλλους ιστότοπους που εκτελούν περιεχόμενο στη σελίδα που προβάλλετε (\"cookies τρίτων\").",
    },
  },
  cookiesWeUse: {
    title: {
      de: "Cookies, die wir verwenden",
      en: "Cookies We Use",
      gr: "Cookies που χρησιμοποιούμε",
    },
    essential: {
      title: {
        de: "Notwendige Cookies",
        en: "Essential Cookies",
        gr: "Απαραίτητα Cookies",
      },
      content: {
        de: "Diese Cookies sind für das Funktionieren unserer Website unerlässlich und können in unseren Systemen nicht ausgeschaltet werden. Sie werden in der Regel nur als Reaktion auf von Ihnen getätigte Aktionen gesetzt, die einer Anforderung von Diensten gleichkommen, wie z.B. dem Festlegen Ihrer Datenschutzeinstellungen, dem Anmelden oder dem Ausfüllen von Formularen. Sie können Ihren Browser so einstellen, dass er diese Cookies blockiert oder Sie darüber benachrichtigt, aber einige Teile der Website funktionieren dann nicht.",
        en: "These cookies are necessary for our website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms. You can set your browser to block or alert you about these cookies, but some parts of the site will not then work.",
        gr: "Αυτά τα cookies είναι απαραίτητα για τη λειτουργία του ιστότοπού μας και δεν μπορούν να απενεργοποιηθούν στα συστήματά μας. Συνήθως ορίζονται μόνο ως απόκριση σε ενέργειες που κάνετε και που ισοδυναμούν με αίτημα υπηρεσιών, όπως ο καθορισμός των προτιμήσεων απορρήτου σας, η σύνδεση ή η συμπλήρωση φορμών. Μπορείτε να ρυθμίσετε το πρόγραμμα περιήγησής σας ώστε να αποκλείει ή να σας ειδοποιεί σχετικά με αυτά τα cookies, αλλά ορισμένα τμήματα του ιστότοπου δεν θα λειτουργούν.",
      },
    },
    performance: {
      title: {
        de: "Leistungs-Cookies",
        en: "Performance Cookies",
        gr: "Cookies Απόδοσης",
      },
      content: {
        de: "Diese Cookies ermöglichen es uns, Besuche und Verkehrsquellen zu zählen, damit wir die Leistung unserer Website messen und verbessern können. Sie helfen uns zu wissen, welche Seiten am beliebtesten und am wenigsten beliebt sind, und zu sehen, wie sich Besucher auf der Website bewegen. Alle Informationen, die diese Cookies sammeln, sind aggregiert und daher anonym. Wenn Sie diese Cookies nicht zulassen, wissen wir nicht, wann Sie unsere Website besucht haben.",
        en: "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site. All information these cookies collect is aggregated and therefore anonymous. If you do not allow these cookies we will not know when you have visited our site.",
        gr: "Αυτά τα cookies μας επιτρέπουν να μετράμε επισκέψεις και πηγές κυκλοφορίας, ώστε να μπορούμε να μετρήσουμε και να βελτιώσουμε την απόδοση του ιστότοπού μας. Μας βοηθούν να γνωρίζουμε ποιες σελίδες είναι οι πιο και λιγότερο δημοφιλείς και να βλέπουμε πώς κινούνται οι επισκέπτες στον ιστότοπο. Όλες οι πληροφορίες που συλλέγουν αυτά τα cookies είναι συγκεντρωτικές και επομένως ανώνυμες. Εάν δεν επιτρέψετε αυτά τα cookies, δεν θα γνωρίζουμε πότε έχετε επισκεφθεί τον ιστότοπό μας.",
      },
    },
    functional: {
      title: {
        de: "Funktionelle Cookies",
        en: "Functional Cookies",
        gr: "Λειτουργικά Cookies",
      },
      content: {
        de: "Diese Cookies ermöglichen es der Website, erweiterte Funktionalität und Personalisierung bereitzustellen. Sie können von uns oder von Drittanbietern gesetzt werden, deren Dienste wir auf unseren Seiten hinzugefügt haben. Wenn Sie diese Cookies nicht zulassen, funktionieren einige oder alle dieser Dienste möglicherweise nicht einwandfrei.",
        en: "These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages. If you do not allow these cookies then some or all of these services may not function properly.",
        gr: "Αυτά τα cookies επιτρέπουν στον ιστότοπο να παρέχει βελτιωμένη λειτουργικότητα και εξατομίκευση. Μπορούν να οριστούν από εμάς ή από τρίτους παρόχους των οποίων τις υπηρεσίες έχουμε προσθέσει στις σελίδες μας. Εάν δεν επιτρέψετε αυτά τα cookies, τότε ορισμένες ή όλες αυτές οι υπηρεσίες ενδέχεται να μην λειτουργούν σωστά.",
      },
    },
    targeting: {
      title: {
        de: "Targeting-Cookies",
        en: "Targeting Cookies",
        gr: "Cookies Στόχευσης",
      },
      content: {
        de: "Diese Cookies können von unseren Werbepartnern über unsere Website gesetzt werden. Sie können von diesen Unternehmen verwendet werden, um ein Profil Ihrer Interessen zu erstellen und Ihnen relevante Anzeigen auf anderen Websites zu zeigen. Sie speichern nicht direkt persönliche Informationen, basieren jedoch auf der eindeutigen Identifizierung Ihres Browsers und Internet-Geräts. Wenn Sie diese Cookies nicht zulassen, werden Sie weniger gezielte Werbung erleben.",
        en: "These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites. They do not store directly personal information, but are based on uniquely identifying your browser and internet device. If you do not allow these cookies, you will experience less targeted advertising.",
        gr: "Αυτά τα cookies μπορούν να οριστούν μέσω του ιστότοπού μας από τους διαφημιστικούς συνεργάτες μας. Μπορούν να χρησιμοποιηθούν από αυτές τις εταιρείες για να δημιουργήσουν ένα προφίλ των ενδιαφερόντων σας και να σας δείξουν σχετικές διαφημίσεις σε άλλους ιστότοπους. Δεν αποθηκεύουν άμεσα προσωπικές πληροφορίες, αλλά βασίζονται στη μοναδική αναγνώριση του προγράμματος περιήγησής σας και της συσκευής διαδικτύου σας. Εάν δεν επιτρέψετε αυτά τα cookies, θα έχετε λιγότερο στοχευμένη διαφήμιση.",
      },
    },
  },
  howToManage: {
    title: {
      de: "Wie Sie Cookies verwalten können",
      en: "How to Manage Cookies",
      gr: "Πώς να διαχειριστείτε τα Cookies",
    },
    content: {
      de: "Sie können Ihre Cookie-Einstellungen jederzeit überprüfen und ändern, indem Sie die Datenschutzeinstellungen in Ihrem Browser ändern. Die meisten Webbrowser erlauben eine gewisse Kontrolle der meisten Cookies über die Browsereinstellungen. Um mehr über Cookies zu erfahren, besuchen Sie bitte www.allaboutcookies.org.\n\nBitte beachten Sie, dass das Deaktivieren oder Löschen von Cookies die Funktionalität unserer Website beeinträchtigen kann.",
      en: "You can review and change your cookie settings at any time by adjusting the privacy settings in your browser. Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, please visit www.allaboutcookies.org.\n\nPlease note that disabling or clearing cookies may affect the functionality of our website.",
      gr: "Μπορείτε να ελέγξετε και να αλλάξετε τις ρυθμίσεις cookie ανά πάσα στιγμή, προσαρμόζοντας τις ρυθμίσεις απορρήτου στο πρόγραμμα περιήγησής σας. Τα περισσότερα προγράμματα περιήγησης ιστού επιτρέπουν κάποιο έλεγχο των περισσότερων cookies μέσω των ρυθμίσεων του προγράμματος περιήγησης. Για να μάθετε περισσότερα σχετικά με τα cookies, επισκεφθείτε τη διεύθυνση www.allaboutcookies.org.\n\nΛάβετε υπόψη ότι η απενεργοποίηση ή η εκκαθάριση των cookies ενδέχεται να επηρεάσει τη λειτουργικότητα του ιστότοπού μας.",
    },
  },
  changes: {
    title: {
      de: "Änderungen an dieser Cookie-Richtlinie",
      en: "Changes to This Cookies Policy",
      gr: "Αλλαγές σε αυτήν την Πολιτική Cookies",
    },
    content: {
      de: "Wir können diese Cookie-Richtlinie von Zeit zu Zeit aktualisieren, indem wir eine neue Version auf unserer Website veröffentlichen. Sie sollten diese Seite gelegentlich überprüfen, um sich über Änderungen zu informieren.",
      en: "We may update this Cookies Policy from time to time by posting a new version on our website. You should check this page occasionally to ensure you are happy with any changes.",
      gr: "Μπορούμε να ενημερώνουμε αυτήν την Πολιτική Cookies από καιρό σε καιρό δημοσιεύοντας μια νέα έκδοση στον ιστότοπό μας. Θα πρέπει να ελέγχετε αυτήν τη σελίδα περιστασιακά για να βεβαιωθείτε ότι είστε ικανοποιημένοι με τυχόν αλλαγές.",
    },
  },
  contact: {
    title: {
      de: "Kontaktieren Sie uns",
      en: "Contact Us",
      gr: "Επικοινωνήστε μαζί μας",
    },
    content: {
      de: "Wenn Sie Fragen zu unserer Verwendung von Cookies haben, kontaktieren Sie uns bitte unter:",
      en: "If you have any questions about our use of cookies, please contact us at:",
      gr: "Εάν έχετε ερωτήσεις σχετικά με τη χρήση των cookies από εμάς, επικοινωνήστε μαζί μας στο:",
    },
    email: "info@artemis-restaurant.de",
    phone: {
      de: "Telefon",
      en: "Phone",
      gr: "Τηλέφωνο",
    },
    phoneNumber: "+49 551 3054475",
  },
  backToHome: {
    de: "Zurück zur Startseite",
    en: "Back to Home",
    gr: "Επιστροφή στην αρχική σελίδα",
  },
  cookiePreferences: {
    de: "Cookie-Einstellungen",
    en: "Cookie Preferences",
    gr: "Προτιμήσεις Cookies",
  },
  manageCookies: {
    de: "Cookies verwalten",
    en: "Manage Cookies",
    gr: "Διαχείριση Cookies",
  },
};

export default function CookiesPolicyPage() {
  const [language, setLanguage] = useState<Language>("de");

  // Use stored language preference if available
  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") as Language;
    if (storedLanguage && (storedLanguage === "de" || storedLanguage === "en" || storedLanguage === "gr")) {
      setLanguage(storedLanguage);
    }
  }, []);

  // Handle language change and store preference
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const openCookieSettings = () => {
    // This function would normally open the cookie settings
    // For now, we'll just alert the user
    alert('Cookie settings would open here in a production environment.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed w-full z-50 bg-white/80 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="text-xl font-bold">Artemis</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <button 
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${language === 'de' ? 'bg-amber-500 text-white' : 'hover:bg-gray-100'}`}
                  onClick={() => handleLanguageChange('de')}
                >
                  DE
                </button>
                <button 
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${language === 'en' ? 'bg-amber-500 text-white' : 'hover:bg-gray-100'}`}
                  onClick={() => handleLanguageChange('en')}
                >
                  EN
                </button>
                <button 
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${language === 'gr' ? 'bg-amber-500 text-white' : 'hover:bg-gray-100'}`}
                  onClick={() => handleLanguageChange('gr')}
                >
                  GR
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">{translations.title[language]}</h1>
            <p className="text-sm text-gray-500 mb-8">{translations.lastUpdated[language]}: 23.03.2025</p>
            
            <div className="mb-8">
              <button 
                onClick={openCookieSettings}
                className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors inline-flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                {translations.manageCookies[language]}
              </button>
            </div>
            
            <p className="text-gray-700 mb-8">
              {translations.intro[language]}
            </p>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">{translations.whatAreCookies.title[language]}</h2>
              <p className="text-gray-700 whitespace-pre-line">{translations.whatAreCookies.content[language]}</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">{translations.cookiesWeUse.title[language]}</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2 text-gray-800">{translations.cookiesWeUse.essential.title[language]}</h3>
                  <p className="text-gray-700">{translations.cookiesWeUse.essential.content[language]}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-gray-800">{translations.cookiesWeUse.performance.title[language]}</h3>
                  <p className="text-gray-700">{translations.cookiesWeUse.performance.content[language]}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-gray-800">{translations.cookiesWeUse.functional.title[language]}</h3>
                  <p className="text-gray-700">{translations.cookiesWeUse.functional.content[language]}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-gray-800">{translations.cookiesWeUse.targeting.title[language]}</h3>
                  <p className="text-gray-700">{translations.cookiesWeUse.targeting.content[language]}</p>
                </div>
              </div>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">{translations.howToManage.title[language]}</h2>
              <p className="text-gray-700 whitespace-pre-line">{translations.howToManage.content[language]}</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">{translations.changes.title[language]}</h2>
              <p className="text-gray-700">{translations.changes.content[language]}</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">{translations.contact.title[language]}</h2>
              <p className="text-gray-700 mb-4">{translations.contact.content[language]}</p>
              <p className="text-gray-700">
                Email: <a href={`mailto:${translations.contact.email}`} className="text-amber-600 hover:underline">{translations.contact.email}</a>
              </p>
              <p className="text-gray-700">
                {translations.contact.phone[language]}: {translations.contact.phoneNumber}
              </p>
            </section>
            
            <div className="mt-12">
              <Link href="/" className="inline-flex items-center text-amber-600 hover:text-amber-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {translations.backToHome[language]}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 