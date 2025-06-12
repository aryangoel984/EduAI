import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Star, Users, Clock, Languages, Brain, MessageSquare, ClipboardCheck, TrendingUp, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();
  const features = [
    {
      icon: MessageSquare,
      title: "Personalized AI Tutors",
      description: "Real-time intelligent tutoring with adaptive learning paths customized to each student's pace and learning style.",
      color: "bg-edu-blue/5 border-edu-blue/20",
      iconColor: "text-edu-blue",
      benefits: ["Context-aware doubt solving", "Multi-subject support", "Voice and chat interfaces"]
    },
    {
      icon: ClipboardCheck,
      title: "Automated Assessment Tools",
      description: "Generate, deliver, and grade assessments automatically with detailed analytics and personalized feedback.",
      color: "bg-edu-green/5 border-edu-green/20",
      iconColor: "text-edu-green",
      benefits: ["Auto-generated tests", "Subjective answer grading", "Performance analytics"]
    },
    {
      icon: TrendingUp,
      title: "Student Risk Prediction",
      description: "Identify at-risk students early with AI-powered analytics and receive actionable intervention recommendations.",
      color: "bg-edu-coral/5 border-edu-coral/20",
      iconColor: "text-edu-coral",
      benefits: ["Early warning system", "Explainable insights", "Intervention planning"]
    }
  ];

  const testimonials = [
    {
      name: "Dr. Rachel Martinez",
      role: "Principal, Lincoln High School",
      content: "The AI tutor has revolutionized how our students learn. We've seen a 40% improvement in test scores and students are more engaged than ever before.",
      initials: "RM",
      rating: 5
    },
    {
      name: "James Liu",
      role: "Mathematics Teacher, Oak Valley School",
      content: "The automated assessment tools save me hours every week. I can focus more on teaching and less on grading, while still getting detailed insights about my students.",
      initials: "JL",
      rating: 5
    },
    {
      name: "Dr. Komal Patel",
      role: "Academic Director, Global University",
      content: "The risk prediction feature helped us identify struggling students early. We were able to provide support before they fell too far behind.",
      initials: "KP",
      rating: 5
    }
  ];

  const stats = [
    { value: "50,000+", label: "Active Students" },
    { value: "2,500+", label: "Schools & Institutions" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "24/7", label: "AI Support" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-edu-blue/5 to-edu-purple/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-edu-dark mb-6 leading-tight">
                Empowering Education with{" "}
                <span className="text-edu-blue">AI Intelligence</span>
              </h1>
              <p className="text-lg text-edu-gray mb-8 leading-relaxed">
                Transform learning experiences with personalized AI tutors, automated assessments, and predictive analytics that help educators and learners achieve their full potential.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg" 
                  className="bg-edu-blue hover:bg-edu-blue/90 text-white"
                  onClick={() => setLocation('/dashboard')}
                >
                  Start Free Trial
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-edu-blue text-edu-blue hover:bg-edu-blue/5"
                  onClick={() => setLocation('/ai-tutor')}
                >
                  Request Demo
                </Button>
              </div>
              <div className="flex items-center space-x-6 text-sm text-edu-gray">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-edu-green" />
                  <span>No setup required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-edu-green" />
                  <span>WCAG compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-edu-green" />
                  <span>Multi-language support</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Diverse students collaborating with technology" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-edu-green/20 rounded-full flex items-center justify-center">
                    <Brain className="text-edu-green h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-edu-dark">AI Tutor Active</p>
                    <p className="text-sm text-edu-gray">24/7 Learning Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-edu-dark mb-4">
              Three Core AI-Powered Capabilities
            </h2>
            <p className="text-lg text-edu-gray max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with educational expertise to deliver personalized, efficient, and insightful learning experiences.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className={`${feature.color} border hover:shadow-lg transition-shadow`}>
                <CardContent className="p-8">
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <feature.icon className={`${feature.iconColor} h-8 w-8`} />
                  </div>
                  <h3 className="text-xl font-bold text-edu-dark mb-4">{feature.title}</h3>
                  <p className="text-edu-gray mb-6">{feature.description}</p>
                  <ul className="space-y-2 text-sm text-edu-gray">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-edu-green" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Tutor Demonstration */}
      <section className="py-20 bg-edu-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-edu-dark mb-6">
                Meet Your Personal AI Tutor
              </h2>
              <p className="text-lg text-edu-gray mb-8">
                Get instant help with homework, learn new concepts, and receive personalized explanations tailored to your learning style and pace.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-edu-purple/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Brain className="text-edu-purple h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-edu-dark mb-2">Adaptive Learning</h4>
                    <p className="text-edu-gray">Adjusts difficulty and teaching style based on your progress and preferences.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-edu-blue/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="text-edu-blue h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-edu-dark mb-2">24/7 Availability</h4>
                    <p className="text-edu-gray">Get help whenever you need it, day or night, across all subjects.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-edu-green/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Languages className="text-edu-green h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-edu-dark mb-2">Multi-Languages Support</h4>
                    <p className="text-edu-gray">Learn in your preferred language with native-level explanations.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="bg-white shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-edu-blue rounded-full flex items-center justify-center">
                      <Brain className="text-white h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-edu-dark">AI Tutor</h4>
                      <p className="text-sm text-edu-gray">Online • Mathematics</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 mb-4 max-h-80 overflow-y-auto">
                  <div className="flex justify-end">
                    <div className="bg-edu-blue text-white p-3 rounded-lg max-w-xs">
                      <p className="text-sm">I'm having trouble understanding quadratic equations. Can you help?</p>
                      <p className="text-xs opacity-75 mt-1">2:34 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg max-w-xs">
                      <p className="text-sm text-edu-dark">I'd be happy to help! Let's start with the basics. A quadratic equation has the form ax² + bx + c = 0. What specific part are you finding challenging?</p>
                      <p className="text-xs text-edu-gray mt-1">2:34 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <div className="bg-edu-blue text-white p-3 rounded-lg max-w-xs">
                      <p className="text-sm">How do I find the roots using the quadratic formula?</p>
                      <p className="text-xs opacity-75 mt-1">2:35 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg max-w-xs">
                      <p className="text-sm text-edu-dark">Great question! The quadratic formula is: x = (-b ± √(b²-4ac)) / 2a</p>
                      <p className="text-sm text-edu-dark mt-2">Let me walk you through an example step by step...</p>
                      <p className="text-xs text-edu-gray mt-1">2:35 PM</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input 
                    type="text" 
                    placeholder="Ask your question..." 
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-edu-blue focus:border-transparent"
                  />
                  <Button className="bg-edu-blue hover:bg-edu-blue/90">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-edu-dark mb-4">
              Trusted by Educators Worldwide
            </h2>
            <p className="text-lg text-edu-gray max-w-2xl mx-auto">
              See how schools and institutions are transforming education with our AI-powered platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-edu-light hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <blockquote className="text-edu-gray mb-6">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-edu-blue rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">{testimonial.initials}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-edu-dark">{testimonial.name}</p>
                      <p className="text-sm text-edu-gray">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <p className="text-4xl font-bold text-edu-blue mb-2">{stat.value}</p>
                <p className="text-edu-gray">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Education with AI?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of educators and institutions who are already using EduAI to personalize learning, automate assessments, and support student success.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" onClick={() => setLocation('/dashboard')}>
              Start Your Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10" onClick={() => setLocation('/ai-tutor')}>
              Schedule a Demo
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-8 text-white/80 text-sm">
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4" />
              <span>30-day free trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4" />
              <span>Setup support included</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-edu-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-edu-blue mb-4">EduAI</h3>
              <p className="text-gray-300 mb-4 max-w-sm">
                Empowering educators and learners worldwide with AI-powered personalized education, automated assessments, and predictive analytics.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">AI Tutors</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Assessments</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dashboard</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">K-12 Schools</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Higher Education</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Corporate Training</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Online Learning</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">System Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 EduAI. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">WCAG Compliance</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
