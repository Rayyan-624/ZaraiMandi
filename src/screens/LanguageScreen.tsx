import { useState } from 'react';
import type { AppState } from '../App';

const LANGS = [
  { id: 'ur', flag: '🇵🇰', native: 'اردو', english: 'Urdu' },
  { id: 'en', flag: '🇬🇧', native: 'English', english: 'English' },
  { id: 'pn', flag: '🇵🇰', native: 'ਪੰਜਾਬੀ', english: 'Punjabi' },
  { id: 'sd', flag: '🇵🇰', native: 'سنڌي', english: 'Sindhi' },
  { id: 'ps', flag: '🇦🇫', native: 'پښتو', english: 'Pashto' },
];

export default function LanguageScreen({ state }: { state: AppState }) {
  const [selected, setSelected] = useState<string>(state.lang);

  return (
    <div className="onb-screen" style={{ background: '#fff', maxWidth: 430, margin: '0 auto' }}>
      {/* Top illustration */}
      <div style={{ background: 'linear-gradient(180deg, var(--g-pale) 0%, #fff 100%)', padding: '50px 24px 30px', textAlign: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: 20, background: 'var(--g-pale)', border: '2px solid var(--g-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 36 }}>
          🌐
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: 'var(--g-dark)', fontFamily: 'Poppins' }}>Choose Your Language</h1>
        <p style={{ color: 'var(--text-2)', fontSize: 14, marginTop: 8 }}>Select your preferred language to continue</p>
        <p className="urdu" style={{ color: 'var(--text-2)', fontSize: 14, marginTop: 4 }}>جاری رکھنے کے لیے زبان منتخب کریں</p>
      </div>

      {/* Language list */}
      <div style={{ padding: '0 20px 24px', flex: 1 }}>
        {LANGS.map(l => (
          <div
            key={l.id}
            className={`lang-item ${selected === l.id ? 'selected' : ''}`}
            onClick={() => setSelected(l.id)}
          >
            <div className="lang-flag">{l.flag}</div>
            <div className="lang-names">
              <div className="lang-native">{l.native}</div>
              <div className="lang-english">{l.english}</div>
            </div>
            <div className="lang-check">
              {selected === l.id && (
                <svg width="12" height="12" fill="white" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              )}
            </div>
          </div>
        ))}

        <div style={{ color: 'var(--text-3)', fontSize: 12, textAlign: 'center', margin: '12px 0 20px' }}>
          Balochi — Coming Soon
        </div>

        <button
          className="btn-primary"
          onClick={() => { state.setLang(selected as any); state.setFlow('role'); }}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
