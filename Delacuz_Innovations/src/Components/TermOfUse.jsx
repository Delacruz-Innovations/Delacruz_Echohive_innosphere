import React from 'react'

const TermOfUse = () => {
const terms = [
  {
    title: "Acceptance of Terms",
    content:
      "By using our Services, you acknowledge that you have read, understood, and agree to these Terms of Use. If you do not agree, please do not use our Services."
  },
  {
    title: "Use of Services",
    content:
      "You may use our Services only for lawful purposes and in accordance with these Terms. You must not attempt to gain unauthorised access to our systems, interfere with the operation or security of our Services, or use our Services for fraudulent or illegal activities. We reserve the right to suspend or terminate access for any user violating these Terms."
  },
  {
    title: "Intellectual Property",
    content:
      "All content, software, designs, logos, and materials on our website or platforms are owned by Delacruz Innovations or licensed to us. You may not copy, reproduce, distribute, or create derivative works without express written permission. Trademarks and brand elements are protected under Nigerian and international law."
  },
  {
    title: "User-Generated Content",
    content:
      "Where applicable, users may submit comments, feedback, or content. By submitting, you grant Delacruz Innovations a non-exclusive, worldwide, royalty-free licence to use, modify, and display that content for promotional, research, or educational purposes. Users must not submit content that is unlawful, offensive, or infringes the rights of others."
  },
  {
    title: "Disclaimer of Warranties",
    content:
      "Our Services are provided on an 'as is' and 'as available' basis. While we strive for accuracy and reliability, we make no warranties regarding the completeness, accuracy, or availability of the Services. We do not guarantee that the Services are free from viruses or other harmful components."
  },
  {
    title: "Limitation of Liability",
    content:
      "To the maximum extent permitted by law, Delacruz Innovations will not be liable for any direct, indirect, incidental, or consequential loss arising from your use of the Services, including loss of profits, data, or business opportunities."
  },
  {
    title: "Links to Third-Party Sites",
    content:
      "Our Services may contain links to external websites. We do not control these websites and are not responsible for their content, privacy policies, or practices."
  },
  {
    title: "Privacy",
    content:
      "Your use of our Services is subject to our Privacy Policy, which outlines how we collect, use, and protect your personal data."
  },
  {
    title: "Modifications to Terms",
    content:
      "We may update these Terms of Use at any time. Changes will be posted on this page with the 'Last Updated' date. Your continued use of our Services after changes constitutes acceptance of the updated Terms."
  },
  {
    title: "Governing Law",
    content:
      "These Terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria and applicable UK law where relevant. Any disputes will be subject to the exclusive jurisdiction of the Nigerian courts, unless otherwise agreed."
  },
  {
    title: "Contact Information",
    content:
      "If you have any questions regarding these Terms of Use, please contact us at legal@delacruzinnovations.com or by phone at +44 (0)1234 567890 (UK) | +234 1 234 5678 (NG). Address: 22 Fellery Street, Chorley PR7 1EH, UK / Lagos, Nigeria."
  }
];

    
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-purple-700 mb-8 text-center">
          Terms of Use
        </h1>
        
        {/* <div className="bg-gray-900 rounded-lg p-8 mb-12 border border-gray-800">
          <p className="text-gray-300 leading-relaxed">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae eligendi necessitatibus praesentium maiores? Explicabo placeat in vitae porro quam, dolore similique animi temporibus, assumenda aliquid sit praesentium! Sint, libero. Iusto vel ipsam dicta rem libero corporis temporibus qui sunt alias animi rerum, sapiente amet quidem hic enim minima cumque itaque.
          </p>
        </div> */}

        <div className="space-y-8">
          {terms.map((term, index) => (
            <div key={index} className="border-l-4 border-purple-700 pl-6 py-4 bg-gray-900 rounded-r-lg">
              <div className="flex items-start gap-4">
                <span className="text-2xl font-bold text-purple-700 min-w-[2rem]">
                  {index + 1}.
                </span>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-purple-700 mb-3">
                    {term.title}
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    {term.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TermOfUse