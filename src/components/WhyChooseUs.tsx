import React from 'react';
import { Check, Award, Clock, BarChart, Users, Building, Globe, Zap, ArrowRight } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Check size={24} />,
      title: "Accuracy & Precision",
      description: "Our estimates are consistently within 2% of final project costs, ensuring reliable budgeting for your projects.",
      delay: 100
    },
    {
      icon: <Clock size={24} />,
      title: "Fast Turnaround",
      description: "Get your detailed estimates in as little as 48 hours, allowing you to respond quickly to client needs.",
      delay: 200
    },
    {
      icon: <BarChart size={24} />,
      title: "Cost Savings",
      description: "Our clients report an average of 15% reduction in project costs through our optimized estimation process.",
      delay: 300
    },
    {
      icon: <Award size={24} />,
      title: "Certified Experts",
      description: "Work with certified professionals with over 15 years of industry experience in all types of construction projects.",
      delay: 400
    }
  ];

  const stats = [
    { value: "500+", label: "Projects Completed" },
    { value: "95%", label: "Client Retention" },
    { value: "15+", label: "Years Experience" },
    { value: "50+", label: "Expert Team Members" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4 text-construction-blue">
            Why Contractors Choose EstimatingHub
          </h2>
          <div className="w-24 h-1 bg-construction-orange mx-auto mb-6"></div>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-12">
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h3 className="font-bold mb-2">Proven Track Record</h3>
            <p>With thousands of successful projects completed, we've established ourselves as the go-to estimating partner for contractors across North America.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h3 className="font-bold mb-2">Rapid Turnaround</h3>
            <p>Standard estimates delivered within 24-48 hours, with rush services available for urgent deadlines.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h3 className="font-bold mb-2">Competitive Pricing</h3>
            <p>Our efficient processes and technology investments allow us to offer premium services at competitive rates.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h3 className="font-bold mb-2">Dedicated Support</h3>
            <p>Each client is assigned a dedicated project manager who understands your specific needs and business requirements.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h3 className="font-bold mb-2">Continuous Innovation</h3>
            <p>We invest in the latest estimating technologies and methodologies to maintain our competitive edge.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h3 className="font-bold mb-2">24/7 Availability</h3>
            <p>Round-the-clock support and emergency estimating services to meet your project deadlines, no matter the time zone.</p>
          </div>
        </div>


        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h4 className="font-bold mb-2">Monthly Partnership Programs</h4>
            <p>Flexible service packages designed for contractors with ongoing estimating needs.</p>
          </div>
          <p className="mt-6 text-gray-700">
            EstimatingHub is committed to delivering exceptional value through precision, reliability, and innovation. Our certified estimators bring decades of combined experience to every project, ensuring your success in today's competitive construction market.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
