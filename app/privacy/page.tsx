'use client';

import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
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
            Privacy Policy
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
                  Introduction
                </h2>
                <p style={{ color: 'var(--text-accent)' }}>
                  MateandTalk ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services. Please read this policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                </p>
              </section>

              <section>
                <h2 className="font-['Playfair_Display'] text-2xl font-bold mb-4" style={{ color: 'var(--gold-highlight)' }}>
                  Information We Collect
                </h2>
                <div className="space-y-4" style={{ color: 'var(--text-accent)' }}>
                  <p>
                    <strong>Personal Information:</strong> We may collect personal information that you voluntarily provide to us when you create an account, including your name, email address, and other information you choose to provide.
                  </p>
                  <p>
                    <strong>Account Information:</strong> When you create an account, we collect your username, email address, and any other information you provide during registration.
                  </p>
                  <p>
                    <strong>Payment Information:</strong> If you purchase a subscription, we collect payment information through our third-party payment processor. We do not store your complete credit card information on our servers.
                  </p>
                  <p>
                    <strong>Usage Data:</strong> We collect information about your use of our services, including your learning progress, quiz results, achievement unlocks, and other activity data.
                  </p>
                  <p>
                    <strong>Communications:</strong> We may collect information when you communicate with us, such as when you send us emails, participate in community discussions, or provide feedback.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-['Playfair_Display'] text-2xl font-bold mb-4" style={{ color: 'var(--gold-highlight)' }}>
                  How We Use Your Information
                </h2>
                <div className="space-y-4" style={{ color: 'var(--text-accent)' }}>
                  <p>We use the information we collect for various purposes, including:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>To provide, maintain, and improve our services</li>
                    <li>To process transactions and send you related information</li>
                    <li>To send you technical notices and support messages</li>
                    <li>To respond to your comments, questions, and customer service requests</li>
                    <li>To monitor and analyze trends, usage, and activities</li>
                    <li>To detect, prevent, and address technical issues and fraud</li>
                    <li>To fulfill our obligations and enforce our rights under our Terms of Service</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="font-['Playfair_Display'] text-2xl font-bold mb-4" style={{ color: 'var(--gold-highlight)' }}>
                  Information Sharing
                </h2>
                <div className="space-y-4" style={{ color: 'var(--text-accent)' }}>
                  <p>
                    <strong>Third-Party Service Providers:</strong> We may share your information with third-party service providers who perform services on our behalf, such as payment processing, data analysis, email delivery, and hosting services.
                  </p>
                  <p>
                    <strong>Authentication Services:</strong> We use Clerk for user authentication. Please review Clerk's privacy policy for information about how they handle your data.
                  </p>
                  <p>
                    <strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.
                  </p>
                  <p>
                    <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-['Playfair_Display'] text-2xl font-bold mb-4" style={{ color: 'var(--gold-highlight)' }}>
                  Data Security
                </h2>
                <p style={{ color: 'var(--text-accent)' }}>
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="font-['Playfair_Display'] text-2xl font-bold mb-4" style={{ color: 'var(--gold-highlight)' }}>
                  Your Rights
                </h2>
                <div className="space-y-4" style={{ color: 'var(--text-accent)' }}>
                  <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>The right to access your personal information</li>
                    <li>The right to correct inaccurate information</li>
                    <li>The right to request deletion of your personal information</li>
                    <li>The right to object to processing of your personal information</li>
                    <li>The right to data portability</li>
                  </ul>
                  <p>To exercise these rights, please contact us at mateandtalk@gmail.com.</p>
                </div>
              </section>

              <section>
                <h2 className="font-['Playfair_Display'] text-2xl font-bold mb-4" style={{ color: 'var(--gold-highlight)' }}>
                  Children's Privacy
                </h2>
                <p style={{ color: 'var(--text-accent)' }}>
                  Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                </p>
              </section>

              <section>
                <h2 className="font-['Playfair_Display'] text-2xl font-bold mb-4" style={{ color: 'var(--gold-highlight)' }}>
                  Changes to This Policy
                </h2>
                <p style={{ color: 'var(--text-accent)' }}>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                </p>
              </section>

              <section>
                <h2 className="font-['Playfair_Display'] text-2xl font-bold mb-4" style={{ color: 'var(--gold-highlight)' }}>
                  Contact Us
                </h2>
                <p style={{ color: 'var(--text-accent)' }}>
                  If you have any questions about this Privacy Policy, please contact us at:
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
