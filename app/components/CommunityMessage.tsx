'use client';

import React from 'react';

export default function CommunityMessage() {
  const scrollToComments = () => {
    const commentsSection = document.getElementById('global-comments');
    if (commentsSection) {
      commentsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-6 md:py-8">
      <div className="backdrop-blur-sm rounded-2xl p-6 md:p-10 shadow-lg transition-all duration-300 hover:scale-[1.01]" style={{ 
        backgroundColor: 'rgba(229, 181, 103, 0.08)', 
        border: '1px solid rgba(229, 181, 103, 0.3)'
      }}>
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-main)' }}>
              Welcome to MateandTalk – Let's build this together!
            </h2>
            <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: 'var(--gold-highlight)' }}></div>
          </div>

          {/* Message Content */}
          <div className="space-y-4 text-center md:text-left max-w-4xl mx-auto">
            <p className="font-['Playfair_Display'] text-lg md:text-xl leading-relaxed" style={{ color: 'var(--text-main)' }}>
              Hi! I'm so happy you're here.
            </p>
            
            <p className="font-['Playfair_Display'] text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-accent)' }}>
              MateandTalk started from a simple, honest conversation with a friend in the U.S. about the beauty and complexity of Argentine culture. At the time, I was unemployed, and I decided to turn that uncertainty into this project—a labor of love built from scratch.
            </p>
            
            <p className="font-['Playfair_Display'] text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-accent)' }}>
              I want to be transparent: the site is still growing and isn't 100% complete yet. I'm building it piece by piece, and that's where you come in. My goal is to create what you actually want to learn. Please, tell me what you're interested in, what you're curious about, or what you find difficult, and I will prioritize building that for you.
            </p>
            
            <p className="font-['Playfair_Display'] text-base md:text-lg leading-relaxed font-semibold" style={{ color: 'var(--text-main)' }}>
              Thank you for being part of this early stage. I'm waiting for you with a mate in hand and a passion to help you learn together!
            </p>
          </div>

          {/* CTA Button */}
          <div className="text-center pt-4">
            <button
              onClick={scrollToComments}
              className="inline-block px-8 py-4 font-semibold rounded-lg hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
              style={{ 
                backgroundColor: 'var(--gold-highlight)', 
                color: 'var(--bg-dark)'
              }}
            >
              Send your suggestions
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
