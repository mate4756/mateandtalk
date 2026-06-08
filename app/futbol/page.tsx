'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ContextMaster from './components/ContextMaster';
import StadiumVsStreet from './components/StadiumVsStreet';
import LegendsSelectionBoard from './components/LegendsSelectionBoard';
import ScaloniMemoryMatch from './components/ScaloniMemoryMatch';
import DibuMindGames from './components/DibuMindGames';
import NationalTeamTrivia from './components/NationalTeamTrivia';
import { useUser } from '@clerk/nextjs';
import { useAdminMode } from '../lib/admin';
import { useAuthVerification } from '../lib/auth';

export default function FutbolPage() {
  const [activeCheckpoint, setActiveCheckpoint] = useState<string | null>(null);
  const [checkpoint1Completed, setCheckpoint1Completed] = useState(false);
  const [checkpoint2Completed, setCheckpoint2Completed] = useState(false);
  const [showMinigames, setShowMinigames] = useState(false);
  const [completedGames, setCompletedGames] = useState<Set<string>>(new Set());
  const { user } = useUser();
  const { isAdminMode } = useAdminMode();
  const { hasPlan } = useAuthVerification();

  // Access Hierarchy: Admin > Paid User > Blocked
  const canAccessContent = isAdminMode || hasPlan;

  useEffect(() => {
    const savedCheckpoint1 = localStorage.getItem('futbol-checkpoint-1-completed');
    const savedCheckpoint2 = localStorage.getItem('futbol-checkpoint-2-completed');
    if (savedCheckpoint1 === 'true') setCheckpoint1Completed(true);
    if (savedCheckpoint2 === 'true') setCheckpoint2Completed(true);
  }, []);

  const handleCheckpoint1Complete = () => {
    setCheckpoint1Completed(true);
    localStorage.setItem('futbol-checkpoint-1-completed', 'true');
    setActiveCheckpoint(null);
  };

  const handleCheckpoint2Complete = () => {
    setCheckpoint2Completed(true);
    localStorage.setItem('futbol-checkpoint-2-completed', 'true');
    setActiveCheckpoint(null);
  };

  const handleGameComplete = (gameId: string) => {
    setCompletedGames(prev => new Set(prev).add(gameId));
  };

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--bg-dark)' }}>
      {canAccessContent ? (
        <>
          {/* Hero Section */}
          <section className="max-w-4xl mx-auto px-6 py-24 md:py-32">
            <div className="text-center space-y-8">
              <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl font-bold leading-tight" style={{ color: 'var(--text-main)' }}>
                Football as a Religion
              </h1>
              <p className="font-['Playfair_Display'] text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto" style={{ color: 'var(--text-main)' }}>
                In Argentina, football isn't a sport. It's the fabric that holds generations together, the cure for national crises, and the undeniable proof of who we are.
              </p>
              <Link href="/" className="inline-block mt-8 px-8 py-4 font-semibold rounded-lg hover:scale-105 transition-all duration-300 shadow-lg" style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}>
                Back to Home
              </Link>
            </div>
          </section>

          {/* The Philosophy of Passion Section */}
          <section className="max-w-4xl mx-auto px-6 py-20">
            <div className="space-y-16">
              <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold leading-tight" style={{ color: 'var(--text-main)' }}>
                The Philosophy of Passion
              </h2>
              
              <div className="space-y-8 text-lg leading-relaxed" style={{ color: 'var(--text-main)' }}>
                <p>
                  You land in Buenos Aires and the first thing you notice isn't the architecture or the food—it's the obsession. Football here isn't something people watch on weekends. It's something they <em>live</em> every single day. The taxi driver who picks you up from the airport? He's wearing his club's jersey. The grandmother selling empanadas on the corner? She's discussing last night's match with customers. The CEO in the high-rise? He's checking the score during meetings. Football in Argentina isn't a hobby—it's the background radiation of daily life.
                </p>

                <h3 className="font-['Playfair_Display'] text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--gold-highlight)' }}>
                  The Neighborhood Identity
                </h3>
                <p>
                  To understand Argentine football, you must first understand the neighborhood. In Buenos Aires, your club isn't chosen—it's inherited. You don't support River Plate because you like their colors. You support River Plate because your grandfather did, because your father did, because the entire family has for three generations. This isn't fandom—it's lineage. It's identity.
                </p>
                <p>
                  The neighborhood club, or <em>club de barrio</em>, is more than a sports organization. It's a community center, a social safety net, a place where generations gather. In the working-class neighborhoods of Buenos Aires, the club provided the first opportunity for upward mobility. It offered education, healthcare, and a sense of belonging that the government couldn't or wouldn't provide. When you support your club, you're supporting the history of your neighborhood. You're honoring the sacrifices of those who came before you.
                </p>
                <p>
                  This is why rivalries run so deep. When Boca Juniors plays River Plate, it's not just a match—it's the clash of two distinct identities. Boca represents the immigrant working class of La Boca, the port neighborhood where ships from Europe arrived with millions of hopeful souls. River represents the aspirational middle class of Núñez, the neighborhood that symbolized social mobility and success. The Superclásico isn't just football—it's Argentina's class struggle played out on grass.
                </p>

                <h3 className="font-['Playfair_Display'] text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--gold-highlight)' }}>
                  The Stadium as a Sanctuary
                </h3>
                <p>
                  The Argentine stadium is a sacred space. It's where the rules of the outside world don't apply. In the stands, nobody cares about your bank account, your education, or your social status. They care about your heart. The taxi driver and the CEO stand shoulder to shoulder, singing the same songs, feeling the same emotions. For 90 minutes, Argentine society achieves a momentary equality that exists nowhere else.
                </p>
                <p>
                  This is why stadiums are called <em>templos del fútbol</em>—temples of football. They're places of worship where the faithful gather to participate in a ritual that transcends the mundane. The chants aren't just songs—they're prayers. The flags aren't just decorations—they're sacred symbols. The players aren't just athletes—they're priests performing a ceremony for the congregation.
                </p>
                <p>
                  When Argentina won the World Cup in 2022, millions poured into the streets. Not just to celebrate—but because, for a moment, the country that had been through economic collapse, political corruption, and endless frustration finally had something pure to believe in. That's the power of football here. It heals. It unites. It gives a fractured nation a reason to feel whole again.
                </p>

                <h3 className="font-['Playfair_Display'] text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--gold-highlight)' }}>
                  The Political Impact
                </h3>
                <p>
                  Football and politics in Argentina are inseparable. The stadium has always been a space for political expression, a place where the powerless can find their voice. During the military dictatorship of 1976-1983, stadiums became one of the few places where people could gather without fear. The chants carried hidden messages of resistance. The flags became symbols of defiance.
                </p>
                <p>
                  The relationship between football and power is complex. Dictators used football to distract the masses. Politicians use it to gain popularity. But the people have always used football to speak truth to power. When the economy collapses and politicians fail, the stadium remains. When corruption rots the institutions, the club provides a model of honest organization. Football in Argentina is a mirror of the nation—a reflection of its hopes, its failures, its resilience.
                </p>
                <p>
                  This political dimension explains why Argentine football is so intense. It's not just a game—it's a proxy for every social conflict, every political debate, every cultural tension. When fans chant against a referee, they're often chanting against perceived injustice in society. When they celebrate a goal, they're celebrating a moment of pure joy in a country that has known too little of it.
                </p>

                <h3 className="font-['Playfair_Display'] text-3xl font-bold mt-12 mb-6" style={{ color: 'var(--gold-highlight)' }}>
                  Rituals and Superstitions
                </h3>
                <p>
                  Argentine football is steeped in ritual and superstition. Every fan has their routine: the same jersey for every match, the same seat in the stadium, the same pre-game meal. These aren't just habits—they're sacred rituals that connect the fan to something larger than themselves.
                </p>
                <p>
                  The players are equally superstitious. Diego Maradona famously wore his children's names on his boots during the 1986 World Cup. Lionel Messi touches the grass before every match. These rituals aren't silly—they're a way of imposing order on chaos, of finding control in a game that is fundamentally uncontrollable.
                </p>
                <p>
                  The most powerful ritual is the chant itself. The collective voice of thousands creates a force that feels almost supernatural. When La Bombonera shakes with the rhythm of "Bravo, Boca," it's not just sound—it's energy. It's the accumulated passion of generations, the collective memory of triumph and tragedy, the living spirit of a community that refuses to be defeated.
                </p>
                <p>
                  This is why Argentine football is unlike anything else in the world. It's not a sport—it's a religion. Not the organized religion of churches and temples, but the organic religion of the people. A religion born in the neighborhoods, practiced in the stadiums, and carried in the hearts of millions. A religion that has survived dictatorships, economic collapses, and countless disappointments. A religion that, against all odds, continues to give hope to a nation that needs it more than anything.
                </p>
              </div>

              {/* Checkpoint 1 */}
              <div className="pt-12 border-t" style={{ borderColor: 'var(--section-border)' }}>
                {checkpoint1Completed ? (
                  <div className="w-full py-4 rounded-lg flex items-center justify-center gap-3 shadow-lg" style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', border: '2px solid #22c55e' }}>
                    <span className="text-2xl">✓</span>
                    <span className="font-semibold" style={{ color: '#22c55e' }}>Completed</span>
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveCheckpoint('context')}
                    className="w-full py-4 rounded-lg hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
                    style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
                  >
                    Checkpoint: Football, Politics & Rituals
                  </button>
                )}
                {activeCheckpoint === 'context' && <ContextMaster onComplete={handleCheckpoint1Complete} />}
              </div>
            </div>
          </section>

          {/* The Anthology of Chants Section */}
          <section className="max-w-4xl mx-auto px-6 py-20">
            <div className="space-y-16">
              <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold leading-tight" style={{ color: 'var(--text-main)' }}>
                The Anthology of Chants
              </h2>
              
              <div className="space-y-12">
                <div className="space-y-6">
                  <h3 className="font-['Playfair_Display'] text-2xl font-semibold" style={{ color: 'var(--gold-highlight)' }}>
                    "Muchachos, ahora nos volvimos a ilusionar"
                  </h3>
                  <div className="space-y-4 text-lg leading-relaxed" style={{ color: 'var(--text-accent)' }}>
                    <p className="italic">
                      "Muchachos, ahora nos volvimos a ilusionar<br />
                      Quiero ser campeón, y el tercero vamos a lograr..."
                    </p>
                  </div>
                  <div className="space-y-4 text-lg leading-relaxed" style={{ color: 'var(--text-main)' }}>
                    <p>
                      This isn't just a song—it's the anthem that defined a generation. During the Qatar 2022 World Cup, "Muchachos, ahora nos volvimos a ilusionar" became the unofficial hymn of the Argentine National Team, playing in stadiums, streets, and homes across the country. It captured the collective hope of a nation that had waited 36 years for a third World Cup.
                    </p>
                    <p>
                      The story behind it is pure Argentine passion. The lyrics were adapted by Fernando Romero, a devoted fan, over the melody of "La Mosca" Tse Tse's song "Muchachos." What started as a tribute to River Plate's 2011 relegation evolved into something much larger—a song that transcended club rivalries to become a national symbol. Romero wrote it in a moment of pain, but it transformed into a celebration of resilience.
                    </p>
                    <p>
                      Why did it explode during Qatar 2022? Because it speaks to something deeper than football. The lyrics reference Diego Maradona, Lionel Messi, and "los pibes de Malvinas" (the boys of the Falklands)—touching on the collective memory of Argentina's greatest triumphs and deepest wounds. It's about remembering those who can't be here, honoring the heroes who paved the way, and believing that this time, finally, the dream will come true.
                    </p>
                    <p>
                      This song unites generations. Older fans hear echoes of 1986, of Diego's hand of God and the glory of Mexico. Younger fans see Messi's final chance, the culmination of a career that carried the weight of a nation. When it plays, grandfathers and grandchildren sing together, their voices blending into one. It's the soundtrack of Argentine resilience—the refusal to give up, the belief that after decades of heartbreak, this time will be different.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-['Playfair_Display'] text-2xl font-semibold" style={{ color: 'var(--gold-highlight)' }}>
                    "Bravo, Boca"
                  </h3>
                  <div className="space-y-4 text-lg leading-relaxed" style={{ color: 'var(--text-accent)' }}>
                    <p className="italic">
                      "Bravo, Boca, bravo, Boca, bravo, Boca, bravo..."
                    </p>
                  </div>
                  <div className="space-y-4 text-lg leading-relaxed" style={{ color: 'var(--text-main)' }}>
                    <p>
                      Simplicity that becomes collective force. This chant is the tribal recognition—the moment thousands of strangers become one entity. It's not about the words. It's about the rhythm. It's the heartbeat of La Bombonera, the stadium that literally shakes when this chant begins.
                    </p>
                    <p>
                      The origin of "Bravo, Boca" is lost to history, but its meaning is clear. It's applause. Recognition. Acknowledgment of excellence. When the crowd sings it, they're saying: we see what you're doing, and we appreciate it. It's the purest expression of the relationship between fans and players—a relationship built on mutual respect.
                    </p>
                    <p>
                      What makes this chant special is its versatility. It can be sung after a brilliant goal, after a hard-fought victory, or even after a noble defeat. It's not about winning—it's about effort, about passion, about representing the colors with honor. In Argentine football, how you play matters as much as whether you win. This chant is the reward for playing with heart.
                    </p>
                    <p>
                      The rhythm is hypnotic. The repetition creates a trance-like state where individual identities dissolve into the collective. When you're in La Bombonera and this chant begins, you feel it in your chest. The stadium literally vibrates. It's not just sound—it's physical force. It's the power of thousands of people united in a single moment of appreciation.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-['Playfair_Display'] text-2xl font-semibold" style={{ color: 'var(--gold-highlight)' }}>
                    "I'm Going to Be Champion"
                  </h3>
                  <div className="space-y-4 text-lg leading-relaxed" style={{ color: 'var(--text-accent)' }}>
                    <p className="italic">
                      "I'm going to be champion, I'm going to be champion<br />
                      With the people in the stand, we're going to be champion..."
                    </p>
                  </div>
                  <div className="space-y-4 text-lg leading-relaxed" style={{ color: 'var(--text-main)' }}>
                    <p>
                      This chant captures the unique relationship between Argentine players and their fans. In most countries, fans cheer for players. In Argentina, players play FOR fans. This chant acknowledges that truth—the team doesn't win alone. The stand is the 12th player, the invisible force that pushes when legs are heavy and hope is fading.
                    </p>
                    <p>
                      The phrase "with the people in the stand" is revolutionary. It democratizes victory. It says: this triumph belongs to everyone who believed, everyone who traveled, everyone who sang when it seemed impossible. The players are the visible face of the victory, but the fans are its soul.
                    </p>
                    <p>
                      This chant emerged from the working-class roots of Argentine football. It reflects a socialist ethos that runs deep in the culture—the idea that collective effort matters more than individual glory. When a team wins, the entire neighborhood celebrates. When a team loses, the entire neighborhood mourns. Football in Argentina is a communal experience, not an individual one.
                    </p>
                    <p>
                      The rhythm is marching, determined. It's the sound of people moving forward together. The repetition reinforces the message: we're in this together, we'll win together, or we won't win at all. It's a promise of solidarity that transcends the 90 minutes of the match. It's a way of saying: you're never alone when you wear these colors.
                    </p>
                  </div>
                </div>
              </div>

              {/* Checkpoint 2 */}
              <div className="pt-12 border-t" style={{ borderColor: 'var(--section-border)' }}>
                {checkpoint2Completed ? (
                  <div className="w-full py-4 rounded-lg flex items-center justify-center gap-3 shadow-lg" style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', border: '2px solid #22c55e' }}>
                    <span className="text-2xl">✓</span>
                    <span className="font-semibold" style={{ color: '#22c55e' }}>Completed</span>
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveCheckpoint('stadium')}
                    className="w-full py-4 rounded-lg hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
                    style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
                  >
                    Checkpoint: Anthology of Chants
                  </button>
                )}
                {activeCheckpoint === 'stadium' && <StadiumVsStreet onComplete={handleCheckpoint2Complete} />}
              </div>
            </div>
          </section>

          {/* The Dictionary of the Bleachers Section */}
          <section className="max-w-4xl mx-auto px-6 py-20">
            <div className="space-y-16">
              <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold leading-tight" style={{ color: 'var(--text-main)' }}>
                The Dictionary of the Bleachers
              </h2>
              
              <div className="space-y-12">
                <div className="space-y-4">
                  <h3 className="font-['Playfair_Display'] text-2xl font-semibold" style={{ color: 'var(--gold-highlight)' }}>
                    "Mirá que te como, hermano"
                  </h3>
                  <div className="space-y-4 text-lg leading-relaxed" style={{ color: 'var(--text-main)' }}>
                    <p>
                      This phrase became legendary during the Copa América 2021 final penalty shootout against Colombia. Emiliano "Dibu" Martínez used it as psychological warfare—standing on the line, staring down each Colombian penalty taker, and whispering this threat to break their concentration.
                    </p>
                    <p>
                      The literal translation is "Look, I'm going to eat you, brother," but the meaning is pure intimidation. The "hermano" (brother) adds a layer of Argentine irony—threatening you while acknowledging you're both part of the same football religion. Dibu's performance that night was masterful: he saved three penalties, and this phrase became the symbol of his psychological dominance.
                    </p>
                    <p>
                      Today, the phrase is part of our modern football identity. It represents the new era of Argentine football—fearless, confident, and willing to use any psychological advantage. Dibu showed the world that Argentine goalkeepers aren't just shot-stoppers; they're mental warriors who can win battles before the ball is even kicked.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-['Playfair_Display'] text-2xl font-semibold" style={{ color: 'var(--gold-highlight)' }}>
                    "Andá pa' allá, bobo"
                  </h3>
                  <div className="space-y-4 text-lg leading-relaxed" style={{ color: 'var(--text-main)' }}>
                    <p>
                      "Go over there, fool." This phrase became iconic after Lionel Messi said it in the post-match interview following Argentina's quarterfinal victory against the Netherlands in the Qatar 2022 World Cup. The game was intense, filled with controversy and heated moments, and Messi's words captured the raw emotion of that night.
                    </p>
                    <p>
                      The context matters: the Dutch team had been playing aggressively, with Wout Weghorst provoking Messi throughout the match. When a Dutch journalist asked about the tension, Messi didn't hold back. "Andá pa' allá, bobo" was his way of dismissing the provocation—telling the rival player to go away, to stop the nonsense, but using a word that's dismissive rather than hateful.
                    </p>
                    <p>
                      The word "bobo" (fool) is key. It's not the strongest insult in Argentine Spanish—that would be words much harsher. "Bobo" is dismissive but not hateful. It says: you're not evil, you're just foolish. You made a mistake, and we're calling you out on it. This reflects the Argentine attitude toward provocation—we'll respond, but we won't lose our dignity.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-['Playfair_Display'] text-2xl font-semibold" style={{ color: 'var(--gold-highlight)' }}>
                    "¡Vamos carajo!"
                  </h3>
                  <div className="space-y-4 text-lg leading-relaxed" style={{ color: 'var(--text-main)' }}>
                    <p>
                      "Let's go, damn it!" This is the roar of hope, the scream that pushes players when their legs are heavy. It's the sound of a crowd refusing to accept defeat, even when logic says the game is lost.
                    </p>
                    <p>
                      The word "carajo" is one of the most versatile in Argentine Spanish. It can be an expression of anger, surprise, emphasis, or encouragement. In this context, it's emphasis—the crowd is pouring all their energy into those two words. It's not just "let's go"—it's "LET'S GO."
                    </p>
                    <p>
                      This chant is the fuel of impossible comebacks. When a team is down 0-2 in the final minutes, when hope seems impossible, this chant begins. It's the crowd saying: we believe in you, we're with you, we won't stop believing until the final whistle. It's the sound of Argentine resilience—the refusal to give up, even when giving up would be rational.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-['Playfair_Display'] text-2xl font-semibold" style={{ color: 'var(--gold-highlight)' }}>
                    "La concha de tu madre"
                  </h3>
                  <div className="space-y-4 text-lg leading-relaxed" style={{ color: 'var(--text-main)' }}>
                    <p>
                      This is the strongest expression in Argentine Spanish, a phrase that translates to something much more vulgar than I can write here. But in the context of football, it's not just an insult—it's the ultimate expression of passion.
                    </p>
                    <p>
                      When the crowd sings this phrase, they're not being vulgar for vulgarity's sake. They're expressing an emotion so strong that polite language can't contain it. It's the sound of a moment that matters—a goal in a crucial match, a last-minute save, a victory that feels like salvation.
                    </p>
                    <p>
                      The phrase has a complex history. It emerged from the working-class neighborhoods where language was raw and unfiltered. But over time, it's been appropriated by the middle class, by the wealthy, by everyone who loves football enough to leave politeness at the stadium gate. In the stands, social class doesn't matter. What matters is passion, and sometimes passion requires words that would be unacceptable anywhere else.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Challenge: Legends Selection Board Section */}
          <section className="max-w-4xl mx-auto px-6 py-20">
            <div className="backdrop-blur-sm rounded-2xl p-12 shadow-lg" style={{ backgroundColor: 'var(--card-bg)', border: '2px solid var(--gold-highlight)' }}>
              <div className="space-y-12">
                <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold leading-tight" style={{ color: 'var(--text-main)' }}>
                  <span style={{ color: 'var(--accent-pop)' }}>🏆</span> Interactive Challenge: Legends Selection Board
                </h2>
                <p className="font-['Playfair_Display'] text-lg" style={{ color: 'var(--text-accent)' }}>
                  Test your knowledge of Argentine football legends! Drag player cards to their correct historical positions on the pitch to unlock the exclusive "Patrimonio Futbolero" achievement.
                </p>
                
                <LegendsSelectionBoard />
              </div>
            </div>
          </section>

          {/* Football Minigames Section */}
          <section className="max-w-4xl mx-auto px-6 py-20">
            <div className="backdrop-blur-sm rounded-2xl p-12 shadow-lg" style={{ backgroundColor: 'var(--card-bg)', border: '2px solid var(--gold-highlight)' }}>
              <div className="space-y-12">
                <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold leading-tight" style={{ color: 'var(--text-main)' }}>
                  <span style={{ color: 'var(--accent-pop)' }}>⚽</span> Football Minigames
                </h2>
                <p className="font-['Playfair_Display'] text-lg" style={{ color: 'var(--text-accent)' }}>
                  Test your skills with 3 interactive challenges! Master tactics, reflexes, and trivia about the Argentine national team.
                </p>
                
                {!showMinigames ? (
                  <button
                    onClick={() => setShowMinigames(true)}
                    className="w-full px-8 py-4 rounded-lg hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
                    style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
                  >
                    Start the Games
                  </button>
                ) : (
                  <div className="space-y-12">
                    {/* Game Progress */}
                    <div className="flex justify-center gap-4 text-sm" style={{ color: 'var(--text-accent)' }}>
                      <span className={completedGames.has('tactical') ? 'text-green-500 font-semibold' : ''}>
                        {completedGames.has('tactical') ? '✓' : '○'} Scaloni's Memory Match
                      </span>
                      <span className={completedGames.has('penalty') ? 'text-green-500 font-semibold' : ''}>
                        {completedGames.has('penalty') ? '✓' : '○'} Dibu's Mind Games
                      </span>
                      <span className={completedGames.has('trivia') ? 'text-green-500 font-semibold' : ''}>
                        {completedGames.has('trivia') ? '✓' : '○'} National Team Trivia
                      </span>
                    </div>

                    {/* Games Vertical Stack Layout */}
                    <div className="flex flex-col gap-y-8">
                      {/* Game 1: Scaloni's Memory Match */}
                      <div className="backdrop-blur-sm rounded-2xl p-8 w-full" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)', minHeight: '600px' }}>
                        <ScaloniMemoryMatch onComplete={() => handleGameComplete('tactical')} />
                      </div>

                      {/* Game 2: Dibu's Mind Games */}
                      <div className="backdrop-blur-sm rounded-2xl p-8 w-full" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)', minHeight: '500px' }}>
                        <DibuMindGames onComplete={() => handleGameComplete('penalty')} />
                      </div>

                      {/* Game 3: National Team Trivia */}
                      <div className="backdrop-blur-sm rounded-2xl p-8 w-full" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)', minHeight: '500px' }}>
                        <NationalTeamTrivia onComplete={() => handleGameComplete('trivia')} />
                      </div>
                    </div>

                    {/* All Games Complete Message */}
                    {completedGames.size === 3 && (
                      <div className="text-center p-6 rounded-lg" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', border: '2px solid #22c55e' }}>
                        <div className="text-4xl mb-2">🎉</div>
                        <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-2" style={{ color: '#22c55e' }}>
                          All Games Complete!
                        </h3>
                        <p className="text-lg" style={{ color: 'var(--text-accent)' }}>
                          You've mastered all 3 football challenges!
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-6">🔒</div>
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text-main)' }}>
            Premium Content
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: 'var(--text-accent)' }}>
            This content is exclusive to our plan members.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/#plans"
              className="inline-block px-8 py-4 rounded-lg hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
              style={{ backgroundColor: 'var(--gold-highlight)', color: 'var(--bg-dark)' }}
            >
              View Plans
            </Link>
            <Link 
              href="/"
              className="inline-block px-8 py-4 rounded-lg hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
              style={{ backgroundColor: 'var(--border-subtle)', color: 'var(--text-main)', border: '1px solid var(--border-subtle)' }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
