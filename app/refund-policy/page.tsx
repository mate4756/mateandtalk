'use client';

import React from 'react';
import Link from 'next/link';

export default function RefundPolicyPage() {
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
            Refund Policy
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
                  At MateAndTalk
                </h2>
                <p style={{ color: 'var(--text-accent)' }}>
                  We strive to ensure that you are satisfied with your digital products.
                </p>
              </section>

              <section>
                <h2 className="font-['Playfair_Display'] text-2xl font-bold mb-4" style={{ color: 'var(--gold-highlight)' }}>
                  Digital Products & Content
                </h2>
                <p style={{ color: 'var(--text-accent)' }}>
                  Due to the nature of our products (digital ebooks, game assets, and digital access), all sales are considered final once the access has been granted or the file has been downloaded.
                </p>
              </section>

              <section>
                <h2 className="font-['Playfair_Display'] text-2xl font-bold mb-4" style={{ color: 'var(--gold-highlight)' }}>
                  Refund Requests
                </h2>
                <p style={{ color: 'var(--text-accent)' }}>
                  We only offer refunds in the following exceptional cases:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4" style={{ color: 'var(--text-accent)' }}>
                  <li>The product is found to be technically defective or corrupted.</li>
                  <li>A duplicate charge occurred due to a technical error.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-['Playfair_Display'] text-2xl font-bold mb-4" style={{ color: 'var(--gold-highlight)' }}>
                  Contact Us
                </h2>
                <p style={{ color: 'var(--text-accent)' }}>
                  If you believe you qualify for a refund, please contact us at mateandtalk@gmail.com within 7 days of purchase. Requests will be reviewed on a case-by-case basis.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
