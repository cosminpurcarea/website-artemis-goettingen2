"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import CookieConsent from "./components/CookieConsent";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Language type
type Language = "de" | "en" | "gr";

// Mock data for the restaurant
const restaurantInfo = {
  name: "Artemis",
  address: "Weender Str. 78, 37073 Göttingen",
  phone: "+49 551 3054475",
  hours: {
    monday: "11:00 - 22:00",
    tuesday: "11:00 - 22:00",
    wednesday: "11:00 - 22:00",
    thursday: "11:00 - 22:00",
    friday: "11:00 - 23:00",
    saturday: "12:00 - 23:00",
    sunday: "13:00 - 22:00",
  },
};

// Menu categories
const menuCategories = [
  { id: "gyros", name: { de: "Gyros", en: "Gyros", gr: "Γύρος" } },
  { id: "souvlaki", name: { de: "Souvlaki", en: "Souvlaki", gr: "Σουβλάκι" } },
  { id: "salate", name: { de: "Salate", en: "Salads", gr: "Σαλάτες" } },
  { id: "vorspeisen", name: { de: "Vorspeisen", en: "Appetizers", gr: "Ορεκτικά" } },
  { id: "hauptgerichte", name: { de: "Hauptgerichte", en: "Main Courses", gr: "Κύρια Πιάτα" } },
  { id: "desserts", name: { de: "Desserts", en: "Desserts", gr: "Επιδόρπια" } },
  { id: "getranke", name: { de: "Getränke", en: "Drinks", gr: "Ποτά" } },
];

