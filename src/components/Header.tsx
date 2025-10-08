import { useState, useEffect } from 'react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'top-0 bg-white shadow-md py-2' : 'top-0 bg-transparent py-4'}`}>
      <div className="container mx-auto px-12">
        <div className="flex items-center justify-between">
          {/* Logo - Left side */}
          <div className="flex items-center">
            <button onClick={() => scrollToSection('home')}>
              <img src={`${import.meta.env.BASE_URL}uploads/0d18cc57-bb81-4f64-9666-a22d86046947.png`} alt="Company Logo" className="h-10" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
