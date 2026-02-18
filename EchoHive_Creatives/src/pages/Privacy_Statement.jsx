import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Privacy_Statement = () => {
  const heroRef = useRef(null)
  const sectionsRef = useRef([])

  useEffect(() => {
    // Hero animation
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      }
    )

    // Section animations
    sectionsRef.current.forEach((el) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className=" min-h-screen pt-35 bg-black">
      {/* Hero */}
      <div
        ref={heroRef}
        className="py-4 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Privacy Statement
          </h1>

        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Introduction */}
        <div
          ref={el => sectionsRef.current[0] = el}
          className="mb-12"
        >
          <p className="text-gray-200 leading-relaxed text-lg mb-4">
            Echohive creatives, a trading division of Echohive UK Limited (registered in England and Wales with company number 01939690), is committed to protecting your privacy. This Privacy Statement explains how we collect, use, and safeguard your personal information when you visit our website at www.echohivecreatives.com.
          </p>
          <p className="text-gray-200 leading-relaxed">
            We respect your privacy and are committed to protecting your personal data. This privacy statement will inform you about how we look after your personal data and tell you about your privacy rights and how the law protects you.
          </p>
        </div>

        {/* Information We Collect */}
        <div
          ref={el => sectionsRef.current[1] = el}
          className="mb-12"
        >
          <h2 className="text-3xl font-semibold text-white mb-6">
            Information We Collect
          </h2>
          <div className="space-y-4">
            <div className=" p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-3">Personal Information</h3>
              <p className="text-gray-200 leading-relaxed">
                We may collect personal information such as your name, email address, phone number, and company details when you contact us through our website, subscribe to our newsletter, or engage with our services.
              </p>
            </div>
            <div className=" p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-3">Technical Information</h3>
              <p className="text-gray-200 leading-relaxed">
                We automatically collect certain technical information including your IP address, browser type, operating system, referring URLs, and pages visited to improve our website performance and user experience.
              </p>
            </div>
            <div className=" p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-3">Cookies and Tracking</h3>
              <p className="text-gray-200 leading-relaxed">
                Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand user preferences. You can control cookie settings through your browser.
              </p>
            </div>
          </div>
        </div>

        {/* How We Use Your Information */}
        <div
          ref={el => sectionsRef.current[2] = el}
          className="mb-12"
        >
          <h2 className="text-3xl font-semibold text-white mb-6">
            How We Use Your Information
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4">
            We use the information we collect for the following purposes:
          </p>
          <ul className="space-y-3 text-gray-200">
            <li className="flex items-start">
              <span className="text-indigo-600 font-bold mr-3">•</span>
              <span>To provide and maintain our services and respond to your inquiries</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 font-bold mr-3">•</span>
              <span>To improve our website functionality and user experience</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 font-bold mr-3">•</span>
              <span>To send you marketing communications (with your consent)</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 font-bold mr-3">•</span>
              <span>To comply with legal obligations and protect our rights</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 font-bold mr-3">•</span>
              <span>To analyze website usage and trends for business improvement</span>
            </li>
          </ul>
        </div>

        {/* Data Protection */}
        <div
          ref={el => sectionsRef.current[3] = el}
          className="mb-12"
        >
          <h2 className="text-3xl font-semibold text-white mb-6">
            Data Protection and Security
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4">
            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>
          <p className="text-gray-200 leading-relaxed">
            We retain your personal data only for as long as necessary to fulfill the purposes outlined in this privacy statement, unless a longer retention period is required or permitted by law.
          </p>
        </div>

        {/* Your Rights */}
        <div
          ref={el => sectionsRef.current[4] = el}
          className="mb-12"
        >
          <h2 className="text-3xl font-semibold text-white mb-6">
            Your Privacy Rights
          </h2>
          <div className="p-6 rounded-lg">
            <p className="text-gray-200 leading-relaxed mb-4">
              Under data protection laws, you have the following rights:
            </p>
            <ul className="space-y-2 text-gray-200">
              <li className="flex items-start">
                <span className="text-indigo-600 font-bold mr-3">→</span>
                <span><strong>Access:</strong> Request copies of your personal data</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 font-bold mr-3">→</span>
                <span><strong>Rectification:</strong> Request correction of inaccurate data</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 font-bold mr-3">→</span>
                <span><strong>Erasure:</strong> Request deletion of your personal data</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 font-bold mr-3">→</span>
                <span><strong>Restriction:</strong> Request restriction of processing</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 font-bold mr-3">→</span>
                <span><strong>Portability:</strong> Request transfer of your data</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 font-bold mr-3">→</span>
                <span><strong>Objection:</strong> Object to processing of your data</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Third Party Links */}
        <div
          ref={el => sectionsRef.current[5] = el}
          className="mb-12"
        >
          <h2 className="text-3xl font-semibold text-white mb-6">
            Third-Party Links
          </h2>
          <p className="text-gray-200 leading-relaxed">
            Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
          </p>
        </div>

        {/* Changes to Privacy Statement */}
        <div
          ref={el => sectionsRef.current[6] = el}
          className="mb-12"
        >
          <h2 className="text-3xl font-semibold text-white mb-6">
            Changes to This Privacy Statement
          </h2>
          <p className="text-gray-200 leading-relaxed">
            We may update this Privacy Statement from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of any material changes by posting the updated statement on our website with a new "Last Updated" date.
          </p>
        </div>


      </div>
    </div>
  )
}

export default Privacy_Statement