// Sample menu items
const menuItems = {
  gyros: [
    {
      id: 1,
      name: { de: "Gyros Teller", en: "Gyros Plate", gr: "Πιάτο Γύρος" },
      description: {
        de: "Frisch zubereitetes Gyros mit Tzatziki, Pommes und Salat",
        en: "Freshly prepared gyros with tzatziki, fries and salad",
        gr: "Φρεσκοψημένος γύρος με τζατζίκι, πατάτες και σαλάτα"
      },
      price: 12.90,
      popular: true,
      image: "/images/gyro-greek-sliced-meat-ethnic-dish-pita-bread-t-2024-12-07-15-23-58-utc.JPG"
    },
    {
      id: 2,
      name: { de: "Gyros Pita", en: "Gyros Pita", gr: "Γύρος Πίτα" },
      description: {
        de: "Gyros in Pita-Brot mit Zwiebeln, Tomaten und Tzatziki",
        en: "Gyros in pita bread with onions, tomatoes and tzatziki",
        gr: "Γύρος σε πίτα με κρεμμύδια, ντομάτες και τζατζίκι"
      },
      price: 7.50,
      popular: true,
      image: "/images/gyros-grilled-meat-slices-in-a-pita-bread-closeup-2024-12-07-22-42-27-utc.jpg"
    },
  ],
  souvlaki: [
    {
      id: 3,
      name: { de: "Souvlaki Spieß", en: "Souvlaki Skewer", gr: "Σουβλάκι" },
      description: {
        de: "Marinierte Schweinefleischspieße mit Tzatziki und Pita-Brot",
        en: "Marinated pork skewers with tzatziki and pita bread",
        gr: "Μαριναρισμένα χοιρινά σουβλάκια με τζατζίκι και πίτα"
      },
      price: 10.90,
      popular: false,
      image: "/images/fried-meat-souvlaki-greek-restaurant-2025-01-29-08-29-47-utc.jpg"
    },
    {
      id: 9,
      name: { de: "Chicken Souvlaki", en: "Chicken Souvlaki", gr: "Σουβλάκι Κοτόπουλο" },
      description: {
        de: "Marinierte Hähnchenspieße mit Tzatziki, Pita-Brot und Salat",
        en: "Marinated chicken skewers with tzatziki, pita bread and salad",
        gr: "Μαριναρισμένα σουβλάκια κοτόπουλου με τζατζίκι, πίτα και σαλάτα"
      },
      price: 11.90,
      popular: true,
      image: "/images/greek-chicken-souvlaki-platter-with-pita-bread-sa-2023-11-27-05-15-33-utc.jpg"
    },
  ],
  salate: [
    {
      id: 4,
      name: { de: "Griechischer Salat", en: "Greek Salad", gr: "Ελληνική σαλάτα" },
      description: {
        de: "Frischer Salat mit Tomaten, Gurken, Paprika, Oliven und Feta-Käse",
        en: "Fresh salad with tomatoes, cucumbers, bell peppers, olives, and feta cheese",
        gr: "Φρέσκια σαλάτα με ντομάτες, αγγούρια, πιπεριές, ελιές και φέτα"
      },
      price: 8.50,
      popular: true,
      image: "/images/greek-salad-with-vegetables-and-feta-cheese-and-ap-2025-02-12-17-28-44-utc.jpg"
    },
    {
      id: 10,
      name: { de: "Gyros Salat", en: "Gyros Salad", gr: "Σαλάτα Γύρος" },
      description: {
        de: "Gemischter Salat mit Gyros-Streifen, Tomaten, Gurken und Feta-Käse",
        en: "Mixed salad with gyros strips, tomatoes, cucumbers, and feta cheese",
        gr: "Ανάμεικτη σαλάτα με λωρίδες γύρου, ντομάτες, αγγούρια και φέτα"
      },
      price: 9.90,
      popular: false,
      image: "/images/greek-salad-and-gyro-platter-2023-11-27-05-34-39-utc.jpg"
    },
  ],
  vorspeisen: [
    {
      id: 5,
      name: { de: "Tzatziki", en: "Tzatziki", gr: "Τζατζίκι" },
      description: {
        de: "Joghurt mit Gurken, Knoblauch und Olivenöl",
        en: "Yogurt with cucumber, garlic, and olive oil",
        gr: "Γιαούρτι με αγγούρι, σκόρδο και ελαιόλαδο"
      },
      price: 4.90,
      popular: false,
      image: "/images/mediterranean-meze-starter-fingerfood-platter-in-t-2024-10-11-17-32-00-utc.jpg"
    },
    {
      id: 11,
      name: { de: "Meze Platte", en: "Meze Platter", gr: "Πιάτο Μεζέ" },
      description: {
        de: "Auswahl verschiedener griechischer Vorspeisen, inkl. Tzatziki, Oliven und Feta",
        en: "Selection of various Greek appetizers, including tzatziki, olives, and feta",
        gr: "Επιλογή διαφόρων ελληνικών ορεκτικών, συμπεριλαμβανομένων τζατζίκι, ελιών και φέτας"
      },
      price: 12.50,
      popular: true,
      image: "/images/greek-food-dishes-assorted-from-above-copy-space-2025-02-12-19-51-29-utc.jpg"
    },
  ],
  hauptgerichte: [
    {
      id: 6,
      name: { de: "Moussaka", en: "Moussaka", gr: "Μουσακάς" },
      description: {
        de: "Auberginen-Hackfleisch-Auflauf mit Bechamelsauce",
        en: "Eggplant and ground meat casserole with bechamel sauce",
        gr: "Μελιτζάνες και κιμάς με σάλτσα μπεσαμέλ"
      },
      price: 13.90,
      popular: true,
      image: "/images/greek-meal-with-chicken-souvlaki-platter-gryos-f-2023-11-27-05-26-10-utc.jpg"
    },
    {
      id: 12,
      name: { de: "Fisch vom Grill", en: "Grilled Fish", gr: "Ψάρι Σχάρας" },
      description: {
        de: "Frischer Fisch vom Grill mit Kräutern, Zitrone und Beilagen",
        en: "Fresh grilled fish with herbs, lemon, and side dishes",
        gr: "Φρέσκο ψάρι στη σχάρα με βότανα, λεμόνι και συνοδευτικά"
      },
      price: 16.90,
      popular: false,
      image: "/images/side-view-fried-fish-with-tomato-pepper-onion-and-2024-10-18-05-31-14-utc.jpg"
    },
  ],
  desserts: [
    {
      id: 7,
      name: { de: "Baklava", en: "Baklava", gr: "Μπακλαβάς" },
      description: {
        de: "Süßes Gebäck mit Nüssen und Honigsirup",
        en: "Sweet pastry with nuts and honey syrup",
        gr: "Γλυκό με ξηρούς καρπούς και σιρόπι μελιού"
      },
      price: 5.90,
      popular: false,
      image: "/images/middle-eastern-dinner-table-2025-02-12-22-36-15-utc.jpg"
    },
  ],
  getranke: [
    {
      id: 8,
      name: { de: "Ouzo", en: "Ouzo", gr: "Ούζο" },
      description: {
        de: "Traditioneller griechischer Anisschnaps",
        en: "Traditional Greek anise-flavored spirit",
        gr: "Παραδοσιακό ελληνικό αλκοολούχο ποτό με γεύση γλυκάνισου"
      },
      price: 3.50,
      popular: false,
      image: "/images/two-glasses-of-ouzo-and-appetizers-2024-12-07-17-49-48-utc.jpg"
    },
    {
      id: 13,
      name: { de: "Erfrischungsgetränk", en: "Refreshing Drink", gr: "Αναψυκτικό" },
      description: {
        de: "Verschiedene Softdrinks und Säfte zur Auswahl",
        en: "Various soft drinks and juices to choose from",
        gr: "Διάφορα αναψυκτικά και χυμοί για να επιλέξετε"
      },
      price: 2.90,
      popular: false,
      image: "/images/side-view-woman-eating-greek-salad-with-orange-coc-2024-10-17-00-15-58-utc.jpg"
    },
  ],
};

