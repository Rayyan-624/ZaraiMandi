import { useEffect, useState } from 'react';

type AppFlow = 'splash' | 'language' | 'role' | 'otp' | 'app';
type AppTab = 'feed' | 'rates' | 'sell' | 'finance' | 'profile';
type UserRole = 'farmer' | 'buyer' | 'rep' | 'broker' | null;
type Lang = 'ur' | 'en' | 'pn' | 'sd' | 'ps';

export interface AppState {
  flow: AppFlow;
  tab: AppTab;
  role: UserRole;
  lang: Lang;
  setFlow: (f: AppFlow) => void;
  setTab: (t: AppTab) => void;
  setRole: (r: UserRole) => void;
  setLang: (l: Lang) => void;
}

import './index.css';
import SplashScreen from './screens/SplashScreen';
import LanguageScreen from './screens/LanguageScreen';
import RoleScreen from './screens/RoleScreen';
import OTPScreen from './screens/OTPScreen';
import MandiLiveScreen from './screens/MandiLiveScreen';
import RatesScreen from './screens/RatesScreen';
import SellCropScreen from './screens/SellCropScreen';
import FinanceScreen from './screens/FinanceScreen';
import ProfileScreen from './screens/ProfileScreen';

export default function App() {
  const [flow, setFlow] = useState<AppFlow>('splash');
  const [tab, setTab] = useState<AppTab>('feed');
  const [role, setRole] = useState<UserRole>(null);
  const [lang, setLang] = useState<Lang>('ur');

  const state: AppState = { flow, tab, role, lang, setFlow, setTab, setRole, setLang };

  // Splash auto-advance after 2.8s
  useEffect(() => {
    if (flow === 'splash') {
      const t = setTimeout(() => setFlow('language'), 2800);
      return () => clearTimeout(t);
    }
  }, [flow]);

  if (flow === 'splash')   return <SplashScreen />;
  if (flow === 'language') return <LanguageScreen state={state} />;
  if (flow === 'role')     return <RoleScreen state={state} />;
  if (flow === 'otp')      return <OTPScreen state={state} />;

  // Main App — feed has its own full-screen layout with built-in bottom nav
  if (tab === 'feed') {
    return (
      <div style={{ width: '100%', maxWidth: 430, height: '100dvh', margin: '0 auto', overflow: 'hidden', position: 'relative' }}>
        <MandiLiveScreen state={state} />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="screen-scroll">
        {tab === 'rates'   && <RatesScreen />}
        {tab === 'sell'    && <SellCropScreen />}
        {tab === 'finance' && <FinanceScreen />}
        {tab === 'profile' && <ProfileScreen state={state} />}
      </div>

      <nav className="bottom-nav">
        <button className="nav-btn" onClick={() => setTab('feed')}>
          <svg fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span>Feed</span>
        </button>
        <button className={`nav-btn ${tab === 'rates' ? 'active' : ''}`} onClick={() => setTab('rates')}>
          <svg fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          <span>Rates</span>
        </button>
        <button className="nav-btn-center" onClick={() => setTab('sell')}>
          <div className="fab">
            <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </div>
          <span>Sell</span>
        </button>
        <button className={`nav-btn ${tab === 'finance' ? 'active' : ''}`} onClick={() => setTab('finance')}>
          <svg fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
          <span>Finance</span>
        </button>
        <button className={`nav-btn ${tab === 'profile' ? 'active' : ''}`} onClick={() => setTab('profile')}>
          <svg fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span>Profile</span>
        </button>
      </nav>
    </div>
  );
}
