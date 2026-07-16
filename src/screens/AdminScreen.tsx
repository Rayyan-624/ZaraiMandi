import React, { useState } from 'react';
import { pendingSubmissions } from '../data/prices';
import type { RepSubmission } from '../data/prices';

export default function AdminScreen() {
  const [subs, setSubs] = useState(pendingSubmissions);
  const [filter, setFilter] = useState<'all'|'pending'|'flagged'>('all');
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(()=>setToast(''),2500); };

  const updateStatus = (id: string, status: RepSubmission['status']) => {
    setSubs(s => s.map(x => x.id===id ? {...x,status} : x));
    const msgs: Record<string,string> = { approved:'✅ Rate Approved & Published', rejected:'❌ Rate Rejected', flagged:'⚠️ Flagged for Review' };
    showToast(msgs[status]||'');
  };

  const filtered = filter==='all' ? subs : subs.filter(s=>s.status===filter);
  const pendingCount = subs.filter(s=>s.status==='pending').length;
  const flaggedCount = subs.filter(s=>s.status==='flagged').length;

  return (
    <div>
      {/* Header */}
      <div className="topbar">
        <div className="topbar-row">
          <div>
            <div style={{fontSize:18,fontWeight:800}}>⚙️ Admin Panel</div>
            <div className="urdu" style={{fontSize:12,opacity:0.8,marginTop:2}}>ایڈمن پینل</div>
          </div>
          <div style={{display:'flex',gap:8}}>
            <div style={{background:'rgba(255,255,255,0.2)',padding:'4px 12px',borderRadius:20,fontSize:12,fontWeight:700}}>
              {pendingCount} Pending
            </div>
            {flaggedCount>0&&<div style={{background:'#dc2626',padding:'4px 12px',borderRadius:20,fontSize:12,fontWeight:700}}>
              ⚠️ {flaggedCount} Flagged
            </div>}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,padding:'14px 16px 4px'}}>
        {[
          {v:subs.filter(s=>s.status==='approved').length,l:'Approved',c:'#16a34a',icon:'✅'},
          {v:pendingCount,l:'Pending',c:'#d97706',icon:'⏳'},
          {v:flaggedCount,l:'Flagged',c:'#dc2626',icon:'⚠️'},
        ].map(s=>(
          <div key={s.l} style={{background:'white',borderRadius:12,padding:'12px',textAlign:'center',boxShadow:'0 2px 8px rgba(0,0,0,0.06)',border:`2px solid ${s.c}22`}}>
            <div style={{fontSize:18}}>{s.icon}</div>
            <div style={{fontSize:20,fontWeight:800,color:s.c}}>{s.v}</div>
            <div style={{fontSize:11,color:'#64748b'}}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div style={{display:'flex',gap:8,padding:'12px 16px'}}>
        {(['all','pending','flagged'] as const).map(f=>(
          <button key={f} onClick={()=>setFilter(f)} style={{
            flex:1,padding:'8px',borderRadius:10,border:'2px solid',
            borderColor:filter===f?'#0d5c35':'#e2e8f0',
            background:filter===f?'#0d5c35':'white',
            color:filter===f?'white':'#64748b',
            fontWeight:700,fontSize:12,cursor:'pointer',transition:'all 0.2s',
          }}>{f.charAt(0).toUpperCase()+f.slice(1)}</button>
        ))}
      </div>

      {/* Submission cards */}
      {filtered.map(sub => (
        <div key={sub.id} className={`submission-card ${sub.isAnomaly?'anomaly':''}`}>
          {sub.isAnomaly && (
            <div className="anomaly-banner">
              <span style={{fontSize:18}}>🚨</span>
              <div>
                <div style={{fontWeight:700,fontSize:12,color:'#991b1b'}}>Anomaly Detected / غیر معمولی قیمت</div>
                <div className="anomaly-text">{sub.anomalyReason}</div>
              </div>
            </div>
          )}

          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}}>
            <div>
              <div style={{fontWeight:700,fontSize:15}}>{sub.commodity}</div>
              <div style={{fontSize:12,color:'#64748b',marginTop:2}}>👤 {sub.rep} · 📍 {sub.location}</div>
              <div style={{fontSize:12,color:'#64748b'}}>⏰ {sub.timestamp} · {sub.priceType.toUpperCase()}</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontSize:18,fontWeight:800,color:sub.isAnomaly?'#dc2626':'#0d5c35'}}>
                Rs. {sub.priceMin.toLocaleString()} – {sub.priceMax.toLocaleString()}
              </div>
              <div style={{fontSize:11,color:'#64748b'}}>per {sub.unit} · Grade {sub.quality}</div>
            </div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:6,marginBottom:10}}>
            {[
              {l:'Arrivals',v:`${sub.arrivals}t`},
              {l:'Quality',v:`Grade ${sub.quality}`},
              {l:'Type',v:sub.priceType},
            ].map(x=>(
              <div key={x.l} style={{background:'#f8fafc',borderRadius:8,padding:'6px 8px',textAlign:'center'}}>
                <div style={{fontSize:12,fontWeight:700}}>{x.v}</div>
                <div style={{fontSize:10,color:'#64748b'}}>{x.l}</div>
              </div>
            ))}
          </div>

          {sub.status==='pending'||sub.status==='flagged' ? (
            <div className="action-row">
              <button className="btn btn-approve" onClick={()=>updateStatus(sub.id,'approved')}>✅ Approve</button>
              <button className="btn btn-flag" onClick={()=>updateStatus(sub.id,'flagged')}>⚠️ Flag</button>
              <button className="btn btn-reject" onClick={()=>updateStatus(sub.id,'rejected')}>❌ Reject</button>
            </div>
          ) : (
            <div style={{textAlign:'center',padding:'8px',borderRadius:10,fontWeight:700,fontSize:13,
              background:sub.status==='approved'?'#dcfce7':sub.status==='rejected'?'#fee2e2':'#fef3c7',
              color:sub.status==='approved'?'#16a34a':sub.status==='rejected'?'#dc2626':'#d97706'}}>
              {sub.status==='approved'?'✅ Approved & Published':sub.status==='rejected'?'❌ Rejected':'⚠️ Flagged'}
            </div>
          )}
        </div>
      ))}

      {/* Toast */}
      {toast && (
        <div style={{position:'fixed',bottom:90,left:'50%',transform:'translateX(-50%)',
          background:'#0d5c35',color:'white',padding:'12px 20px',borderRadius:30,
          fontWeight:700,fontSize:13,boxShadow:'0 4px 20px rgba(0,0,0,0.2)',zIndex:999,
          animation:'fadeIn 0.3s'}}>
          {toast}
        </div>
      )}
      <div style={{height:20}}/>
    </div>
  );
}
