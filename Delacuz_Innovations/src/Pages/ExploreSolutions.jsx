import React, { useState } from 'react'
import { ArrowRight, CheckCircle, Globe, Server, Shield, Smartphone, Users, Zap, Star, Award, TrendingUp, Quote } from 'lucide-react'
import CalendlyPopup from '../Components/CalendlyPopup'

const ExploreSolutions = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('cloud')

  const solutions = {
    cloud: {
      title: "Cloud Solutions",
      icon: <Server className="w-12 h-12" />,
      tagline: "Secure, Scalable, Compliant Cloud Infrastructure",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop",
      description: "Transform your business with enterprise-grade cloud solutions designed for regulated industries. Our expertise in BFSI and healthcare ensures your cloud journey is secure, compliant, and optimized for performance.",
      features: [
        "Multi-cloud architecture and migration strategies",
        "PDPL and regulatory compliance frameworks",
        "24/7 monitoring and disaster recovery",
        "Cost optimization and resource management",
        "DevOps and CI/CD pipeline implementation",
        "Cloud-native application development"
      ],
      benefits: [
        { label: "Cost Reduction", value: "40%" },
        { label: "Faster Deployment", value: "60%" },
        { label: "Uptime Guarantee", value: "99.9%" }
      ],
      testimonial: {
        text: "The cloud migration strategy implemented by this team transformed our operations. We achieved full PDPL compliance while reducing infrastructure costs by 45%.",
        author: "Sarah Al-Mansouri",
        role: "CTO, Emirates Financial Group",
        rating: 5
      },
      caseStudy: {
        client: "Major UAE Bank",
        challenge: "Legacy infrastructure limiting digital banking capabilities",
        solution: "Comprehensive cloud migration with zero downtime",
        results: ["40% cost reduction", "3x faster deployment", "100% regulatory compliance"]
      }
    },
    cybersecurity: {
      title: "Cybersecurity",
      icon: <Shield className="w-12 h-12" />,
      tagline: "Advanced Protection for Your Digital Assets",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop",
      description: "Safeguard your organization with comprehensive cybersecurity solutions. From threat detection to incident response, we provide multi-layered security that adapts to evolving threats.",
      features: [
        "Penetration testing and vulnerability assessments",
        "Security Operations Center (SOC) services",
        "Identity and access management solutions",
        "Data encryption and loss prevention",
        "Compliance auditing and reporting",
        "Security awareness training programs"
      ],
      benefits: [
        { label: "Threat Detection", value: "Real-time" },
        { label: "Risk Reduction", value: "75%" },
        { label: "Response Time", value: "<15min" }
      ],
      testimonial: {
        text: "Their proactive security approach identified vulnerabilities we didn't know existed. The 24/7 SOC service gives us peace of mind knowing our systems are constantly monitored.",
        author: "Dr. Ahmed Hassan",
        role: "IT Director, HealthCare Plus",
        rating: 5
      },
      caseStudy: {
        client: "Healthcare Provider Network",
        challenge: "Multiple security breaches and compliance gaps",
        solution: "End-to-end security infrastructure overhaul",
        results: ["Zero breaches in 18 months", "ISO 27001 certification", "80% faster incident response"]
      }
    },
    digital: {
      title: "Digital Transformation",
      icon: <Zap className="w-12 h-12" />,
      tagline: "Innovate, Automate, and Accelerate Growth",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
      description: "Embrace digital innovation with strategies that revolutionize your business operations. We help you leverage emerging technologies to create competitive advantages and deliver exceptional customer experiences.",
      features: [
        "Business process automation and AI integration",
        "Customer experience (CX) transformation",
        "Data analytics and business intelligence",
        "IoT and smart device integration",
        "Legacy system modernization",
        "Agile transformation consulting"
      ],
      benefits: [
        { label: "Productivity Boost", value: "55%" },
        { label: "Customer Satisfaction", value: "+45%" },
        { label: "Time to Market", value: "-50%" }
      ],
      testimonial: {
        text: "The digital transformation roadmap revolutionized how we operate. Our customer satisfaction scores increased by 60% and operational costs dropped significantly.",
        author: "Mohammed Al-Farsi",
        role: "CEO, National Insurance Co.",
        rating: 5
      },
      caseStudy: {
        client: "Insurance Leader",
        challenge: "Manual processes causing customer churn",
        solution: "AI-powered automation and CX redesign",
        results: ["60% process automation", "45% higher satisfaction", "2x revenue growth"]
      }
    },
    web: {
      title: "Web & Mobile Solutions",
      icon: <Smartphone className="w-12 h-12" />,
      tagline: "Engaging Digital Experiences Across All Devices",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop",
      description: "Create powerful web and mobile applications that captivate users and drive business results. Our full-stack development expertise delivers seamless, scalable solutions from concept to launch.",
      features: [
        "Progressive web apps (PWA) and native mobile development",
        "E-commerce and payment gateway integration",
        "CMS and content management solutions",
        "API development and third-party integrations",
        "UI/UX design and user research",
        "Performance optimization and SEO"
      ],
      benefits: [
        { label: "User Engagement", value: "+70%" },
        { label: "Load Time", value: "<2s" },
        { label: "Mobile Traffic", value: "+85%" }
      ],
      testimonial: {
        text: "Our mobile app went from concept to launch in just 12 weeks. The user experience is exceptional and our customer engagement has skyrocketed.",
        author: "Fatima Al-Zaabi",
        role: "Marketing Director, Retail Group",
        rating: 5
      },
      caseStudy: {
        client: "E-commerce Platform",
        challenge: "Poor mobile experience causing lost sales",
        solution: "Native mobile apps with seamless checkout",
        results: ["85% mobile conversion increase", "2M+ downloads", "4.8★ app rating"]
      }
    }
  }

  const industries = [
    { name: "Banking & Finance", icon: <Users className="w-6 h-6" />, count: "50+ Projects" },
    { name: "Healthcare", icon: <Globe className="w-6 h-6" />, count: "35+ Projects" },
    { name: "Insurance", icon: <Shield className="w-6 h-6" />, count: "40+ Projects" },
    { name: "Government", icon: <Server className="w-6 h-6" />, count: "25+ Projects" }
  ]

  const achievements = [
    { icon: <Award />, value: "150+", label: "Projects Delivered" },
    { icon: <Users />, value: "98%", label: "Client Satisfaction" },
    { icon: <TrendingUp />, value: "15+", label: "Years Experience" },
    { icon: <Star />, value: "4.9/5", label: "Average Rating" }
  ]

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">

      <div className="min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-2xl relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 z-10 group"
          >
            <span className="text-2xl text-gray-600 group-hover:text-gray-900">×</span>
          </button>

          <div className="p-8 lg:p-12">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Explore Our Solutions
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Tailored technology solutions that drive innovation, enhance security, and accelerate your digital transformation journey
              </p>
            </div>

            {/* Achievements Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-gradient-to-br from-[#4a90b8] to-[#6bb3d8] rounded-xl p-6 text-center text-white shadow-lg">
                  <div className="flex justify-center mb-2">{achievement.icon}</div>
                  <p className="text-3xl font-bold mb-1">{achievement.value}</p>
                  <p className="text-sm opacity-90">{achievement.label}</p>
                </div>
              ))}
            </div>

            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {Object.entries(solutions).map(([key, solution]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${activeTab === key
                    ? 'bg-gradient-to-r from-[#4a90b8] to-[#6bb3d8] text-white shadow-xl scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
                    }`}
                >
                  <div className={activeTab === key ? 'text-white' : 'text-[#4a90b8]'}>
                    {solution.icon}
                  </div>
                  <span className="hidden sm:inline">{solution.title}</span>
                </button>
              ))}
            </div>

            {/* Active Solution Content */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-12">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Left Side - Content */}
                <div className="p-8 lg:p-12">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#4a90b8] to-[#6bb3d8] rounded-xl flex items-center justify-center text-white shadow-lg">
                      {solutions[activeTab].icon}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">
                        {solutions[activeTab].title}
                      </h3>
                      <p className="text-[#4a90b8] font-semibold">
                        {solutions[activeTab].tagline}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-8">
                    {solutions[activeTab].description}
                  </p>

                  <h4 className="font-bold text-gray-900 mb-4 text-lg">Key Features</h4>
                  <div className="space-y-3 mb-8">
                    {solutions[activeTab].features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#4a90b8] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side - Stats & Visual */}
                <div className="bg-gradient-to-br from-[#0d2438] to-[#1a3a52] p-8 lg:p-12 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#4a90b8] rounded-full opacity-10 blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#6bb3d8] rounded-full opacity-10 blur-3xl"></div>

                  <h4 className="font-bold text-2xl mb-8 relative z-10">Proven Results</h4>

                  <div className="space-y-6 mb-8 relative z-10">
                    {solutions[activeTab].benefits.map((benefit, index) => (
                      <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                        <p className="text-gray-300 text-sm mb-2">{benefit.label}</p>
                        <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6bb3d8] to-white">
                          {benefit.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Solution Image */}
                  <div className="relative z-10 h-48 rounded-xl overflow-hidden shadow-xl">
                    <img
                      src={solutions[activeTab].image}
                      alt={solutions[activeTab].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Section */}
            <div className="bg-gradient-to-r from-[#0d2438] to-[#1a3a52] rounded-2xl p-8 lg:p-12 mb-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#4a90b8] rounded-full opacity-5 blur-3xl"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <Quote className="w-8 h-8 text-[#6bb3d8]" />
                  <h3 className="text-2xl font-bold text-white">Client Testimonial</h3>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                  <div className="flex mb-4">
                    {[...Array(solutions[activeTab].testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-white text-lg leading-relaxed mb-6 italic">
                    "{solutions[activeTab].testimonial.text}"
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#4a90b8] to-[#6bb3d8] rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {solutions[activeTab].testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{solutions[activeTab].testimonial.author}</p>
                      <p className="text-gray-300 text-sm">{solutions[activeTab].testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Study Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Award className="w-8 h-8 text-[#4a90b8]" />
                Success Story
              </h3>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <p className="text-sm text-gray-500 uppercase font-semibold mb-2">Client</p>
                  <p className="text-gray-900 font-bold text-lg">{solutions[activeTab].caseStudy.client}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <p className="text-sm text-gray-500 uppercase font-semibold mb-2">Challenge</p>
                  <p className="text-gray-900">{solutions[activeTab].caseStudy.challenge}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <p className="text-sm text-gray-500 uppercase font-semibold mb-2">Solution</p>
                  <p className="text-gray-900">{solutions[activeTab].caseStudy.solution}</p>
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-r from-[#4a90b8]/10 to-[#6bb3d8]/10 rounded-xl p-6">
                <p className="text-sm text-gray-600 uppercase font-semibold mb-4">Key Results</p>
                <div className="grid md:grid-cols-3 gap-4">
                  {solutions[activeTab].caseStudy.results.map((result, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-[#4a90b8]" />
                      <span className="text-gray-900 font-semibold">{result}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Industries Served */}
            <div className="bg-gradient-to-r from-[#0d2438] to-[#1a3a52] rounded-2xl p-8 lg:p-12 mb-12">
              <h3 className="text-2xl lg:text-3xl font-bold text-white text-center mb-8">
                Industries We Serve
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {industries.map((industry, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 text-center group cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-[#4a90b8] to-[#6bb3d8] rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                      {industry.icon}
                    </div>
                    <p className="text-white font-semibold mb-1">{industry.name}</p>
                    <p className="text-[#6bb3d8] text-sm">{industry.count}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="text-center">
              <p className="text-gray-600 mb-6 text-lg">
                Ready to transform your business with cutting-edge solutions?
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <CalendlyPopup
                  text="Schedule a Consultation"
                  className="bg-gradient-to-r from-[#4a90b8] to-[#6bb3d8] hover:from-[#6bb3d8] hover:to-[#4a90b8] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  Schedule a Consultation
                  <ArrowRight className="w-5 h-5" />
                </CalendlyPopup>
                <button className="bg-white border-2 border-[#4a90b8] text-[#4a90b8] hover:bg-[#4a90b8] hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300">
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExploreSolutions