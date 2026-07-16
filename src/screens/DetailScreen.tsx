import { useState } from 'react';
import { todayRates } from '../data/prices';
import type { Rate } from '../data/prices';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Props { onBack: () => void; rate: Rate; }

export default function DetailScreen({ onBack, rate }: Props) {
  const [alertOn, setAlertOn] = useState(false);
  const [alertPrice, setAlertPrice] = useState(rate.price + 100);
  const [playing, setPlaying] = useState(false);
  const isUp = rate.change > 0;
  const isDown = rate.change < 0;

  const speak = () => {
    const msg = `${rate.commodity} ki aaj ki qeemat ${rate.price} rupay hai, ${rate.mandi} mein.`;
    const utter = new SpeechSynthesisUtterance(msg);
    utter.lang = 'ur-PK';
    utter.onend = () => setPlaying(false);
    setPlaying(true);
    window.speechSynthesis.speak(utter);
  };

  return (
    <div className="app-shell">
      {/* Hero */}
      <div className="detail-hero">
        <button onClick={onBack} style={{position:'absolute',left:16,top:16,background:'rgba(255,255,255,0.2)',border:'none',color:'white',width:36,height:36,borderRadius:'50%',cursor:'pointer',fontSize:18}}>←</button>
        <div style={{fontSize:36,marginBottom:8}}>{rate.emoji}</div>
        <div style={{fontSize:16,fontWeight:700,opacity:0.9}}>{rate.commodity}</div>
        <div className="urdu" style={{color:'rgba(255,255,255,0.8)',fontSize:13}}>{rate.commodityUrdu}</div>
        <div className="detail-price">Rs. {rate.price.toLocaleString()}</div>
        <div className="detail-unit">per {rate.unit}</div>
        <div className="detail-range">Min: {rate.minPrice.toLocaleString()} — Max: {rate.maxPrice.toLocaleString()}</div>
        <div style={{marginTop:12,display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'}}>
          <span style={{background:'rgba(255,255,255,0.2)',padding:'4px 12px',borderRadius:20,fontSize:12}}>📍 {rate.mandi}</span>
          <span style={{background:'rgba(255,255,255,0.2)',padding:'4px 12px',borderRadius:20,fontSize:12}}>⏰ {rate.lastUpdated}</span>
          <span className={`change-badge ${isUp?'up':isDown?'down':'neutral'}`} style={{fontSize:13}}>
            {isUp?'↑':isDown?'↓':'→'} {Math.abs(rate.change)}%
          </span>
        </div>
      </div>

      {/* Voice button */}
      <div style={{padding:'16px 16px 0'}}>
        <button className={`voice-banner`} style={{width:'100%',background:playing?'#dcfce7':'linear-gradient(90deg,#f5c518,#ffdb58)'}} onClick={speak}>
          <div className="voice-play-btn">{playing ? '⏸' : '🔊'}</div>
          <div className="voice-info">
            <div className="voice-title">{playing ? 'آڈیو چل رہا ہے...' : 'آواز سے سنیں'}</div>
            <div className="voice-subtitle">{playing ? 'Playing audio...' : 'Tap to hear the rate in Urdu'}</div>
          </div>
        </button>
      </div>

      {/* 7-day chart */}
      <div className="chart-wrap" style={{paddingTop:16}}>
        <div className="chart-card">
          <div style={{fontWeight:700,marginBottom:12,fontSize:14}}>📈 7-Day Price Trend / 7 دن کا رجحان</div>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={rate.history}>
              <XAxis dataKey="date" tick={{fontSize:10}} />
              <YAxis domain={['auto','auto']} tick={{fontSize:10}} width={55}/>
              <Tooltip formatter={(v: any) => v !== undefined && v !== null ? `Rs. ${Number(v).toLocaleString()}` : ''}/>
              <Line type="monotone" dataKey="price" stroke="#0d5c35" strokeWidth={2.5} dot={{fill:'#0d5c35',r:4}}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Compare mandis */}
      <div style={{padding:'0 16px'}}>
        <div style={{fontWeight:700,fontSize:14,marginBottom:10}}>🗺️ Compare Mandis / منڈی موازنہ</div>
        {todayRates.filter(r=>r.commodity===rate.commodity).map(r=>(
          <div key={r.id} style={{background:'white',borderRadius:12,padding:'12px 14px',marginBottom:8,display:'flex',justifyContent:'space-between',alignItems:'center',boxShadow:'0 2px 8px rgba(0,0,0,0.06)',border:`1px solid ${r.id===rate.id?'#0d5c35':'#e2e8f0'}`,fontWeight:r.id===rate.id?700:400}}>
            <div>
              <div style={{fontSize:13}}>{r.district}</div>
              <div style={{fontSize:11,color:'#64748b'}}>{r.mandi}</div>
            </div>
            <div style={{fontSize:16,fontWeight:700,color:'#0d5c35'}}>Rs. {r.price.toLocaleString()}</div>
          </div>
        ))}
      </div>

      {/* Price Alert */}
      <div style={{padding:'16px'}}>
        <div style={{background:'white',borderRadius:16,padding:16,boxShadow:'0 2px 12px rgba(0,0,0,0.08)',border:'1px solid #e2e8f0'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:alertOn?12:0}}>
            <div>
              <div style={{fontWeight:700,fontSize:14}}>🔔 Price Alert / قیمت الرٹ</div>
              <div style={{fontSize:12,color:'#64748b',marginTop:2}}>Notify me when price reaches target</div>
            </div>
            <label className="alert-toggle">
              <input type="checkbox" checked={alertOn} onChange={e=>setAlertOn(e.target.checked)}/>
              <span className="toggle-slider"/>
            </label>
          </div>
          {alertOn && (
            <div>
              <div style={{fontSize:12,fontWeight:600,marginBottom:6}}>Target Price (Rs. per {rate.unit})</div>
              <input type="number" value={alertPrice} onChange={e=>setAlertPrice(+e.target.value)}
                style={{width:'100%',padding:'10px 12px',borderRadius:10,border:'2px solid #0d5c35',fontSize:15,fontWeight:700,color:'#0d5c35',outline:'none'}}/>
              <button className="btn-submit" style={{marginTop:10,padding:12,fontSize:14}}>✅ Set Alert / الرٹ لگائیں</button>
            </div>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div style={{padding:'0 16px 20px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
        {[
          {label:'Arrivals / آمد',value:`${rate.arrivals}t`,icon:'🚛'},
          {label:'Quality / معیار',value:`Grade ${rate.quality}`,icon:'⭐'},
          {label:'Updated / اپڈیٹ',value:rate.lastUpdated,icon:'⏰'},
          {label:'District / ضلع',value:rate.district,icon:'📍'},
        ].map(s=>(
          <div key={s.label} style={{background:'white',borderRadius:12,padding:'12px 14px',boxShadow:'0 2px 8px rgba(0,0,0,0.06)',border:'1px solid #e2e8f0'}}>
            <div style={{fontSize:20,marginBottom:4}}>{s.icon}</div>
            <div style={{fontSize:15,fontWeight:700}}>{s.value}</div>
            <div style={{fontSize:10,color:'#64748b',marginTop:2}}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
