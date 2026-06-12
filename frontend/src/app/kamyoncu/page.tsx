'use client';
import { useEffect, useState } from 'react';

export default function KamyoncuDashboard() {
  const [user, setUser] = useState<any>(null);
  const [shipments, setShipments] = useState<any[]>([]);
  const [filters, setFilters] = useState({ fromCity: '', toCity: '', vehicleType: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const u = localStorage.getItem('user');
    if (!u) { window.location.href = '/login'; return; }
    setUser(JSON.parse(u));
    loadShipments();
  }, []);

  const loadShipments = async (f?: any) => {
    setLoading(true);
    const params = new URLSearchParams({ status: 'active', ...(f || filters) });
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shipments?${params}`);
    const data = await res.json();
    setShipments(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const handleApprove = async (shipmentId: string) => {
    const token = localStorage.getItem('token');
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shipments/${shipmentId}/approve`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });
    alert('Onay verildi!');
    loadShipments();
  };

  if (!user) return <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>Yükleniyor...</div>;

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      <header style={{ background: '#1e293b', borderBottom: '1px solid #334155', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '35px', height: '35px', background: '#f97316', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>BL</div>
          <span style={{ color: 'white', fontWeight: '600' }}>Kamyoncu Paneli</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ color: '#94a3b8', fontSize: '14px' }}>{user.firstName} {user.lastName}</span>
          <button onClick={() => { localStorage.clear(); window.location.href = '/login'; }} style={{ padding: '8px 15px', background: '#334155', border: 'none', borderRadius: '8px', color: '#94a3b8', cursor: 'pointer', fontSize: '14px' }}>Çıkış</button>
        </div>
      </header>
      <main style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: 'white', marginBottom: '20px' }}>Aktif Yük İlanları</h1>
        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', marginBottom: '20px', display: 'flex', gap: '15px' }}>
          <input value={filters.fromCity} onChange={e => setFilters({...filters, fromCity: e.target.value})} placeholder="Nereden..." style={{ flex: 1, padding: '10px', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white', fontSize: '14px' }} />
          <input value={filters.toCity} onChange={e => setFilters({...filters, toCity: e.target.value})} placeholder="Nereye..." style={{ flex: 1, padding: '10px', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white', fontSize: '14px' }} />
          <select value={filters.vehicleType} onChange={e => setFilters({...filters, vehicleType: e.target.value})} style={{ flex: 1, padding: '10px', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white', fontSize: '14px' }}>
            <option value="">Tüm Araçlar</option>
            <option value="tenteli">Tenteli</option>
            <option value="dorse">Dorse</option>
            <option value="sogutmali">Soğutmalı</option>
            <option value="kasa">Kasa</option>
            <option value="tanker">Tanker</option>
          </select>
          <button onClick={() => loadShipments(filters)} style={{ padding: '10px 20px', background: '#f97316', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', fontWeight: '500' }}>Filtrele</button>
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', color: '#94a3b8', padding: '50px' }}>Yükleniyor...</div>
        ) : shipments.length === 0 ? (
          <div style={{ background: '#1e293b', padding: '60px', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '50px', marginBottom: '15px' }}>🚛</div>
            <p style={{ color: '#94a3b8' }}>Şu an aktif ilan yok.</p>
          </div>
        ) : shipments.map(s => (
          <div key={s.id} style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', marginBottom: '15px', border: '1px solid #334155' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ color: 'white', margin: '0 0 8px', fontSize: '18px' }}>{s.fromCity} → {s.toCity}</h3>
                <div style={{ display: 'flex', gap: '15px', fontSize: '14px', color: '#94a3b8' }}>
                  <span>⚖️ {s.tonnage} ton</span>
                  <span>🚛 {s.vehicleType}</span>
                  <span>📅 {new Date(s.loadDate).toLocaleDateString('tr-TR')}</span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '13px', margin: '8px 0 0' }}>📍 {s.fromAddress} → {s.toAddress}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#f97316', fontSize: '24px', fontWeight: '700', marginBottom: '10px' }}>₺{s.price?.toLocaleString()}</div>
                <button onClick={() => handleApprove(s.id)} style={{ padding: '10px 24px', background: '#16a34a', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>
                  ✓ Onayla
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
