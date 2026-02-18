import React from 'react'

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Introduction",
      content: "Delacruz Innovations (“we”, “us”, “our”) is committed to protecting and respecting your privacy. This Privacy Policy explains what personal data we collect, how we use it, how we share it, and your rights in relation to it. This policy applies to our website, services, and engagements across Nigeria and beyond."
    },
    {
      title: " Scope and Legal Basis",
      content: "This policy covers all personal data we process about clients, prospects, candidates, staff, suppliers, and visitors. We process data in accordance with the Nigeria Data Protection Act 2023 and other applicable laws. ",
      // subsections: [
      //   {
      //     subtitle: "Personal Information",
      //     list: [
      //       "Name and contact information (email address, phone number, mailing address)",
      //       "Professional information (job title, company name, industry)",
      //       "Account credentials (username and password)",
      //       "Payment information (credit card details, billing address)",
      //       "Communications and correspondence with us"
      //     ]
      //   },
      //   {
      //     subtitle: "Automatically Collected Information",
      //     list: [
      //       "Device information (IP address, browser type, operating system)",
      //       "Usage data (pages visited, time spent on pages, click patterns)",
      //       "Cookies and similar tracking technologies",
      //       "Location data (general geographic location)",
      //       "Referral sources and search terms"
      //     ]
      //   }
      // ]
    },
    {
      title: " Types of Data We Collect",
      content: "We may collect:",
      list: [
        "Contact information (name, email address, telephone number)",
        "Organisation details (company name, job title, industry)",
        "Project information (scope, requirements, deliverables)",
        "Usage data (website visits, service usage metrics)",
        "Sensitive/regulated data only where required and with explicit consent.",
       
      ]
    },
    {
      title: "How and Why We Use Your Data",
      content: "We use your data for:",
      list: [
        "Delivering consultancy, platform development, automation and training services",
        "Contract fulfilment, billing, project management and client communications",
        "Improving our services, conducting audits, analytics and business improvement",
        "Marketing communications (only with your consent)",
        "Fulfilling legal, regulatory and contractual obligations."
      ]
    },
    {
      title: "Data Sharing",
      content: "We may share your personal data with:",
      list: [
        "Our trusted sub‑contractors, vendors or technology partners (under strict agreements)",
        "Regulatory authorities if required by law",
        "Acquirers or business partners in the event of a merger or sale (with appropriate protections).",
      
      ]
    },
    {
      title: "International Transfers",
      content: "If we transfer personal data outside Nigeria (e.g., to cloud services or partners), we ensure appropriate safeguards are in place, such as contractual clauses or recognised frameworks. nse.org.ng"
    },
    {
      title: "Data Retention",
      content: "We retain personal data only for as long as necessary to fulfil the purpose of collection or as required by law. When your data is no longer needed, we securely dispose of or anonymise it."
    },
    {
      title: "Security",
      content: "You have the right to:",
      list: [
        "Be informed about how your data is processed",
        "Access your personal data and obtain a copy",
        "Request correction or deletion of your data",
        "Object to processing on legitimate grounds",
        "Request data portability where applicable",
        "Withdraw consent at any time (where applicable)",
        "Lodge a complaint with the Nigeria Data Protection Commission. ",
     
      ]
    },
    {
      title: "Cookies and Website Tracking",
      content: "Our website uses cookies and tracking technologies to enhance user experience and gather usage statistics. You may disable non‑essential cookies via your browser settings."
    },
    {
      title: "Changes to This Policy",
      content: "We review this policy periodically and may update it. The latest version will always be posted on our website and dated accordingly."
    },

    {
      title: "Contact Us",
      content: "If you have questions or would like to exercise your rights, please contact: Data Protection Officer (DPO)",
      contact: {
        email: "dpo@delacruzinnovations.com",
        phone: " +44 (0)7342274470 (UK) | +234 9052765358 (NG)",
        address: "22 Fellery Street, Lagos, Nigeria",
        dpo: "Data Protection Officer: dpo@delacruzinnovation.com"
      }
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-purple-700 mb-6 text-center">
          Privacy Policy
        </h1>
        
        <div className="bg-gray-900 rounded-lg p-8 mb-12 border border-gray-800">
          <p className="text-gray-300 leading-relaxed text-center mb-2">
            <span className="font-semibold text-purple-700">Last Updated:</span> October 30, 2025
          </p>
          <p className="text-gray-400 text-sm text-center">
            Effective Date: October 30, 2025
          </p>
        </div>

        <div className="space-y-10">
          {sections.map((section, index) => (
            <div key={index} className="border-l-4 border-purple-700 pl-6 py-4 bg-gray-900 rounded-r-lg">
              <div className="flex items-start gap-4">
                <span className="text-2xl font-bold text-purple-700 min-w-[2rem]">
                  {index + 1}.
                </span>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-purple-700 mb-4">
                    {section.title}
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {section.content}
                  </p>
                  
                  {section.list && (
                    <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                      {section.list.map((item, i) => (
                        <li key={i} className="leading-relaxed">{item}</li>
                      ))}
                    </ul>
                  )}

                  {section.subsections && (
                    <div className="space-y-4 mt-4">
                      {section.subsections.map((subsection, i) => (
                        <div key={i}>
                          <h3 className="text-lg font-semibold text-purple-600 mb-3">
                            {subsection.subtitle}
                          </h3>
                          <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                            {subsection.list.map((item, j) => (
                              <li key={j} className="leading-relaxed">{item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {section.contact && (
                    <div className="mt-4 space-y-2 text-gray-300 bg-black bg-opacity-40 p-4 rounded">
                      <p><span className="font-semibold text-purple-700">Email:</span> {section.contact.email}</p>
                      <p><span className="font-semibold text-purple-700">Phone:</span> {section.contact.phone}</p>
                      <p><span className="font-semibold text-purple-700">Address:</span> {section.contact.address}</p>
                      {section.contact.dpo && (
                        <p><span className="font-semibold text-purple-700">DPO:</span> {section.contact.dpo}</p>
                      )}
                      <p className="mt-4 text-sm text-gray-400">
                        We will respond to your privacy-related inquiries within 30 days.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-purple-900 bg-opacity-20 border border-purple-700 rounded-lg p-6">
          <p className="text-gray-300 text-center leading-relaxed">
            By using our website and services, you acknowledge that you have read and understood this Privacy Policy and agree to its terms. If you do not agree with this Privacy Policy, please discontinue use of our services immediately.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy