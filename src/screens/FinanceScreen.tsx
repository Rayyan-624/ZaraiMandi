import { useState } from 'react';

const CONTRACTS = [
  { id: 'ZM-SL-250622-001', commodity: 'Wheat (Fine Quality)', buyer: 'Al-Falah Traders', quantity: '100 Bags (40kg each)', total: 390000, advance: 117000, delivery: '30 May 2025', status: 'active', progress: 65 },
  { id: 'ZM-SL-250520-002', commodity: 'Rice (Super Basmati)', buyer: 'Awan Rice Mills', quantity: '50 Bags (40kg each)', total: 260000, advance: 78000, delivery: '24 Jun 2025', status: 'pending', progress: 20 },
  { id: 'ZM-SL-250410-003', commodity: 'Maize (Yellow)', buyer: 'Hassan Traders', quantity: '200 Bags', total: 570000, advance: 171000, delivery: '10 Apr 2025', status: 'completed', progress: 100 },
];

const OFFERS = [
  { buyer: 'Al-Falah Traders', price: 3950, qty: 50, total: 197500, delivery: '30 May 2025', verified: true },
  { buyer: 'Awan Rice Mills', price: 3900, qty: 100, total: 390000, delivery: '28 May 2025', verified: true },
  { buyer: 'Hassan Traders', price: 3880, qty: 75, total: 291000, delivery: '31 May 2025', verified: false },
];

const TRACKING_STEPS = ['Contract', 'Payment', 'Production', 'In Transit', 'Delivered'];

