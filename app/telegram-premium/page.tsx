'use client';

import React from 'react';
import Link from 'next/link';

export default function TelegramPremiumPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--bg-dark)' }}>
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl font-bold mb-6" style={{ color: 'var(--text-main)' }}>
            ¡Bienvenido al Nivel Premium!
          </h1>
          <p className="text-xl md:text-2xl mb-4" style={{ color: 'var(--text-accent)' }}>
            Thank you for supporting the project and joining our exclusive community.
          </p>
          <p className="text-lg" style={{ color: 'var(--text-accent)', opacity: 0.8 }}>
            You're now part of something special. Let's dive into the real Argentine experience together.
          </p>
        </div>

        {/* How it Works Section */}
        <div className="backdrop-blur-sm rounded-2xl p-12 mb-12" style={{ backgroundColor: 'var(--card-bg)', border: '2px solid var(--border-subtle)' }}>
          <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-8 text-center" style={{ color: 'var(--gold-highlight)' }}>
            How it works
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}>
                <span className="font-bold">1</span>
              </div>
              <p className="text-lg" style={{ color: 'var(--text-main)' }}>
                Leave your questions in the channel.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}>
                <span className="font-bold">2</span>
              </div>
              <p className="text-lg" style={{ color: 'var(--text-main)' }}>
                I will open the channel for a limited time to collect your doubts.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}>
                <span className="font-bold">3</span>
              </div>
              <p className="text-lg" style={{ color: 'var(--text-main)' }}>
                Then, I will react to your question and contact you privately.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}>
                <span className="font-bold">4</span>
              </div>
              <p className="text-lg" style={{ color: 'var(--text-main)' }}>
                We will connect via voice notes to practice exactly what you want to learn about Argentine culture and language.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <a
            href="https://t.me/your-telegram-channel"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-12 py-5 rounded-lg hover:scale-105 transition-all duration-300 font-bold text-xl"
            style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
          >
            💬 Join Telegram Channel
          </a>
          <p className="mt-6 text-sm" style={{ color: 'var(--text-accent)', opacity: 0.6 }}>
            Limited spots available. Don't miss out!
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-semibold"
            style={{ backgroundColor: 'var(--border-subtle)', color: 'var(--text-main)' }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
