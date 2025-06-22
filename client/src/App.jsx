import React, { useState, useEffect } from 'react';
import ChatBox from './components/ChatBox';

const MOTIVASI = [
  'Setiap hari adalah kesempatan baru untuk menjadi lebih baik. 🌱',
  'Kamu berharga dan pantas untuk bahagia. 💖',
  'Tidak apa-apa untuk beristirahat. Progres kecil tetaplah progres. ✨',
  'Jangan ragu untuk meminta bantuan, kamu tidak sendiri. 🤝',
  'Percayalah, badai pasti berlalu. 🌈',
  'Kesehatan mental sama pentingnya dengan kesehatan fisik. 🧠',
  'Senyum hari ini, walau kecil, tetap berarti. 😊',
  'Kamu sudah melakukan yang terbaik, itu sudah cukup. 🙏',
  'Setiap perasaan valid, izinkan dirimu merasakannya. 💙',
  'Langkah kecil hari ini, kemenangan besar esok hari. 🏆',
];

function getMotivasiHarian() {
  const today = new Date();
  const idx = today.getDate() % MOTIVASI.length;
  return MOTIVASI[idx];
}

function App() {
  const [menu, setMenu] = useState('chat');
  const [dark, setDark] = useState(() => localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    if (dark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', dark);
  }, [dark]);

  return (
    <div className={dark ? 'app-root dark-mode' : 'app-root'} style={{ minHeight: '100vh', position: 'relative', background: dark ? 'linear-gradient(120deg, #232946 0%, #1a1a2e 100%)' : 'linear-gradient(120deg, #e0eafc 0%, #cfdef3 50%, #f9f6ff 100%)', overflow:'hidden' }}>
      {/* Ilustrasi background sudut kanan bawah & kiri atas */}
      <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="mental health" style={{position:'fixed',right:0,bottom:0,width:'320px',opacity:dark?0.10:0.13,zIndex:0,borderRadius:'120px 0 0 0',pointerEvents:'none'}} />
      <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80" alt="mental health" style={{position:'fixed',left:0,top:0,width:'220px',opacity:dark?0.07:0.10,zIndex:0,borderRadius:'0 0 120px 0',pointerEvents:'none'}} />
      <div className="main-wrapper">
        <nav className="navbar">
          <div className="navbar-logo">
            <span role="img" aria-label="heart">💙</span>
          </div>
          <div className="navbar-title">Mental Health Chatbot</div>
          <div className="navbar-menu">
            <button className={menu==='chat'?"navbar-menu-active":''} onClick={()=>setMenu('chat')}>Chat</button>
            <button className={menu==='info'?"navbar-menu-active":''} onClick={()=>setMenu('info')}>Informasi</button>
            <button className="dark-toggle-btn" onClick={()=>setDark(d=>!d)}>{dark ? '☀️ Light' : '🌙 Dark'}</button>
          </div>
        </nav>
        <div className="content-center">
          <h1 className={`main-title ${menu==='info'?'mb-2':'mb-6'}`}>💙 Mental Health Chatbot</h1>
          <div className="main-subtitle">Sahabat Digital untuk Kesehatan Mentalmu</div>
          <p className="text-center text-lg text-blue-900 mb-6 font-medium">Teman virtual untuk mendengarkan dan membantu kesehatan mentalmu 💙</p>
          {menu==='chat' && (
            <>
              <div className="motivasi-harian">{getMotivasiHarian()}</div>
              <ChatBox />
            </>
          )}
          {menu==='info' && (
            <section id="informasi" className="info-section">
              <div style={{display:'flex',alignItems:'center',gap:'1.5rem',flexWrap:'wrap'}}>
                <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=200&q=80" alt="Ilustrasi kesehatan mental" style={{width:'120px',borderRadius:'16px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}} />
                <div>
                  <h2>Tentang Website Ini</h2>
                  <p>Website ini adalah chatbot yang didesain untuk membantu dan mendengarkan keluhan terkait kesehatan mental. Semua percakapan bersifat rahasia dan bertujuan memberikan dukungan awal, bukan pengganti profesional.</p>
                  <ul>
                    <li><b>Didukung oleh AI</b>: Respons cepat, ramah, dan personal.</li>
                    <li><b>Privasi terjaga</b>: Data tidak dibagikan ke pihak lain.</li>
                    <li><b>Gratis & mudah</b>: Bisa digunakan kapan saja, di mana saja.</li>
                    <li><b>Tips & Edukasi</b>: Dapatkan tips kesehatan mental dan teknik relaksasi.</li>
                    <li><b>Kontak Bantuan Profesional</b>: <a href="https://www.kemenpppa.go.id/index.php/page/read/31/helpline" target="_blank" rel="noopener noreferrer">Layanan Konseling KemenPPPA</a> | <a href="https://www.pijarpsikologi.org/layanan-konseling-gratis" target="_blank" rel="noopener noreferrer">Pijar Psikologi</a></li>
                  </ul>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;