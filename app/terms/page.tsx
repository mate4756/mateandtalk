'use client';

import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--bg-dark)' }}>
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <header className="mb-12">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 font-['Playfair_Display'] text-lg hover:scale-105 transition-all duration-300 mb-8"
            style={{ color: 'var(--text-accent)' }}
          >
            ← Back to Home
          </Link>
          <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl font-bold leading-tight mb-6" style={{ color: 'var(--text-main)' }}>
            Terms of Service
          </h1>
          <div className="w-24 h-1 rounded-full" style={{ backgroundColor: 'var(--gold-highlight)' }}></div>
        </header>

        {/* Content */}
        <div className="space-y-8">
          <div className="backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}>
            <div className="space-y-8 text-lg leading-relaxed" style={{ color: 'var(--text-main)' }}>
              <p className="text-sm" style={{ color: 'var(--text-accent)', opacity: 0.7 }}>
                Last Updated: June 2026
              </p>

              <section>
                <h2 className="font-['Playfair_Display'] text-2xl font-bold mb-4" style={{ color: 'var(--gold-highlight)' }}>
                  Agreement to Terms
                </h2>
                <p style={{ color: 'var(--text-accent)' }}>
                  By accessing or using MateandTalk ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, then you may not access the Service.
                </p>
              </section>

              <section>
                <h2 className="font-['Playfair_Display'] text-2xl font-bold mb-4" style={{ color: 'var(--gold-highlight)' }}>
                  Accounts
                </h2>
                <div className="space-y-4" style={{ color: 'var(--text-accent)' }}>
                  <p>
                    <strong>Account Creation:</strong> You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password.
                  </p>
                  <p>
                    <strong>Account Information:</strong> You must provide accurate, complete, and current information during registration. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
                  </p>
                  <p>
                    <strong>Account Termination:</strong> We reserve the right to suspend or terminate your account at any time for any reason, including but not limited to violation of these Terms.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-['Playfair_Display'] text-2xl font-bold mb-4" style={{ color: 'var(--gold-highlight)' }}>
                  Subscription Plans
                </h2>
                <div className="space-y-4" style={{ color: 'var(--text-accent)' }}>
                  <p>
                    <strong>Paid Subscriptions:</strong> We offer Standard and Premium subscription plans. By subscribing to a paid plan, you agree to pay the applicable fees in accordance with the billing terms in effect at the time of purchase.
                  </p>
                  <p>
                    <strong>Payment:</strong> Payments are processed through third-party payment processors. You agree to provide accurate payment information and authorize us to charge your chosen payment method.
                  </p>
                  <p>
                    <strong>Refunds:</strong> All sales are final. Refunds are not provided except as required by law or at our sole discretion.
                  </p>
                  <p>
                    <strong>Plan Changes:</strong> We may modify subscription plans and pricing at any time. Changes will apply to new subscribers and will be communicated to existing subscribers prior to renewal.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-['Playfair_Display'] text-2xl font-bold mb-4" style={{ color: 'var(--gold-highlight)' }}>
                  Intellectual Property
                </h2>
                <div className="space-y-4" style={{ color: 'var(--text-accent)' }}>
                  <p>
                    <strong>Content Ownership:</strong> The Service and its original content, features, and functionality are owned by MateandTalk and are protected by international copyright, trademark, and other intellectual property laws.
                  </p>
                  <p>
                    <strong>Limited License:</strong> We grant you a personal, non-exclusive, non-transferable license to access and use the Service for your personal, non-commercial purposes in accordance with these Terms.
                  </p>
                  <p>
                    <strong>Restrictions:</strong> You may not: (a) copy, modify, or distribute any content from the Service; (b) use the Service for any commercial purpose; (c) attempt to reverse engineer any portion of the Service; or (d) use the Service in any manner that could damage, disable, or impair the Service.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-['Playfair_Display'] text-2xl font-bold mb-4" style={{ color: 'var(--gold-highlight)' }}>
                  User Conduct
                </h2>
                <div className="space-y-4" style={{ color: 'var(--text-accent)' }}>
                  <p>You agree not to use the Service to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Upload, post, or transmit any content that is unlawful, harmful, threatening, abusive, or otherwise objectionable</li>
                    <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity</li>
                    <li>Interfere with or disrupt the Service or servers connected to the Service</li>
                    <li>Violate any applicable local, state, national, or international law</li>
                    <li>Harass, abuse, or harm other users of the Service</li>
                    <li>Attempt to gain unauthorized access to any portion of the Service</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="font-['Playfair_Display'] text-2xl font-bold mb-4" style={{ color: 'var(--gold-highlight)' }}>
                  Community Guidelines
                </h2>
                <div className="space-y-4" style={{ color: 'var(--text-accent)' }}>
                  <p>
                    MateandTalk is a community dedicated to learning and cultural exchange. We expect all users to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Be respectful and courteous to other community members</li>
                    <li>Contribute constructively to discussions and learning activities</li>
                    <li>Respect cultural differences and approach learning with an open mind</li>
                    <li>Report inappropriate behavior to our support team</li>
                  </ul>
                  <p>
                    We reserve the right to remove content and suspend users who violate these community guidelines.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-['Playfair_Display'] text-2xl font-bold mb-4" style={{ color: 'var(--gold-highlight)' }}>
                  Disclaimer of Warranties
                </h2>
                <p style={{ color: 'var(--text-accent)' }}>
                  The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no representations or warranties of any kind, express or implied, regarding the operation of the Service or the information, content, materials, or products included on the Service.
                </p>
              </section>

              <section>
                <h2 className="font-['Playfair_Display'] text-2xl font-bold mb-4" style={{ color: 'var(--gold-highlight)' }}>
                  Limitation of Liability
                </h2>
                <p style={{ color: 'var(--text-accent)' }}>
                  To the fullest extent permitted by law, MateandTalk shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                </p>
              </section>

              <section>
                <h2 className="font-['Playfair_Display'] text-2xl font-bold mb-4" style={{ color: 'var(--gold-highlight)' }}>
                  Termination
                </h2>
                <div className="space-y-4" style={{ color: 'var(--text-accent)' }}>
                  <p>
                    We may terminate or suspend your account and access to the Service at our sole discretion, without prior notice, for any reason whatsoever, including but not limited to a breach of these Terms.
                  </p>
                  <p>
                    Upon termination, your right to use the Service will immediately cease. All provisions of the Terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-['Playfair_Display'] text-2xl font-bold mb-4" style={{ color: 'var(--gold-highlight)' }}>
                  Governing Law
                </h2>
                <p style={{ color: 'var(--text-accent)' }}>
                  These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which MateandTalk is based, without regard to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="font-['Playfair_Display'] text-2xl font-bold mb-4" style={{ color: 'var(--gold-highlight)' }}>
                  Changes to Terms
                </h2>
                <p style={{ color: 'var(--text-accent)' }}>
                  We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms on this page and updating the "Last Updated" date. Your continued use of the Service after such modifications constitutes your acceptance of the new Terms.
                </p>
              </section>

              <section>
                <h2 className="font-['Playfair_Display'] text-2xl font-bold mb-4" style={{ color: 'var(--gold-highlight)' }}>
                  Contact Us
                </h2>
                <p style={{ color: 'var(--text-accent)' }}>
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <p className="font-semibold" style={{ color: 'var(--text-main)' }}>
                  mateandtalk@gmail.com
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
