import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './ChatBox.css';
import { marked } from 'marked';

const AVATAR_USER = 'https://api.dicebear.com/7.x/personas/svg?seed=User';
const AVATAR_BOT = 'https://api.dicebear.com/7.x/bottts/svg?seed=Bot';

const CHAT_STORAGE_KEY = 'chatbot_riwayat';

const ChatBox = () => {
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const chatEndRef = useRef(null);
  const chatBoxRef = useRef(null);

  // Load chat dari localStorage saat mount
  useEffect(() => {
    const saved = localStorage.getItem(CHAT_STORAGE_KEY);
    if (saved) {
      try {
        setChatLog(JSON.parse(saved));
      } catch {
        // jika error parsing, abaikan saja
      }
    }
  }, []);

  // Simpan chat ke localStorage setiap kali chatLog berubah
  useEffect(() => {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chatLog));
  }, [chatLog]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog]);

  useEffect(() => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, [file]);

  // Deteksi posisi scroll chatbox
  useEffect(() => {
    const handleScroll = () => {
      const el = chatBoxRef.current;
      if (!el) return;
      const isBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 10;
      setShowScrollBtn(!isBottom);
    };
    const el = chatBoxRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      // Cek posisi awal
      handleScroll();
    }
    return () => {
      if (el) el.removeEventListener('scroll', handleScroll);
    };
  }, [chatLog]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!input.trim() && !file) return;
    const userMsg = input;
    let userFile = null;
    if (file) {
      userFile = file;
    }
    setChatLog(prev => [
      ...prev,
      { sender: 'user', text: userMsg, file: userFile, preview: preview }
    ]);
    setInput('');
    setFile(null);
    setPreview(null);
    try {
      let res;
      if (userFile) {
        const formData = new FormData();
        formData.append('message', userMsg);
        formData.append('file', userFile);
        res = await axios.post('http://localhost:5000/api/chat', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        res = await axios.post('http://localhost:5000/api/chat', { message: userMsg });
      }
      const botReply = res.data.reply;
      setChatLog(prev => [...prev, { sender: 'bot', text: botReply }]);
    } catch {
      setChatLog(prev => [...prev, { sender: 'bot', text: 'Maaf, terjadi kesalahan. Silakan coba lagi.' }]);
    }
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-messages" ref={chatBoxRef}>
        {chatLog.length === 0 && (
          <div className="chatbox-welcome">
            <img src={AVATAR_BOT} alt="Bot" className="chatbox-avatar-large" />
            <p>Halo! Aku siap mendengarkan dan membantu kamu. Ceritakan apa yang kamu rasakan hari ini 😊</p>
          </div>
        )}
        {chatLog.map((msg, i) => (
          <div key={i} className={`chatbox-row ${msg.sender === 'user' ? 'chatbox-row-user' : 'chatbox-row-bot'}`}>  
            <img src={msg.sender === 'user' ? AVATAR_USER : AVATAR_BOT} alt={msg.sender} className="chatbox-avatar" />
            <div style={{display:'flex',flexDirection:'column',alignItems: msg.sender==='user'?'flex-end':'flex-start'}}>
              {msg.sender === 'bot' ? (
                <div
                  className={`chatbox-bubble chatbox-bubble-bot`}
                  dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) }}
                />
              ) : (
                <div className={`chatbox-bubble chatbox-bubble-user`}>{msg.text}</div>
              )}
              {msg.file && msg.file.type && msg.file.type.startsWith('image/') && msg.preview && (
                <img src={msg.preview} alt="preview" className="chatbox-img-preview" />
              )}
              {msg.file && (!msg.file.type || !msg.file.type.startsWith('image/')) && (
                <span className="chatbox-file-name">{msg.file.name}</span>
              )}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
        {showScrollBtn && (
          <button className="chatbox-scroll-btn" onClick={scrollToBottom} title="Scroll ke bawah">⬇️</button>
        )}
      </div>
      <div className="chatbox-input-row" style={{flexDirection:'column',alignItems:'stretch',gap:'0.5rem'}}>
        {preview && (
          <img src={preview} alt="preview" className="chatbox-img-preview" />
        )}
        {file && !preview && (
          <span className="chatbox-file-name">{file.name}</span>
        )}
        <input
          className="chatbox-input"
          value={input}
          placeholder="Tulis pesan..."
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <div style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
          <input
            type="file"
            accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={e => setFile(e.target.files[0])}
            style={{flex:'1'}}
          />
          <button onClick={sendMessage} className="chatbox-send-btn">Kirim</button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;