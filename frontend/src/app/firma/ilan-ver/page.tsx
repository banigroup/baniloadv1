'use client';
import { useState } from 'react';

export default function IlanVerPage() {
  const [form, setForm] = useState({
    fromCity: '', fromAddress: '', toCity: '', toAddress: '',
    tonnage: '', vehicleType: 'tenteli', price: '', loadDate: '', notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shipments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, tonnage: parseFloat(form.tonnage), price: parseFloat(form.price) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Hata oluştu');
      window.location.href = '/firma';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: '100%', padding: '12px', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', fontSize: '14px', color: 'white', boxSizing: 'border-box' as const };
  const labelStyle = { display: 'block', marginBottom: '5px', fontSize: '14px', color: '#94a3b8' };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      <header style={{ background: '#1e293b', borderBottom: '1px solid #334155', padding: '15px 30px', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <a href="/firma" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>← Geri</a>
        <span style={{ color: 'white', fontWeight: '600' }}>Yük İlanı Ver</span>
      </header>
      <main style={{ padding: '30px', maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ background: '#1e293b', padding: '30px', borderRadius: '16px' }}>
          {error && <div style={{ background: '#450a0a', border: '1px solid #dc2626', color: '#fca5a5', padding: '10px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <h2 style={{ color: 'white', marginBottom: '20px' }}>📍 Yükleme Noktası</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <div>
                <label style={labelStyle}>Şehir</label>
                <input value={form.fromCity} onChange={e => setForm({...form, fromCity: e.target.value})} required placeholder="İstanbul" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Adres</label>
                <input value={form.fromAddress} onChange={e => setForm({...form, fromAddress: e.target.value})} required placeholder="Mahalle, Cadde..." style={inputStyle} />
              </div>
            </div>
            <h2 style={{ color: 'white', marginBottom: '20px' }}>🏁 Teslim Noktası</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label style={labelStyle}>Şehir</label>
                <input value={form.toCity} onChange={e => setForm({...form, toCity: e.target.value})} required placeholder="Ankara" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Adres</label>
                <input value={form.toAddress} onChange={e => setForm({...form, toAddress: e.target.value})} required placeholder="Mahalle, Cadde..." style={inputStyle} />
              </div>
            </div>
            <h2 style={{ color: 'white', marginBottom: '20px' }}>📦 Yük Bilgileri</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <div>
                <label style={labelStyle}>Tonaj (ton)</label>
                <input type="number" value={form.tonnage} onChange={e => setForm({...form, tonnage: e.target.value})} required placeholder="20" min="0.1" step="0.1" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Araç Tipi</label>
                <select value={form.vehicleType} onChange={e => setForm({...form, vehicleType: e.target.value})} style={inputStyle}>
                  <option value="tenteli">Tenteli</option>
                  <option value="dorse">Dorse</option>
                  <option value="sogutmali">Soğutmalı</option>
                  <option value="kasa">Kasa</option>
                  <option value="tanker">Tanker</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Yükleme Tarihi</label>
                <input type="date" value={form.loadDate} onChange={e => setForm({...form, loadDate: e.target.value})} required style={inputStyle} />
              </div>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={labelStyle}>Sabit Fiyat (₺)</label>
              <input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required placeholder="25000" min="1" style={inputStyle} />
            </div>
            <div style={{ marginBottom: '25px' }}>
              <label style={labelStyle}>Notlar (opsiyonel)</label>
              <textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} placeholder="Özel notlar..." rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
            </div>
            <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', background: '#f97316', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'İlan Veriliyor...' : 'İlanı Yayınla'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