// Translations
const translations = {
  hero: {
    welcome: {
      de: "Willkommen bei",
      en: "Welcome to",
      gr: "Καλώς ήρθατε στο",
    },
    subtitle: {
      de: "Authentische griechische Küche in Göttingen",
      en: "Authentic Greek cuisine in Göttingen",
      gr: "Αυθεντική ελληνική κουζίνα στο Göttingen",
    },
    cta: {
      de: "Reservieren",
      en: "Reserve a table",
      gr: "Κράτηση",
    },
    menu: {
      de: "Speisekarte",
      en: "View Menu",
      gr: "Μενού",
    },
  },
  nav: {
    home: {
      de: "Startseite",
      en: "Home",
      gr: "Αρχική",
    },
    menu: {
      de: "Speisekarte",
      en: "Menu",
      gr: "Μενού",
    },
    about: {
      de: "Über uns",
      en: "About",
      gr: "Σχετικά με εμάς",
    },
    contact: {
      de: "Kontakt",
      en: "Contact",
      gr: "Επικοινωνία",
    },
  },
  menu: {
    title: {
      de: "Unsere Speisekarte",
      en: "Our Menu",
      gr: "Το Μενού μας",
    },
    popular: {
      de: "Beliebt",
      en: "Popular",
      gr: "Δημοφιλές",
    },
  },
  about: {
    title: {
      de: "Über Artemis",
      en: "About Artemis",
      gr: "Σχετικά με το Artemis",
    },
    content: {
      de: "Restaurant Artemis bietet seit über 20 Jahren authentische griechische Küche in Göttingen. Unsere Spezialität ist frisch zubereitetes Gyros und traditionelle griechische Gerichte, die mit Liebe und Leidenschaft zubereitet werden. Wir verwenden nur die besten Zutaten und traditionelle Rezepte, um Ihnen ein unvergessliches kulinarisches Erlebnis zu bieten.",
      en: "Restaurant Artemis has been offering authentic Greek cuisine in Göttingen for over 20 years. Our specialty is freshly prepared gyros and traditional Greek dishes, prepared with love and passion. We use only the best ingredients and traditional recipes to provide you with an unforgettable culinary experience.",
      gr: "Το εστιατόριο Artemis προσφέρει αυθεντική ελληνική κουζίνα στο Göttingen για περισσότερα από 20 χρόνια. Η ειδικότητά μας είναι ο φρεσκοψημένος γύρος και τα παραδοσιακά ελληνικά πιάτα, που παρασκευάζονται με αγάπη και πάθος. Χρησιμοποιούμε μόνο τα καλύτερα υλικά και παραδοσιακές συνταγές για να σας προσφέρουμε μια αξέχαστη γαστρονομική εμπειρία.",
    },
  },
  contact: {
    title: {
      de: "Kontakt & Öffnungszeiten",
      en: "Contact & Opening Hours",
      gr: "Επικοινωνία & Ώρες Λειτουργίας",
    },
    address: {
      de: "Adresse",
      en: "Address",
      gr: "Διεύθυνση",
    },
    phone: {
      de: "Telefon",
      en: "Phone",
      gr: "Τηλέφωνο",
    },
    hours: {
      de: "Öffnungszeiten",
      en: "Opening Hours",
      gr: "Ώρες Λειτουργίας",
    },
    days: {
      monday: {
        de: "Montag",
        en: "Monday",
        gr: "Δευτέρα",
      },
      tuesday: {
        de: "Dienstag",
        en: "Tuesday",
        gr: "Τρίτη",
      },
      wednesday: {
        de: "Mittwoch",
        en: "Wednesday",
        gr: "Τετάρτη",
      },
      thursday: {
        de: "Donnerstag",
        en: "Thursday",
        gr: "Πέμπτη",
      },
      friday: {
        de: "Freitag",
        en: "Friday",
        gr: "Παρασκευή",
      },
      saturday: {
        de: "Samstag",
        en: "Saturday",
        gr: "Σάββατο",
      },
      sunday: {
        de: "Sonntag",
        en: "Sunday",
        gr: "Κυριακή",
      },
    },
  },
  footer: {
    rights: {
      de: "Alle Rechte vorbehalten",
      en: "All rights reserved",
      gr: "Με επιφύλαξη παντός δικαιώματος",
    },
    cookiesPolicy: {
      de: "Cookies",
      en: "Cookies Policy",
      gr: "Πολιτική Cookies",
    },
    privacyPolicy: {
      de: "Datenschutz",
      en: "Privacy Policy",
      gr: "Πολιτική Απορρήτου",
    },
    legalNotice: {
      de: "Impressum",
      en: "Legal Notice",
      gr: "Νομική Σημείωση",
    },
  },
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("de");

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") as Language;
    if (storedLanguage && (storedLanguage === "de" || storedLanguage === "en" || storedLanguage === "gr")) {
      setLanguage(storedLanguage);
    }
  }, []);

  return (
    <div className="client-component">
      <div className="flex flex-col min-h-screen">
        <header className="fixed w-full z-50 bg-white/80 backdrop-blur-md shadow-md">
          <Navbar language={language} setLanguage={setLanguage} />
        </header>

        <main className="flex-grow pt-20">
          <HeroSection language={language} />
          <MenuSection language={language} />
          <AboutSection language={language} />
          <ContactSection language={language} />
        </main>

        <footer className="bg-gray-900 text-white py-12">
          <Footer language={language} />
        </footer>
        
        <CookieConsent language={language} />
      </div>
    </div>
  );
}

