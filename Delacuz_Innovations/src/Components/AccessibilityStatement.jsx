import React from 'react'

const AccessibilityStatement = () => {
const sections = [
  {
    title: "Our Commitment",
    content:
      "Delacruz Innovations is committed to ensuring that our digital services are accessible to everyone, including people with disabilities. We aim to provide a user experience that is inclusive, clear, and easy to navigate for all clients, partners, and visitors."
  },
  {
    title: "Commitment to Accessibility",
    content:
      "We strive to make our website, platforms, and digital content accessible in accordance with best practices and industry standards. Our accessibility efforts align with:",
    list: [
      "WCAG 2.1 Level AA guidelines",
      "Nigerian and international accessibility standards",
      "Inclusive design principles to ensure usability for people with visual, auditory, motor, or cognitive impairments"
    ]
  },
  {
    title: "Measures to Support Accessibility",
    content: "To improve accessibility across our digital platforms, we have implemented the following measures:",
    list: [
      "Semantic HTML and ARIA labels for navigation and interactive elements",
      "Keyboard navigability for forms, menus, and links",
      "Readable font sizes and high-contrast colour schemes",
      "Alt text for all images to support screen readers",
      "Responsive design for mobile, tablet, and desktop access",
      "Clear headings, labels, and instructions throughout forms and workflows"
    ]
  },
  {
    title: "Limitations",
    content:
      "While we strive to meet accessibility standards, there may be some limitations that we are actively working to resolve:",
    list: [
      "Some third-party content or embedded platforms may not fully conform",
      "PDF or downloadable content may not be fully accessible without assistive software",
      "Certain dynamic or interactive features may have limitations on some devices"
    ]
  },
  {
    title: "Feedback and Contact Information",
    content:
      "We welcome your feedback on the accessibility of Delacruz Innovations. If you encounter any accessibility barriers or have suggestions for improvement, please contact us:",
    contact: {
      email: "accessibility@delacruzinnovations.com",
      phone: "+44 (0)7342274470 (UK) | +234 9052765358 (NG)",
      address: "29A Salimonu Ayinde Street, Lagos, Nigeria"
    }
  },
  {
    title: "Alternatives",
    content:
      "If you are unable to access certain information or functionalities on our website, we can provide the following alternatives:",
    list: [
      "Accessible document formats (Word, accessible PDF)",
      "Direct support via phone or email",
      "Assistance in submitting inquiries or requests"
    ]
  },
  {
    title: "Continuous Improvement",
    content:
      "Delacruz Innovations regularly audits its digital services for accessibility compliance and updates its practices to align with the latest standards and technologies. We remain committed to creating an inclusive environment where all users, regardless of ability, can engage with our services confidently and effectively."
  }
];


  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-purple-700 mb-6 text-center">
          Accessibility Statement
        </h1>
        
        <div className="bg-gray-900 rounded-lg p-8 mb-12 border border-gray-800">
          <p className="text-gray-300 leading-relaxed text-center">
            Last Updated: October 30, 2025
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
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                  
                  {section.contact && (
                    <div className="mt-4 space-y-2 text-gray-300">
                      <p><span className="font-semibold text-purple-700">Email:</span> {section.contact.email}</p>
                      <p><span className="font-semibold text-purple-700">Phone:</span> {section.contact.phone}</p>
                      <p><span className="font-semibold text-purple-700">Address:</span> {section.contact.address}</p>
                      <p className="mt-4 text-sm text-gray-400">
                        We aim to respond to accessibility feedback within 5 business days.
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
            This accessibility statement was created on October 30, 2025, and reflects our current efforts and commitment to accessibility. We review and update this statement regularly to ensure it accurately represents our accessibility practices.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AccessibilityStatement