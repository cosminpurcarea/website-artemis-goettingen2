"use client";

// Language type
type Language = "de" | "en" | "gr";

// Add translations used in the navbar
const translations = {
  nav: {
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
};

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ language, setLanguage }) => {
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

export default Navbar; 