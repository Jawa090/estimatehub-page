
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calculator, FileText, Building, Settings, BarChart3, Users, Wrench, Star, Award } from "lucide-react";

const ServicesOverviewHome = () => {
  const services = [
    {
      icon: <Calculator size={44} />,
      title: "Quantity Takeoff Services",
      description: "Comprehensive quantity takeoff services for all construction materials and components with precision and accuracy.",
      bgClass: "design-icon-bg",
      delay: 100,
      highlight: "98% Accuracy Rate"
    },
    {
      icon: <BarChart3 size={44} />,
      title: "Cost Estimation Services",
      description: "Accurate cost estimation with detailed analysis and budget planning for successful project delivery.",
      bgClass: "estimation-icon-bg",
      delay: 200,
      highlight: "Industry Leading"
    },
    {
      icon: <Settings size={44} />,
      title: "Specialized Estimating",
      description: "Specialized estimating services for complex and unique construction projects requiring expert knowledge.",
      bgClass: "management-icon-bg",
      delay: 300,
      highlight: "Expert Solutions"
    },
    {
      icon: <FileText size={44} />,
      title: "Software-Based Estimating",
      description: "Advanced software-based estimating solutions for precise calculations and efficient delivery.",
      bgClass: "support-icon-bg",
      delay: 400,
      highlight: "Latest Technology"
    },
    {
      icon: <Building size={44} />,
      title: "Documentation & Reporting",
      description: "Comprehensive documentation and reporting services for construction projects with professional standards.",
      bgClass: "design-icon-bg",
      delay: 500,
      highlight: "Professional Grade"
    },
    {
      icon: <Users size={44} />,
      title: "Project Support Services",
      description: "End-to-end project support services for successful project delivery and risk management.",
      bgClass: "estimation-icon-bg",
      delay: 600,
      highlight: "24/7 Support"
    },
    {
      icon: <Wrench size={44} />,
      title: "Construction Management",
      description: "Professional construction management services for optimal project execution and delivery excellence.",
      bgClass: "management-icon-bg",
      delay: 700,
      highlight: "Premium Service"
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-6 text-construction-blue" data-aos="fade-up">
            Our Services
          </h2>
          <div className="w-24 h-1 bg-construction-orange mx-auto mb-8 rounded-full" data-aos="fade-up" data-aos-delay="100"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="200">
            We provide comprehensive construction services to help you build better, 
            faster, and more efficiently with our expert team and cutting-edge technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="overflow-hidden group transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl border-t-4 border-t-transparent hover:border-t-construction-orange bg-white hover:bg-gradient-to-br hover:from-white hover:to-gray-50"
              data-aos="fade-up"
              data-aos-delay={service.delay}
            >
              <div className="h-2 bg-gradient-to-r from-construction-blue via-construction-orange to-construction-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
              <CardContent className="p-8">
                <div className="relative mb-6">
                  <div className={`${service.bgClass} hover:scale-110 transition-all duration-500 group-hover:bg-opacity-100 relative`}>
                    {service.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 bg-construction-orange text-white text-xs px-2 py-1 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {service.highlight}
                  </div>
                </div>
                
                <h3 className="text-xl md:text-2xl font-poppins font-bold my-6 text-construction-darkGray text-center group-hover:text-construction-blue transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-center mb-8 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="text-center">
                  <div className="inline-flex items-center text-construction-blue font-semibold hover:text-construction-orange transition-all duration-300 relative group/link cursor-pointer text-lg">
                    <Star className="mr-2 h-4 w-4 group-hover/link:text-yellow-500 transition-colors" />
                    Premium Service Available
                    <ArrowRight className="ml-2 h-5 w-5 group-hover/link:translate-x-2 transition-transform duration-300" />
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-construction-orange to-red-600 group-hover/link:w-full transition-all duration-500"></span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <button 
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) {
                window.scrollTo({
                  top: element.offsetTop - 100,
                  behavior: 'smooth'
                });
              }
            }}
            className="inline-flex items-center bg-gradient-to-r from-construction-orange to-red-600 hover:from-red-600 hover:to-construction-orange text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-construction-orange/40 text-lg"
          >
            <Building className="mr-3 h-6 w-6" />
            Get Started Today
            <ArrowRight className="ml-3 h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverviewHome;
