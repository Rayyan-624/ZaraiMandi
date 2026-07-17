import { useState } from 'react';
import type { AppState } from '../App';
import { t } from '../i18n';

const ROLES = [
  { id: 'farmer', emoji: '👨‍🌾', title: 'Farmer', titleUrdu: 'کسان', desc: 'View rates, sell crops, get best deals' },
  { id: 'buyer',  emoji: '🛒',    title: 'Buyer',  titleUrdu: 'خریدار', desc: 'Buy crops, connect with farmers' },
  { id: 'rep',    emoji: '📹',    title: 'Representative', titleUrdu: 'نمائندہ', desc: 'Share market updates, earn trust' },
  { id: 'broker', emoji: '🤝',    title: 'Broker', titleUrdu: 'بروکر', desc: 'Facilitate deals, earn commission' },
];

export default function RoleScreen({ state }: { state: AppState }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="onb-screen" style={{ background: '#fff', maxWidth: 430, margin: '0 auto' }}>
      <div style={{ padding: '50px 24px 24px', textAlign: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: 20, background: 'var(--g-pale)', border: '2px solid var(--g-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 36 }}>
          👥
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: 'var(--g-dark)', fontFamily: 'Poppins' }}>{t(state.lang, 'chooseRole')}</h1>
        <p style={{ color: 'var(--text-2)', fontSize: 14, marginTop: 8 }}>{t(state.lang, 'selectUse')}</p>
      </div>

      <div style={{ padding: '0 20px 24px' }}>
        <div className="role-grid">
          {ROLES.map(r => (
            <div
              key={r.id}
              className={`role-card ${selected === r.id ? 'selected' : ''}`}
              onClick={() => setSelected(r.id)}
            >
              {selected === r.id && (
                <div style={{ position: 'absolute', top: 10, right: 10, width: 20, height: 20, borderRadius: '50%', background: 'var(--g-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="11" height="11" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
              )}
              <div className="role-icon">{r.emoji}</div>
              <div className="role-title" style={{ fontFamily: state.lang === 'en' ? 'Inter' : 'Noto Nastaliq Urdu' }}>
                {t(state.lang, r.id as any)}
              </div>
            </div>
          ))}
        </div>

        {/* Security note */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--g-pale)', borderRadius: 12, padding: '10px 14px', margin: '20px 0' }}>
          <span style={{ fontSize: 18 }}>🛡️</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--g-dark)' }}>All roles are verified and secure</div>
            <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2 }}>Your data is safe with us</div>
          </div>
        </div>

        <button
          className="btn-primary"
          style={{ opacity: selected ? 1 : 0.5 }}
          onClick={() => { if (selected) { state.setRole(selected as any); state.setFlow('otp'); } }}
        >
          {t(state.lang, 'continue')}
        </button>
      </div>
    </div>
  );
}
