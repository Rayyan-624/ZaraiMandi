import { useState } from 'react';
import { todayRates, verticals } from '../data/prices';
import type { Rate } from '../data/prices';

interface Props { onSelectRate: (r: Rate) => void; }

export default function HomeScreen({ onSelectRate }: Props) {
  const [activeVertical, setActiveVertical] = useState('all');
  const [lang, setLang] = useState<'en'|'ur'>('en');
  const [playing, setPlaying] = useState(false);

  const filtered = activeVertical === 'all' ? todayRates : todayRates.filter(r => r.category === activeVertical);

  const speakBulletin = () => {
    window.speechSynthesis.cancel();
    const text = `Assalamu Alaikum. Zarai Mandi ki taraf se aaj ka bhaao bulletin. ` +
      todayRates.slice(0,4).map(r=>`${r.commodity} ${r.district} mein ${r.price} rupay`).join('. ') + '. Shukriya.';
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'ur-PK'; utter.rate = 0.9;
    utter.onend = () => setPlaying(false);
    setPlaying(true);
    window.speechSynthesis.speak(utter);
  };

  const stopBulletin = () => { window.speechSynthesis.cancel(); setPlaying(false); };

  return (
    <div>
      {/* Top bar */}
      <div className="topbar">
        <div className="topbar-row">
          <div className="topbar-logo">
            <span style={{fontSize:28}}>🌾</span>
            <div>
              <div className="topbar-logo-text">Zarai Mandi</div>
              <div className="topbar-logo-urdu urdu">زرعی منڈی</div>
            </div>
          </div>
          <div style={{display:'flex',gap:8,alignItems:'center'}}>
            <button className="icon-btn" style={{fontSize:12,fontWeight:700,width:'auto',padding:'0 10px',borderRadius:20}} onClick={()=>setLang(l=>l==='en'?'ur':'en')}>
              {lang==='en'?'اردو':'EN'}
            </button>
            <div style={{position:'relative'}}>
              <button className="icon-btn">🔔</button>
              <div className="badge">3</div>
            </div>
          </div>
        </div>
        <div style={{marginTop:12,fontSize:13,opacity:0.8}}>
          {lang==='en' ? '📅 Wednesday, 16 July 2026 · 100+ Markets Updated' : <span className="urdu">بدھ، 16 جولائی 2026 · 100+ منڈیاں اپڈیٹ</span>}
        </div>
      </div>

      {/* Voice Bulletin */}
      <div style={{padding:'12px 16px 0'}}>
        <div className="voice-banner" onClick={playing ? stopBulletin : speakBulletin}>
          <button className="voice-play-btn">{playing ? '⏹' : '▶'}</button>
          <div className="voice-info">
            <div className="voice-title">{playing ? (lang==='ur'?'آڈیو چل رہا ہے...':'Playing Urdu Bulletin...') : (lang==='ur'?'آج کا آواز بلیٹن':'Today\'s Voice Bulletin')}</div>
            <div className="voice-subtitle">{lang==='en' ? 'Tap to hear today\'s top rates in Urdu' : 'آج کے بھاؤ سننے کے لیے دبائیں'}</div>
          </div>
          <span style={{fontSize:22}}>🎙️</span>
        </div>
      </div>

      {/* Quick stats */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,padding:'14px 16px 4px'}}>
        {[
          {v:'100+',l:lang==='ur'?'منڈیاں':'Markets',icon:'🏪'},
          {v:'1K+',l:lang==='ur'?'صارفین':'Users',icon:'👨‍🌾'},
          {v:'125+',l:lang==='ur'?'نمائندے':'Field Reps',icon:'📍'},
        ].map(s=>(
          <div key={s.l} style={{background:'white',borderRadius:12,padding:'10px 12px',textAlign:'center',boxShadow:'0 2px 8px rgba(0,0,0,0.06)',border:'1px solid #e2e8f0'}}>
            <div style={{fontSize:18}}>{s.icon}</div>
            <div style={{fontSize:16,fontWeight:800,color:'#0d5c35'}}>{s.v}</div>
            <div style={{fontSize:10,color:'#64748b'}}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Verticals filter */}
      <div className="section-header">
        <div>
          <div className="section-title">{lang==='en'?'Categories':'اقسام'}</div>
        </div>
      </div>
      <div className="verticals-scroll">
        <div className={`vertical-chip ${activeVertical==='all'?'active':''}`} onClick={()=>setActiveVertical('all')}>
          <span className="vertical-emoji">🌏</span>
          <span className="vertical-name">{lang==='en'?'All':'سب'}</span>
        </div>
        {verticals.map(v=>(
          <div key={v.id} className={`vertical-chip ${activeVertical===v.id?'active':''}`} onClick={()=>setActiveVertical(v.id)}>
            <span className="vertical-emoji">{v.emoji}</span>
            <span className="vertical-name">{lang==='en'?v.name:v.nameUrdu}</span>
            <span className="vertical-count">{v.productCount} items</span>
          </div>
        ))}
      </div>

      {/* Rates list */}
      <div className="section-header">
        <div>
          <div className="section-title">{lang==='en'?'Today\'s Rates':'آج کے بھاؤ'}</div>
          <div style={{fontSize:11,color:'#64748b'}}>Updated 9:30 AM – 6:30 PM daily</div>
        </div>
        <button className="see-all">{lang==='en'?'Filter':'فلٹر'} ⚙️</button>
      </div>

      {filtered.map(rate => {
        const isUp = rate.change > 0, isDown = rate.change < 0;
        return (
          <div key={rate.id} className={`rate-card ${isUp?'up':isDown?'down':'neutral'}`} onClick={()=>onSelectRate(rate)}>
            <div className="rate-card-top">
              <div className="commodity-info">
                <div className="commodity-emoji">{rate.emoji}</div>
                <div>
                  <div className="commodity-name">{lang==='en'?rate.commodity:rate.commodityUrdu}</div>
                  {lang==='en' && <div className="urdu commodity-urdu">{rate.commodityUrdu}</div>}
                  <div className="mandi-name">📍 {lang==='en'?rate.mandi:rate.mandiUrdu}</div>
                </div>
              </div>
              <div className="price-block">
                <div className="price-main">Rs. {rate.price.toLocaleString()}</div>
                <div className="price-unit">per {rate.unit}</div>
                <div className="price-range">{rate.minPrice.toLocaleString()} – {rate.maxPrice.toLocaleString()}</div>
              </div>
            </div>
            <div className="rate-card-bottom">
              <div className="rate-meta">
                <span className="quality-badge">Grade {rate.quality}</span>
                <span style={{fontSize:11,color:'#64748b'}}>🚛 {rate.arrivals}t</span>
                <span style={{fontSize:11,color:'#64748b'}}>⏰ {rate.lastUpdated}</span>
              </div>
              <div style={{display:'flex',gap:6,alignItems:'center'}}>
                <div className={`change-badge ${isUp?'up':isDown?'down':'neutral'}`}>
                  {isUp?'↑':isDown?'↓':'→'} {Math.abs(rate.change)}%
                </div>
                <button className="voice-mini-btn" onClick={e=>{
                  e.stopPropagation();
                  const u=new SpeechSynthesisUtterance(`${rate.commodity} ${rate.price} rupay`);
                  u.lang='ur-PK'; window.speechSynthesis.speak(u);
                }}>🔊</button>
              </div>
            </div>
          </div>
        );
      })}

      {/* Mandi Map placeholder */}
      <div className="section-header"><div className="section-title">{lang==='en'?'Live Mandi Map':'منڈی نقشہ'}</div></div>
      <div className="map-card">
        <div className="map-img" style={{flexDirection:'column',gap:8}}>
          <span>🗺️</span>
          <span style={{fontSize:14,fontWeight:700,color:'#0d5c35'}}>Pakistan Mandi Map</span>
          <span style={{fontSize:11,color:'#64748b'}}>Tap a district to see rates</span>
        </div>
        <div className="map-legend">
          {[['#16a34a','Price Up'],['#dc2626','Price Down'],['#6b7280','No Change']].map(([c,l])=>(
            <div key={l} className="legend-item"><div className="legend-dot" style={{background:c}}/>{l}</div>
          ))}
        </div>
      </div>

      <div style={{height:20}}/>
    </div>
  );
}
