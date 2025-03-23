"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Language type
type Language = "de" | "en" | "gr";

// Translations for the privacy policy
const translations = {
  title: {
    de: "Datenschutzerklärung",
    en: "Privacy Policy",
    gr: "Πολιτική Απορρήτου",
  },
  lastUpdated: {
    de: "Zuletzt aktualisiert",
    en: "Last updated",
    gr: "Τελευταία ενημέρωση",
  },
  intro: {
    de: "Wir bei Artemis Restaurant nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Diese Datenschutzerklärung informiert Sie darüber, wie wir mit Ihren personenbezogenen Daten umgehen, wenn Sie unsere Website besuchen oder unsere Dienstleistungen in Anspruch nehmen.",
    en: "At Artemis Restaurant, we take the protection of your personal data very seriously. This Privacy Policy informs you about how we handle your personal data when you visit our website or use our services.",
    gr: "Στο Εστιατόριο Artemis, λαμβάνουμε πολύ σοβαρά την προστασία των προσωπικών σας δεδομένων. Αυτή η Πολιτική Απορρήτου σας ενημερώνει για το πώς χειριζόμαστε τα προσωπικά σας δεδομένα όταν επισκέπτεστε τον ιστότοπό μας ή χρησιμοποιείτε τις υπηρεσίες μας.",
  },
  gdprCompliance: {
    title: {
      de: "DSGVO-Konformität",
      en: "GDPR Compliance",
      gr: "Συμμόρφωση με GDPR",
    },
    content: {
      de: "Wir verarbeiten Ihre Daten gemäß der Datenschutz-Grundverordnung (DSGVO) der Europäischen Union. Diese gibt Ihnen bestimmte Rechte in Bezug auf Ihre Daten und verpflichtet uns, diese zu schützen.",
      en: "We process your data in accordance with the European Union's General Data Protection Regulation (GDPR). This gives you certain rights regarding your data and obliges us to protect it.",
      gr: "Επεξεργαζόμαστε τα δεδομένα σας σύμφωνα με τον Γενικό Κανονισμό Προστασίας Δεδομένων (GDPR) της Ευρωπαϊκής Ένωσης. Αυτό σας παρέχει ορισμένα δικαιώματα σχετικά με τα δεδομένα σας και μας υποχρεώνει να τα προστατεύουμε.",
    },
  },
  dataController: {
    title: {
      de: "Verantwortlicher",
      en: "Data Controller",
      gr: "Υπεύθυνος Επεξεργασίας Δεδομένων",
    },
    content: {
      de: "Verantwortlich für die Datenverarbeitung auf dieser Website ist:\n\nArtemis Restaurant\nWeender Str. 78\n37073 Göttingen\nDeutschland\n\nE-Mail: info@artemis-restaurant.de\nTelefon: +49 551 3054475",
      en: "The entity responsible for processing data on this website is:\n\nArtemis Restaurant\nWeender Str. 78\n37073 Göttingen\nGermany\n\nEmail: info@artemis-restaurant.de\nPhone: +49 551 3054475",
      gr: "Υπεύθυνος για την επεξεργασία δεδομένων σε αυτόν τον ιστότοπο είναι:\n\nΕστιατόριο Artemis\nWeender Str. 78\n37073 Göttingen\nΓερμανία\n\nEmail: info@artemis-restaurant.de\nΤηλέφωνο: +49 551 3054475",
    },
  },
  dataCollected: {
    title: {
      de: "Daten, die wir sammeln",
      en: "Information We Collect",
      gr: "Πληροφορίες που Συλλέγουμε",
    },
    content: {
      de: "Wir können die folgenden Arten von Informationen sammeln:",
      en: "We may collect the following types of information:",
      gr: "Ενδέχεται να συλλέξουμε τους ακόλουθους τύπους πληροφοριών:",
    },
    types: {
      personal: {
        de: "Persönliche Identifikationsinformationen (Name, E-Mail-Adresse, Telefonnummer, etc.), wenn Sie mit uns Kontakt aufnehmen oder eine Reservierung vornehmen.",
        en: "Personal identification information (name, email address, phone number, etc.) when you contact us or make a reservation.",
        gr: "Προσωπικές πληροφορίες ταυτοποίησης (όνομα, διεύθυνση email, αριθμός τηλεφώνου, κλπ.) όταν επικοινωνείτε μαζί μας ή κάνετε κράτηση.",
      },
      technical: {
        de: "Technische Informationen wie IP-Adresse, Browsertyp und -version, Betriebssystem, etc. Diese werden automatisch gesammelt, wenn Sie unsere Website besuchen.",
        en: "Technical information such as IP address, browser type and version, operating system, etc. These are collected automatically when you visit our website.",
        gr: "Τεχνικές πληροφορίες όπως διεύθυνση IP, τύπος και έκδοση προγράμματος περιήγησης, λειτουργικό σύστημα κλπ. Αυτές συλλέγονται αυτόματα όταν επισκέπτεστε τον ιστότοπό μας.",
      },
      usage: {
        de: "Informationen darüber, wie Sie unsere Website nutzen, einschließlich der Seiten, die Sie besuchen, und wie Sie mit diesen interagieren.",
        en: "Information about how you use our website, including the pages you visit and how you interact with them.",
        gr: "Πληροφορίες σχετικά με το πώς χρησιμοποιείτε τον ιστότοπό μας, συμπεριλαμβανομένων των σελίδων που επισκέπτεστε και πώς αλληλεπιδράτε με αυτές.",
      },
      cookies: {
        de: "Informationen, die über Cookies und ähnliche Technologien gesammelt werden. Weitere Informationen finden Sie in unserer Cookie-Richtlinie.",
        en: "Information collected through cookies and similar technologies. For more information, please see our Cookies Policy.",
        gr: "Πληροφορίες που συλλέγονται μέσω cookies και παρόμοιων τεχνολογιών. Για περισσότερες πληροφορίες, ανατρέξτε στην Πολιτική Cookies μας.",
      },
    },
  },
  dataUsage: {
    title: {
      de: "Wie wir Ihre Daten verwenden",
      en: "How We Use Your Information",
      gr: "Πώς Χρησιμοποιούμε τις Πληροφορίες σας",
    },
    purposes: {
      provide: {
        de: "Um Ihnen unsere Dienstleistungen anzubieten und Ihre Anfragen zu bearbeiten",
        en: "To provide our services to you and process your requests",
        gr: "Για να σας παρέχουμε τις υπηρεσίες μας και να επεξεργαστούμε τα αιτήματά σας",
      },
      improve: {
        de: "Um unsere Website und Dienstleistungen zu verbessern",
        en: "To improve our website and services",
        gr: "Για τη βελτίωση του ιστότοπου και των υπηρεσιών μας",
      },
      communicate: {
        de: "Um mit Ihnen zu kommunizieren, auch zu Marketingzwecken, wenn Sie dem zugestimmt haben",
        en: "To communicate with you, including for marketing purposes if you have consented to this",
        gr: "Για να επικοινωνούμε μαζί σας, συμπεριλαμβανομένων των σκοπών μάρκετινγκ εάν έχετε συναινέσει σε αυτό",
      },
      legal: {
        de: "Um unsere rechtlichen Verpflichtungen zu erfüllen",
        en: "To comply with our legal obligations",
        gr: "Για να συμμορφωνόμαστε με τις νομικές μας υποχρεώσεις",
      },
    },
  },
  dataSharing: {
    title: {
      de: "Weitergabe Ihrer Daten",
      en: "Sharing Your Information",
      gr: "Κοινοποίηση των Πληροφοριών σας",
    },
    content: {
      de: "Wir geben Ihre persönlichen Daten nicht an Dritte weiter, außer in den folgenden Fällen:",
      en: "We do not share your personal data with third parties except in the following cases:",
      gr: "Δεν μοιραζόμαστε τα προσωπικά σας δεδομένα με τρίτους εκτός από τις ακόλουθες περιπτώσεις:",
    },
    cases: {
      providers: {
        de: "Mit Dienstleistern, die uns bei der Bereitstellung unserer Dienstleistungen unterstützen (z. B. Hosting-Provider), und die vertraglich verpflichtet sind, Ihre Daten zu schützen.",
        en: "With service providers who help us provide our services (e.g., hosting providers), and who are contractually obligated to protect your data.",
        gr: "Με παρόχους υπηρεσιών που μας βοηθούν να παρέχουμε τις υπηρεσίες μας (π.χ. πάροχοι φιλοξενίας), οι οποίοι είναι συμβατικά υποχρεωμένοι να προστατεύουν τα δεδομένα σας.",
      },
      legal: {
        de: "Wenn wir gesetzlich dazu verpflichtet sind oder wenn es zum Schutz unserer Rechte, unseres Eigentums oder unserer Sicherheit erforderlich ist.",
        en: "When we are legally required to do so or when it is necessary to protect our rights, property, or safety.",
        gr: "Όταν απαιτείται από το νόμο ή όταν είναι απαραίτητο για την προστασία των δικαιωμάτων, της ιδιοκτησίας ή της ασφάλειάς μας.",
      },
      consent: {
        de: "Mit Ihrer ausdrücklichen Einwilligung.",
        en: "With your explicit consent.",
        gr: "Με τη ρητή συγκατάθεσή σας.",
      },
    },
  },
  rights: {
    title: {
      de: "Ihre Rechte",
      en: "Your Rights",
      gr: "Τα Δικαιώματά σας",
    },
    content: {
      de: "Nach der DSGVO haben Sie bestimmte Rechte in Bezug auf Ihre persönlichen Daten, darunter:",
      en: "Under the GDPR, you have certain rights regarding your personal data, including:",
      gr: "Σύμφωνα με τον GDPR, έχετε ορισμένα δικαιώματα σχετικά με τα προσωπικά σας δεδομένα, συμπεριλαμβανομένων:",
    },
    rights: {
      access: {
        de: "Das Recht auf Zugang zu Ihren Daten",
        en: "The right to access your data",
        gr: "Το δικαίωμα πρόσβασης στα δεδομένα σας",
      },
      rectification: {
        de: "Das Recht auf Berichtigung Ihrer Daten",
        en: "The right to rectify your data",
        gr: "Το δικαίωμα διόρθωσης των δεδομένων σας",
      },
      erasure: {
        de: "Das Recht auf Löschung Ihrer Daten",
        en: "The right to erasure of your data",
        gr: "Το δικαίωμα διαγραφής των δεδομένων σας",
      },
      restriction: {
        de: "Das Recht auf Einschränkung der Verarbeitung",
        en: "The right to restrict processing",
        gr: "Το δικαίωμα περιορισμού της επεξεργασίας",
      },
      portability: {
        de: "Das Recht auf Datenübertragbarkeit",
        en: "The right to data portability",
        gr: "Το δικαίωμα φορητότητας δεδομένων",
      },
      objection: {
        de: "Das Recht auf Widerspruch",
        en: "The right to object",
        gr: "Το δικαίωμα εναντίωσης",
      },
    },
  },
  dataRetention: {
    title: {
      de: "Datenspeicherung",
      en: "Data Retention",
      gr: "Διατήρηση Δεδομένων",
    },
    content: {
      de: "Wir speichern Ihre personenbezogenen Daten nur so lange, wie es für die Zwecke, für die sie erhoben wurden, erforderlich ist, oder um gesetzlichen Anforderungen zu entsprechen.",
      en: "We retain your personal data only for as long as necessary for the purposes for which they were collected or to comply with legal requirements.",
      gr: "Διατηρούμε τα προσωπικά σας δεδομένα μόνο για όσο διάστημα είναι απαραίτητο για τους σκοπούς για τους οποίους συλλέχθηκαν ή για συμμόρφωση με τις νομικές απαιτήσεις.",
    },
  },
  security: {
    title: {
      de: "Datenschutz und Sicherheit",
      en: "Data Protection and Security",
      gr: "Προστασία και Ασφάλεια Δεδομένων",
    },
    content: {
      de: "Wir setzen angemessene technische und organisatorische Maßnahmen ein, um Ihre personenbezogenen Daten gegen Verlust, Missbrauch und unbefugten Zugriff zu schützen.",
      en: "We implement appropriate technical and organizational measures to protect your personal data against loss, misuse, and unauthorized access.",
      gr: "Εφαρμόζουμε κατάλληλα τεχνικά και οργανωτικά μέτρα για την προστασία των προσωπικών σας δεδομένων από απώλεια, κατάχρηση και μη εξουσιοδοτημένη πρόσβαση.",
    },
  },
  thirdParty: {
    title: {
      de: "Links zu Dritten",
      en: "Third-Party Links",
      gr: "Σύνδεσμοι Τρίτων",
    },
    content: {
      de: "Unsere Website kann Links zu anderen Websites enthalten, die nicht von uns betrieben werden. Wir haben keine Kontrolle über und übernehmen keine Verantwortung für den Inhalt, die Datenschutzrichtlinien oder Praktiken von Websites Dritter.",
      en: "Our website may contain links to other websites that are not operated by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites.",
      gr: "Ο ιστότοπός μας μπορεί να περιέχει συνδέσμους προς άλλους ιστότοπους που δεν λειτουργούν από εμάς. Δεν έχουμε κανέναν έλεγχο και δεν αναλαμβάνουμε καμία ευθύνη για το περιεχόμενο, τις πολιτικές απορρήτου ή τις πρακτικές οποιωνδήποτε ιστότοπων τρίτων.",
    },
  },
  childrenPrivacy: {
    title: {
      de: "Datenschutz von Kindern",
      en: "Children's Privacy",
      gr: "Απόρρητο Παιδιών",
    },
    content: {
      de: "Unsere Website richtet sich nicht an Personen unter 16 Jahren. Wir sammeln wissentlich keine personenbezogenen Daten von Kindern unter 16 Jahren.",
      en: "Our website is not directed to persons under 16 years of age. We do not knowingly collect personal data from children under 16 years of age.",
      gr: "Ο ιστότοπός μας δεν απευθύνεται σε άτομα κάτω των 16 ετών. Δεν συλλέγουμε εν γνώσει μας προσωπικά δεδομένα από παιδιά κάτω των 16 ετών.",
    },
  },
  changes: {
    title: {
      de: "Änderungen dieser Datenschutzerklärung",
      en: "Changes to This Privacy Policy",
      gr: "Αλλαγές σε αυτήν την Πολιτική Απορρήτου",
    },
    content: {
      de: "Wir können diese Datenschutzerklärung von Zeit zu Zeit aktualisieren. Wir werden Sie über wesentliche Änderungen informieren, indem wir die überarbeitete Erklärung auf unserer Website veröffentlichen.",
      en: "We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the revised policy on our website.",
      gr: "Ενδέχεται να ενημερώνουμε αυτήν την Πολιτική Απορρήτου από καιρό σε καιρό. Θα σας ενημερώσουμε για τυχόν σημαντικές αλλαγές δημοσιεύοντας την αναθεωρημένη πολιτική στον ιστότοπό μας.",
    },
  },
  contact: {
    title: {
      de: "Kontakt",
      en: "Contact Us",
      gr: "Επικοινωνήστε μαζί μας",
    },
    content: {
      de: "Wenn Sie Fragen zu dieser Datenschutzerklärung haben oder Ihre Rechte ausüben möchten, kontaktieren Sie uns bitte unter:",
      en: "If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us at:",
      gr: "Εάν έχετε ερωτήσεις σχετικά με αυτήν την Πολιτική Απορρήτου ή επιθυμείτε να ασκήσετε τα δικαιώματά σας, επικοινωνήστε μαζί μας στο:",
    },
  },
  backToHome: {
    de: "Zurück zur Startseite",
    en: "Back to Home",
    gr: "Επιστροφή στην αρχική σελίδα",
  },
};

