import { useState, useRef } from 'react';
import type { AppState } from '../App';

export default function OTPScreen({ state }: { state: AppState }) {
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const refs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  const handleOtpChange = (i: number, v: string) => {
    if (!/^\d*$/.test(v)) return;
    const next = [...otp]; next[i] = v.slice(-1);
    setOtp(next);
    if (v && i < 5) refs[i + 1].current?.focus();
  };

  const handleSend = () => {
    if (phone.length < 10) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep('otp'); }, 1200);
  };

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); state.setFlow('app'); }, 1000);
  };

  return (
    <div className="onb-screen" style={{ background: '#fff', maxWidth: 430, margin: '0 auto' }}>
      <div style={{ padding: '50px 24px 30px', textAlign: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: 20, background: 'var(--g-pale)', border: '2px solid var(--g-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 36 }}>
          {step === 'phone' ? '📱' : '🔐'}
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--g-dark)', fontFamily: 'Poppins' }}>
          {step === 'phone' ? 'Enter Your Phone' : 'Verify OTP'}
        </h1>
        <p style={{ color: 'var(--text-2)', fontSize: 14, marginTop: 8 }}>
          {step === 'phone' ? 'We\'ll send you a verification code' : `Code sent to +92 ${phone}`}
        </p>
      </div>

      <div style={{ padding: '0 24px 40px' }}>
        {step === 'phone' ? (
          <>
            <div className="form-label">Mobile Number</div>
            <div className="phone-input-wrap">
              <span className="phone-flag">🇵🇰</span>
              <span className="phone-code">+92</span>
              <input
                className="phone-input"
                type="tel"
                placeholder="3XX XXXXXXX"
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              />
            </div>
            <div style={{ color: 'var(--text-3)', fontSize: 12, margin: '8px 0 24px' }}>
              Works with all Pakistani networks · Easypaisa · JazzCash
            </div>
            <button className="btn-primary" onClick={handleSend} style={{ opacity: phone.length >= 10 ? 1 : 0.5 }}>
              {loading ? '...' : 'Send Code →'}
            </button>

            {/* Biometric hint */}
            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <div style={{ color: 'var(--text-3)', fontSize: 12 }}>Or use</div>
              <button style={{ border: 'none', background: 'none', color: 'var(--g-primary)', fontWeight: 600, fontSize: 14, cursor: 'pointer', marginTop: 6 }}>
                👆 Biometric Login
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="form-label" style={{ textAlign: 'center', marginBottom: 16 }}>Enter 6-digit code</div>
            <div className="otp-input-row">
              {otp.map((v, i) => (
                <input
                  key={i}
                  ref={refs[i]}
                  className="otp-box"
                  type="tel"
                  maxLength={1}
                  value={v}
                  onChange={e => handleOtpChange(i, e.target.value)}
                  onKeyDown={e => { if (e.key === 'Backspace' && !v && i > 0) refs[i - 1].current?.focus(); }}
                />
              ))}
            </div>

            <button className="btn-primary" onClick={handleVerify} style={{ marginTop: 8, opacity: otp.every(Boolean) ? 1 : 0.5 }}>
              {loading ? 'Verifying...' : 'Verify & Continue ✓'}
            </button>

            <div style={{ textAlign: 'center', marginTop: 16, color: 'var(--text-2)', fontSize: 13 }}>
              Didn't receive code?{' '}
              <button style={{ border: 'none', background: 'none', color: 'var(--g-primary)', fontWeight: 600, cursor: 'pointer' }}>
                Resend (30s)
              </button>
            </div>

            <button onClick={() => setStep('phone')} style={{ display: 'block', margin: '12px auto 0', border: 'none', background: 'none', color: 'var(--text-3)', fontSize: 13, cursor: 'pointer' }}>
              ← Change number
            </button>
          </>
        )}
      </div>
    </div>
  );
}
