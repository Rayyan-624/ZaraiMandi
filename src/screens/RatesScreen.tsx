import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { todayRates } from '../data/prices';

const STORIES = [
  { emoji: '🌾', name: 'Wheat', viewed: false },
  { emoji: '🍚', name: 'Rice', viewed: false },
  { emoji: '🌿', name: 'Cotton', viewed: true },
  { emoji: '🌽', name: 'Maize', viewed: false },
  { emoji: '🍬', name: 'Sugar', viewed: true },
  { emoji: '🧅', name: 'Onion', viewed: false },
  { emoji: '🫘', name: 'Pulses', viewed: false },
];

const LIVE_MANDIS = [
  { name: 'Lahore Mandi', viewers: '1.2k' },
  { name: 'Multan Mandi', viewers: '890' },
  { name: 'Karachi Mandi', viewers: '650' },
];

export default function RatesScreen() {
  const [activeStory, setActiveStory] = useState<string | null>(null);
  const [detail, setDetail] = useState<typeof todayRates[0] | null>(null);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2000); };

  const speak = (r: typeof todayRates[0]) => {
    const u = new SpeechSynthesisUtterance(`${r.commodity} ${r.district} mein ${r.price} rupay`);
    u.lang = 'ur-PK'; window.speechSynthesis.speak(u);
  };

  if (detail) {
    const isUp = detail.change > 0;
    return (
      <div style={{ background: '#fff', minHeight: '100vh' }}>
        <div className="nav-header">
          <button className="nav-back" onClick={() => setDetail(null)}>←</button>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>{detail.commodity}</div>
            <div style={{ fontSize: 11, color: 'var(--text-2)' }}>{detail.mandi}</div>
          </div>
          <button style={{ marginLeft: 'auto', background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }} onClick={() => showToast('❤️ Added to watchlist')}>🤍</button>
        </div>

        {/* Hero price banner */}
        <div style={{ background: 'linear-gradient(135deg, var(--g-dark), var(--g-primary))', padding: '24px 20px 20px', textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{detail.emoji}</div>
          <div style={{ fontSize: 42, fontWeight: 900 }}>Rs. {detail.price.toLocaleString()}</div>
          <div style={{ opacity: 0.8, fontSize: 14 }}>per {detail.unit}</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 12 }}>
            <span style={{ background: isUp ? 'rgba(76,175,80,0.3)' : 'rgba(198,40,40,0.3)', padding: '4px 14px', borderRadius: 20, fontWeight: 700, fontSize: 14, border: `1px solid ${isUp ? 'rgba(76,175,80,0.5)' : 'rgba(198,40,40,0.5)'}` }}>
              {isUp ? '↑ +' : '↓ '}{Math.abs(detail.change)}%
            </span>
            <span style={{ background: 'rgba(212,160,23,0.3)', padding: '4px 14px', borderRadius: 20, fontWeight: 700, fontSize: 13, border: '1px solid rgba(212,160,23,0.4)' }}>
              ✓ Grade {detail.quality}
            </span>
          </div>
        </div>

        {/* Time tabs */}
        <div style={{ display: 'flex', padding: '12px 18px', gap: 8 }}>
          {['1D','7D','1M','3M','1Y'].map((t, i) => (
            <button key={t} style={{ flex: 1, padding: '7px 0', borderRadius: 10, border: `2px solid ${i===1 ? 'var(--g-primary)' : 'var(--border)'}`, background: i===1 ? 'var(--g-pale)' : 'transparent', color: i===1 ? 'var(--g-dark)' : 'var(--text-2)', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>{t}</button>
          ))}
        </div>

        {/* Chart */}
        <div style={{ padding: '0 18px 16px' }}>
          <div className="card" style={{ padding: '16px 12px 10px' }}>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={detail.history}>
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis domain={['auto', 'auto']} tick={{ fontSize: 10 }} width={55} />
                <Tooltip formatter={(v: any) => v != null ? `Rs. ${Number(v).toLocaleString()}` : ''} />
                <Line type="monotone" dataKey="price" stroke="var(--g-primary)" strokeWidth={2.5} dot={{ fill: 'var(--g-primary)', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Price Forecast */}
        <div style={{ padding: '0 18px 16px' }}>
          <div className="card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 20 }}>🤖</span>
              <div style={{ fontWeight: 700, fontSize: 15 }}>AI Price Forecast</div>
              <span style={{ marginLeft: 'auto', background: 'var(--g-pale)', color: 'var(--g-dark)', padding: '2px 10px', borderRadius: 12, fontSize: 12, fontWeight: 700 }}>82% Confidence</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { label: 'Today', price: detail.price, note: 'Current', bg: 'var(--g-pale)' },
                { label: 'Tomorrow', price: detail.price + 120, note: '↑ 3.08%', bg: '#FFF8E7' },
              ].map(f => (
                <div key={f.label} style={{ background: f.bg, borderRadius: 12, padding: '12px 14px' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-2)', fontWeight: 600 }}>{f.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--g-dark)', marginTop: 4 }}>Rs. {f.price.toLocaleString()}</div>
                  <div style={{ fontSize: 12, color: f.label === 'Tomorrow' ? 'var(--up)' : 'var(--text-2)', fontWeight: 600, marginTop: 2 }}>{f.note}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, fontSize: 12, color: 'var(--text-2)', background: '#F8FAF8', borderRadius: 10, padding: '8px 12px' }}>
              💡 Lower supply, higher demand, and weather conditions indicate an increase. <span style={{ color: 'var(--text-3)' }}>AI prediction — not guaranteed.</span>
            </div>
          </div>
        </div>

        {/* Market Info */}
        <div style={{ padding: '0 18px 16px' }}>
          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Market Info</div>
            {[
              { l: 'Market', v: detail.mandi },
              { l: 'Last Updated', v: `Today ${detail.lastUpdated}` },
              { l: 'Quality', v: `Grade ${detail.quality}` },
              { l: 'Moisture', v: '12%' },
              { l: 'Arrivals', v: `${detail.arrivals} Tons` },
            ].map(x => (
              <div key={x.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--text-2)', fontSize: 13 }}>{x.l}</span>
                <span style={{ fontWeight: 600, fontSize: 13 }}>{x.v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Voice */}
        <div style={{ padding: '0 18px 30px' }}>
          <button className="btn-primary" onClick={() => speak(detail)}>
            🔊 Listen in Urdu / آواز میں سنیں
          </button>
        </div>
        {toast && <div className="toast">{toast}</div>}
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Header */}
      <div className="top-bar">
        <div>
          <div className="top-bar-title">📊 Mandi Rates</div>
          <div className="top-bar-subtitle">منڈی بھاؤ · Updated 9:30 AM</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="icon-circle" onClick={() => showToast('⚙️ Filters coming soon')}>⚙️</button>
          <button className="icon-circle" onClick={() => showToast('📥 PDF downloaded')}>📥</button>
        </div>
      </div>

      {/* Stories */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)' }}>
        <div style={{ padding: '12px 18px 4px', fontWeight: 700, fontSize: 13, color: 'var(--text-2)' }}>Today's Updates</div>
        <div className="stories-row">
          {STORIES.map(s => (
            <div key={s.name} className="story-item" onClick={() => setActiveStory(s.name)}>
              <div className={`story-ring ${s.viewed ? 'viewed' : ''} ${activeStory === s.name ? 'viewed' : ''}`}>
                <div className="inner">{s.emoji}</div>
              </div>
              <div className="story-label">{s.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Mandi */}
      <div style={{ background: 'white', margin: '8px 0 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="sec-hdr">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className="live-badge"><div className="live-dot" />LIVE</div>
            <div className="sec-title">Live Mandi</div>
          </div>
          <button className="sec-link">See All</button>
        </div>
        <div className="scroll-x" style={{ padding: '0 18px 12px' }}>
          {LIVE_MANDIS.map(m => (
            <div key={m.name} style={{ background: 'var(--g-pale)', borderRadius: 'var(--r)', padding: '10px 14px', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10, border: '1px solid var(--g-light)', minWidth: 160 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--g-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🏪</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{m.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-2)' }}>👁️ {m.viewers} watching</div>
              </div>
              <button className="btn-sm btn-green" style={{ marginLeft: 'auto' }} onClick={() => showToast(`📺 Opening ${m.name} live...`)}>Watch</button>
            </div>
          ))}
        </div>
      </div>

      {/* Commodity list */}
      <div style={{ background: 'white', marginTop: 8 }}>
        <div className="sec-hdr">
          <div className="sec-title">Top Commodities</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['All', 'Punjab', 'Sindh'].map((f, i) => (
              <button key={f} style={{ padding: '4px 12px', borderRadius: 20, border: `1.5px solid ${i===0 ? 'var(--g-primary)' : 'var(--border)'}`, background: i===0 ? 'var(--g-pale)' : 'transparent', color: i===0 ? 'var(--g-dark)' : 'var(--text-2)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>{f}</button>
            ))}
          </div>
        </div>
        <div>
          {todayRates.map(rate => {
            const isUp = rate.change > 0, isDown = rate.change < 0;
            return (
              <div key={rate.id} className="rate-card-item" onClick={() => setDetail(rate)}>
                <div className="rate-emoji-wrap">{rate.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div className="rate-commodity">{rate.commodity}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span className="rate-location">📍 {rate.district}</span>
                    {rate.quality === 'A' && <span className="verified-badge">✓ Verified</span>}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="rate-price">Rs. {rate.price.toLocaleString()}</div>
                  <div className="rate-unit">per {rate.unit}</div>
                  <span className={isUp ? 'badge-up' : isDown ? 'badge-down' : 'badge-neutral'} style={{ marginTop: 4, display: 'inline-flex' }}>
                    {isUp ? '↑ +' : isDown ? '↓ ' : '→ '}{Math.abs(rate.change)}%
                  </span>
                </div>
                <button style={{ marginLeft: 8, background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: 'var(--text-3)' }} onClick={e => { e.stopPropagation(); speak(rate); }}>🔊</button>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ height: 20 }} />
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
