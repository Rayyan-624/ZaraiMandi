import React, { useState } from 'react';

const commodities = ['Wheat / گندم','Maize / مکئی','Cotton / کپاس','Rice / چاول','Sugar / چینی','Onion / پیاز','Moong Dal / مونگ دال','Sesame / تِل'];
const locations = ['Faisalabad','Lahore','Karachi','Multan','Bahawalpur','Sukkur','Sahiwal','Okara','Larkana','Rahim Yar Khan'];
const priceTypes = ['wholesale','retail','farm-gate'];
const qualities = ['A','B','C'];

export default function RepSubmitScreen() {
  const [form, setForm] = useState({
    location:'', commodity:'', minPrice:'', maxPrice:'',
    priceType:'wholesale', quality:'A', arrivals:'', notes:'',
  });
  const [submitted, setSubmitted] = useState(false);
  const [offline] = useState(false);

  const set = (k: string, v: string) => setForm(f=>({...f,[k]:v}));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(()=>setSubmitted(false),3000);
  };

  return (
    <div>
      <div className="topbar">
        <div className="topbar-row">
          <div>
            <div style={{fontSize:18,fontWeight:800}}>📋 Submit Rate</div>
            <div className="urdu" style={{fontSize:12,opacity:0.8,marginTop:2}}>بھاؤ جمع کریں</div>
          </div>
          <div style={{background:'rgba(255,255,255,0.2)',padding:'4px 12px',borderRadius:20,fontSize:11,fontWeight:700,display:'flex',gap:6,alignItems:'center'}}>
            <span style={{width:8,height:8,borderRadius:'50%',background:offline?'#dc2626':'#4ade80',display:'inline-block'}}/>
            {offline ? 'Offline – Queued' : 'Online ✓'}
          </div>
        </div>
      </div>

      <div className="form-screen">
        {offline && (
          <div className="offline-badge">
            <span>📵</span>
            <span>Offline mode – form will auto-submit when connected / آف لائن – جڑنے پر خود بخود جمع ہوگا</span>
          </div>
        )}

        {submitted && (
          <div style={{background:'#dcfce7',border:'2px solid #16a34a',borderRadius:12,padding:'14px 16px',marginBottom:16,textAlign:'center'}}>
            <div style={{fontSize:24}}>✅</div>
            <div style={{fontWeight:700,color:'#16a34a',fontSize:15}}>Rate Submitted Successfully!</div>
            <div className="urdu" style={{color:'#15803d',fontSize:13,marginTop:4}}>بھاؤ کامیابی سے جمع ہو گیا</div>
            <div style={{fontSize:12,color:'#64748b',marginTop:4}}>Pending admin verification...</div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Location */}
          <div className="form-group">
            <label className="form-label">📍 Location / مقام</label>
            <select className="form-select" value={form.location} onChange={e=>set('location',e.target.value)} required>
              <option value="">Select district...</option>
              {locations.map(l=><option key={l} value={l}>{l}</option>)}
            </select>
          </div>

          {/* Commodity */}
          <div className="form-group">
            <label className="form-label">🌾 Commodity / فصل</label>
            <select className="form-select" value={form.commodity} onChange={e=>set('commodity',e.target.value)} required>
              <option value="">Select commodity...</option>
              {commodities.map(c=><option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Price */}
          <div className="price-row">
            <div className="form-group">
              <label className="form-label">💰 Min Price<br/><span style={{fontSize:11,color:'#64748b',fontWeight:400}}>کم سے کم قیمت (Rs)</span></label>
              <input className="form-input" type="number" placeholder="3900" value={form.minPrice} onChange={e=>set('minPrice',e.target.value)} required/>
            </div>
            <div className="form-group">
              <label className="form-label">💰 Max Price<br/><span style={{fontSize:11,color:'#64748b',fontWeight:400}}>زیادہ سے زیادہ (Rs)</span></label>
              <input className="form-input" type="number" placeholder="4100" value={form.maxPrice} onChange={e=>set('maxPrice',e.target.value)} required/>
            </div>
          </div>

          {/* Unit & Price Type */}
          <div className="price-row">
            <div className="form-group">
              <label className="form-label">⚖️ Price Type</label>
              <select className="form-select" value={form.priceType} onChange={e=>set('priceType',e.target.value)}>
                {priceTypes.map(t=><option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">⭐ Quality / معیار</label>
              <select className="form-select" value={form.quality} onChange={e=>set('quality',e.target.value)}>
                {qualities.map(q=><option key={q} value={q}>Grade {q}</option>)}
              </select>
            </div>
          </div>

          {/* Arrivals */}
          <div className="form-group">
            <label className="form-label">🚛 Arrivals (tons) / آمد (ٹن)</label>
            <input className="form-input" type="number" placeholder="e.g. 500" value={form.arrivals} onChange={e=>set('arrivals',e.target.value)}/>
          </div>

          {/* Notes */}
          <div className="form-group">
            <label className="form-label">📝 Notes / نوٹس (Optional)</label>
            <textarea className="form-input" rows={3} placeholder="Any special observations..." value={form.notes} onChange={e=>set('notes',e.target.value)} style={{resize:'none'}}/>
          </div>

          {/* Price Preview */}
          {form.minPrice && form.maxPrice && (
            <div style={{background:'#e8f5ee',borderRadius:12,padding:'14px',marginBottom:16,border:'2px solid #0d5c35'}}>
              <div style={{fontSize:12,color:'#0d5c35',fontWeight:600,marginBottom:6}}>Preview / پیش نظارہ</div>
              <div style={{fontSize:22,fontWeight:800,color:'#0d5c35'}}>
                Rs. {Number(form.minPrice).toLocaleString()} – {Number(form.maxPrice).toLocaleString()}
              </div>
              <div style={{fontSize:13,color:'#64748b',marginTop:4}}>
                {form.commodity || '—'} · {form.location || '—'} · {form.priceType} · Grade {form.quality}
              </div>
            </div>
          )}

          <button type="submit" className="btn-submit">
            {offline ? '📵 Queue for Later / بعد میں جمع کریں' : '📤 Submit Rate / بھاؤ جمع کریں'}
          </button>
        </form>

        {/* Rep info card */}
        <div style={{background:'white',borderRadius:12,padding:14,marginTop:16,border:'1px solid #e2e8f0',boxShadow:'0 2px 8px rgba(0,0,0,0.05)'}}>
          <div style={{fontSize:13,fontWeight:700,marginBottom:8}}>👤 Your Profile / آپ کی معلومات</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
            {[{l:'Rep ID',v:'ZM-REP-042'},{l:'Name',v:'Muhammad Aslam'},{l:'Zone',v:'Punjab North'},{l:'Today\'s Submissions',v:'3/5'}].map(x=>(
              <div key={x.l} style={{background:'#f8fafc',borderRadius:8,padding:'8px 10px'}}>
                <div style={{fontSize:11,color:'#64748b'}}>{x.l}</div>
                <div style={{fontSize:13,fontWeight:700,marginTop:2}}>{x.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
