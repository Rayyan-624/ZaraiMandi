import React, { useState } from 'react';
import { pricingPlans } from '../data/prices';

export default function SubscriptionScreen() {
  const [selected, setSelected] = useState<number|null>(null);
  const [commodityCount, setCommodityCount] = useState(1);
  const [payMethod, setPayMethod] = useState<'easypaisa'|'jazzcash'>('easypaisa');
  const [step, setStep] = useState<'plans'|'pay'|'done'>('plans');

  const plan = selected !== null ? pricingPlans[selected] : null;
  const totalPrice = plan ? plan.price * commodityCount : 0;

  return (
    <div>
      <div className="topbar">
        <div className="topbar-row">
          <div>
            <div style={{fontSize:18,fontWeight:800}}>💳 Subscribe</div>
            <div className="urdu" style={{fontSize:12,opacity:0.8,marginTop:2}}>سبسکرپشن</div>
          </div>
          <div style={{background:'rgba(255,255,255,0.2)',padding:'4px 12px',borderRadius:20,fontSize:11,fontWeight:700}}>
            {step==='plans'?'Step 1/3':step==='pay'?'Step 2/3':'Done ✓'}
          </div>
        </div>
      </div>

      {step==='done' ? (
        <div style={{padding:'40px 24px',textAlign:'center'}}>
          <div style={{fontSize:72,marginBottom:16}}>🎉</div>
          <div style={{fontSize:22,fontWeight:800,color:'#0d5c35',marginBottom:8}}>Subscribed!</div>
          <div className="urdu" style={{fontSize:16,color:'#15803d',marginBottom:16}}>سبسکرپشن مکمل ہو گئی</div>
          <div style={{background:'#e8f5ee',borderRadius:16,padding:20,marginBottom:20}}>
            <div style={{fontSize:14,color:'#64748b',marginBottom:4}}>Plan</div>
            <div style={{fontSize:18,fontWeight:800}}>{plan?.name} – Rs. {totalPrice.toLocaleString()}</div>
            <div style={{fontSize:13,color:'#64748b',marginTop:4}}>{commodityCount} commodit{commodityCount>1?'ies':'y'} · {plan?.duration}</div>
          </div>
          <div style={{background:'#fef3c7',borderRadius:12,padding:14,marginBottom:20,fontSize:13,color:'#92400e'}}>
            📲 You'll be added to your WhatsApp group(s) within 2 hours.<br/>
            <span className="urdu" style={{fontSize:12,display:'block',marginTop:4}}>آپ کو 2 گھنٹے میں واٹس ایپ گروپ میں شامل کیا جائے گا</span>
          </div>
          <button className="btn-submit" onClick={()=>setStep('plans')}>Back to Plans</button>
        </div>
      ) : step==='pay' && plan ? (
        <div style={{padding:16}}>
          <div style={{background:'#e8f5ee',borderRadius:12,padding:14,marginBottom:16,border:'2px solid #0d5c35'}}>
            <div style={{fontSize:13,fontWeight:600,color:'#64748b'}}>Selected Plan</div>
            <div style={{fontSize:20,fontWeight:800,color:'#0d5c35',marginTop:4}}>{plan.name} · {plan.duration}</div>
            <div style={{fontSize:16,fontWeight:700,marginTop:4}}>Rs. {totalPrice.toLocaleString()} for {commodityCount} commodity</div>
          </div>

          <div style={{fontWeight:700,fontSize:14,marginBottom:10}}>Choose Payment Method / ادائیگی کا طریقہ</div>

          {[
            {id:'easypaisa',label:'Easypaisa',number:'0304-8107777',color:'#00a651',emoji:'📱'},
            {id:'jazzcash',label:'JazzCash',number:'0305-8107777',color:'#b5121b',emoji:'💳'},
          ].map(m=>(
            <div key={m.id} onClick={()=>setPayMethod(m.id as any)} style={{
              background:'white',borderRadius:14,padding:'14px 16px',marginBottom:10,cursor:'pointer',
              border:`2px solid ${payMethod===m.id?m.color:'#e2e8f0'}`,
              boxShadow:payMethod===m.id?`0 0 0 4px ${m.color}22`:'none',transition:'all 0.2s',
            }}>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <div style={{width:44,height:44,borderRadius:12,background:m.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,flexShrink:0}}>{m.emoji}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:15,color:m.color}}>{m.label}</div>
                  <div style={{fontSize:13,color:'#64748b'}}>Send to: {m.number}</div>
                  <div className="urdu" style={{fontSize:11,color:'#94a3b8',marginTop:2}}>{m.id==='easypaisa'?'عبدالرفیع شوکت':'محمد غشاریب علی شوکت'}</div>
                </div>
                <div style={{width:22,height:22,borderRadius:'50%',border:`2px solid ${payMethod===m.id?m.color:'#cbd5e1'}`,background:payMethod===m.id?m.color:'white',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  {payMethod===m.id&&<span style={{color:'white',fontSize:12}}>✓</span>}
                </div>
              </div>
            </div>
          ))}

          <div style={{background:'#fef3c7',borderRadius:10,padding:'10px 12px',marginBottom:16,fontSize:12,color:'#92400e'}}>
            ℹ️ After payment, send screenshot to WhatsApp: 0304-8107777. You'll be added within 2 hrs.
          </div>

          <div style={{display:'flex',gap:10}}>
            <button onClick={()=>setStep('plans')} style={{flex:1,padding:'14px',borderRadius:12,border:'2px solid #e2e8f0',background:'white',fontWeight:700,fontSize:14,cursor:'pointer'}}>← Back</button>
            <button className="btn-submit" style={{flex:2,padding:'14px',fontSize:14}} onClick={()=>setStep('done')}>Confirm / تصدیق کریں ✓</button>
          </div>
        </div>
      ) : (
        <div>
          {/* Commodity selector */}
          <div style={{padding:'14px 16px 8px'}}>
            <div style={{fontWeight:700,fontSize:14,marginBottom:8}}>How many commodities? / کتنی اقسام؟</div>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              {[1,2,3,5,10].map(n=>(
                <button key={n} onClick={()=>setCommodityCount(n)} style={{
                  padding:'8px 16px',borderRadius:20,border:'2px solid',fontWeight:700,fontSize:14,cursor:'pointer',transition:'all 0.2s',
                  borderColor:commodityCount===n?'#0d5c35':'#e2e8f0',
                  background:commodityCount===n?'#0d5c35':'white',
                  color:commodityCount===n?'white':'#64748b',
                }}>{n}</button>
              ))}
            </div>
          </div>

          {/* Plans */}
          <div style={{padding:'8px 0'}}>
            {pricingPlans.map((plan,i)=>(
              <div key={plan.name} className={`plan-card ${plan.popular?'popular':''}`}>
                {plan.popular && <div className="popular-badge">⭐ Most Popular</div>}
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                  <div>
                    <div className="plan-name">{plan.name}</div>
                    <div className="urdu plan-duration" style={{fontFamily:'Noto Nastaliq Urdu',fontSize:13,color:'#64748b',direction:'rtl'}}>{plan.nameUrdu}</div>
                    <div className="plan-duration">{plan.duration}</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div className="plan-price">Rs. {(plan.price*commodityCount).toLocaleString()}<span> / plan</span></div>
                    <div style={{fontSize:12,color:'#64748b'}}>Rs. {plan.price.toLocaleString()} × {commodityCount}</div>
                  </div>
                </div>
                {plan.discount>0 && <div className="plan-discount">🎉 Save {plan.discount}% vs monthly</div>}
                <div className="pay-methods">
                  <span className="pay-chip">📱 Easypaisa</span>
                  <span className="pay-chip">💳 JazzCash</span>
                </div>
                <button className="btn-subscribe" onClick={()=>{setSelected(i);setStep('pay');}}>
                  {plan.popular ? '🌟 ' : ''}Subscribe / سبسکرائب کریں
                </button>
              </div>
            ))}
          </div>

          <div style={{padding:'0 16px 30px',fontSize:12,color:'#94a3b8',textAlign:'center'}}>
            📞 Need help? WhatsApp: 0304-8107777<br/>
            <span className="urdu">مدد کے لیے واٹس ایپ کریں</span>
          </div>
        </div>
      )}
    </div>
  );
}
