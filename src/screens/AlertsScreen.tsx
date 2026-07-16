import React, { useState } from 'react';
import { todayRates } from '../data/prices';

interface Alert { id: string; commodity: string; commodityUrdu: string; emoji: string; target: number; direction: 'above'|'below'; active: boolean; }

const initialAlerts: Alert[] = [
  { id:'a1', commodity:'Wheat', commodityUrdu:'گندم', emoji:'🌾', target:4200, direction:'above', active:true },
  { id:'a2', commodity:'Cotton (Phutti)', commodityUrdu:'کپاس', emoji:'🌿', target:9000, direction:'above', active:true },
  { id:'a3', commodity:'Maize', commodityUrdu:'مکئی', emoji:'🌽', target:2200, direction:'below', active:false },
];

export default function AlertsScreen() {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [showAdd, setShowAdd] = useState(false);
  const [newAlert, setNewAlert] = useState({ commodity:'', emoji:'🌾', commodityUrdu:'', target:'', direction:'above' as 'above'|'below' });

  const toggle = (id: string) => setAlerts(a=>a.map(x=>x.id===id?{...x,active:!x.active}:x));
  const remove = (id: string) => setAlerts(a=>a.filter(x=>x.id!==id));

  const commodityOptions = todayRates.map(r=>({c:r.commodity,u:r.commodityUrdu,e:r.emoji,p:r.price}));

  const addAlert = () => {
    if(!newAlert.commodity||!newAlert.target) return;
    const ref = commodityOptions.find(c=>c.c===newAlert.commodity);
    setAlerts(a=>[...a,{id:Date.now().toString(),commodity:newAlert.commodity,commodityUrdu:ref?.u||'',emoji:ref?.e||'🌾',target:+newAlert.target,direction:newAlert.direction,active:true}]);
    setShowAdd(false);
    setNewAlert({commodity:'',emoji:'🌾',commodityUrdu:'',target:'',direction:'above'});
  };

  return (
    <div>
      <div className="topbar">
        <div className="topbar-row">
          <div>
            <div style={{fontSize:18,fontWeight:800}}>🔔 Price Alerts</div>
            <div className="urdu" style={{fontSize:12,opacity:0.8,marginTop:2}}>قیمت الرٹ</div>
          </div>
          <button onClick={()=>setShowAdd(s=>!s)} style={{background:'var(--gold)',border:'none',borderRadius:20,padding:'8px 14px',fontWeight:700,fontSize:13,cursor:'pointer',color:'var(--green-dark)'}}>
            + Add / شامل کریں
          </button>
        </div>
      </div>

      {/* Add alert form */}
      {showAdd && (
        <div style={{margin:'12px 16px',background:'white',borderRadius:16,padding:16,boxShadow:'0 4px 20px rgba(0,0,0,0.1)',border:'2px solid #0d5c35'}}>
          <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>➕ New Alert / نیا الرٹ</div>
          <div className="form-group">
            <label className="form-label">Commodity / فصل</label>
            <select className="form-select" value={newAlert.commodity} onChange={e=>{
              const ref=commodityOptions.find(c=>c.c===e.target.value);
              setNewAlert(n=>({...n,commodity:e.target.value,emoji:ref?.e||'🌾',commodityUrdu:ref?.u||''}));
            }}>
              <option value="">Select...</option>
              {commodityOptions.map(c=><option key={c.c} value={c.c}>{c.e} {c.c}</option>)}
            </select>
          </div>
          <div style={{display:'flex',gap:10}}>
            <div className="form-group" style={{flex:1}}>
              <label className="form-label">Direction / سمت</label>
              <select className="form-select" value={newAlert.direction} onChange={e=>setNewAlert(n=>({...n,direction:e.target.value as any}))}>
                <option value="above">↑ Above / اوپر</option>
                <option value="below">↓ Below / نیچے</option>
              </select>
            </div>
            <div className="form-group" style={{flex:1}}>
              <label className="form-label">Target Price (Rs)</label>
              <input className="form-input" type="number" placeholder="e.g. 4200" value={newAlert.target} onChange={e=>setNewAlert(n=>({...n,target:e.target.value}))}/>
            </div>
          </div>
          {newAlert.commodity && newAlert.target && (
            <div style={{background:'#e8f5ee',borderRadius:10,padding:'8px 12px',marginBottom:12,fontSize:12,color:'#0d5c35',fontWeight:600}}>
              🔔 Alert when {newAlert.commodity} goes {newAlert.direction} Rs. {Number(newAlert.target).toLocaleString()}
            </div>
          )}
          <div style={{display:'flex',gap:8}}>
            <button onClick={()=>setShowAdd(false)} style={{flex:1,padding:'10px',borderRadius:10,border:'2px solid #e2e8f0',background:'white',fontWeight:700,cursor:'pointer'}}>Cancel</button>
            <button onClick={addAlert} className="btn-submit" style={{flex:2,padding:'10px',fontSize:14}}>✅ Set Alert</button>
          </div>
        </div>
      )}

      {/* Current rates quick ref */}
      <div style={{padding:'12px 16px 4px',fontWeight:700,fontSize:13,color:'#64748b'}}>Current Prices for Reference:</div>
      <div style={{display:'flex',gap:8,padding:'0 16px',overflowX:'auto',scrollbarWidth:'none',paddingBottom:8}}>
        {todayRates.slice(0,5).map(r=>(
          <div key={r.id} style={{flexShrink:0,background:'white',borderRadius:10,padding:'8px 12px',border:'1px solid #e2e8f0',textAlign:'center',minWidth:80}}>
            <div style={{fontSize:18}}>{r.emoji}</div>
            <div style={{fontSize:11,fontWeight:700,color:'#0d5c35'}}>Rs.{r.price.toLocaleString()}</div>
            <div style={{fontSize:10,color:'#64748b'}}>{r.commodity.split(' ')[0]}</div>
          </div>
        ))}
      </div>

      {/* Alerts list */}
      <div style={{padding:'8px 16px 4px',fontWeight:700,fontSize:14}}>Your Alerts / آپ کے الرٹ</div>
      {alerts.length===0 && (
        <div style={{textAlign:'center',padding:'40px 20px',color:'#94a3b8'}}>
          <div style={{fontSize:48,marginBottom:12}}>🔕</div>
          <div style={{fontWeight:600}}>No alerts set</div>
          <div className="urdu" style={{fontSize:13,marginTop:4}}>کوئی الرٹ نہیں</div>
        </div>
      )}
      {alerts.map(alert=>{
        const current = todayRates.find(r=>r.commodity===alert.commodity);
        const triggered = current && (alert.direction==='above'?current.price>=alert.target:current.price<=alert.target);
        return (
          <div key={alert.id} style={{background:'white',borderRadius:16,padding:14,margin:'0 16px 10px',boxShadow:'0 2px 10px rgba(0,0,0,0.06)',border:`2px solid ${triggered?'#f5c518':alert.active?'#e2e8f0':'#f1f5f9'}`,opacity:alert.active?1:0.6}}>
            {triggered && (
              <div style={{background:'#fef3c7',borderRadius:8,padding:'6px 10px',marginBottom:8,fontSize:12,fontWeight:700,color:'#d97706',display:'flex',gap:6,alignItems:'center'}}>
                <span>🎯</span> Alert Triggered! Current price reached target.
              </div>
            )}
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{display:'flex',gap:10,alignItems:'center'}}>
                <div style={{width:44,height:44,borderRadius:12,background:'#e8f5ee',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22}}>{alert.emoji}</div>
                <div>
                  <div style={{fontWeight:700,fontSize:14}}>{alert.commodity}</div>
                  <div className="urdu" style={{fontSize:12,color:'#64748b'}}>{alert.commodityUrdu}</div>
                  <div style={{fontSize:12,color:alert.direction==='above'?'#16a34a':'#dc2626',fontWeight:600,marginTop:2}}>
                    {alert.direction==='above'?'↑ Above':'↓ Below'} Rs. {alert.target.toLocaleString()}
                    {current && <span style={{color:'#64748b',fontWeight:400}}> (now: {current.price.toLocaleString()})</span>}
                  </div>
                </div>
              </div>
              <div style={{display:'flex',gap:8,alignItems:'center'}}>
                <label className="alert-toggle">
                  <input type="checkbox" checked={alert.active} onChange={()=>toggle(alert.id)}/>
                  <span className="toggle-slider"/>
                </label>
                <button onClick={()=>remove(alert.id)} style={{background:'#fee2e2',border:'none',borderRadius:8,width:30,height:30,cursor:'pointer',fontSize:14,display:'flex',alignItems:'center',justifyContent:'center'}}>🗑</button>
              </div>
            </div>
          </div>
        );
      })}
      <div style={{height:20}}/>
    </div>
  );
}
