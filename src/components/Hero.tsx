import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Upload, Home, Building2, Landmark, MapPin,
  Hammer, Wrench, Paintbrush, Zap, Droplets, TreePine,
  Shield, HardHat, Calculator, FileText, Users, Settings,
  X, File, FileImage
} from 'lucide-react';

const Hero = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    trade: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [blueprintFile, setBlueprintFile] = useState<File | null>(null);
  const [activeCategory, setActiveCategory] = useState("Residential");
  const [activeFormTab, setActiveFormTab] = useState<'quote' | 'consultation'>("quote");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleFormTabChange = (event: CustomEvent) => {
      setActiveFormTab(event.detail);
    };

    window.addEventListener('changeFormTab', handleFormTabChange as EventListener);
    return () => {
      window.removeEventListener('changeFormTab', handleFormTabChange as EventListener);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBlueprintFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBlueprintFile(e.target.files[0]);
      toast({
        title: "Blueprint uploaded!",
        description: `Selected: ${e.target.files[0].name}`,
        duration: 3000,
      });
    }
  };

  function validate(values: typeof formData, tab: 'quote' | 'consultation') {
    const e: Record<string, string> = {};
    
    // Common required fields for both forms
    if (!values.name.trim()) e.name = 'This field is required';
    if (!values.email.trim()) e.email = 'This field is required';
    else if (!values.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) e.email = 'Valid email is required';
    if (!values.phone.trim()) e.phone = 'This field is required';
    if (!values.company.trim()) e.company = 'This field is required';
    if (!values.trade.trim()) e.trade = 'This field is required';
    
    if (tab === 'quote') {
      if (!values.message || values.message.trim().length < 10) {
        e.message = 'This field is required (minimum 10 characters)';
      }
    } else {
      if (!values.preferredDate) e.preferredDate = 'This field is required';
      if (!values.preferredTime) e.preferredTime = 'This field is required';
      if (!values.message.trim()) e.message = 'This field is required';
      
      // optional: prevent past dates on client
      const today = new Date().toISOString().slice(0, 10);
      if (values.preferredDate && values.preferredDate < today) {
        e.preferredDate = 'Date must be in the future';
      }
    }
    return e;
  }

  const API = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

  function mapTradeToProjectType(v: string) {
    const t = (v || '').toLowerCase();
    if (t === 'residential') return 'residential';
    if (t === 'commercial') return 'commercial';
    return 'other'; // Government -> other
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form before submitting
    const validationErrors = validate(formData, activeFormTab);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    setErrors({}); // Clear any previous errors

    try {
      if (activeFormTab === 'quote') {
        // Contact API used as Quote
        if (blueprintFile) {
          const form = new FormData();
          form.append('name', formData.name);
          form.append('email', formData.email);
          if (formData.phone) form.append('phone', formData.phone);
          if (formData.company) form.append('company', formData.company);
          form.append('trade', formData.trade); // stored in DB
          form.append('message', formData.message);
          form.append('projectFile', blueprintFile); // IMPORTANT

          const res = await fetch(`${API}/api/contact/send`, { method: 'POST', body: form });
          const data = await res.json();
          if (!res.ok) throw new Error(data?.errors?.join(', ') || data?.message || 'Failed to send');
        } else {
          const res = await fetch(`${API}/api/contact/send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              phone: formData.phone || '',
              company: formData.company || '',
              trade: formData.trade || '',
              message: formData.message
            })
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data?.errors?.join(', ') || data?.message || 'Failed to send');
        }

        toast({
          title: 'Quote request sent successfully!',
          description: "We'll get back to you as soon as possible.",
          duration: 5000
        });
      } else {
        // Consultation API requires JSON only (no files)
        if (!formData.preferredDate || !formData.preferredTime) {
          throw new Error('Preferred date and time are required for consultation');
        }

        const res = await fetch(`${API}/api/consultation/book`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone || '',
            company: formData.company || '',
            projectType: mapTradeToProjectType(formData.trade),
            preferredDate: formData.preferredDate, // YYYY-MM-DD
            preferredTime: formData.preferredTime, // HH:mm
            message: formData.message || ''
          })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.errors?.join(', ') || data?.message || 'Booking failed');

        toast({
          title: 'Consultation booked successfully!',
          description: 'We sent a confirmation to your email.',
          duration: 5000
        });
      }

      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        trade: '',
        preferredDate: '',
        preferredTime: '',
        message: ''
      });
      setBlueprintFile(null);
    } catch (error: any) {
      toast({
        title: 'Submission failed',
        description: error?.message || 'Please try again later.',
        variant: 'destructive',
        duration: 5000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const servicesByCategory = {
    Residential: [
      { name: "Kitchen Remodeling", contact: "Transform your culinary space with modern designs", icon: <Home className="h-4 w-4" /> },
      { name: "Bathroom Renovation", contact: "Create luxurious spa-like bathroom experiences", icon: <Droplets className="h-4 w-4" /> },
      { name: "Home Addition", contact: "Expand your living space with seamless additions", icon: <Building2 className="h-4 w-4" /> },
      { name: "Roofing & Siding", contact: "Protect your home with durable exterior solutions", icon: <Shield className="h-4 w-4" /> },
      { name: "Flooring Installation", contact: "Beautiful floors that enhance every room", icon: <Hammer className="h-4 w-4" /> },
      { name: "Interior Painting", contact: "Fresh colors that bring your vision to life", icon: <Paintbrush className="h-4 w-4" /> },
      { name: "Electrical Work", contact: "Safe and efficient electrical system upgrades", icon: <Zap className="h-4 w-4" /> },
      { name: "Plumbing Services", contact: "Reliable plumbing solutions for modern homes", icon: <Wrench className="h-4 w-4" /> },
      { name: "HVAC Installation", contact: "Comfort systems for year-round climate control", icon: <Settings className="h-4 w-4" /> },
      { name: "Landscaping", contact: "Beautiful outdoor spaces that inspire relaxation", icon: <TreePine className="h-4 w-4" /> },
    ],
    Commercial: [
      { name: "Office Buildings", contact: "Professional workspaces that drive productivity", icon: <Building2 className="h-4 w-4" /> },
      { name: "Retail Spaces", contact: "Engaging environments that attract customers", icon: <MapPin className="h-4 w-4" /> },
      { name: "Warehouse Construction", contact: "Efficient storage and distribution facilities", icon: <HardHat className="h-4 w-4" /> },
      { name: "Restaurant Buildouts", contact: "Inviting dining spaces that create experiences", icon: <Users className="h-4 w-4" /> },
      { name: "Medical Facilities", contact: "Healing environments with advanced infrastructure", icon: <Shield className="h-4 w-4" /> },
      { name: "Educational Buildings", contact: "Learning spaces that inspire future generations", icon: <FileText className="h-4 w-4" /> },
      { name: "Industrial Projects", contact: "Robust facilities for manufacturing excellence", icon: <Settings className="h-4 w-4" /> },
      { name: "Hospitality Projects", contact: "Memorable spaces for exceptional guest experiences", icon: <Building2 className="h-4 w-4" /> },
      { name: "Mixed-Use Development", contact: "Integrated communities that blend work and life", icon: <Calculator className="h-4 w-4" /> },
      { name: "Tenant Improvements", contact: "Customized spaces tailored to your business needs", icon: <Hammer className="h-4 w-4" /> },
    ],
    Government: [
      { name: "Public Infrastructure", contact: "Essential systems that serve communities", icon: <Landmark className="h-4 w-4" /> },
      { name: "Military Facilities", contact: "Secure installations for national defense", icon: <Shield className="h-4 w-4" /> },
      { name: "Schools & Universities", contact: "Educational campuses for academic excellence", icon: <FileText className="h-4 w-4" /> },
      { name: "Hospitals & Clinics", contact: "Healthcare facilities for community wellness", icon: <Building2 className="h-4 w-4" /> },
      { name: "Transportation Projects", contact: "Infrastructure that connects communities", icon: <MapPin className="h-4 w-4" /> },
      { name: "Water Treatment Plants", contact: "Clean water systems for public health", icon: <Droplets className="h-4 w-4" /> },
      { name: "Government Offices", contact: "Civic buildings that serve the public", icon: <Landmark className="h-4 w-4" /> },
      { name: "Emergency Services", contact: "Critical facilities for public safety", icon: <HardHat className="h-4 w-4" /> },
      { name: "Parks & Recreation", contact: "Green spaces that enrich community life", icon: <TreePine className="h-4 w-4" /> },
      { name: "Correctional Facilities", contact: "Secure environments for rehabilitation", icon: <Shield className="h-4 w-4" /> },
    ]
  };

  const categories = [
    { name: "Residential" },
    { name: "Commercial" },
    { name: "Government" },
  ];

  const currentServices = servicesByCategory[activeCategory as keyof typeof servicesByCategory];

  // Helper function to get file icon based on file type
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'doc':
      case 'docx':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'dwg':
        return <File className="h-5 w-5 text-green-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <FileImage className="h-5 w-5 text-purple-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  // Helper function to format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // All trade services for dropdown
  const allTradeServices = [
    "Kitchen Remodeling", "Bathroom Renovation", "Home Addition", "Roofing & Siding",
    "Flooring Installation", "Interior Painting", "Electrical Work", "Plumbing Services",
    "HVAC Installation", "Landscaping", "Office Buildings", "Retail Spaces",
    "Warehouse Construction", "Restaurant Buildouts", "Medical Facilities",
    "Educational Buildings", "Industrial Projects", "Hospitality Projects",
    "Mixed-Use Development", "Tenant Improvements", "Public Infrastructure",
    "Military Facilities", "Schools & Universities", "Hospitals & Clinics",
    "Transportation Projects", "Water Treatment Plants", "Government Offices",
    "Emergency Services", "Parks & Recreation", "Correctional Facilities"
  ];

  return (
    <div id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-construction-blue via-construction-lightBlue to-construction-blue">
      {/* Enhanced Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-construction-blue/98 via-construction-blue/95 to-construction-lightBlue/90 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-fixed opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-construction-blue/20 to-transparent z-5"></div>
      </div>

      <div className="container mx-auto px-4 z-10 mt-24 md:mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Services */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Premium Construction Outsourcing Excellence
              </h1>
              <p className="text-lg text-gray-100 mb-8">
                Whether you have questions about our services, need support, or want to share your feedback,
                our dedicated team is here to assist you every step of the way.
              </p>
            </div>

            {/* Category Tabs */}
            <div className="relative mb-8">
              <div className="flex border-b border-white/20">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveCategory(category.name)}
                    className={`relative px-6 py-3 font-medium transition-all duration-300 ${activeCategory === category.name
                      ? 'text-[#cc1f40] border-b-2 border-[#cc1f40] bg-white/10'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    {category.name}
                    {activeCategory === category.name && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-400"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentServices.map((service, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm">
                  <div className="p-2 rounded bg-construction-orange/20 text-construction-orange">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{service.name}</h3>
                    <p className="text-sm text-gray-200">
                      {service.contact}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="relative max-w-4xl mx-auto">
            {/* Top Action Buttons */}
            <div className="flex gap-1 mb-0 relative z-10">
              <Button
                className={`flex-1 px-8 py-6 rounded-t-3xl rounded-b-none font-medium text-base leading-tight transition-colors ${activeFormTab === "quote"
                  ? "bg-[#cc1f40] text-white"
                  : "text-white"
                  }`}
                style={{
                  backgroundColor: activeFormTab === "quote" ? "#cc1f40" : "#374151"
                }}
                onClick={() => setActiveFormTab("quote")}
              >
                Get a Quick Price<br />Quote
              </Button>
              <Button
                className={`flex-1 px-8 py-6 rounded-t-3xl rounded-b-none font-medium text-base leading-tight transition-colors ${activeFormTab === "consultation"
                  ? "bg-[#cc1f40] text-white"
                  : "text-white"
                  }`}
                style={{
                  backgroundColor: activeFormTab === "consultation" ? "#cc1f40" : "#374151"
                }}
                onClick={() => setActiveFormTab("consultation")}
              >
                Book a<br />Consultation Call
              </Button>
            </div>

            {/* Dynamic Form Content */}
            <div className="bg-[#cc1f40] rounded-b-3xl rounded-t-none p-8 text-white relative">

              {activeFormTab === "quote" ? (
                // Quote Form
                <>
                  <h2 className="text-4xl font-bold mb-6 text-center">Get in touch.</h2>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium mb-3 text-white">
                          Your Name
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-white text-gray-900 border-0 rounded-2xl py-4 px-4 text-base"
                          placeholder=""
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-3 text-white">
                          Email Address
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-white text-gray-900 border-0 rounded-2xl py-4 px-4 text-base"
                          placeholder=""
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium mb-3 text-white">
                          Phone Number
                        </label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full bg-white text-gray-900 border-0 rounded-2xl py-4 px-4 text-base"
                          placeholder=""
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-3 text-white">
                          Company
                        </label>
                        <Input
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          required
                          className="w-full bg-white text-gray-900 border-0 rounded-2xl py-4 px-4 text-base"
                          placeholder=""
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-3 text-white">
                        Trade Service
                      </label>
                      <select
                        name="trade"
                        value={formData.trade}
                        onChange={handleChange}
                        required
                        className="w-full bg-white text-gray-900 border-0 rounded-2xl py-4 px-4 text-base"
                      >
                        <option value="">Select a trade service...</option>
                        {allTradeServices.map((trade, index) => (
                          <option key={index} value={trade}>{trade}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-3 text-white">
                        Project Details
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full bg-white text-gray-900 border-0 rounded-2xl min-h-[120px] py-4 px-4 text-base resize-none"
                        placeholder="Describe your project for accurate quote..."
                      />
                    </div>

                    {/* File Upload Section */}
                    {blueprintFile && (
                      <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getFileIcon(blueprintFile.name)}
                            <div>
                              <p className="text-white font-medium text-sm">{blueprintFile.name}</p>
                              <p className="text-white/70 text-xs">{formatFileSize(blueprintFile.size)}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setBlueprintFile(null)}
                            className="p-1 hover:bg-white/20 rounded-full transition-colors"
                          >
                            <X className="h-4 w-4 text-white/70 hover:text-white" />
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-4 pt-4">
                      <div className="flex-1">
                        <Button
                          type="button"
                          className="w-full bg-gray-600 hover:bg-gray-700 text-white rounded-2xl py-4 px-6 font-medium flex items-center justify-center gap-2"
                          onClick={() => document.getElementById('blueprintInput')?.click()}
                        >
                          <Upload className="h-4 w-4" />
                          Upload Blueprint
                        </Button>
                        <input
                          id="blueprintInput"
                          type="file"
                          onChange={handleBlueprintFileChange}
                          className="hidden"
                          accept=".pdf,.doc,.docx,.dwg,.jpg,.png,.jpeg"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-gray-800 hover:bg-gray-900 text-white rounded-2xl py-4 px-6 font-medium"
                      >
                        {isSubmitting ? "Getting Quote..." : "Get Quote"}
                      </Button>
                    </div>
                  </form>
                </>
              ) : (
                // Consultation Booking Form
                <>
                  <h2 className="text-4xl font-bold mb-6 text-center">Book Consultation.</h2>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium mb-3 text-white">
                          Your Name
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-white text-gray-900 border-0 rounded-2xl py-4 px-4 text-base"
                          placeholder=""
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-3 text-white">
                          Email Address
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-white text-gray-900 border-0 rounded-2xl py-4 px-4 text-base"
                          placeholder=""
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium mb-3 text-white">
                          Phone Number
                        </label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full bg-white text-gray-900 border-0 rounded-2xl py-4 px-4 text-base"
                          placeholder=""
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-3 text-white">
                          Company
                        </label>
                        <Input
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          required
                          className="w-full bg-white text-gray-900 border-0 rounded-2xl py-4 px-4 text-base"
                          placeholder=""
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-3 text-white">
                        Project Type
                      </label>
                      <select
                        name="trade"
                        value={formData.trade}
                        onChange={handleChange}
                        required
                        className="w-full bg-white text-gray-900 border-0 rounded-2xl py-4 px-4 text-base"
                      >
                        <option value="">Select parent service you want to discuss about...</option>
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Government">Government</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium mb-3 text-white">
                          Preferred Date
                        </label>
                        <Input
                          name="preferredDate"
                          type="date"
                          value={formData.preferredDate}
                          onChange={handleChange}
                          required
                          className="w-full bg-white text-gray-900 border-0 rounded-2xl py-4 px-4 text-base"
                          placeholder=""
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-3 text-white">
                          Preferred Time
                        </label>
                        <Input
                          name="preferredTime"
                          type="time"
                          value={formData.preferredTime}
                          onChange={handleChange}
                          required
                          className="w-full bg-white text-gray-900 border-0 rounded-2xl py-4 px-4 text-base"
                          placeholder=""
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-3 text-white">
                        Consultation Topic
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full bg-white text-gray-900 border-0 rounded-2xl min-h-[120px] py-4 px-4 text-base resize-none"
                        placeholder="What would you like to discuss in the consultation?"
                      />
                    </div>

                    <div className="flex justify-center pt-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gray-800 hover:bg-gray-900 text-white rounded-2xl py-4 px-6 font-medium"
                      >
                        {isSubmitting ? "Booking..." : "Book Call"}
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
