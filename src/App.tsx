import { useState } from 'react';
import type { Rate } from './data/prices';
import './index.css';
import HomeScreen from './screens/HomeScreen';
import AdminScreen from './screens/AdminScreen';
import RepSubmitScreen from './screens/RepSubmitScreen';
import SubscriptionScreen from './screens/SubscriptionScreen';
import AlertsScreen from './screens/AlertsScreen';
import DetailScreen from './screens/DetailScreen';


type Screen = 'home' | 'admin' | 'submit' | 'subscribe' | 'alerts';

const NAV = [
  { id: 'home' as Screen,    icon: '🏠', label: 'Home',      labelUrdu: 'ہوم' },
  { id: 'alerts' as Screen,  icon: '🔔', label: 'Alerts',    labelUrdu: 'الرٹ' },
  { id: 'submit' as Screen,  icon: '📋', label: 'Submit',    labelUrdu: 'جمع' },
  { id: 'admin' as Screen,   icon: '⚙️', label: 'Admin',     labelUrdu: 'ایڈمن' },
  { id: 'subscribe' as Screen,icon:'💳', label: 'Subscribe', labelUrdu: 'سبسکرائب' },
];

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [detail, setDetail] = useState<Rate | null>(null);

  if (detail) return (
    <div className="app-shell" style={{overflowY:'auto'}}>
      <DetailScreen rate={detail} onBack={()=>setDetail(null)}/>
    </div>
  );

  return (
    <div className="app-shell">
      <div style={{height:'calc(100vh - 80px)',overflowY:'auto'}}>
        {screen === 'home'      && <HomeScreen onSelectRate={r=>setDetail(r)}/>}
        {screen === 'admin'     && <AdminScreen/>}
        {screen === 'submit'    && <RepSubmitScreen/>}
        {screen === 'subscribe' && <SubscriptionScreen/>}
        {screen === 'alerts'    && <AlertsScreen/>}
      </div>

      {/* Bottom navigation */}
      <div className="bottom-nav">
        {NAV.map(n => (
          <button key={n.id} className={`nav-item ${screen===n.id?'active':''}`} onClick={()=>setScreen(n.id)}>
            <span style={{fontSize:20}}>{n.icon}</span>
            <span className="nav-label">{n.label}</span>
            {screen===n.id && <div className="nav-active-dot"/>}
          </button>
        ))}
      </div>
    </div>
  );
}
