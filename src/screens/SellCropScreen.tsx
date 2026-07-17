import { useState } from 'react';

const CROPS = [
  { id: 'wheat', emoji: '🌾', name: 'Wheat', nameUr: 'گندم', price: 3900 },
  { id: 'rice', emoji: '🍚', name: 'Rice', nameUr: 'چاول', price: 5200 },
  { id: 'cotton', emoji: '🌿', name: 'Cotton', nameUr: 'کپاس', price: 8100 },
  { id: 'maize', emoji: '🌽', name: 'Maize', nameUr: 'مکئی', price: 2850 },
  { id: 'sugarcane', emoji: '🎋', name: 'Sugarcane', nameUr: 'گنا', price: 650 },
  { id: 'other', emoji: '🌱', name: 'Other', nameUr: 'دیگر', price: 0 },
];

const DISTRICTS = ['Faisalabad', 'Lahore', 'Multan', 'Bahawalpur', 'Sukkur', 'Karachi', 'Islamabad', 'Peshawar', 'Quetta', 'Hyderabad'];

export default function SellCropScreen() {
  const [step, setStep] = useState(0);
  const [crop, setCrop] = useState<string | null>(null);
  const [qty, setQty] = useState(50);
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [toast, setToast] = useState('');
  const [published, setPublished] = useState(false);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2000); };
  const STEPS = ['Crop', 'Quantity', 'Photo', 'Location', 'Publish'];
  const selectedCrop = CROPS.find(c => c.id === crop);

  if (published) {
    return (
      <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 80, marginBottom: 20 }}>🎉</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--g-dark)', fontFamily: 'Poppins', marginBottom: 8 }}>Listing Published!</div>
        <div className="urdu" style={{ fontSize: 16, color: 'var(--text-2)', marginBottom: 24 }}>آپ کی فصل منڈی میں شامل ہو گئی</div>
        <div className="card" style={{ width: '100%', padding: 20, marginBottom: 24, textAlign: 'left' }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12 }}>📋 Listing Summary</div>
          {[
            { l: 'Crop', v: `${selectedCrop?.emoji} ${selectedCrop?.name}` },
            { l: 'Quantity', v: `${qty} Bags (${qty * 40}kg)` },
            { l: 'Expected Price', v: price ? `Rs. ${Number(price).toLocaleString()} / 40kg` : `Rs. ${selectedCrop?.price?.toLocaleString()} / 40kg` },
            { l: 'Location', v: location || 'Multan Mandi' },
            { l: 'Listing ID', v: `ZM-${Date.now().toString().slice(-6)}` },
          ].map(x => (
            <div key={x.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--text-2)', fontSize: 13 }}>{x.l}</span>
              <span style={{ fontWeight: 600, fontSize: 13 }}>{x.v}</span>
            </div>
          ))}
        </div>
        <div style={{ background: 'var(--g-pale)', borderRadius: 12, padding: '12px 16px', marginBottom: 20, width: '100%', fontSize: 13, color: 'var(--g-dark)' }}>
          📲 Buyers will be notified. Check My Offers in Finance tab.
        </div>
        <button className="btn-primary" onClick={() => { setPublished(false); setStep(0); setCrop(null); setQty(50); setPrice(''); setLocation(''); }}>
          + Post Another Listing
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      {/* Header */}
      <div className="top-bar">
        <div>
          <div className="top-bar-title">🌾 Sell Your Crop</div>
          <div className="top-bar-subtitle">اپنی فصل بیچیں</div>
        </div>
      </div>

      {/* Step indicator */}
      <div style={{ padding: '16px 18px 12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--g-dark)' }}>Step {step + 1} of {STEPS.length}</span>
          <span style={{ fontSize: 12, color: 'var(--text-2)' }}>{STEPS[step]}</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
        </div>
        <div className="step-indicator" style={{ marginTop: 12 }}>
          {STEPS.map((s, i) => (
            <>
              <div key={s} className={`step-dot ${i < step ? 'done' : i === step ? 'active' : 'idle'}`}>
                {i < step ? '✓' : i + 1}
              </div>
              {i < STEPS.length - 1 && <div key={`line-${i}`} className={`step-line ${i < step ? 'done' : 'idle'}`} />}
            </>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 18px 24px' }}>
        {/* Step 0: Crop */}
        {step === 0 && (
          <div className="animate-fade-up">
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16, color: 'var(--text)' }}>Select Crop / فصل منتخب کریں</div>
            <div className="crop-grid">
              {CROPS.map(c => (
                <div key={c.id} className={`crop-cell ${crop === c.id ? 'selected' : ''}`} onClick={() => setCrop(c.id)}>
                  <div className="emoji">{c.emoji}</div>
                  <div className="name">{c.name}</div>
                  <div className="urdu" style={{ fontSize: 10, color: 'var(--text-2)' }}>{c.nameUr}</div>
                  {crop === c.id && <div style={{ position: 'absolute', top: 6, right: 6, width: 16, height: 16, borderRadius: '50%', background: 'var(--g-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="9" height="9" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>}
                </div>
              ))}
            </div>
            {selectedCrop && <div style={{ background: 'var(--g-pale)', borderRadius: 12, padding: '10px 14px', marginTop: 16, fontSize: 13, color: 'var(--g-dark)' }}>
              📊 Market rate: Rs. {selectedCrop.price.toLocaleString()} / 40kg today
            </div>}
          </div>
        )}

        {/* Step 1: Quantity */}
        {step === 1 && (
          <div className="animate-fade-up">
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8, color: 'var(--text)' }}>Quantity / مقدار</div>
            <div style={{ color: 'var(--text-2)', fontSize: 14, marginBottom: 24 }}>How many bags? (1 bag = 40kg)</div>

            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div className="qty-row" style={{ justifyContent: 'center' }}>
                <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 10))}>−</button>
                <div className="qty-display" style={{ minWidth: 100 }}>{qty}</div>
                <button className="qty-btn" onClick={() => setQty(qty + 10)}>+</button>
              </div>
              <div style={{ color: 'var(--text-2)', fontSize: 13, marginTop: 10 }}>= {qty * 40} kg total</div>
            </div>

            <div style={{ background: 'var(--g-pale)', borderRadius: 12, padding: '14px 16px', marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>Expected Price / متوقع قیمت</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-2)' }}>Rs.</span>
                <input
                  type="number"
                  className="form-field"
                  placeholder={selectedCrop?.price.toString()}
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  style={{ padding: '10px 14px', fontSize: 18, fontWeight: 700 }}
                />
                <span style={{ color: 'var(--text-2)', fontSize: 14, whiteSpace: 'nowrap' }}>/ 40kg</span>
              </div>
              {price && <div style={{ fontSize: 13, color: 'var(--g-dark)', marginTop: 8, fontWeight: 600 }}>
                Total Est: Rs. {(Number(price) * qty).toLocaleString()}
              </div>}
            </div>

            {/* Quick presets */}
            <div style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 8 }}>Quick Select:</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[10, 25, 50, 100, 200].map(n => (
                <button key={n} onClick={() => setQty(n)} style={{ padding: '6px 14px', borderRadius: 20, border: `1.5px solid ${qty===n?'var(--g-primary)':'var(--border)'}`, background: qty===n?'var(--g-pale)':'white', color: qty===n?'var(--g-dark)':'var(--text-2)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{n} bags</button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Photo */}
        {step === 2 && (
          <div className="animate-fade-up">
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Upload Photo / تصویر</div>
            <div style={{ color: 'var(--text-2)', fontSize: 14, marginBottom: 20 }}>Show buyers the quality of your crop</div>
            <div className="upload-area" onClick={() => showToast('📸 Camera feature in production')}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📷</div>
              <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--g-dark)' }}>Take Photo or Video</div>
              <div style={{ color: 'var(--text-2)', fontSize: 13, marginTop: 6 }}>Tap to open camera</div>
              <div className="urdu" style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4 }}>تصویر یا ویڈیو بنائیں</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '16px 0' }}>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              <span style={{ color: 'var(--text-3)', fontSize: 12 }}>or</span>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            </div>
            <button className="btn-outline" style={{ width: '100%' }} onClick={() => showToast('📁 Gallery opened')}>
              📁 Choose from Gallery
            </button>
            <button style={{ width: '100%', marginTop: 12, padding: '12px', borderRadius: 'var(--r)', border: 'none', background: 'var(--g-pale)', color: 'var(--text-2)', fontSize: 14, cursor: 'pointer', fontWeight: 600 }} onClick={() => setStep(3)}>
              Skip (Optional) →
            </button>
          </div>
        )}

        {/* Step 3: Location */}
        {step === 3 && (
          <div className="animate-fade-up">
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Pickup Location / مقام</div>
            <div style={{ color: 'var(--text-2)', fontSize: 14, marginBottom: 20 }}>Where can buyers pick up the crop?</div>

            <div style={{ marginBottom: 16 }}>
              <label className="form-label">District / ضلع</label>
              <select className="form-field" value={location} onChange={e => setLocation(e.target.value)}>
                <option value="">Select district...</option>
                {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="form-label">Mandi / منڈی (Optional)</label>
              <input className="form-field" placeholder="e.g. Multan Grain Market" />
            </div>

            <button style={{ width: '100%', padding: '14px', borderRadius: 'var(--r)', border: '2px dashed var(--g-primary)', background: 'var(--g-pale)', color: 'var(--g-dark)', fontSize: 14, cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }} onClick={() => { setLocation('Current Location'); showToast('📍 Location detected: Multan'); }}>
              📍 Use My Current Location
            </button>
          </div>
        )}

        {/* Step 4: Preview & Publish */}
        {step === 4 && (
          <div className="animate-fade-up">
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}>Preview & Publish / پیش نظارہ</div>
            <div className="card" style={{ padding: 16, marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div style={{ width: 54, height: 54, borderRadius: 14, background: 'var(--g-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>{selectedCrop?.emoji}</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 17 }}>{selectedCrop?.name}</div>
                  <div className="urdu" style={{ fontSize: 13, color: 'var(--text-2)' }}>{selectedCrop?.nameUr}</div>
                  <div className="verified-badge" style={{ marginTop: 4 }}>✓ Verified Farmer</div>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--g-dark)' }}>Rs. {price || selectedCrop?.price?.toLocaleString()}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-2)' }}>per 40kg</div>
                </div>
              </div>
              {[
                { l: '📦 Quantity', v: `${qty} Bags (${qty * 40}kg)` },
                { l: '📍 Location', v: location || 'Not specified' },
                { l: '💰 Total Est.', v: `Rs. ${((Number(price) || selectedCrop?.price || 0) * qty).toLocaleString()}` },
                { l: '📅 Posted', v: 'Today, ' + new Date().toLocaleDateString('en-PK') },
              ].map(x => (
                <div key={x.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderTop: '1px solid var(--border)', fontSize: 13 }}>
                  <span style={{ color: 'var(--text-2)' }}>{x.l}</span>
                  <span style={{ fontWeight: 700 }}>{x.v}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#FFF8E7', borderRadius: 12, padding: '10px 14px', marginBottom: 20, fontSize: 13, color: '#5D4037' }}>
              🛡️ Bay' al-Salam Contract · Riba-Free · Shariah Compliant
            </div>
            <button className="btn-primary" onClick={() => setPublished(true)}>
              📤 Publish Listing / شائع کریں
            </button>
          </div>
        )}

        {/* Navigation buttons */}
        <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="btn-outline" style={{ flex: 1 }}>
              ← Back
            </button>
          )}
          {step < 4 && (
            <button className="btn-primary" style={{ flex: 2, opacity: (step === 0 && !crop) || (step === 3 && !location) ? 0.5 : 1 }}
              onClick={() => {
                if (step === 0 && !crop) { showToast('Please select a crop'); return; }
                if (step === 3 && !location) { showToast('Please select a location'); return; }
                setStep(step + 1);
              }}>
              Next →
            </button>
          )}
        </div>
      </div>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
