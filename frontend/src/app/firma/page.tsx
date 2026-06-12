'use client';
import { useEffect, useState } from 'react';

export default function FirmaDashboard() {
  const [user, setUser] = useState<any>(null);
  const [shipments, setShipments] = useState<any[]>([]);

  useEffect(() => {
    const u = localStorage.getItem('user');
    if (!u) { window.location.href = '/login'; return; }
    setUser(JSON.parse(u));
    const token = localStorage.getItem('token');
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/shipments/my`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(r => r.json()).then(data => setShipments(Array.isArray(data) ? data : []));
  }, []);

  const STATUS_TR: Record<string, string> = {
    active: 'Aktif', matched: 'Eşleşti', in_progress: 'Taşımada', completed: 'Tamamlandı', cancelled: 'İptal'
  };
  const STATUS_COLOR: Record<string, string> = {
    active: '#16a34a', matched: '#2563eb', in_progress: '#d97706', completed: '#6b7280', cancelled: '#dc2626'
  };

  if (!user) return <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>Yükleniyor...</div>;

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      <header style={{ background: '#1e293b', borderBottom: '1px solid #334155', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '35px', height: '35px', background: '#f97316', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>BL</div>
          <span style={{ color: 'white', fontWeight: '600' }}>Firma Paneli</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ color: '#94a3b8', fontSize: '14px' }}>{user.firstName} {user.lastName}</span>
          <button onClick={() => { localStorage.clear(); window.location.href = '/login'; }} style={{ padding: '8px 15px', background: '#334155', border: 'none', borderRadius: '8px', color: '#94a3b8', cursor: 'pointer', fontSize: '14px' }}>Çıkış</button>
        </div>
      </header>
      <main style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <h1 style={{ color: 'white', margin: 0 }}>İlanlarım</h1>
          <a href="/firma/ilan-ver" style={{ padding: '12px 24px', background: '#f97316', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>+ Yük İlanı Ver</a>
        </div>
        {shipments.length === 0 ? (
          <div style={{ background: '#1e293b', padding: '60px', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '50px', marginBottom: '15px' }}>📋</div>
            <p style={{ color: '#94a3b8', fontSize: '16px' }}>Henüz ilan vermediniz.</p>
            <a href="/firma/ilan-ver" style={{ display: 'inline-block', marginTop: '15px', padding: '12px 24px', background: '#f97316', color: 'white', borderRadius: '8px', textDecoration: 'none' }}>İlk İlanı Ver</a>
          </div>
        ) : shipments.map(s => (
          <div key={s.id} style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', marginBottom: '15px', border: '1px solid #334155' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ color: 'white', margin: '0 0 8px' }}>{s.fromCity} → {s.toCity}</h3>
                <div style={{ display: 'flex', gap: '15px', fontSize: '14px', color: '#94a3b8' }}>
                  <span>⚖️ {s.tonnage} ton</span>
                  <span>🚛 {s.vehicleType}</span>
                  <span>💰 ₺{s.price?.toLocaleString()}</span>
                  <span>📅 {new Date(s.loadDate).toLocaleDateString('tr-TR')}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ background: STATUS_COLOR[s.status] + '20', color: STATUS_COLOR[s.status], padding: '5px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: '500' }}>
                  {STATUS_TR[s.status]}
                </span>
                <a href={`/firma/ilanlar/${s.id}`} style={{ padding: '8px 15px', background: '#334155', color: 'white', borderRadius: '8px', textDecoration: 'none', fontSize: '13px' }}>Detay</a>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
