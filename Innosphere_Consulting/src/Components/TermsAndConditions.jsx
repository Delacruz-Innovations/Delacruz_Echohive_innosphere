import React from 'react';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 pt-30 pb-10">
        <div className="max-w-4xl mx-auto py-8">
          <h1 className="text-4xl font-bold text-white mb-2">Terms and Conditions</h1>
        </div>
        
        <div className="space-y-8">
          {/* Introduction */}
          <section>
            <p className="text-gray-300 leading-relaxed">
              These Terms and Conditions govern your use of our website and consulting services. By accessing our website or engaging our services, you agree to be bound by these terms. Please read them carefully.
            </p>
          </section>

          {/* Services */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Our Services</h2>
            <p className="text-gray-300 leading-relaxed">
              We provide professional consulting services tailored to meet your business needs. The scope, deliverables, and timeline of services will be defined in a separate service agreement. We reserve the right to modify or discontinue any service at any time without prior notice.
            </p>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">User Responsibilities</h2>
            <p className="text-gray-300 leading-relaxed">
              You agree to provide accurate and complete information when engaging our services. You are responsible for maintaining the confidentiality of any account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
            </p>
          </section>

          {/* Payment Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Payment Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              Payment terms will be outlined in your service agreement. All fees are due as specified in your invoice. Late payments may incur additional charges. We reserve the right to suspend services for non-payment until all outstanding amounts are settled.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Intellectual Property</h2>
            <p className="text-gray-300 leading-relaxed">
              All content on this website, including text, graphics, logos, and software, is the property of our company and is protected by copyright and intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
            </p>
          </section>

          {/* Confidentiality */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Confidentiality</h2>
            <p className="text-gray-300 leading-relaxed">
              We maintain strict confidentiality regarding all client information and business matters. Both parties agree not to disclose confidential information obtained during the course of our business relationship without prior written consent.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Limitation of Liability</h2>
            <p className="text-gray-300 leading-relaxed">
              To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services or website. Our total liability shall not exceed the amount paid for our services in the preceding twelve months.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Termination</h2>
            <p className="text-gray-300 leading-relaxed">
              Either party may terminate the service agreement with written notice as specified in the agreement. We reserve the right to terminate or suspend access to our services immediately for violation of these terms or for any reason at our sole discretion.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Governing Law</h2>
            <p className="text-gray-300 leading-relaxed">
              These Terms and Conditions are governed by and construed in accordance with the laws of the jurisdiction in which our company is registered. Any disputes shall be resolved through binding arbitration or in the courts of that jurisdiction.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Changes to These Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to this page. Your continued use of our services after any changes constitutes acceptance of the modified terms.
            </p>
          </section>


        </div>
      </main>
    </div>
  );
}