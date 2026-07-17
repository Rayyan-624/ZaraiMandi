import { useState } from 'react';
import type { AppState } from '../App';

const POSTS = [
  {
    id: 1, rep: 'Khalid Representative', district: 'Multan Mandi', verified: true,
    commodity: 'Wheat (Fine Quality)', commodityUrdu: 'گندم (اچھا معیار)', emoji: '🌾',
    price: 3900, change: 120, pct: 3.17, time: 'Today 8:15 AM',
    quality: 'Fine', confidence: 98, viewers: '1.2k',
    likes: '2.4k', comments: 138, shares: 356,
    bgColor: 'linear-gradient(180deg,#0d2010 0%,#1B5E20 40%,#2d5a1e 70%,#0d1a0e 100%)',
    caption: 'آج مولتان منڈی میں گندم کا بھاؤ 3900 روپے فی 40 کلو ہے۔',
    tags: ['#wheat', '#multan', '#mandi'],
    weather: '☀️ 32°C',
  },
  {
    id: 2, rep: 'Ali Representative', district: 'Lahore Mandi', verified: true,
    commodity: 'Rice (Super Kernel)', commodityUrdu: 'چاول (سپر کرنل)', emoji: '🍚',
    price: 5200, change: 110, pct: 2.11, time: 'Today 7:50 AM',
    quality: 'Premium', confidence: 95, viewers: '890',
    likes: '1.8k', comments: 92, shares: 220,
    bgColor: 'linear-gradient(180deg,#0a1a2e 0%,#1565C0 40%,#1976D2 70%,#0a1420 100%)',
    caption: 'لاہور منڈی میں آج سپر کرنل چاول کا نیا بھاؤ آ گیا ہے۔',
    tags: ['#rice', '#lahore', '#superkernel'],
    weather: '⛅ 28°C',
  },
  {
    id: 3, rep: 'Usman Representative', district: 'Faisalabad Mandi', verified: true,
    commodity: 'Cotton (Phutti)', commodityUrdu: 'کپاس (پھٹی)', emoji: '🌿',
    price: 8100, change: -200, pct: -1.45, time: 'Today 7:30 AM',
    quality: 'A Grade', confidence: 91, viewers: '650',
    likes: '1.1k', comments: 67, shares: 145,
    bgColor: 'linear-gradient(180deg,#1a0a0a 0%,#4A1C1C 40%,#6D2626 70%,#1a0808 100%)',
    caption: 'فیصل آباد منڈی میں کپاس کا بھاؤ آج تھوڑا کم ہوا ہے۔',
    tags: ['#cotton', '#faisalabad', '#phutti'],
    weather: '🌤️ 34°C',
  },
  {
    id: 4, rep: 'Imran Representative', district: 'Sargodha Mandi', verified: false,
    commodity: 'Maize (Yellow)', commodityUrdu: 'مکئی (زرد)', emoji: '🌽',
    price: 2850, change: 80, pct: 2.89, time: 'Today 8:00 AM',
    quality: 'B Grade', confidence: 88, viewers: '420',
    likes: '780', comments: 44, shares: 98,
    bgColor: 'linear-gradient(180deg,#1a1200 0%,#5C4A00 40%,#7A6000 70%,#1a1000 100%)',
    caption: 'سرگودھا میں مکئی کی آمد اچھی ہے اور قیمت بڑھ رہی ہے۔',
    tags: ['#maize', '#sargodha', '#yellow'],
    weather: '⛅ 30°C',
  },
];

