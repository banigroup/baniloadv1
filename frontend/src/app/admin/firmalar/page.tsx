'use client';
import { useEffect, useState } from 'react';

export default function AdminFirmalar() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');

  useEffect(() => {
    loadCompanies();
  }, [filter]);

  const loadCompanies = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies?status=${filter}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setCompanies(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const handleApprove = async (id: string) => {
    const token = localStorage.getItem('token');
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies/${id}/approve`, {
      method: 'POST', headers: { Authorization: `Bearer ${token}` }
    });
    loadCompanies();
  };

  const handleReject = async (id: string) => {
    const reason = prompt('Red sebebi:');
    if (!reason) return;
    const token = localStorage.getItem('token');
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies/${id}/reject`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ reason })
    });
    loadCompanies();
  };

  const STATUS_COLOR: Record<string, string> = {
    pending: '#d97706', approved: '#16a34a', rejected: '#dc2626', blocked: '#6b7280'
  };
  const STATUS_TR: Record<string, string> = {
    pending: 'Bekliyor', approved: 'Onaylı', rejected: 'Reddedildi', blocked: 'Engellendi'
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      <header style={{ background: '#1e293b', borderBottom: '1px solid #334155', padding: '15px 30px', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <a href="/admin" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>← Dashboard</a>
        <span style={{ color: 'white', fontWeight: '600' }}>Firma Yönetimi</span>
      </header>
      <main style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
          {['pending', 'approved', 'rejected', 'blocked'].map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{ padding: '8px 16px', background: filter === s ? '#f97316' : '#1e293b', border: `1px solid ${filter === s ? '#f97316' : '#334155'}`, borderRadius: '8px', color: filter === s ? 'white' : '#94a3b8', cursor: 'pointer', fontSize: '14px' }}>
              {STATUS_TR[s]}
            </button>
          ))}
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', color: '#94a3b8', padding: '50px' }}>Yükleniyor...</div>
        ) : companies.length === 0 ? (
          <div style={{ background: '#1e293b', padding: '60px', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ color: '#94a3b8' }}>Bu kategoride firma yok.</p>
          </div>
        ) : companies.map(c => (
          <div key={c.id} style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', marginBottom: '15px', border: '1px solid #334155' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ color: 'white', margin: '0 0 8px' }}>{c.companyName}</h3>
                <div style={{ display: 'flex', gap: '15px', fontSize: '14px', color: '#94a3b8' }}>
                  <span>🏛 VN: {c.taxNumber}</span>
                  <span>📍 {c.city}</span>
                  <span>📞 {c.phone}</span>
                  <span>👤 {c.user?.email}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: STATUS_COLOR[c.status] + '20', color: STATUS_COLOR[c.status], padding: '5px 12px', borderRadius: '20px', fontSize: '13px' }}>
                  {STATUS_TR[c.status]}
                </span>
                {c.status === 'pending' && (
                  <>
                    <button onClick={() => handleApprove(c.id)} style={{ padding: '8px 15px', background: '#16a34a', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>Onayla</button>
                    <button onClick={() => handleReject(c.id)} style={{ padding: '8px 15px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>Reddet</button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
