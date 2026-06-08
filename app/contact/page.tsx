'use client';

import React from 'react';
import Link from 'next/link';

export default function ContactPage() {
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
            Contact Us
          </h1>
          <div className="w-24 h-1 rounded-full" style={{ backgroundColor: 'var(--gold-highlight)' }}></div>
        </header>

        {/* Content */}
        <div className="space-y-8">
          <div className="backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}>
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <div className="text-6xl">📧</div>
                <h2 className="font-['Playfair_Display'] text-3xl font-bold" style={{ color: 'var(--text-main)' }}>
                  Get in Touch
                </h2>
                <p className="text-lg" style={{ color: 'var(--text-accent)' }}>
                  We'd love to hear from you! Whether you have questions, suggestions, or just want to say hello, don't hesitate to reach out.
                </p>
              </div>

              <div className="text-center space-y-6">
                <div className="backdrop-blur-sm rounded-xl p-6" style={{ backgroundColor: 'rgba(229, 181, 103, 0.1)', border: '1px solid var(--gold-highlight)' }}>
                  <p className="text-sm font-semibold mb-2" style={{ color: 'var(--gold-highlight)' }}>
                    Support Email
                  </p>
                  <a 
                    href="mailto:mateandtalk@gmail.com"
                    className="text-2xl md:text-3xl font-bold hover:scale-105 transition-all duration-300 inline-block"
                    style={{ color: 'var(--text-main)' }}
                  >
                    mateandtalk@gmail.com
                  </a>
                </div>

                <div className="space-y-4 text-left max-w-2xl mx-auto">
                  <h3 className="font-['Playfair_Display'] text-xl font-semibold" style={{ color: 'var(--gold-highlight)' }}>
                    How can we help?
                  </h3>
                  <ul className="space-y-3" style={{ color: 'var(--text-accent)' }}>
                    <li className="flex items-start gap-3">
                      <span className="text-xl">💡</span>
                      <span>Suggestions for new content or modules</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-xl">🐛</span>
                      <span>Report bugs or technical issues</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-xl">❓</span>
                      <span>Questions about plans or features</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-xl">🤝</span>
                      <span>Partnership or collaboration inquiries</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-xl">💬</span>
                      <span>General feedback or just to say hi</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                  <p className="text-sm" style={{ color: 'var(--text-accent)', opacity: 0.8 }}>
                    We typically respond within 24-48 hours. Thank you for being part of the MateandTalk community!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
