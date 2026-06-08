'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
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
            About MateandTalk
          </h1>
          <div className="w-24 h-1 rounded-full" style={{ backgroundColor: 'var(--gold-highlight)' }}></div>
        </header>

        {/* Content */}
        <div className="space-y-8">
          <div className="backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}>
            <div className="space-y-6 text-lg leading-relaxed" style={{ color: 'var(--text-main)' }}>
              <p className="font-['Playfair_Display'] text-2xl font-semibold" style={{ color: 'var(--gold-highlight)' }}>
                From a Conversation to a Community
              </p>
              
              <p>
                MateandTalk started from a simple, honest conversation with a friend in the United States about the beauty and complexity of Argentine culture. What began as sharing stories about our homeland evolved into something much bigger—a realization that the world doesn't just want to learn Spanish; they want to understand the soul behind the language.
              </p>

              <p>
                At the time, I was unemployed. That uncertainty became the catalyst for this project. Instead of waiting for opportunity, I decided to create one. MateandTalk was born as a labor of love, built from scratch with nothing but passion, a laptop, and the belief that culture deserves to be shared authentically.
              </p>

              <p className="font-['Playfair_Display'] text-2xl font-semibold" style={{ color: 'var(--gold-highlight)' }}>
                More Than Language
              </p>

              <p>
                This isn't a typical language learning platform. We don't teach you to conjugate verbs in isolation. We teach you to understand the humor in a Buenos Aires café, the passion in a football stadium chant, the ritual of sharing mate with strangers who become friends. We teach you the untranslatable parts of Argentine culture—the things that dictionaries can't capture.
              </p>

              <p>
                Every module, every quiz, every interaction here is designed to immerse you in the real Argentina. The Argentina of late-night conversations, of neighborhood clubs, of resilience through hardship, of joy that refuses to be extinguished.
              </p>

              <p className="font-['Playfair_Display'] text-2xl font-semibold" style={{ color: 'var(--gold-highlight)' }}>
                Built Together
              </p>

              <p>
                I want to be transparent: this site is still growing. It's not 100% complete yet, and that's intentional. I'm building it piece by piece, guided by what you actually want to learn. Your feedback, your suggestions, your participation—these aren't just welcome here, they're essential.
              </p>

              <p>
                MateandTalk isn't my project alone. It's ours. Every person who joins, every question asked, every suggestion made helps shape what this becomes. You're not just a user here—you're part of the foundation.
              </p>

              <p className="font-['Playfair_Display'] text-2xl font-semibold" style={{ color: 'var(--gold-highlight)' }}>
                The Vision
              </p>

              <p>
                My goal is simple: to create the most authentic, engaging, and community-driven platform for learning Argentine culture and language. A place where you don't just study—you experience. Where you don't just memorize words—you understand the people behind them.
              </p>

              <p>
                Thank you for being here, whether you're just exploring or you've been with us from the beginning. I'm waiting for you with a mate in hand and a passion to help you discover the Argentina I love.
              </p>

              <p className="font-semibold" style={{ color: 'var(--text-accent)' }}>
                — The MateandTalk Team
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
