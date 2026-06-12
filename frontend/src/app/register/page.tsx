'use client';
import { useState } from 'react';

export default function RegisterPage() {
  const [role, setRole] = useState('firma');
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', phone: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Kayıt hatası');
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      if (role === 'firma') window.location.href = '/firma/profil';
      else window.location.href = '/kamyoncu/profil';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: '#1e293b', padding: '40px', borderRadius: '16px', width: '100%', maxWidth: '450px' }}>
        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <div style={{ width: '50px', height: '50px', background: '#f97316', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px', color: 'white', fontWeight: 'bold', fontSize: '18px' }}>BL</div>
          <h1 style={{ color: 'white', margin: 0, fontSize: '24px' }}>Hesap Oluştur</h1>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
          {['firma', 'kamyoncu'].map(r => (
            <button key={r} onClick={() => setRole(r)} style={{ padding: '12px', background: role === r ? '#f97316' : '#0f172a', border: `1px solid ${role === r ? '#f97316' : '#334155'}`, borderRadius: '8px', color: role === r ? 'white' : '#94a3b8', cursor: 'pointer', fontWeight: '500', fontSize: '14px' }}>
              {r === 'firma' ? '🏢 Firma' : '🚛 Kamyoncu'}
            </button>
          ))}
        </div>
        {error && <div style={{ background: '#450a0a', border: '1px solid #dc2626', color: '#fca5a5', padding: '10px', borderRadius: '8px', marginBottom: '15px', fontSize: '14px' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#94a3b8' }}>Ad</label>
              <input value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} required placeholder="Ahmet" style={{ width: '100%', padding: '10px', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', fontSize: '14px', color: 'white', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#94a3b8' }}>Soyad</label>
              <input value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} required placeholder="Yılmaz" style={{ width: '100%', padding: '10px', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', fontSize: '14px', color: 'white', boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#94a3b8' }}>E-posta</label>
            <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required placeholder="ornek@email.com" style={{ width: '100%', padding: '10px', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', fontSize: '14px', color: 'white', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#94a3b8' }}>Telefon</label>
            <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="05XX XXX XX XX" style={{ width: '100%', padding: '10px', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', fontSize: '14px', color: 'white', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#94a3b8' }}>Şifre</label>
            <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required placeholder="••••••••" minLength={8} style={{ width: '100%', padding: '10px', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', fontSize: '14px', color: 'white', boxSizing: 'border-box' }} />
          </div>
          <button
