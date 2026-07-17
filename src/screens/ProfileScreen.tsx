import { useState } from 'react';
import type { AppState } from '../App';

const ROLE_LABELS: Record<string, string> = { farmer: 'Farmer', buyer: 'Buyer', rep: 'Representative', broker: 'Broker' };
const ROLE_EMOJIS: Record<string, string> = { farmer: '👨‍🌾', buyer: '🛒', rep: '📹', broker: '🤝' };

const SETTINGS = [
  { icon: '🔔', label: 'Price Alerts', labelUr: 'قیمت الرٹ', hasToggle: true, on: true },
  { icon: '🌐', label: 'Language', labelUr: 'زبان', value: 'اردو' },
  { icon: '🌙', label: 'Dark Mode', labelUr: 'ڈارک موڈ', hasToggle: true, on: false },
  { icon: '📵', label: 'Offline Mode', labelUr: 'آف لائن', hasToggle: true, on: true },
  { icon: '🔊', label: 'Voice Output', labelUr: 'آواز', hasToggle: true, on: true },
  { icon: '🛡️', label: 'Privacy & Security', labelUr: 'رازداری' },
  { icon: '❓', label: 'Help & Support', labelUr: 'مدد' },
  { icon: '📤', label: 'Share App', labelUr: 'شیئر کریں' },
];

export default function ProfileScreen({ state }: { state: AppState }) {
  const [toast, setToast] = useState('');
  const [toggles, setToggles] = useState<Record<string, boolean>>({ 'Price Alerts': true, 'Dark Mode': false, 'Offline Mode': true, 'Voice Output': true });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2000); };

  const role = state.role || 'farmer';
  const roleLabel = ROLE_LABELS[role];
  const roleEmoji = ROLE_EMOJIS[role];

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Profile Header */}
      <div className="profile-header">
        <div className="avatar-ring">{roleEmoji}</div>
        <div style={{ fontWeight: 800, fontSize: 20, fontFamily: 'Poppins' }}>Muhammad Ali</div>
        <div className="urdu" style={{ fontSize: 14, opacity: 0.85, marginTop: 2 }}>محمد علی</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', marginTop: 8 }}>
          <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>{roleEmoji} {roleLabel}</span>
          <span style={{ background: 'rgba(76,175,80,0.4)', border: '1px solid rgba(76,175,80,0.6)', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>✓ Verified</span>
        </div>
        <div style={{ fontSize: 13, opacity: 0.7, marginTop: 6 }}>📍 Multan, Punjab · Member since 2024</div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 0, marginTop: 18, background: 'rgba(255,255,255,0.12)', borderRadius: 16, overflow: 'hidden' }}>
          {[
            { val: '42', lbl: 'Submissions' },
            { val: '96%', lbl: 'Accuracy' },
            { val: '2.3K', lbl: 'Followers' },
            { val: '4.8⭐', lbl: 'Trust Score' },
          ].map((s, i) => (
            <div key={s.lbl} className="stat-pill" style={{ flex: 1, padding: '12px 4px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.2)' : 'none' }}>
              <div className="val">{s.val}</div>
              <div className="lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ padding: '16px 18px', background: 'white', marginBottom: 8, borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Quick Actions</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
          {[
            { icon: '📈', label: 'My Rates' },
            { icon: '🌾', label: 'My Crops' },
            { icon: '📋', label: 'Contracts' },
            { icon: '💳', label: 'Payments' },
          ].map(a => (
            <button key={a.label} onClick={() => showToast(`Opening ${a.label}`)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '12px 6px', borderRadius: 14, background: 'var(--g-pale)', border: '1px solid var(--g-light)', cursor: 'pointer', transition: 'all 0.18s' }}>
              <span style={{ fontSize: 22 }}>{a.icon}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-2)' }}>{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Trust Score Card */}
      <div style={{ margin: '0 18px 10px' }} className="card">
        <div style={{ padding: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>🛡️ Trust Score</div>
            <div style={{ fontWeight: 800, fontSize: 18, color: 'var(--g-dark)' }}>4.8 / 5.0</div>
          </div>
          <div className="progress-bar" style={{ marginTop: 10 }}>
            <div className="progress-fill" style={{ width: '96%' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12, color: 'var(--text-2)' }}>
            <span>42 verified submissions</span>
            <span style={{ color: 'var(--g-dark)', fontWeight: 700 }}>High Trust ✓</span>
          </div>
        </div>
      </div>

      {/* Recent submissions */}
      <div style={{ background: 'white', marginBottom: 8, borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="sec-hdr">
          <div className="sec-title">Recent Submissions</div>
          <button className="sec-link">See All</button>
        </div>
        {[
          { commodity: '🌾 Wheat (Fine)', mandi: 'Multan Mandi', price: 'Rs. 3,900', time: 'Today 9:15 AM', status: 'approved' },
          { commodity: '🌿 Cotton (Phutti)', mandi: 'Bahawalpur Mandi', price: 'Rs. 8,100', time: 'Yesterday 8:30 AM', status: 'approved' },
          { commodity: '🌽 Maize (Yellow)', mandi: 'Faisalabad Mandi', price: 'Rs. 2,850', time: '2 days ago', status: 'pending' },
        ].map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 18px', borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--g-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
              {s.commodity.split(' ')[0]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{s.commodity.slice(2)}</div>
              <div style={{ fontSize: 11, color: 'var(--text-2)' }}>📍 {s.mandi} · {s.time}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{s.price}</div>
              <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 10, background: s.status === 'approved' ? '#E8F5E9' : '#FFF3E0', color: s.status === 'approved' ? 'var(--up)' : '#E65100' }}>
                {s.status === 'approved' ? '✓ Approved' : '⏳ Pending'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Settings */}
      <div style={{ background: 'white', borderTop: '1px solid var(--border)', marginBottom: 8 }}>
        <div style={{ padding: '14px 18px 8px', fontWeight: 700, fontSize: 14 }}>Settings / ترتیبات</div>
        {SETTINGS.map((s, i) => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 18px', borderBottom: i < SETTINGS.length - 1 ? '1px solid var(--border)' : 'none' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--g-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{s.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{s.label}</div>
              <div className="urdu" style={{ fontSize: 11, color: 'var(--text-3)' }}>{s.labelUr}</div>
            </div>
            {s.hasToggle ? (
              <label className="toggle-switch" onClick={e => e.preventDefault()}>
                <input type="checkbox" checked={toggles[s.label] ?? s.on} onChange={e => { setToggles(t => ({ ...t, [s.label]: e.target.checked })); showToast(`${s.label} ${e.target.checked ? 'enabled' : 'disabled'}`); }} />
                <div className="toggle-track" />
              </label>
            ) : s.value ? (
              <span style={{ fontSize: 13, color: 'var(--text-2)', fontWeight: 600 }}>{s.value}</span>
            ) : (
              <span style={{ color: 'var(--text-3)', fontSize: 18 }}>›</span>
            )}
          </div>
        ))}
      </div>

      {/* Logout */}
      <div style={{ padding: '12px 18px 80px' }}>
        <button style={{ width: '100%', padding: '14px', borderRadius: 'var(--r)', border: '2px solid #FFEBEE', background: 'white', color: 'var(--down)', fontSize: 15, fontWeight: 700, cursor: 'pointer' }} onClick={() => { showToast('Logging out...'); setTimeout(() => state.setFlow('splash'), 1500); }}>
          🚪 Logout / لاگ آؤٹ
        </button>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