// Client Components (these would normally be in separate files)
const Navbar = ({ language, setLanguage }: { language: Language, setLanguage: (lang: Language) => void }) => {
  // This is a client component that would use useState
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">A</span>
          </div>
          <span className="text-xl font-bold">Artemis</span>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          {Object.keys(translations.nav).map((key) => (
            <a 
              key={key} 
              href={`#${key}`} 
              className="text-gray-700 hover:text-amber-500 transition-colors duration-300"
            >
              {translations.nav[key][language]}
            </a>
          ))}
        </nav>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex space-x-2">
            <button 
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${language === 'de' ? 'bg-amber-500 text-white' : 'hover:bg-gray-100'}`}
              onClick={() => setLanguage('de')}
            >
              DE
            </button>
            <button 
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${language === 'en' ? 'bg-amber-500 text-white' : 'hover:bg-gray-100'}`}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
            <button 
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${language === 'gr' ? 'bg-amber-500 text-white' : 'hover:bg-gray-100'}`}
              onClick={() => setLanguage('gr')}
            >
              GR
            </button>
          </div>
          
          <button className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const HeroSection = ({ language }: { language: Language }) => {
  return (
    <section className="relative h-screen flex items-center">
      <div className="absolute inset-0">
        <Image 
          src="/images/middle-eastern-dinner-table-2025-02-12-22-36-15-utc.jpg"
          alt="Griechische Spezialitäten"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 text-white">
        <div className="max-w-3xl">
          <h1 className="text-2xl font-light mb-2">{translations.hero.welcome[language]}</h1>
          <h2 className="text-5xl md:text-7xl font-bold mb-4 text-amber-400">Artemis</h2>
          <p className="text-xl md:text-2xl mb-8">{translations.hero.subtitle[language]}</p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#contact" 
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full text-lg font-medium inline-flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {translations.hero.cta[language]}
            </a>
            <a 
              href="#menu" 
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white px-8 py-3 rounded-full text-lg font-medium inline-flex items-center justify-center transition-all duration-300"
            >
              {translations.hero.menu[language]}
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

const MenuSection = ({ language }: { language: Language }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("gyros");

  // Helper function to render menu items
  const renderMenuItems = (categoryId: string) => {
    if (!menuItems[categoryId] || menuItems[categoryId].length === 0) {
      return (
        <div className="col-span-full text-center text-gray-500 py-10">
          {language === 'de' ? 'Keine Artikel in dieser Kategorie verfügbar.' : 
           language === 'en' ? 'No items available in this category.' : 
           'Δεν υπάρχουν διαθέσιμα στοιχεία σε αυτήν την κατηγορία.'}
        </div>
      );
    }

    return menuItems[categoryId].map((item) => (
      <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-60 overflow-hidden">
          <Image 
            src={item.image || "/images/greek-food-platter.jpg"}
            alt={item.name[language]}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {item.popular && (
            <div className="absolute top-4 right-4 bg-amber-500 text-white text-sm px-3 py-1 rounded-full z-10">
              {translations.menu.popular[language]}
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold">{item.name[language]}</h3>
            <span className="text-amber-500 font-bold text-lg">{item.price.toFixed(2)} €</span>
          </div>
          <p className="text-gray-600 mb-4">{item.description[language]}</p>
        </div>
      </div>
    ));
  };

  return (
    <section id="menu" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{translations.menu.title[language]}</h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
        </div>
        
        {/* Menu categories navigation */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {menuCategories.map((category) => (
              <button
                key={category.id}
                className={`px-6 py-3 rounded-full border transition-colors duration-300 ${
                  selectedCategory === category.id 
                    ? 'bg-amber-500 text-white border-amber-500' 
                    : 'border-gray-300 hover:border-amber-500 hover:bg-amber-500 hover:text-white'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name[language]}
              </button>
            ))}
          </div>
        </div>
        
        {/* Menu items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {renderMenuItems(selectedCategory)}
        </div>
        
        {/* Featured Food Image Banner */}
        <div className="mt-16 relative rounded-xl overflow-hidden shadow-2xl">
          <div className="w-full h-96 relative">
            <Image 
              src="/images/greek-meal-with-chicken-souvlaki-platter-gryos-f-2023-11-27-05-26-10-utc.jpg"
              alt="Griechische Spezialitäten"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h3 className="text-3xl font-bold mb-3">
              {language === 'de' ? 'Entdecken Sie unsere Spezialitäten' : 
               language === 'en' ? 'Discover our specialties' : 
               'Ανακαλύψτε τις σπεσιαλιτέ μας'}
            </h3>
            <p className="text-lg mb-4">
              {language === 'de' ? 'Traditionelle griechische Küche mit frischen Zutaten' : 
               language === 'en' ? 'Traditional Greek cuisine with fresh ingredients' : 
               'Παραδοσιακή ελληνική κουζίνα με φρέσκα υλικά'}
            </p>
            <button className="bg-amber-500 hover:bg-amber-600 px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
              {language === 'de' ? 'Komplette Speisekarte anzeigen' : 
               language === 'en' ? 'View complete menu' : 
               'Προβολή πλήρους μενού'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutSection = ({ language }: { language: Language }) => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{translations.about.title[language]}</h2>
            <div className="w-20 h-1 bg-amber-500 mb-6"></div>
            <p className="text-gray-600 mb-8 leading-relaxed text-lg">
              {translations.about.content[language]}
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 rounded-lg text-center">
                <div className="text-4xl font-bold text-amber-500 mb-2">20+</div>
                <div className="text-gray-500">
                  {language === 'de' ? 'Jahre Erfahrung' : 
                   language === 'en' ? 'Years of experience' : 
                   'Χρόνια εμπειρίας'}
                </div>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg text-center">
                <div className="text-4xl font-bold text-amber-500 mb-2">100%</div>
                <div className="text-gray-500">
                  {language === 'de' ? 'Authentisch' : 
                   language === 'en' ? 'Authentic' : 
                   'Αυθεντικό'}
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="/images/artemis-location.jpg"
                alt="Restaurant Artemis Außenansicht"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = ({ language }: { language: Language }) => {
  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{translations.contact.title[language]}</h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="bg-gray-800 p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-6">{translations.contact.address[language]}</h3>
              <p className="mb-4 flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {restaurantInfo.address}
              </p>
              
              <h3 className="text-xl font-bold mb-6">{translations.contact.phone[language]}</h3>
              <p className="mb-4 flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {restaurantInfo.phone}
              </p>
              
              <h3 className="text-xl font-bold mb-6">{translations.contact.hours[language]}</h3>
              <div className="space-y-2">
                {Object.entries(restaurantInfo.hours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between">
                    <span>{translations.contact.days[day][language]}</span>
                    <span>{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="relative h-96 rounded-xl overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2466.5901047094726!2d9.927216375941684!3d51.53240407962686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a4d4b95659eb45%3A0x9dadd1c60a4f9c6!2sGyros%20Artemis!5e0!3m2!1sen!2sus!4v1711192320068!5m2!1sen!2sus" 
              className="absolute inset-0 w-full h-full" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

type FooterProps = {
  language: Language;
};

const Footer: React.FC<FooterProps> = ({ language }) => {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <span className="text-xl font-bold">Artemis</span>
          </div>
          <p className="text-gray-400 mb-4">
            Weender Str. 78<br />
            37073 Göttingen<br />
            Deutschland
          </p>
          <p className="text-gray-400">
            <strong>Tel:</strong> +49 551 3054475
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Öffnungszeiten</h3>
          <ul className="text-gray-400 space-y-2">
            <li>Montag - Freitag: 11:30 - 22:00</li>
            <li>Samstag - Sonntag: 12:00 - 23:00</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Folgen Sie uns</h3>
          <div className="flex space-x-4 mb-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <hr className="border-gray-800 my-8" />
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-500 text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} Artemis Restaurant. {translations.footer.rights[language]}.
        </p>
        <div className="flex flex-wrap space-x-4 text-sm text-gray-500">
          <Link href="/cookies" className="hover:text-amber-500 transition-colors">
            {translations.footer.cookiesPolicy[language]}
          </Link>
          <Link href="/privacy" className="hover:text-amber-500 transition-colors">
            {translations.footer.privacyPolicy[language]}
          </Link>
          <Link href="/legal" className="hover:text-amber-500 transition-colors">
            {translations.footer.legalNotice[language]}
          </Link>
        </div>
      </div>
    </div>
  );
};