export default function PrivacyPolicyPage() {
  const [language, setLanguage] = useState<Language>("de");

  // Use stored language preference if available
  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") as Language;
    if (storedLanguage && (storedLanguage === "de" || storedLanguage === "en" || storedLanguage === "gr")) {
      setLanguage(storedLanguage);
    }
  }, []);

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
                  onClick={() => {
                    setLanguage('de');
                    localStorage.setItem("language", "de");
                  }}
                >
                  DE
                </button>
                <button 
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${language === 'en' ? 'bg-amber-500 text-white' : 'hover:bg-gray-100'}`}
                  onClick={() => {
                    setLanguage('en');
                    localStorage.setItem("language", "en");
                  }}
                >
                  EN
                </button>
                <button 
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${language === 'gr' ? 'bg-amber-500 text-white' : 'hover:bg-gray-100'}`}
                  onClick={() => {
                    setLanguage('gr');
                    localStorage.setItem("language", "gr");
                  }}
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
            
            <p className="text-gray-700 mb-8">
              {translations.intro[language]}
            </p>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">{translations.gdprCompliance.title[language]}</h2>
              <p className="text-gray-700">{translations.gdprCompliance.content[language]}</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">{translations.dataController.title[language]}</h2>
              <p className="text-gray-700 whitespace-pre-line">{translations.dataController.content[language]}</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">{translations.dataCollected.title[language]}</h2>
              <p className="text-gray-700 mb-4">{translations.dataCollected.content[language]}</p>
              
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>{translations.dataCollected.types.personal[language]}</li>
                <li>{translations.dataCollected.types.technical[language]}</li>
                <li>{translations.dataCollected.types.usage[language]}</li>
                <li>{translations.dataCollected.types.cookies[language]}</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">{translations.dataUsage.title[language]}</h2>
              
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>{translations.dataUsage.purposes.provide[language]}</li>
                <li>{translations.dataUsage.purposes.improve[language]}</li>
                <li>{translations.dataUsage.purposes.communicate[language]}</li>
                <li>{translations.dataUsage.purposes.legal[language]}</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">{translations.dataSharing.title[language]}</h2>
              <p className="text-gray-700 mb-4">{translations.dataSharing.content[language]}</p>
              
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>{translations.dataSharing.cases.providers[language]}</li>
                <li>{translations.dataSharing.cases.legal[language]}</li>
                <li>{translations.dataSharing.cases.consent[language]}</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">{translations.rights.title[language]}</h2>
              <p className="text-gray-700 mb-4">{translations.rights.content[language]}</p>
              
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>{translations.rights.rights.access[language]}</li>
                <li>{translations.rights.rights.rectification[language]}</li>
                <li>{translations.rights.rights.erasure[language]}</li>
                <li>{translations.rights.rights.restriction[language]}</li>
                <li>{translations.rights.rights.portability[language]}</li>
                <li>{translations.rights.rights.objection[language]}</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">{translations.dataRetention.title[language]}</h2>
              <p className="text-gray-700">{translations.dataRetention.content[language]}</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">{translations.security.title[language]}</h2>
              <p className="text-gray-700">{translations.security.content[language]}</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">{translations.thirdParty.title[language]}</h2>
              <p className="text-gray-700">{translations.thirdParty.content[language]}</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">{translations.childrenPrivacy.title[language]}</h2>
              <p className="text-gray-700">{translations.childrenPrivacy.content[language]}</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">{translations.changes.title[language]}</h2>
              <p className="text-gray-700">{translations.changes.content[language]}</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">{translations.contact.title[language]}</h2>
              <p className="text-gray-700 mb-4">{translations.contact.content[language]}</p>
              <p className="text-gray-700">
                Email: <a href="mailto:info@artemis-restaurant.de" className="text-amber-600 hover:underline">info@artemis-restaurant.de</a>
              </p>
              <p className="text-gray-700">
                {language === 'de' ? 'Telefon' : language === 'en' ? 'Phone' : 'Τηλέφωνο'}: +49 551 3054475
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