export default function FinanceScreen() {
  const [activeTab, setActiveTab] = useState<'contracts' | 'offers' | 'wallet' | 'tracking'>('contracts');
  const [toast, setToast] = useState('');
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, var(--g-dark), var(--g-primary))', padding: '20px 18px 24px', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>🕌 Islamic Finance · Riba-Free</div>
            <div style={{ fontWeight: 800, fontSize: 20, fontFamily: 'Poppins' }}>Finance & Contracts</div>
            <div className="urdu" style={{ fontSize: 13, opacity: 0.8, marginTop: 2 }}>سالم معاہدے اور ادائیگی</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: '8px 14px', textAlign: 'center' }}>
            <div style={{ fontSize: 11, opacity: 0.8 }}>Wallet</div>
            <div style={{ fontWeight: 800, fontSize: 16, marginTop: 2 }}>Rs. 117K</div>
          </div>
        </div>

        {/* Wallet card */}
        <div className="wallet-card" style={{ margin: '16px 0 0' }}>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 4 }}>Escrow Balance (Meezan Bank)</div>
            <div style={{ fontSize: 34, fontWeight: 900, marginBottom: 4 }}>Rs. 1,17,000</div>
            <div style={{ fontSize: 12, opacity: 0.75 }}>Advance · Contract ZM-SL-250622-001</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button style={{ flex: 1, padding: '9px', borderRadius: 10, background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', fontWeight: 700, fontSize: 13, cursor: 'pointer' }} onClick={() => showToast('📲 Withdraw to Easypaisa')}>
                📲 Withdraw
              </button>
              <button style={{ flex: 1, padding: '9px', borderRadius: 10, background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', fontWeight: 700, fontSize: 13, cursor: 'pointer' }} onClick={() => showToast('📜 Transaction history')}>
                📜 History
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', background: 'white', borderBottom: '2px solid var(--border)' }}>
        {([['contracts', '📋 Contracts'], ['offers', '💬 Offers'], ['wallet', '💰 Wallet'], ['tracking', '🚛 Tracking']] as const).map(([id, label]) => (
          <button key={id} onClick={() => setActiveTab(id)} style={{ flex: 1, padding: '12px 4px', border: 'none', background: 'none', fontSize: 12, fontWeight: 700, color: activeTab === id ? 'var(--g-dark)' : 'var(--text-3)', borderBottom: activeTab === id ? '2.5px solid var(--g-primary)' : '2.5px solid transparent', cursor: 'pointer', transition: 'all 0.2s', marginBottom: -2 }}>{label}</button>
        ))}
      </div>

      {/* ── Contracts ── */}
      {activeTab === 'contracts' && (
        <div style={{ padding: '12px 0' }}>
          <div style={{ padding: '4px 18px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: 700 }}>Salam Contracts · بیع السلم</div>
            <button className="btn-sm btn-green" onClick={() => showToast('📝 New contract form')}>+ New</button>
          </div>
          {CONTRACTS.map(c => {
            const statusColor = c.status === 'completed' ? 'var(--up)' : c.status === 'active' ? 'var(--g-primary)' : '#E65100';
            return (
              <div key={c.id} className="card" style={{ margin: '0 18px 12px', padding: 16, cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{c.commodity}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2 }}>🤝 {c.buyer}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>#{c.id}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ background: `${statusColor}22`, color: statusColor, padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                      {c.status === 'completed' ? '✓ Done' : c.status === 'active' ? '⚡ Active' : '⏳ Pending'}
                    </span>
                    <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--g-dark)', marginTop: 6 }}>Rs. {c.total.toLocaleString()}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-2)' }}>📅 {c.delivery}</div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-2)', marginBottom: 4 }}>
                    <span>{c.quantity}</span>
                    <span>Advance: Rs. {c.advance.toLocaleString()}</span>
                  </div>
                  <div className="progress-bar"><div className="progress-fill" style={{ width: `${c.progress}%` }} /></div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 3, textAlign: 'right' }}>{c.progress}% complete</div>
                </div>
              </div>
            );
          })}
          <div style={{ padding: '8px 18px 24px' }}>
            <div style={{ background: '#FFF8E7', borderRadius: 12, padding: '12px 16px', fontSize: 13, color: '#5D4037' }}>
              🕌 <strong>Bay' al-Salam</strong>: Advance payment for future delivery. Shariah-compliant. No interest (riba).
              <br /><span style={{ color: 'var(--text-3)', fontSize: 11, marginTop: 4, display: 'block' }}>Islamic Banking Partner: Meezan Bank</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Offers ── */}
      {activeTab === 'offers' && (
        <div style={{ padding: '12px 0' }}>
          <div style={{ padding: '4px 18px 12px' }}>
            <div style={{ fontWeight: 700 }}>Buyer Offers · خریداروں کی پیشکش</div>
            <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2 }}>Wheat (Fine Quality) · 100 Bags · Multan Mandi</div>
          </div>
          {OFFERS.map((o, i) => (
            <div key={i} className="card" style={{ margin: '0 18px 12px', padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: 'var(--g-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🏢</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{o.buyer}</div>
                    {o.verified && <span className="verified-badge" style={{ marginTop: 2, display: 'inline-flex' }}>✓ Verified NTN</span>}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 19, fontWeight: 800, color: 'var(--g-dark)' }}>Rs. {o.price.toLocaleString()}/40kg</div>
                  <div style={{ fontSize: 11, color: 'var(--text-2)' }}>Total: Rs. {o.total.toLocaleString()}</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-2)', marginBottom: 12 }}>
                <span>📦 {o.qty} Bags</span>
                <span>📅 {o.delivery}</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn-sm btn-green" style={{ flex: 1, padding: '10px' }} onClick={() => showToast('✅ Offer Accepted! Escrow initiated.')}>Accept</button>
                <button className="btn-sm" style={{ flex: 1, padding: '10px', background: 'var(--g-pale)', color: 'var(--g-dark)', border: '1px solid var(--g-light)' }} onClick={() => showToast('💬 Counter offer sent')}>Counter</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Wallet ── */}
      {activeTab === 'wallet' && (
        <div style={{ padding: '16px 18px' }}>
          {[
            { date: 'Today', items: [{ desc: 'Advance received – Al-Falah Traders', amount: '+Rs. 117,000', type: 'credit' }, { desc: 'Platform fee (1.5%)', amount: '-Rs. 2,925', type: 'debit' }] },
            { date: 'Yesterday', items: [{ desc: 'Withdrawal to Easypaisa', amount: '-Rs. 50,000', type: 'debit' }] },
            { date: '15 May', items: [{ desc: 'Contract payment – Hassan Traders', amount: '+Rs. 171,000', type: 'credit' }] },
          ].map(g => (
            <div key={g.date} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', marginBottom: 8 }}>{g.date}</div>
              {g.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'white', borderRadius: 12, marginBottom: 6, border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{item.desc}</div>
                  <div style={{ fontWeight: 800, fontSize: 15, color: item.type === 'credit' ? 'var(--up)' : 'var(--down)', whiteSpace: 'nowrap', marginLeft: 8 }}>{item.amount}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* ── Tracking ── */}
      {activeTab === 'tracking' && (
        <div style={{ padding: '12px 18px' }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>🚛 Delivery Tracking</div>
          <div className="card" style={{ padding: 16, marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <div>
                <div style={{ fontWeight: 700 }}>Wheat (Fine Quality)</div>
                <div style={{ fontSize: 12, color: 'var(--text-2)' }}>Khalid Farms · Multan Mandi</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>50 Bags · ZM-SL-250622-001</div>
              </div>
              <span style={{ background: 'var(--g-pale)', color: 'var(--g-dark)', padding: '3px 10px', borderRadius: 12, fontWeight: 700, fontSize: 12, whiteSpace: 'nowrap' }}>In Transit 🚛</span>
            </div>

            {/* Step tracker */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14, overflowX: 'auto' }}>
              {TRACKING_STEPS.map((s, i) => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: i < 3 ? 'var(--g-primary)' : i === 3 ? 'var(--gold)' : 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: i <= 3 ? 'white' : 'var(--text-3)', fontWeight: 700, flexShrink: 0, border: i === 3 ? '3px solid var(--gold)' : 'none' }}>
                      {i < 3 ? '✓' : i === 3 ? '🚛' : i + 1}
                    </div>
                    <div style={{ fontSize: 9, color: i <= 3 ? 'var(--g-dark)' : 'var(--text-3)', fontWeight: i === 3 ? 700 : 400, marginTop: 4, textAlign: 'center', width: 50 }}>{s}</div>
                  </div>
                  {i < TRACKING_STEPS.length - 1 && (
                    <div style={{ height: 2, background: i < 3 ? 'var(--g-primary)' : 'var(--border)', flex: 1, maxWidth: 24, flexShrink: 0, marginTop: -14 }} />
                  )}
                </div>
              ))}
            </div>

            {[
              { l: '👤 Driver', v: 'Ahmed Raza' },
              { l: '🚗 Vehicle', v: 'LHR-1234' },
              { l: '📍 From', v: 'Multan Mandi' },
              { l: '🏢 To', v: 'Al-Falah Warehouse, Lahore' },
              { l: '⏰ ETA', v: '24 May 2025, 10:30 AM' },
            ].map(x => (
              <div key={x.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid var(--border)', fontSize: 12 }}>
                <span style={{ color: 'var(--text-2)' }}>{x.l}</span>
                <span style={{ fontWeight: 600 }}>{x.v}</span>
              </div>
            ))}
            <button className="btn-primary" style={{ marginTop: 14 }} onClick={() => showToast('📍 Live map tracking opened')}>
              📍 Track Live
            </button>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
