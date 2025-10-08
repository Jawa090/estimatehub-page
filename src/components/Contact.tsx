import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Check, Mail, Phone, MapPin, ZoomIn, ZoomOut } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [zoomLevel, setZoomLevel] = useState(15);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      console.log("Form submitted:", formData);
      if (file) {
        console.log("File uploaded:", file.name);
      }

      // Show success toast
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
        duration: 5000,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
      setFile(null);
      setIsSubmitting(false);
    }, 1500);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 20));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 10));
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Contact Form Section */}
          <div data-aos="fade-right">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300 h-full">
              <h3 className="text-2xl font-semibold mb-6 text-construction-blue flex items-center">
                <Mail className="mr-2 text-construction-orange" /> Send us a Message
              </h3>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name*
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full border-gray-300 focus:border-construction-orange focus:ring-construction-orange"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email*
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Your email"
                      className="w-full border-gray-300 focus:border-construction-orange focus:ring-construction-orange"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                      className="w-full border-gray-300 focus:border-construction-orange focus:ring-construction-orange"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company"
                      className="w-full border-gray-300 focus:border-construction-orange focus:ring-construction-orange"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message*
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us about your project"
                    className="w-full min-h-[120px] border-gray-300 focus:border-construction-orange focus:ring-construction-orange"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="projectFile" className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Project File
                  </label>
                  <input
                    id="projectFile"
                    name="projectFile"
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.zip,.rar,.dwg,.jpg,.png"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-construction-orange/80 file:text-white hover:file:bg-construction-orange"
                  />
                  {file && (
                    <div className="mt-2 text-sm text-construction-blue">
                      Selected file: {file.name}
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-construction-orange hover:bg-red-700 text-white py-3 transition-all btn-glow"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <Mail className="mr-2 text-construction-orange shrink-0 mt-1" size={18} />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-1">Email Us</h4>
                    <p className="text-construction-blue">sales@estimatinghub.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="mr-2 text-construction-orange shrink-0 mt-1" size={18} />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-1">Call Us</h4>
                    <p className="text-construction-blue">+(212) 450-7419</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="mr-2 text-construction-orange shrink-0 mt-1" size={18} />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-1">Office</h4>
                    <p className="text-gray-700">876 70th street Brooklyn NY 11228</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="mr-2 text-construction-orange shrink-0 mt-1" size={18} />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-1">Working Hours</h4>
                    <p className="text-gray-700">Mon - Fri: 9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div data-aos="fade-left">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
              <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
                <h3 className="text-lg font-semibold text-construction-blue flex items-center">
                  <MapPin className="mr-2 text-construction-orange" size={20} />
                  Our Location
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={handleZoomOut}
                    className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-100 transition-colors"
                    title="Zoom Out"
                  >
                    <ZoomOut size={16} className="text-construction-blue" />
                  </button>
                  <button
                    onClick={handleZoomIn}
                    className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-100 transition-colors"
                    title="Zoom In"
                  >
                    <ZoomIn size={16} className="text-construction-blue" />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 relative">
                <iframe
                  title="Office Location"
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.6261975869055!2d-73.98651242385559!3d40.74844657138603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9aeb1c6b5%3A0x35b1cfbc89a6097f!2sEmpire%20State%20Building%2C%20350%205th%20Ave%2C%20New%20York%2C%20NY%2010118%2C%20USA!5e0!3m2!1sen!2sca!4v1695253062321!5m2!1sen!2sca&z=${zoomLevel}`}
                  className="w-full h-full min-h-[400px]"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                
                {/* Custom Pin Indicator removed per request */}
              </div>
              
              <div className="p-4 bg-gray-50 border-t">
                <p className="text-sm text-gray-600 text-center">
                  Zoom level: {zoomLevel}x • 876 70th street Brooklyn NY 11228
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;