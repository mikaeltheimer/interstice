import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

function getBrowserLang() {
  if (typeof navigator === 'undefined') return 'fr';
  const lang = navigator.language || navigator.languages?.[0] || 'fr';
  return lang.toLowerCase().startsWith('fr') ? 'fr' : 'en';
}

const COPY = {
  fr: {
    title: 'À propos — Interstice',
    nav: '← Faire l\'expérience',
    heading: 'Interstice',
    sub: 'Une expérience de Studio Existence',
    body: [
      'Interstice est né d\'un désir simple : créer un lien entre deux étrangers complets, sans aucune médiation visuelle, sans profil, sans identité.',
      'Deux personnes. Un geste simultané. Un espace qui n\'existe que tant que les deux choisissent de le faire exister.',
      'Le son uniquement — parce qu\'en se voyant, on juge avant même de s\'entendre. Un visage, une silhouette, une façon de s\'habiller : autant de filtres inconscients qui colorent chaque mot avant qu\'il soit prononcé. Dans l\'interstice, il n\'y a rien de tout ça. On est dans le noir complet. Ce qu\'on perçoit de l\'autre, c\'est ce qu\'il laisse entendre — sa respiration, son silence, les sons de son espace. C\'est la forme la plus nue de la présence.',
      'Le portail se ferme dès que l\'un des deux lève le doigt. Définitivement. Ce moment ne peut pas être rejoué.',
      'Pour le saisir pleinement, il faut le vivre.',
    ],
    cta: 'Entrer dans une salle',
    footer: 'studioexistence.com',
  },
  en: {
    title: 'About — Interstice',
    nav: '← Experience it',
    heading: 'Interstice',
    sub: 'An experience by Studio Existence',
    body: [
      'Interstice was born from a simple desire: to create a connection between two complete strangers — without images, without profiles, without identity.',
      'Two people. One shared gesture. A space that exists only as long as both choose to keep it alive.',
      'Sound only — because when we see each other, we judge before we even listen. A face, a posture, a way of dressing: unconscious filters that colour every word before it\'s spoken. In the interstice, none of that exists. We\'re in complete darkness. What we perceive of the other is what they let through — their breathing, their silence, the sounds of their space. It\'s the most unguarded form of presence.',
      'The portal closes the moment either person lifts their finger. Permanently. This moment cannot be replayed.',
      'To truly understand it, you have to live it.',
    ],
    cta: 'Enter a room',
    footer: 'studioexistence.com',
  },
};

function About() {
  const [lang, setLang] = useState('fr');

  useEffect(() => { setLang(getBrowserLang()); }, []);

  // Sync lang param from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    if (urlLang === 'fr' || urlLang === 'en') setLang(urlLang);
    else setLang(getBrowserLang());
  }, []);

  const t = COPY[lang];

  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0a0f" />
      </Head>

      <div className="page">
        <div className="lang-toggle">
          <button className={`lang-btn ${lang === 'fr' ? 'active' : ''}`} onClick={() => setLang('fr')}>FR</button>
          <span className="lang-sep">·</span>
          <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
        </div>

        {/* Ambient glow — same as main screen */}
        <div className="ambient" />

        <div className="card-wrap">
          <div className="card">
            <a href={`/?lang=${lang}`} className="nav-back">{t.nav}</a>
            <h1 className="heading">{t.heading}</h1>
            <p className="card-sub">{t.sub}</p>
            <div className="divider" />
            {t.body.map((para, i) => (
              <p key={i} className={i === 2 ? 'para para-main' : 'para'}>{para}</p>
            ))}
            <a href={`/?lang=${lang}`} className="cta-link">{t.cta}</a>
          </div>
        </div>

        <div className="footer">
          <a href="https://studioexistence.com" target="_blank" rel="noopener noreferrer" className="footer-link">{t.footer}</a>
        </div>
      </div>

      <style jsx>{`
        :global(html), :global(body), :global(#__next) {
          overflow: auto !important;
          height: auto !important;
          min-height: 100%;
        }

        .page {
          min-height: 100vh;
          background: var(--room);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 5rem 1.5rem 5rem;
          position: relative;
        }

        /* Same ambient light as main screen */
        .ambient {
          position: fixed;
          inset: 0;
          background: radial-gradient(ellipse 70% 60% at 50% 50%,
            rgba(126, 184, 201, 0.13) 0%,
            rgba(126, 184, 201, 0.05) 40%,
            transparent 70%
          );
          animation: ambientPulse 4s ease-in-out infinite;
          pointer-events: none;
          z-index: 0;
        }
        @keyframes ambientPulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.06); }
        }

        .lang-toggle {
          position: fixed; top: 1.5rem; right: 1.5rem;
          display: flex; align-items: center; gap: 0.4rem; z-index: 10;
        }
        .lang-btn {
          background: none; border: none; cursor: pointer;
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: 0.85rem; letter-spacing: 0.12em;
          color: var(--link); padding: 0; transition: color 0.3s;
        }
        .lang-btn.active { color: var(--text); }
        .lang-btn:hover  { color: var(--gold); }
        .lang-sep { font-family: 'Cormorant Garamond', serif; color: var(--link); font-size: 0.85rem; opacity: 0.4; }

        .card-wrap {
          position: relative; z-index: 1;
          width: 100%; max-width: 580px;
          animation: fadeIn 1s ease;
        }

        /* White card floating on dark background */
        .card {
          background: #f5f0e8;
          border-radius: 2px;
          padding: 2.5rem 2.2rem 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
          box-shadow: 0 12px 80px rgba(0,0,0,0.6), 0 2px 16px rgba(0,0,0,0.3);
        }

        .nav-back { margin-bottom: 0.25rem; }

        .heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.2rem, 7vw, 3.2rem);
          font-weight: 300; letter-spacing: 0.2em;
          color: #1a1520; margin: 0;
        }

        .card-sub {
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: 0.85rem; letter-spacing: 0.08em;
          color: #8a7a68; margin-top: -0.75rem;
        }

        .divider { height: 1px; background: rgba(0,0,0,0.1); }

        .para {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.85rem, 2vw, 0.95rem);
          font-weight: 300; line-height: 1.9;
          color: #3a3020; margin: 0;
        }

        .para-main {
          color: #2a2015;
          border-left: 2px solid var(--gold);
          padding-left: 1.2rem;
        }

        .cta-link { margin-top: 0.5rem; align-self: flex-start; }

        .footer {
          position: relative; z-index: 1;
          margin-top: 2.5rem;
        }
        .footer-link {
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: 0.75rem; letter-spacing: 0.1em;
          color: var(--link); text-decoration: none; transition: color 0.3s;
        }
        .footer-link:hover { color: var(--gold); }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

export default dynamic(() => Promise.resolve(About), { ssr: false });
