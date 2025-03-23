"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Language type
type Language = "de" | "en" | "gr";

// Translations for the legal notice
const translations = {
  title: {
    de: "Impressum",
    en: "Legal Notice",
    gr: "Νομική Σημείωση",
  },
  lastUpdated: {
    de: "Zuletzt aktualisiert",
    en: "Last updated",
    gr: "Τελευταία ενημέρωση",
  },
  companyInfo: {
    title: {
      de: "Angaben gemäß § 5 TMG",
      en: "Information according to § 5 TMG",
      gr: "Πληροφορίες σύμφωνα με § 5 TMG",
    },
    name: {
      de: "Artemis Restaurant",
      en: "Artemis Restaurant",
      gr: "Εστιατόριο Artemis",
    },
    address: {
      de: "Weender Str. 78\n37073 Göttingen\nDeutschland",
      en: "Weender Str. 78\n37073 Göttingen\nGermany",
      gr: "Weender Str. 78\n37073 Göttingen\nΓερμανία",
    },
  },
  contactInfo: {
    title: {
      de: "Kontakt",
      en: "Contact",
      gr: "Επικοινωνία",
    },
    phone: {
      label: {
        de: "Telefon",
        en: "Phone",
        gr: "Τηλέφωνο",
      },
      value: "+49 551 3054475",
    },
    email: {
      label: {
        de: "E-Mail",
        en: "Email",
        gr: "Email",
      },
      value: "info@artemis-restaurant.de",
    },
  },
  vatId: {
    title: {
      de: "Umsatzsteuer-ID",
      en: "VAT ID",
      gr: "Αριθμός ΦΠΑ",
    },
    content: {
      de: "Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:",
      en: "VAT identification number according to § 27 a of the German VAT Act:",
      gr: "Αριθμός αναγνώρισης ΦΠΑ σύμφωνα με το § 27 a του γερμανικού νόμου περί ΦΠΑ:",
    },
    value: "DE123456789", // Replace with actual VAT ID
  },
  responsiblePerson: {
    title: {
      de: "Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV",
      en: "Responsible for content according to § 55 para. 2 RStV",
      gr: "Υπεύθυνος για το περιεχόμενο σύμφωνα με § 55 παρ. 2 RStV",
    },
    name: "Georgios Papadopoulos", // Replace with actual name
    address: {
      de: "Anschrift wie oben",
      en: "Address as above",
      gr: "Διεύθυνση όπως παραπάνω",
    },
  },
  euDisputeResolution: {
    title: {
      de: "EU-Streitschlichtung",
      en: "EU Dispute Resolution",
      gr: "Επίλυση διαφορών της ΕΕ",
    },
    content: {
      de: "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/. Unsere E-Mail-Adresse finden Sie oben im Impressum.",
      en: "The European Commission provides a platform for online dispute resolution (ODR): https://ec.europa.eu/consumers/odr/. You can find our email address at the top of this legal notice.",
      gr: "Η Ευρωπαϊκή Επιτροπή παρέχει μια πλατφόρμα για την ηλεκτρονική επίλυση διαφορών (ODR): https://ec.europa.eu/consumers/odr/. Μπορείτε να βρείτε τη διεύθυνση email μας στην κορυφή αυτής της νομικής σημείωσης.",
    },
  },
  disputeResolution: {
    title: {
      de: "Verbraucherstreitbeilegung/Universalschlichtungsstelle",
      en: "Consumer Dispute Resolution/Universal Arbitration Board",
      gr: "Επίλυση διαφορών καταναλωτών/Καθολικό συμβούλιο διαιτησίας",
    },
    content: {
      de: "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
      en: "We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.",
      gr: "Δεν είμαστε ούτε πρόθυμοι ούτε υποχρεωμένοι να συμμετάσχουμε σε διαδικασίες επίλυσης διαφορών ενώπιον συμβουλίου διαιτησίας καταναλωτών.",
    },
  },
  liabilityForContent: {
    title: {
      de: "Haftung für Inhalte",
      en: "Liability for Content",
      gr: "Ευθύνη για το περιεχόμενο",
    },
    content: {
      de: "Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.",
      en: "As a service provider, we are responsible for our own content on these pages in accordance with general laws pursuant to § 7 para.1 TMG. However, according to §§ 8 to 10 TMG, we as a service provider are not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity. Obligations to remove or block the use of information under general laws remain unaffected. However, liability in this respect is only possible from the point in time at which a concrete legal violation becomes known. If we become aware of any such legal violations, we will remove the relevant content immediately.",
      gr: "Ως πάροχος υπηρεσιών, είμαστε υπεύθυνοι για το δικό μας περιεχόμενο σε αυτές τις σελίδες σύμφωνα με τους γενικούς νόμους σύμφωνα με το § 7 παρ.1 TMG. Ωστόσο, σύμφωνα με τα §§ 8 έως 10 TMG, εμείς ως πάροχος υπηρεσιών δεν είμαστε υποχρεωμένοι να παρακολουθούμε μεταδιδόμενες ή αποθηκευμένες πληροφορίες τρίτων ή να ερευνούμε περιστάσεις που υποδεικνύουν παράνομη δραστηριότητα. Οι υποχρεώσεις αφαίρεσης ή αποκλεισμού της χρήσης πληροφοριών βάσει των γενικών νόμων παραμένουν ανεπηρέαστες. Ωστόσο, η ευθύνη σε αυτό το θέμα είναι δυνατή μόνο από το χρονικό σημείο κατά το οποίο γίνεται γνωστή μια συγκεκριμένη νομική παραβίαση. Εάν γνωρίζουμε τέτοιες νομικές παραβιάσεις, θα αφαιρέσουμε αμέσως το σχετικό περιεχόμενο.",
    },
  },
  liabilityForLinks: {
    title: {
      de: "Haftung für Links",
      en: "Liability for Links",
      gr: "Ευθύνη για συνδέσμους",
    },
    content: {
      de: "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.",
      en: "Our offer contains links to external websites of third parties, on whose contents we have no influence. Therefore, we cannot assume any liability for these external contents. The respective provider or operator of the pages is always responsible for the contents of the linked pages. The linked pages were checked for possible legal violations at the time of linking. Illegal contents were not recognizable at the time of linking. However, a permanent control of the contents of the linked pages is not reasonable without concrete evidence of a violation of law. If we become aware of any legal violations, we will remove such links immediately.",
      gr: "Η προσφορά μας περιέχει συνδέσμους προς εξωτερικούς ιστότοπους τρίτων, το περιεχόμενο των οποίων δεν μπορούμε να επηρεάσουμε. Επομένως, δεν μπορούμε να αναλάβουμε καμία ευθύνη για αυτό το εξωτερικό περιεχόμενο. Ο εκάστοτε πάροχος ή διαχειριστής των σελίδων είναι πάντα υπεύθυνος για το περιεχόμενο των συνδεδεμένων σελίδων. Οι συνδεδεμένες σελίδες ελέγχθηκαν για πιθανές νομικές παραβιάσεις κατά τη στιγμή της σύνδεσης. Δεν ήταν αναγνωρίσιμο παράνομο περιεχόμενο κατά τη στιγμή της σύνδεσης. Ωστόσο, ο μόνιμος έλεγχος του περιεχομένου των συνδεδεμένων σελίδων δεν είναι εύλογος χωρίς συγκεκριμένες ενδείξεις παραβίασης του νόμου. Εάν γνωρίζουμε τυχόν νομικές παραβιάσεις, θα αφαιρέσουμε αμέσως τέτοιους συνδέσμους.",
    },
  },
  copyright: {
    title: {
      de: "Urheberrecht",
      en: "Copyright",
      gr: "Πνευματικά Δικαιώματα",
    },
    content: {
      de: "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.",
      en: "The contents and works on these pages created by the site operators are subject to German copyright law. Duplication, processing, distribution, or any form of commercialization of such material beyond the scope of the copyright law shall require the prior written consent of its respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use. Insofar as the content on this site was not created by the operator, the copyrights of third parties are respected. In particular, third-party content is identified as such. Should you nevertheless become aware of a copyright infringement, please inform us accordingly. If we become aware of any infringements, we will remove such content immediately.",
      gr: "Το περιεχόμενο και τα έργα σε αυτές τις σελίδες που δημιουργήθηκαν από τους διαχειριστές του ιστότοπου υπόκεινται στο γερμανικό δίκαιο πνευματικής ιδιοκτησίας. Η αντιγραφή, επεξεργασία, διανομή ή οποιαδήποτε μορφή εμπορευματοποίησης τέτοιου υλικού πέραν του πεδίου εφαρμογής του νόμου περί πνευματικών δικαιωμάτων απαιτεί την προηγούμενη γραπτή συγκατάθεση του αντίστοιχου συγγραφέα ή δημιουργού. Οι λήψεις και τα αντίγραφα αυτού του ιστότοπου επιτρέπονται μόνο για ιδιωτική, μη εμπορική χρήση. Στο βαθμό που το περιεχόμενο σε αυτόν τον ιστότοπο δεν δημιουργήθηκε από τον διαχειριστή, τα πνευματικά δικαιώματα τρίτων γίνονται σεβαστά. Ειδικότερα, το περιεχόμενο τρίτων αναγνωρίζεται ως τέτοιο. Εάν παρ 'όλα αυτά γίνετε ενήμεροι για παραβίαση πνευματικών δικαιωμάτων, παρακαλούμε ενημερώστε μας αναλόγως. Εάν γνωρίζουμε οποιεσδήποτε παραβιάσεις, θα αφαιρέσουμε αμέσως αυτό το περιεχόμενο.",
    },
  },
  backToHome: {
    de: "Zurück zur Startseite",
    en: "Back to Home",
    gr: "Επιστροφή στην αρχική σελίδα",
  },
};

