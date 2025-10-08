import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Award, Clock, Globe, Lightbulb, CheckCircle } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Precision",
      description: "Delivering accurate estimates and flawless execution in every project we undertake."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Working closely with clients and stakeholders to achieve shared construction goals."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Embracing cutting-edge technology and methodologies to stay ahead of industry trends."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Maintaining the highest standards of quality and professionalism in all our services."
    },
    {
      icon: Clock,
      title: "Reliability",
      description: "Consistently meeting deadlines and delivering projects on time and within budget."
    },
    {
      icon: Globe,
      title: "Sustainability",
      description: "Promoting environmentally responsible construction practices and green building solutions."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-construction-darkGray mb-6">About Our Company</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-8">
            Founded in 2010 with a vision to transform the construction industry through accurate estimating and innovative project management, 
            we have grown from a small team of passionate professionals to a leading construction services company. Our journey has been marked 
            by continuous learning, technological advancement, and an unwavering commitment to client satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-construction-blue mb-4">Our Mission</h3>
            <p className="text-gray-600 mb-6">
              To provide accurate, reliable, and innovative construction estimating and management services that empower our clients 
              to make informed decisions and achieve project success.
            </p>
            <h3 className="text-2xl font-bold text-construction-blue mb-4">Our Vision</h3>
            <p className="text-gray-600">
              To be the most trusted partner in construction services, known for our precision, innovation, and commitment to 
              building a sustainable future.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center p-6 bg-construction-blue/5 rounded-lg">
              <div className="text-3xl font-bold text-construction-blue mb-2">1000+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center p-6 bg-construction-orange/5 rounded-lg">
              <div className="text-3xl font-bold text-construction-orange mb-2">15+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="text-center p-6 bg-construction-blue/5 rounded-lg">
              <div className="text-3xl font-bold text-construction-blue mb-2">500+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div className="text-center p-6 bg-construction-orange/5 rounded-lg">
              <div className="text-3xl font-bold text-construction-orange mb-2">99%</div>
              <div className="text-gray-600">Accuracy Rate</div>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-construction-darkGray mb-6">Our Core Values</h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            These fundamental principles guide everything we do and shape our commitment to excellence in construction services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-construction-blue/10 rounded-full flex items-center justify-center mb-4">
                  <value.icon className="h-8 w-8 text-construction-blue" />
                </div>
                <CardTitle className="text-xl text-construction-darkGray">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">{value.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;