"use client";
import { useMemo, useState } from 'react';

const tabs = [
  { key: 'home', label: 'Home', icon: '??' },
  { key: 'tasks', label: 'Tasks', icon: '?' },
  { key: 'settings', label: 'Settings', icon: '??' }
] as const;

type TabKey = typeof tabs[number]['key'];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [items, setItems] = useState<string[]>(['Ship MVP', 'Collect feedback', 'Iterate fast']);
  const [input, setInput] = useState('');

  const content = useMemo(() => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="container">
            <div className="grid">
              <div className="card">
                <div className="card-title">Active users</div>
                <div className="card-value">1,284</div>
              </div>
              <div className="card">
                <div className="card-title">Conversion</div>
                <div className="card-value">4.2%</div>
              </div>
              <div className="card">
                <div className="card-title">Sessions</div>
                <div className="card-value">8,930</div>
              </div>
              <div className="card">
                <div className="card-title">Revenue</div>
                <div className="card-value">$12.3k</div>
              </div>
            </div>

            <h2 className="section-title">Quick actions</h2>
            <div className="row">
              <input className="input" placeholder="Add a task" value={input} onChange={(e) => setInput(e.target.value)} />
              <button className="cta" onClick={() => { if (!input.trim()) return; setItems((prev) => [input.trim(), ...prev]); setInput(''); }}>Add</button>
            </div>
          </div>
        );
      case 'tasks':
        return (
          <div className="container">
            <h2 className="section-title">Your tasks</h2>
            <div className="list">
              {items.map((t, i) => (
                <div key={i} className="list-item">
                  <span>{t}</span>
                  <button className="badge" onClick={() => setItems((prev) => prev.filter((_, idx) => idx !== i))}>Done</button>
                </div>
              ))}
              {items.length === 0 && <div className="card">No tasks. Enjoy your day! ??</div>}
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="container">
            <h2 className="section-title">Settings</h2>
            <div className="card">
              <div className="row" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 700 }}>Install app</div>
                  <div style={{ color: 'var(--muted)', fontSize: 14 }}>Add Agentic to your home screen</div>
                </div>
                <a className="cta" href="#" onClick={(e) => { e.preventDefault(); alert('Use your browser menu to ?Add to Home screen?.'); }}>Install</a>
              </div>
            </div>

            <div className="card">
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Theme</div>
              <div className="row">
                <button className="badge" onClick={() => document.documentElement.style.setProperty('--bg', '#0b1020')}>Dark</button>
                <button className="badge" onClick={() => document.documentElement.style.setProperty('--bg', '#ffffff')}>Light</button>
              </div>
            </div>
          </div>
        );
    }
  }, [activeTab, input, items]);

  return (
    <div>
      <header className="header">
        <div className="header-inner">
          <div className="brand">
            <div className="brand-badge">A</div>
            Agentic
          </div>
          <a className="badge" href="/">PWA</a>
        </div>
      </header>

      {content}

      <nav className="tabs">
        {tabs.map((t) => (
          <button key={t.key} className={`tab ${activeTab === t.key ? 'active' : ''}`} onClick={() => setActiveTab(t.key as TabKey)}>
            <span aria-hidden>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
