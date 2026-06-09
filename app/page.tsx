'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthVerification, getAuthErrorMessage } from './lib/auth';
import { AdminAccess, useAdminMode } from './lib/admin';
import { Turnstile } from './components/Turnstile';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import WeeklyQuiz from './components/WeeklyQuiz';
import CommunityMessage from './components/CommunityMessage';

const dictionaryTerms = [
  {
    term: "Che",
    meaning: "Interjection to get attention.",
    context: "Very informal.",
  },
  {
    term: "Boludo",
    meaning: "Versatile term that can be affectionate or insulting depending on context and tone.",
    context: "Friendly among close friends, offensive if used with strangers or aggressive tone.",
  },
  {
    term: "Pelotudo",
    meaning: "Stronger insult than boludo, implying stupidity or foolishness.",
    context: "Aggressive/Insulting. Never use casually - designed to offend.",
  },
  {
    term: "Chamuyo",
    meaning: "Smooth talk, flattery, or deceptive speech used to persuade or manipulate.",
    context: "Ironic/Playful. Can describe flirting or someone trying to sell you something dubious.",
  },
  {
    term: "Al toque",
    meaning: "Immediately, right now, without delay.",
    context: "Urgent/Energetic. Used when something needs to happen now.",
  },
  {
    term: "De una",
    meaning: "Agreement, confirmation, or doing something without hesitation.",
    context: "Casual/Enthusiastic. Means 'let's do it' or 'absolutely'.",
  },
  {
    term: "Qué onda",
    meaning: "What's up?, what's happening?, how are things going?",
    context: "Casual/Friendly. Universal greeting among friends.",
  },
  {
    term: "No me la contés",
    meaning: "Don't try to fool me, I know what you're doing.",
    context: "Skeptical/Playful. Used when someone tries to deceive or exaggerate.",
  },
  {
    term: "Ponele",
    meaning: "Sure, okay, let's go with that. Filler word for agreement.",
    context: "Casual/Agreeing. Like 'yeah sure' or 'why not'.",
  },
  {
    term: "Quilombo",
    meaning: "Chaos, disorder, or complicated situation. Originally meant refuge for runaway slaves.",
    context: "Overwhelmed/Frustrated. Used when things are messy or confusing.",
  },
  {
    term: "Bondi",
    meaning: "Colloquial term for city buses, essential for navigating Buenos Aires.",
    context: "Practical/Daily. Essential vocabulary for public transportation.",
  },
  {
    term: "Tarado",
    meaning: "Foolish, stupid, or mentally slow.",
    context: "Insulting. Stronger than silly, implies genuine stupidity.",
  },
  {
    term: "Guita",
    meaning: "Money, cash. From Italian 'ghita'.",
    context: "Casual/Street. Common slang for money in daily conversation.",
  },
  {
    term: "Afanar",
    meaning: "To steal.",
    context: "Informal/slang. Note: Very used in street contexts.",
  },
  {
    term: "Chabón",
    meaning: "Guy/man.",
    context: "Informal. Note: Can be neutral or pejorative depending on tone.",
  },
  {
    term: "Embole",
    meaning: "Total boredom.",
    context: "Informal.",
  },
  {
    term: "Laburo",
    meaning: "Work.",
    context: "Universal in Argentina.",
  },
  {
    term: "Mina",
    meaning: "Woman/girl.",
    context: "Informal. Note: Italian origin.",
  },
  {
    term: "Morfar",
    meaning: "To eat.",
    context: "Very informal. Note: Italian origin.",
  },
  {
    term: "Pibe",
    meaning: "Kid/young boy.",
    context: "Informal. Note: Italian origin.",
  },
  {
    term: "Trucho",
    meaning: "Something fake or of poor quality.",
    context: "Informal.",
  },
];

