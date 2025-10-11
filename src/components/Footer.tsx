
import { useState } from "react";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, Clock, Award, Shield, ArrowRight } from "lucide-react";
import PrivacyPolicy from "./PrivacyPolicy";

const Footer = () => {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
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
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-construction-blue to-construction-orange py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">Stay Updated with Industry Insights</h3>
            <p className="text-lg mb-8 text-gray-100">
              Get the latest construction trends, estimating tips, and project insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-construction-blue px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
                Subscribe <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <img src="/uploads/0d18cc57-bb81-4f64-9666-a22d86046947.png" alt="EstimatingHub Logo" className="h-12" />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted partner for professional construction estimating services. We deliver accurate,
              detailed estimates that help you win more projects and maximize profitability.
            </p>

            {/* Trust Indicators */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-300">
                <Award className="h-4 w-4 mr-2 text-construction-orange" />
                <span>Certified Estimating Professionals</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Shield className="h-4 w-4 mr-2 text-construction-orange" />
                <span>500+ Projects Completed</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Clock className="h-4 w-4 mr-2 text-construction-orange" />
                <span>24-48 Hour Turnaround</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-700 p-2 rounded-lg hover:bg-construction-orange transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://x.com/estimatinghub" target="_blank" rel="noopener noreferrer" className="bg-gray-700 p-2 rounded-lg hover:bg-construction-orange transition-colors">
                <Twitter size={18} />
              </a>
              <a href="https://www.linkedin.com/company/estimatinghub/" target="_blank" rel="noopener noreferrer" className="bg-gray-700 p-2 rounded-lg hover:bg-construction-orange transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="bg-gray-700 p-2 rounded-lg hover:bg-construction-orange transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-construction-orange">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <button onClick={() => scrollToSection('home')} className="text-gray-300 hover:text-white transition-colors text-left flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Quantity Takeoff Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('home')} className="text-gray-300 hover:text-white transition-colors text-left flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Cost Estimation
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('home')} className="text-gray-300 hover:text-white transition-colors text-left flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Construction Management
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('home')} className="text-gray-300 hover:text-white transition-colors text-left flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Specialized Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('home')} className="text-gray-300 hover:text-white transition-colors text-left flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Software Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('home')} className="text-gray-300 hover:text-white transition-colors text-left flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Project Documentation
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-construction-orange">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-white transition-colors text-left flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('portfolio')} className="text-gray-300 hover:text-white transition-colors text-left flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Our Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('clients')} className="text-gray-300 hover:text-white transition-colors text-left flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Our Clients
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('testimonials')} className="text-gray-300 hover:text-white transition-colors text-left flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Testimonials
                </button>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-construction-orange">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin size={20} className="mr-3 mt-1 text-construction-orange flex-shrink-0" />
                <div>
                  <p className="text-gray-300">876 70th Street</p>
                  <p className="text-gray-300">Brooklyn, NY 11228</p>
                  <p className="text-gray-300">United States</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone size={20} className="mr-3 text-construction-orange flex-shrink-0" />
                <div>
                  <p className="text-gray-300">+(212) 450-7419</p>
                  <p className="text-sm text-gray-400">Mon-Fri 9AM-6PM EST</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail size={20} className="mr-3 text-construction-orange flex-shrink-0" />
                <div>
                  <p className="text-gray-300">sales@estimatinghub.com</p>
                  <p className="text-sm text-gray-400">support@estimatinghub.com</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-6">
              <button
                onClick={() => scrollToSection('home')}
                className="bg-construction-orange hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors w-full"
              >
                Get Free Quote
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <hr className="border-gray-700 my-12" />

        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center mb-4 lg:mb-0">
            <p className="text-gray-400 text-sm mb-2 md:mb-0 md:mr-8">
              © {new Date().getFullYear()} EstimatingHub. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <button 
                onClick={() => setShowPrivacyPolicy(true)}
                className="text-gray-400 hover:text-construction-orange text-sm transition-colors"
              >
                Privacy Policy
              </button>
            </div>
          </div>

          <div className="text-sm text-gray-400">
            <p>Licensed & Insured • Certified Professionals • 24/7 Support</p>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {showPrivacyPolicy && (
        <PrivacyPolicy onClose={() => setShowPrivacyPolicy(false)} />
      )}
    </footer>
  );
};

export default Footer;
