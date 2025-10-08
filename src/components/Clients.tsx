import { useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Clients = () => {
  const clientLogos = [
    { 
      name: "Housing Authority", 
      logo: "/qwe.jpg"
    },
    { 
      name: "DASNY", 
      logo: "/abbas.jpg" 
    },
    { 
      name: "School Construction Authority", 
      logo: "/scs.jpg" 
    },
    { 
      name: "MTA (Metropolitan Transportation Authority)", 
      logo: "/metro.jpg" 
    },
    { 
      name: "City of Newark", 
      logo: "/city.jpg" 
    },



  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // Adjusted speed for better visibility

    const scroll = () => {
      if (!scrollContainer) return;

      scrollPosition += scrollSpeed;
      
      // Reset when we've scrolled through half the content (since we duplicate the logos)
      const maxScroll = scrollContainer.scrollWidth / 2;
      if (scrollPosition >= maxScroll) {
        scrollPosition = 0;
      }

      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scroll);
    };

    // Start animation after a short delay
    const startDelay = setTimeout(() => {
      animationId = requestAnimationFrame(scroll);
    }, 500);

    return () => {
      clearTimeout(startDelay);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <section id="clients" className="py-16 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-construction-orange font-medium uppercase tracking-wider mb-2 block bg-red-50 py-1 px-4 rounded-full inline-block shadow-sm" data-aos="fade-up">Partnerships</span>
          <h2 className="text-3xl font-poppins font-bold mb-3 text-gray-800" data-aos="fade-up">
            Our Trusted Clients
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-6" data-aos="fade-up" data-aos-delay="100"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            We've had the privilege of working with industry leaders across the construction sector
          </p>
        </div>

        <div className="relative overflow-hidden" data-aos="fade-up" data-aos-delay="300">
          {/* Enhanced gradient overlays for seamless scrolling effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white via-gray-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white via-gray-50 to-transparent z-10 pointer-events-none"></div>
          
          {/* Subtle shadow overlay for depth */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-gray-100 to-transparent z-5"></div>
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-100 to-transparent z-5"></div>
          
          <div 
            ref={scrollContainerRef}
            className="flex items-center space-x-12 overflow-x-hidden py-12"
            style={{ 
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch"
            }}
          >
            {/* Repeat the client logos 6 times for a longer, more seamless infinite scroll */}
            {[...Array(6)].flatMap(() => clientLogos).map((client, index) => (
              <Card 
                key={index} 
                className="flex-shrink-0 transition-all duration-500 hover:scale-110 hover:shadow-2xl shadow-lg overflow-hidden border border-gray-200 hover:border-construction-orange group w-[220px] md:w-[260px] bg-white/80 backdrop-blur-sm"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="flex items-center justify-center bg-gradient-to-br from-white to-gray-50" style={{ height: "120px" }}>
                  <img 
                    src={client.logo} 
                    alt={`${client.name} logo`}
                    className="object-contain w-[160px] h-[90px] grayscale hover:grayscale-0 transition-all duration-500 group-hover:grayscale-0 filter drop-shadow-sm"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 bg-gradient-to-r from-white to-gray-50 group-hover:from-construction-orange/5 group-hover:to-construction-orange/10 transition-all duration-500">
                  <h3 className="font-semibold text-sm text-center text-gray-800 group-hover:text-construction-orange transition-colors duration-500">{client.name}</h3>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
