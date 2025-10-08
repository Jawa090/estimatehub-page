import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { X, Phone, Sparkles, Gift } from 'lucide-react';

const WelcomePopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after 2 seconds when website loads
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    // Auto close after 10 seconds
    const autoCloseTimer = setTimeout(() => {
      setIsVisible(false);
    }, 12000);

    return () => {
      clearTimeout(timer);
      clearTimeout(autoCloseTimer);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleBookCall = () => {
    // Scroll to contact form and switch to consultation tab
    const element = document.getElementById('home');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Switch to consultation tab after a short delay
    setTimeout(() => {
      // Find and click the consultation button to switch tabs
      const consultationButton = document.querySelector('button[style*="background-color: rgb(55, 65, 81)"]') as HTMLButtonElement;
      if (consultationButton) {
        consultationButton.click();
      }
    }, 500);
    
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-500">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md mx-4 overflow-hidden animate-in zoom-in-95 duration-700">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <X className="h-4 w-4 text-gray-600" />
        </button>

        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-red-600 to-red-700"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
        
        {/* Content */}
        <div className="relative p-8 text-center text-white">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Gift className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1">
                <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold mb-3">
            🎉 Special Welcome Offer!
          </h2>
          
          {/* Subtitle */}
          <p className="text-lg mb-2 font-semibold">
            Book a Call & Get
          </p>
          
          {/* Discount */}
          <div className="mb-4">
            <span className="text-4xl font-black text-yellow-300">20% OFF</span>
            <p className="text-sm opacity-90 mt-1">Your First Project Estimate</p>
          </div>

          {/* Description */}
          <p className="text-sm opacity-90 mb-6 leading-relaxed">
            Limited time offer for new clients! Schedule a free consultation call with our experts and save on your construction project estimate.
          </p>

          {/* Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleBookCall}
              className="w-full bg-white text-red-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Phone className="h-4 w-4 mr-2" />
              Book Free Call Now
            </Button>
            
            {/* <button
              onClick={handleClose}
              className="w-full text-white/80 hover:text-white text-sm underline transition-colors"
            >
              Maybe later
            </button> */}
          </div>

          {/* Timer */}
          <div className="mt-4 text-xs opacity-75">
            ⏰ Offer expires soon - Don't miss out!
          </div>
        </div>

        {/* Animated Border */}
        <div className="absolute inset-0 rounded-3xl border-2 border-white/20 animate-pulse"></div>
      </div>
    </div>
  );
};

export default WelcomePopup;