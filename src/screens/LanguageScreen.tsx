import { useState } from 'react';
import type { AppState } from '../App';

const LANGS = [
  { id: 'en', code: 'EN', native: 'English', english: 'English' },
  { id: 'ur', code: 'اردو', native: 'اردو', english: 'Urdu' },
  { id: 'pn', code: 'پ', native: 'پنجابی', english: 'Punjabi' },
  { id: 'sd', code: 'سن', native: 'سنڌي', english: 'Sindhi' },
  { id: 'ps', code: 'پ', native: 'پښتو', english: 'Pashto' },
  { id: 'bl', code: 'ب', native: 'بلوچی', english: 'Balochi' },
  { id: 'sr', code: 'سن', native: 'سرائیکی', english: 'Saraiki' },
];

export default function LanguageScreen({ state }: { state: AppState }) {
  const [selected, setSelected] = useState<string>(state.lang || 'pn');

  return (
    <div className="onb-screen" style={{ background: '#fff', maxWidth: 430, margin: '0 auto' }}>
      {/* Top Header */}
      <div style={{ padding: '30px 24px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--g-dark)', fontFamily: 'Poppins' }}>Choose Language</h1>
        <p style={{ color: 'var(--text-2)', fontSize: 13, marginTop: 4 }}>Select your preferred language</p>
      </div>

      {/* Language list */}
      <div style={{ padding: '0', flex: 1, overflowY: 'auto' }}>
        {LANGS.map(l => {
          const isSelected = selected === l.id;
          return (
            <div
              key={l.id}
              onClick={() => setSelected(l.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '16px 24px',
                borderBottom: '1px solid var(--border)',
                cursor: 'pointer',
                background: isSelected ? '#F4FBF5' : 'transparent',
              }}
            >
              {/* Circular Avatar / Badge */}
              <div style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                border: isSelected ? 'none' : '1.5px solid #2E7D32',
                background: isSelected ? '#5B9F65' : '#E8F5E9',
                color: isSelected ? 'white' : '#1B5E20',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                fontWeight: 700,
                marginRight: 16,
                fontFamily: l.code === 'EN' ? 'Inter' : 'Noto Nastaliq Urdu',
              }}>
                {l.code}
              </div>

              {/* Text */}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#1B5E20', fontFamily: l.id === 'en' ? 'Inter' : 'Noto Nastaliq Urdu' }}>
                  {l.native}
                </div>
                <div style={{ fontSize: 13, color: '#9E9E9E', marginTop: 2, fontWeight: 500 }}>
                  {l.english}
                </div>
              </div>
            </div>
          );
        })}

        <div style={{ padding: '24px' }}>
          <button
            className="btn-primary"
            onClick={() => { state.setLang(selected as any); state.setFlow('role'); }}
            style={{ width: '100%', padding: '16px', fontSize: 16, borderRadius: '12px' }}
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}