export default function MandiLiveScreen({ state }: { state: AppState }) {
  const [feedTab, setFeedTab] = useState<'following' | 'nearby' | 'foryou'>('foryou');
  const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set());
  const [playingPost, setPlayingPost] = useState<number | null>(null);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2000); };

  const speak = (post: typeof POSTS[0]) => {
    window.speechSynthesis.cancel();
    if (playingPost === post.id) { setPlayingPost(null); return; }
    const u = new SpeechSynthesisUtterance(post.caption);
    u.lang = 'ur-PK'; u.rate = 0.9;
    u.onend = () => setPlayingPost(null);
    setPlayingPost(post.id);
    window.speechSynthesis.speak(u);
  };

  const toggleSave = (id: number) => {
    setSavedPosts(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
    showToast(savedPosts.has(id) ? 'Removed from saved' : '⭐ Saved to My Rates');
  };

  return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', background: '#000', position: 'relative' }}>
      {/* TikTok-style header */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '14px 18px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
        <div className="feed-tabs" style={{ flex: 1, border: 'none', gap: 0 }}>
          {([['following', 'Following'], ['nearby', 'Nearby'], ['foryou', 'For You']] as const).map(([id, label]) => (
            <button key={id} className={`feed-tab ${feedTab === id ? 'active' : ''}`} onClick={() => setFeedTab(id)}>
              {label}
            </button>
          ))}
        </div>
        <button style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)', color: 'white', fontSize: 18, cursor: 'pointer', marginLeft: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          🔍
        </button>
      </div>

      {/* Snap scroll feed */}
      <div className="feed-container" style={{ flex: 1, marginTop: 0 }}>
        {POSTS.map(post => {
          const isUp = post.change >= 0;
          return (
            <div key={post.id} className="feed-post">
              {/* Background */}
              <div className="feed-bg" style={{ background: post.bgColor }}>
                {/* Grain texture */}
                <div style={{ position: 'absolute', inset: 0, opacity: 0.06, backgroundImage: 'repeating-linear-gradient(0deg,rgba(255,255,255,0.3) 0px,transparent 1px)', backgroundSize: '1px 4px' }} />
              </div>

              {/* Field emoji art */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.15, fontSize: 120, zIndex: 5 }}>
                {post.emoji}
              </div>

              {/* Right actions */}
              <div className="feed-right-actions" style={{ bottom: 180 }}>
                {/* Rep avatar */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>👤</div>
                  {post.verified && <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--g-mid)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: -10, border: '1.5px solid white', fontSize: 10 }}>✓</div>}
                </div>
                {/* Voice */}
                <button className="feed-action-btn" onClick={() => speak(post)}>
                  <div className="feed-action-icon" style={{ background: playingPost === post.id ? 'rgba(76,175,80,0.5)' : undefined }}>{playingPost === post.id ? '⏹️' : '🔊'}</div>
                  <span>Listen</span>
                </button>
                {/* Save */}
                <button className="feed-action-btn" onClick={() => toggleSave(post.id)}>
                  <div className="feed-action-icon" style={{ background: savedPosts.has(post.id) ? 'rgba(212,160,23,0.5)' : undefined }}>{savedPosts.has(post.id) ? '⭐' : '☆'}</div>
                  <span>{post.likes}</span>
                </button>
                {/* Ask */}
                <button className="feed-action-btn" onClick={() => showToast('💬 Feature coming soon')}>
                  <div className="feed-action-icon">❓</div>
                  <span>{post.comments}</span>
                </button>
                {/* WhatsApp share */}
                <button className="feed-action-btn" onClick={() => showToast('📤 Shared to WhatsApp')}>
                  <div className="feed-action-icon">📤</div>
                  <span>{post.shares}</span>
                </button>
              </div>

              {/* Bottom overlay */}
              <div className="feed-overlay">
                {/* Price glass card */}
                <div className="price-glass" style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 20 }}>{post.emoji}</span>
                        <div>
                          <div style={{ color: 'white', fontWeight: 700, fontSize: 15 }}>{post.commodity}</div>
                          <div className="urdu" style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12 }}>{post.commodityUrdu}</div>
                        </div>
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>📍 {post.district} · ⏰ {post.time}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: 'white', fontSize: 26, fontWeight: 900 }}>Rs. {post.price.toLocaleString()}</div>
                      <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>per 40kg</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{ background: isUp ? 'rgba(76,175,80,0.35)' : 'rgba(198,40,40,0.35)', padding: '3px 10px', borderRadius: 20, color: isUp ? '#A5D6A7' : '#EF9A9A', fontSize: 13, fontWeight: 700, border: `1px solid ${isUp ? 'rgba(76,175,80,0.4)' : 'rgba(198,40,40,0.4)'}` }}>
                        {isUp ? '↑' : '↓'} {post.pct > 0 ? '+' : ''}{post.pct}% today
                      </span>
                      <span style={{ background: 'rgba(255,255,255,0.15)', padding: '3px 10px', borderRadius: 20, color: 'rgba(255,255,255,0.9)', fontSize: 11, fontWeight: 600 }}>
                        ✓ {post.confidence}% verified
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <div className="live-dot" style={{ background: '#4CAF50' }} />
                      <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11 }}>{post.viewers} watching</span>
                    </div>
                  </div>
                </div>

                {/* Rep info */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <span style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>@{post.rep.split(' ')[0]}</span>
                      {post.verified && <span style={{ background: 'var(--g-mid)', color: 'white', fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 8 }}>✓ PAR</span>}
                    </div>
                    <div className="urdu" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 4 }}>{post.caption.slice(0, 40)}...</div>
                    <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                      {post.tags.map(t => <span key={t} style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>{t}</span>)}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={{ padding: '7px 14px', borderRadius: 20, background: 'transparent', border: '1.5px solid white', color: 'white', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                      Follow
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>
                      {post.weather}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom nav for feed */}
      <nav className="bottom-nav" style={{ position: 'relative', bottom: 'auto', background: '#000', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <button className="nav-btn" style={{ color: 'rgba(255,255,255,0.9)' }} onClick={() => state.setTab('feed' as any)}>
          <svg fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
          <span style={{ color: 'rgba(255,255,255,0.6)' }}>Feed</span>
        </button>
        <button className="nav-btn" style={{ color: 'rgba(255,255,255,0.6)' }} onClick={() => state.setTab('rates' as any)}>
          <svg fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          <span>Rates</span>
        </button>
        <button className="nav-btn-center" onClick={() => state.setTab('sell' as any)}>
          <div className="fab">
            <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.6)' }}>Sell</span>
        </button>
        <button className="nav-btn" style={{ color: 'rgba(255,255,255,0.6)' }} onClick={() => state.setTab('finance' as any)}>
          <svg fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
          <span>Finance</span>
        </button>
        <button className="nav-btn" style={{ color: 'rgba(255,255,255,0.6)' }} onClick={() => state.setTab('profile' as any)}>
          <svg fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span>Profile</span>
        </button>
      </nav>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