const modules = [
  {
    id: 'futbol',
    title: 'Argentine Football Culture',
    description: 'Immerse yourself in the passion of Argentine football, from stadium chants to the language of the beautiful game.',
    icon: '⚽',
    route: '/futbol',
    isLocked: false
  },
  {
    id: 'mate',
    title: 'The Ritual of Mate',
    description: 'Discover the social art of sharing mate, its etiquette, and the conversations that flow around this sacred tradition.',
    icon: '🧉',
    route: '/mate',
    isLocked: false
  },
  {
    id: 'music',
    title: 'Argentine Music',
    description: 'From tango to rock nacional, explore the sounds that define Argentine identity and culture.',
    icon: '🎵',
    route: '/music',
    isLocked: true
  },
  {
    id: 'everyday',
    title: 'Everyday Life',
    description: 'Navigate daily life in Argentina like a local, from shopping to social customs.',
    icon: '🏠',
    route: '/everyday',
    isLocked: true
  },
  {
    id: 'telegram',
    title: 'Telegram Premium',
    description: 'Join our exclusive Telegram channel for personalized Argentine learning.',
    icon: '💬',
    route: '/telegram-premium',
    isLocked: true
  }
];

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);
  const { isSignedIn } = useUser();
  const { hasPlan } = useAuthVerification();
  const { isAdminMode } = useAdminMode();
  const router = useRouter();
  
  // Comments access: only require authentication (signed in)
  const canAccessComments = isSignedIn;
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [lastCommentTime, setLastCommentTime] = useState<number>(0);
  const [rateLimitError, setRateLimitError] = useState<string | null>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

  const handleModuleExplore = (module: typeof modules[0]) => {
    const isLocked = module.isLocked && !hasPlan && !isAdminMode;
    if (isLocked) {
      setShowPremiumModal(true);
    } else {
      router.push(module.route);
    }
  };

  const scrollToComments = () => {
    const commentsSection = document.getElementById('global-comments');
    if (commentsSection) {
      commentsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCommentSubmit = () => {
    // Rate limiting: minimum 30 seconds between comments
    const now = Date.now();
    const timeSinceLastComment = now - lastCommentTime;
    
    if (timeSinceLastComment < 30000) {
      setRateLimitError('Please wait 30 seconds before posting another comment.');
      return;
    }

    if (!turnstileToken) {
      setRateLimitError('Please complete the human verification.');
      return;
    }

    // Submit comment logic here
    setLastCommentTime(now);
    setRateLimitError(null);
    setComment('');
    setTurnstileToken(null);
  };

  const handleCheckout = async (priceId: string) => {
    setIsProcessingCheckout(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      } else {
        console.error('Failed to get checkout URL');
      }
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsProcessingCheckout(false);
    }
  };

  const badges = [
    {
      id: 'argentina',
      name: 'Argentina Badge',
      image: '/assets/badges/badge-std-argentina.png.png',
      plan: 'Standard',
      requirements: [
        'Complete 5 dictionary quizzes',
        'Master 20 essential terms',
        'Participate in 3 community discussions'
      ]
    },
    {
      id: 'escarapela',
      name: 'Escarapela Badge',
      image: '/assets/badges/badge-std-escarapela.png.png',
      plan: 'Standard',
      requirements: [
        'Complete the Football module',
        'Score 80%+ in Context Master',
        'Unlock 10 stadium chants'
      ]
    },
    {
      id: 'mate',
      name: 'Mate Badge',
      image: '/assets/badges/badge-pre-mate.png.png',
      plan: 'Premium',
      requirements: [
        'Complete all learning modules',
        'Achieve 90%+ in weekly quizzes',
        'Top 10 in weekly ranking'
      ]
    },
    {
      id: 'worldcup',
      name: 'World Cup 2026 Badge',
      image: '/assets/badges/badge-pre-worldcup.png.png',
      plan: 'Premium',
      requirements: [
        'Maintain 30-day streak',
        'Complete 50 community challenges',
        'Invite 5 friends to join'
      ]
    }
  ];

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--bg-dark)' }}>
      <AdminAccess />
      {/* Navigation Bar */}
      <nav className="max-w-6xl mx-auto px-6 py-6" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="flex justify-center items-center">
          <div className="flex gap-6 md:gap-8">
            <Link 
              href="#plans"
              className="font-medium transition-all duration-300 hover:text-[#E5B567] relative group"
              style={{ color: 'var(--text-accent)' }}
            >
              <span className="flex items-center gap-2">
                🚀 Plans
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E5B567] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <button 
              onClick={() => setShowAchievements(true)}
              className="font-medium transition-all duration-300 hover:text-[#E5B567] relative group"
              style={{ color: 'var(--text-accent)' }}
            >
              <span className="flex items-center gap-2">
                🏆 Achievements
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E5B567] transition-all duration-300 group-hover:w-full"></span>
            </button>
            <Link 
              href="/ranking"
              className="font-medium transition-all duration-300 hover:text-[#E5B567] relative group"
              style={{ color: 'var(--text-accent)' }}
            >
              <span className="flex items-center gap-2">
                📈 Ranking
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E5B567] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <button className="font-medium transition-all duration-300 hover:text-[#E5B567] relative group" style={{ color: 'var(--text-accent)' }}>
              <span className="flex items-center gap-2">
                💬 Global Comments
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E5B567] transition-all duration-300 group-hover:w-full"></span>
            </button>
            {isSignedIn ? (
              <Link 
                href="/profile"
                className="font-medium transition-all duration-300 hover:text-[#E5B567] relative group"
                style={{ color: 'var(--text-accent)' }}
              >
                <span className="flex items-center gap-2">
                  👤 My Profile
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E5B567] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ) : (
              <SignInButton mode="modal">
                <button 
                  className="font-medium transition-all duration-300 hover:text-[#E5B567] relative group"
                  style={{ color: 'var(--gold-highlight)' }}
                >
                  <span className="flex items-center gap-2">
                    🔐 Log In
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E5B567] transition-all duration-300 group-hover:w-full"></span>
                </button>
              </SignInButton>
            )}
            {isSignedIn && (
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                    userButtonPopoverCard: "bg-[var(--card-bg)] border border-[var(--border-subtle)]",
                    userButtonPopoverActionButton: "text-[#1f2937] hover:bg-[var(--border-subtle)]",
                    userButtonPopoverActionButtonText: "text-[#1f2937]",
                    userButtonPopoverActionButtonIcon: "text-[#1f2937]",
                    userButtonPopoverActions: "text-[#1f2937]",
                  }
                }}
              />
            )}
          </div>
        </div>
      </nav>

      {/* Community Message Section */}
      <CommunityMessage />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center space-y-8">
          <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl font-bold leading-tight" style={{ color: 'var(--text-main)' }}>
            Speak Like a Local, Feel the Argentine Soul
          </h1>
          <p className="font-['Playfair_Display'] text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto" style={{ color: 'var(--text-main)' }}>
            More than a conversation, it's a ritual. Join us to live the Argentine soul from the inside out.
          </p>
          <Link 
            href="#plans"
            className="mt-8 px-8 py-4 font-semibold rounded-lg hover:scale-105 transition-all duration-300 shadow-lg inline-block"
            style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
          >
            Start Your Journey
          </Link>
        </div>
      </section>

      {/* Weekly Quiz Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <WeeklyQuiz />
      </section>

      {/* Early Access Showcase Section */}
      <section className="max-w-6xl mx-auto px-6 py-20" style={{ backgroundColor: 'rgba(107, 91, 76, 0.3)' }}>
        <div className="text-center space-y-6 mb-12">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-main)' }}>
            Exclusive Early Access
          </h2>
          <p className="font-['Playfair_Display'] text-lg max-w-3xl mx-auto" style={{ color: 'var(--text-accent)' }}>
            Be part of the first 50 members. Once these limited-edition legacy badges are claimed, they'll never be available again. Don't miss your chance to be part of the foundation.
          </p>
          <div className="inline-block px-4 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: 'rgba(229, 181, 103, 0.2)', border: '1px solid var(--gold-highlight)', color: 'var(--gold-highlight)' }}>
            Limited Edition
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Standard Plan Badges */}
          <div className="text-center">
            <div className="backdrop-blur-sm rounded-xl p-6 shadow-lg transition-all duration-300 hover:scale-105" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}>
              <div className="relative">
                <img src="/assets/badges/badge-std-argentina.png.png" alt="Standard Argentina Badge" className="w-full h-auto rounded-lg filter grayscale opacity-70 badge-float" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-4xl">🔒</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="backdrop-blur-sm rounded-xl p-6 shadow-lg transition-all duration-300 hover:scale-105" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}>
              <div className="relative">
                <img src="/assets/badges/badge-std-escarapela.png.png" alt="Standard Escarapela Badge" className="w-full h-auto rounded-lg filter grayscale opacity-70 badge-float" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-4xl">🔒</span>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Plan Badges */}
          <div className="text-center">
            <div className="backdrop-blur-sm rounded-xl p-6 shadow-lg transition-all duration-300 hover:scale-105" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--gold-highlight)' }}>
              <div className="relative">
                <img src="/assets/badges/badge-pre-mate.png.png" alt="Premium Mate Badge" className="w-full h-auto rounded-lg filter grayscale opacity-70 badge-float" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-4xl">🔒</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="backdrop-blur-sm rounded-xl p-6 shadow-lg transition-all duration-300 hover:scale-105" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--gold-highlight)' }}>
              <div className="relative">
                <img src="/assets/badges/badge-pre-worldcup.png.png" alt="Premium World Cup Badge" className="w-full h-auto rounded-lg filter grayscale opacity-70 badge-float" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-4xl">🔒</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mt-8">
          <div className="text-center">
            <p className="text-sm font-medium" style={{ color: 'var(--gold-highlight)' }}>
              Standard Plan: Limited to the first 25 members
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium" style={{ color: 'var(--gold-highlight)' }}>
              Premium Plan: Limited to the first 25 founding members
            </p>
          </div>
        </div>
      </section>

      {/* Dictionary Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="rounded-2xl p-12 shadow-lg" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--section-border)' }}>
          <div className="space-y-12">
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold" style={{ color: 'var(--text-main)' }}>
            <span style={{ color: 'var(--accent-pop)' }}>📖</span> Dictionary
          </h2>
          <p className="font-['Playfair_Display'] text-lg" style={{ color: 'var(--text-accent)' }}>
            This is a living lexicon of Argentine local culture. Each entry is a curated key to understanding the soul of our language. This dictionary is built to grow; it evolves constantly, expanding through the direct requests and contributions of our community. Join us in documenting the hidden gems of our daily speech.
          </p>
          
          {/* Dictionary Entries */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dictionaryTerms.map((item, index) => (
              <div key={index} className="backdrop-blur-sm rounded-xl p-6 hover:scale-[1.02] transition-all duration-300" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}>
                <h4 className="font-['Playfair_Display'] text-2xl font-bold mb-3" style={{ color: 'var(--gold-highlight)' }}>{item.term}</h4>
                <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-main)' }}>{item.meaning}</p>
                <p className="text-xs italic leading-relaxed" style={{ color: 'var(--text-accent)', opacity: 0.8 }}>Tone: {item.context}</p>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="rounded-2xl p-12 shadow-lg" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--section-border)' }}>
          <div className="space-y-12">
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold" style={{ color: 'var(--text-main)' }}>
              <span style={{ color: 'var(--accent-pop)' }}>🚀</span> Modules
            </h2>
            <p className="font-['Playfair_Display'] text-lg" style={{ color: 'var(--text-accent)' }}>
              Explore our current curated modules. Crafted with passion, mate in hand, to bring you the real Argentine experience. We're constantly adding new content, so keep an eye out for what's coming next.
            </p>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {modules.map((module) => {
              const isLocked = module.isLocked && !hasPlan && !isAdminMode;
              const isComingSoon = module.id === 'music' || module.id === 'everyday';
              return (
                <div key={module.id} className="backdrop-blur-sm rounded-2xl p-8 hover:scale-105 transition-all duration-300 group" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}>
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-all duration-300" style={{ backgroundColor: 'var(--card-bg)' }}>
                    <span className="text-2xl" style={{ color: 'var(--accent-pop)' }}>{module.icon}</span>
                  </div>
                  <h3 className="font-['Playfair_Display'] text-2xl font-semibold mb-4" style={{ color: 'var(--text-main)' }}>{module.title}</h3>
                  <p className="mb-6" style={{ color: 'var(--text-accent)' }}>{module.description}</p>
                  {isComingSoon ? (
                    <div className="space-y-4">
                      <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: 'rgba(229, 181, 103, 0.2)', border: '1px solid var(--gold-highlight)', color: 'var(--gold-highlight)' }}>
                        Coming Soon
                      </div>
                      <div className="text-sm" style={{ color: 'var(--text-accent)' }}>
                        Interested in this topic? Let me know, and I'll prioritize it!
                      </div>
                      <button
                        onClick={scrollToComments}
                        className="w-full font-bold px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300"
                        style={{ backgroundColor: 'var(--border-subtle)', color: 'var(--text-main)', border: '1px solid var(--border-subtle)' }}
                      >
                        Vote for this module
                      </button>
                    </div>
                  ) : isLocked ? (
                    <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-accent)', opacity: 0.7 }}>
                      <span>🔒</span>
                      <span>Premium access required</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleModuleExplore(module)}
                      className="font-bold px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300"
                      style={{ backgroundColor: '#C8A064', color: '#402E24' }}
                    >
                      Explore →
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          </div>
        </div>
      </section>

      {/* Visual Separator */}
      <div className="max-w-6xl mx-auto px-6 py-8" style={{ borderTop: '1px solid var(--section-border)' }}></div>

      {/* Plans Section */}
      <section id="plans" className="max-w-6xl mx-auto px-6 py-20">
        <div className="rounded-2xl p-12 shadow-lg" style={{ backgroundColor: 'var(--plans-bg)', border: '1px solid var(--section-border)' }}>
          <div className="space-y-12">
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold" style={{ color: 'var(--text-main)' }}>
              <span style={{ color: 'var(--accent-pop)' }}>💎</span> Plans
            </h2>
            <p className="font-['Playfair_Display'] text-lg" style={{ color: 'var(--text-accent)' }}>
              Pick your path and start your journey. Whether you're just starting or looking to master the Argentine soul, we've got the perfect setup for you to level up.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
            {/* Standard Plan */}
            <div className="backdrop-blur-sm rounded-2xl p-8 transition-all duration-300" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}>
              <div className="space-y-6">
                <div>
                  <h3 className="font-['Playfair_Display'] text-3xl font-semibold mb-2" style={{ color: 'var(--text-main)' }}>Standard</h3>
                  <p style={{ color: 'var(--text-accent)' }}>Perfect for dedicated learners</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold" style={{ color: 'var(--text-main)' }}>$19.99</span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--gold-highlight)' }}>One-time payment</p>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3" style={{ color: 'var(--text-accent)' }}>
                    <span className="text-green-400">✓</span>
                    Access to all modules
                  </li>
                  <li className="flex items-center gap-3" style={{ color: 'var(--text-accent)' }}>
                    <span className="text-green-400">✓</span>
                    Priority in Community Listening module
                  </li>
                  <li className="flex items-center gap-3" style={{ color: 'var(--text-accent)' }}>
                    <span className="text-green-400">✓</span>
                    Standard plan badges
                  </li>
                  <li className="flex items-center gap-3" style={{ color: 'var(--text-accent)' }}>
                    <span className="text-green-400">✓</span>
                    Exclusive missions to unlock badges
                  </li>
                  <li className="flex items-center gap-3" style={{ color: 'var(--text-accent)' }}>
                    <span className="text-green-400">✓</span>
                    Weekly quizzes
                  </li>
                </ul>
                <button 
                  onClick={() => handleCheckout(process.env.NEXT_PUBLIC_STRIPE_STANDARD_PRICE_ID!)}
                  disabled={isProcessingCheckout}
                  className="w-full py-4 rounded-lg hover:scale-[1.02] transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-main)', border: '1px solid var(--border-subtle)' }}
                >
                  {isProcessingCheckout ? 'Processing...' : 'Get Started'}
                </button>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 relative" style={{ backgroundColor: 'var(--card-bg)', border: '2px solid #E5B567' }}>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-semibold" style={{ backgroundColor: '#E5B567', color: 'var(--bg-dark)' }}>
                Most Popular
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-['Playfair_Display'] text-3xl font-semibold mb-2" style={{ color: 'var(--text-main)' }}>Premium</h3>
                  <p style={{ color: 'var(--text-accent)' }}>For those who want it all</p>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold" style={{ color: 'var(--text-main)' }}>$39.99</span>
                  <span style={{ color: 'var(--text-accent)' }}>/month</span>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3" style={{ color: 'var(--text-accent)' }}>
                    <span className="text-green-400">✓</span>
                    Exclusive Premium badges
                  </li>
                  <li className="flex items-center gap-3" style={{ color: 'var(--text-accent)' }}>
                    <span className="text-green-400">✓</span>
                    Access to all modules
                  </li>
                  <li className="flex items-center gap-3" style={{ color: 'var(--text-accent)' }}>
                    <span className="text-green-400">✓</span>
                    Priority 1 in Community Listening module
                  </li>
                  <li className="flex items-center gap-3" style={{ color: 'var(--text-accent)' }}>
                    <span className="text-green-400">✓</span>
                    Native Vocal Coaching (audio responses)
                  </li>
                  <li className="flex items-center gap-3" style={{ color: 'var(--text-accent)' }}>
                    <span className="text-green-400">✓</span>
                    Exclusive missions & badges
                  </li>
                </ul>
                <button 
                  onClick={() => handleCheckout(process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID!)}
                  disabled={isProcessingCheckout}
                  className="w-full py-4 rounded-lg hover:scale-[1.02] transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#E5B567', color: 'var(--bg-dark)' }}
                >
                  {isProcessingCheckout ? 'Processing...' : 'Go Premium'}
                </button>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Founding Members Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="rounded-2xl p-12 shadow-2xl relative overflow-hidden" style={{ 
          backgroundColor: 'rgba(229, 181, 103, 0.05)', 
          border: '3px solid #E5B567',
          boxShadow: '0 0 30px rgba(229, 181, 103, 0.3)'
        }}>
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#E5B567] to-transparent"></div>
          
          <div className="text-center mb-10">
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>
              🏆 Founding Member Exclusive
            </h2>
            <p className="font-['Playfair_Display'] text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-accent)' }}>
              Be part of our legacy. The first members to join will receive exclusive recognition that will never be available again.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Standard Founding Member */}
            <div className="backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 hover:scale-105" style={{ 
              backgroundColor: 'var(--card-bg)', 
              border: '2px solid #E5B567',
              boxShadow: '0 4px 20px rgba(229, 181, 103, 0.2)'
            }}>
              <div className="text-center space-y-6">
                <div className="text-5xl">🥇</div>
                <h3 className="font-['Playfair_Display'] text-2xl font-bold" style={{ color: '#E5B567' }}>
                  Standard Founding Member
                </h3>
                <p className="text-lg" style={{ color: 'var(--text-accent)' }}>
                  The first person to purchase the Standard plan will receive a unique <span className="font-semibold" style={{ color: '#E5B567' }}>'1st Founding Member'</span> badge with their name and detailed logo.
                </p>
                <div className="inline-block px-4 py-2 rounded-full text-sm font-semibold" style={{ 
                  backgroundColor: 'rgba(229, 181, 103, 0.2)', 
                  border: '1px solid #E5B567',
                  color: '#E5B567'
                }}>
                  Limited to 1 person
                </div>
              </div>
            </div>

            {/* Premium Founding Member */}
            <div className="backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 hover:scale-105" style={{ 
              backgroundColor: 'var(--card-bg)', 
              border: '2px solid #E5B567',
              boxShadow: '0 4px 20px rgba(229, 181, 103, 0.2)'
            }}>
              <div className="text-center space-y-6">
                <div className="text-5xl">👑</div>
                <h3 className="font-['Playfair_Display'] text-2xl font-bold" style={{ color: '#E5B567' }}>
                  Premium Founding Member
                </h3>
                <p className="text-lg" style={{ color: 'var(--text-accent)' }}>
                  The first person to purchase Premium and maintain consistency for one month will receive a special badge with their name and official <span className="font-semibold" style={{ color: '#E5B567' }}>'Founding Member of the page'</span> status.
                </p>
                <div className="inline-block px-4 py-2 rounded-full text-sm font-semibold" style={{ 
                  backgroundColor: 'rgba(229, 181, 103, 0.2)', 
                  border: '1px solid #E5B567',
                  color: '#E5B567'
                }}>
                  Limited to 1 person
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm font-semibold" style={{ color: '#E5B567' }}>
              ⚡ Once claimed, these exclusive badges will never be available again
            </p>
          </div>
        </div>
      </section>

      {/* Global Comments Section */}
      <section id="global-comments" className="max-w-6xl mx-auto px-6 py-20">
        <div className="rounded-2xl p-12 shadow-lg" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--section-border)' }}>
          <div className="space-y-12">
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold" style={{ color: 'var(--text-main)' }}>
              <span style={{ color: 'var(--accent-pop)' }}>💬</span> Global Comments
            </h2>
            
            {canAccessComments ? (
              <div className="space-y-6">
                <div className="backdrop-blur-sm rounded-2xl p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}>
                  <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-4" style={{ color: 'var(--text-main)' }}>Share Your Thoughts</h3>
                  <textarea
                    className="w-full rounded-lg p-4 resize-none transition-all duration-300" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)', color: 'var(--text-main)' }}
                    rows={4}
                    placeholder="Join the conversation..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <div className="mt-4">
                    <Turnstile
                      siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
                      onVerify={(token) => setTurnstileToken(token)}
                    />
                  </div>
                  {rateLimitError && (
                    <p className="mt-2 text-sm" style={{ color: '#E5B567' }}>{rateLimitError}</p>
                  )}
                  <button 
                    onClick={handleCommentSubmit}
                    className="mt-4 px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-semibold" 
                    style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            ) : (
              <div className="backdrop-blur-sm rounded-2xl p-12 text-center" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}>
                <span className="text-4xl mb-4 block">🔐</span>
                <h3 className="font-['Playfair_Display'] text-2xl font-semibold mb-4" style={{ color: 'var(--text-main)' }}>
                  Join the Conversation
                </h3>
                <p className="text-lg" style={{ color: 'var(--text-accent)' }}>
                  Please sign in to join the conversation.
                </p>
                <SignInButton mode="modal">
                  <button 
                    className="mt-6 px-8 py-4 rounded-lg hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
                    style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
                  >
                    Sign In
                  </button>
                </SignInButton>
              </div>
            )}
          </div>
        </div>
      </section>



      {/* Achievements Modal */}
      {showAchievements && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
          <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl p-12 shadow-2xl" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--section-border)' }}>
            <div className="flex justify-between items-center mb-12">
              <h2 className="font-['Playfair_Display'] text-4xl font-bold" style={{ color: 'var(--text-main)' }}>
                Achievements
              </h2>
              <button 
                onClick={() => setShowAchievements(false)}
                className="text-3xl transition-colors duration-300 hover:scale-110"
                style={{ color: 'var(--text-accent)' }}
              >
                ✕
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8 badge-container">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  onClick={() => setSelectedBadge(selectedBadge === badge.id ? null : badge.id)}
                  className="backdrop-blur-sm rounded-xl p-6 cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}
                >
                  <div className="relative badge-shine">
                    <img 
                      src={badge.image} 
                      alt={badge.name} 
                      className="w-full h-auto rounded-lg filter grayscale opacity-70 badge-float badge-rotate"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="text-4xl">🔒</span>
                    </div>
                  </div>
                  <h3 className="font-semibold mt-4 text-center" style={{ color: 'var(--text-main)' }}>{badge.name}</h3>
                  <p className="text-xs text-center mt-1" style={{ color: 'var(--text-accent)' }}>{badge.plan} Plan</p>
                  
                  {selectedBadge === badge.id && (
                    <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                      <p className="text-sm font-semibold mb-2" style={{ color: 'var(--gold-highlight)' }}>
                        Requirements:
                      </p>
                      <ul className="space-y-1 text-sm" style={{ color: 'var(--text-accent)' }}>
                        {badge.requirements.map((req, idx) => (
                          <li key={idx}>• {req}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-8 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
              <h3 className="font-['Playfair_Display'] text-2xl font-semibold mb-6" style={{ color: 'var(--text-main)' }}>
                Special Events
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((event) => (
                  <div 
                    key={event}
                    className="backdrop-blur-sm rounded-xl p-6 opacity-50"
                    style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)' }}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <span className="text-4xl">🔒</span>
                      <p className="font-semibold text-center" style={{ color: 'var(--text-main)' }}>Event {event}</p>
                      <p className="text-xs text-center" style={{ color: 'var(--text-accent)' }}>Coming Next Month</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-12" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <div className="text-center space-y-4">
          <h3 className="font-['Playfair_Display'] text-2xl font-bold" style={{ color: 'var(--text-main)' }}>Mateandtalk</h3>
          <p style={{ color: 'var(--text-accent)' }}>Live the Argentine soul from the inside out</p>
          <div className="flex justify-center gap-6 pt-4">
            <Link href="/about" className="transition-colors duration-300 hover:text-[#E5B567]" style={{ color: 'var(--text-accent)' }}>About</Link>
            <Link href="/contact" className="transition-colors duration-300 hover:text-[#E5B567]" style={{ color: 'var(--text-accent)' }}>Contact</Link>
            <Link href="/privacy" className="transition-colors duration-300 hover:text-[#E5B567]" style={{ color: 'var(--text-accent)' }}>Privacy</Link>
            <Link href="/terms" className="transition-colors duration-300 hover:text-[#E5B567]" style={{ color: 'var(--text-accent)' }}>Terms</Link>
          </div>
          <p className="text-sm mt-8" style={{ color: 'var(--text-accent)' }}>© 2024 Mateandtalk. All rights reserved.</p>
        </div>
      </footer>

      {/* Premium Access Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowPremiumModal(false)}>
          <div className="backdrop-blur-sm rounded-2xl p-8 max-w-md mx-4" style={{ backgroundColor: 'var(--card-bg)', border: '2px solid #E5B567' }}>
            <div className="text-center space-y-4">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="font-['Playfair_Display'] text-2xl font-bold" style={{ color: 'var(--text-main)' }}>
                Premium Content
              </h3>
              <p className="text-lg" style={{ color: 'var(--text-accent)' }}>
                This content is exclusive to our plan members.
              </p>
              <div className="flex gap-4 justify-center pt-4">
                <Link
                  href="/"
                  onClick={() => setShowPremiumModal(false)}
                  className="px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-semibold"
                  style={{ backgroundColor: 'var(--border-subtle)', color: 'var(--text-main)' }}
                >
                  Back to Home
                </Link>
                <Link
                  href="#plans"
                  onClick={() => setShowPremiumModal(false)}
                  className="px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300 font-semibold"
                  style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
                >
                  View Plans
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
