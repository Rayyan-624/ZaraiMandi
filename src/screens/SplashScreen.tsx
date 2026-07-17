export default function SplashScreen() {
  return (
    <div style={{ width: '100%', maxWidth: 430, margin: '0 auto', height: '100dvh', overflow: 'hidden' }}>
      <div className="splash-bg">
        {/* Field illustration using CSS art */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', overflow: 'hidden', opacity: 0.3 }}>
          {/* Layered hills */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: 'linear-gradient(180deg, #2E7D32, #1B5E20)', borderRadius: '50% 50% 0 0 / 30% 30% 0 0' }} />
          <div style={{ position: 'absolute', bottom: 0, left: '-10%', right: '-10%', height: '40%', background: 'linear-gradient(180deg, #388E3C, #2E7D32)', borderRadius: '50% 50% 0 0 / 20% 20% 0 0', transform: 'translateY(10px)' }} />
          {/* Sun/moon glow */}
          <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 80, height: 80, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,160,23,0.8), transparent 70%)' }} />
        </div>

        {/* Logo & Title */}
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 5, marginTop: 30 }}>
          <div style={{ width: 80, height: 80, borderRadius: 24, background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', backdropFilter: 'blur(10px)', fontSize: 40 }}>
            🌾
          </div>
          <div className="splash-title">ZARAI MANDI</div>
          <div className="urdu" style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16, marginTop: 6, fontFamily: 'Noto Nastaliq Urdu' }}>
            آپ کی منڈی، آپ کا فائدہ
          </div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 4 }}>
            Pakistan's Smart Agricultural Marketplace
          </div>
        </div>

        {/* Feature Pills */}
        <div className="splash-features" style={{ position: 'relative', zIndex: 5 }}>
          {[
            { icon: '📈', label: 'Live Rates' },
            { icon: '🤖', label: 'AI Insights' },
            { icon: '🕌', label: 'Riba-Free Finance' },
            { icon: '🤝', label: 'Trusted Network' },
          ].map(f => (
            <div key={f.label} className="splash-pill">
              <span>{f.icon}</span>
              <span>{f.label}</span>
            </div>
          ))}
        </div>

        {/* Loading */}
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 5 }}>
          <div className="splash-loader" style={{ justifyContent: 'center', marginBottom: 10 }}>
            <div className="dot-loader" />
            <div className="dot-loader" />
            <div className="dot-loader" />
          </div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Loading...</div>
        </div>
      </div>
    </div>
  );
}