export default function LegalNoticePage() {
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
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">{translations.companyInfo.title[language]}</h2>
              <p className="text-gray-700 font-medium">{translations.companyInfo.name[language]}</p>
              <p className="text-gray-700 whitespace-pre-line">{translations.companyInfo.address[language]}</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">{translations.contactInfo.title[language]}</h2>
              <p className="text-gray-700">
                <span className="font-medium">{translations.contactInfo.phone.label[language]}: </span>
                {translations.contactInfo.phone.value}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">{translations.contactInfo.email.label[language]}: </span>
                <a href={`mailto:${translations.contactInfo.email.value}`} className="text-amber-600 hover:underline">
                  {translations.contactInfo.email.value}
                </a>
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">{translations.vatId.title[language]}</h2>
              <p className="text-gray-700 mb-2">{translations.vatId.content[language]}</p>
              <p className="text-gray-700 font-medium">{translations.vatId.value}</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">{translations.responsiblePerson.title[language]}</h2>
              <p className="text-gray-700 font-medium">{translations.responsiblePerson.name}</p>
              <p className="text-gray-700">{translations.responsiblePerson.address[language]}</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">{translations.euDisputeResolution.title[language]}</h2>
              <p className="text-gray-700">{translations.euDisputeResolution.content[language]}</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">{translations.disputeResolution.title[language]}</h2>
              <p className="text-gray-700">{translations.disputeResolution.content[language]}</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">{translations.liabilityForContent.title[language]}</h2>
              <p className="text-gray-700">{translations.liabilityForContent.content[language]}</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">{translations.liabilityForLinks.title[language]}</h2>
              <p className="text-gray-700">{translations.liabilityForLinks.content[language]}</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">{translations.copyright.title[language]}</h2>
              <p className="text-gray-700">{translations.copyright.content[language]}</p>
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