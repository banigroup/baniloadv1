'use client';
import { useEffect, useState } from 'react';

export default function IlanDetay({ params }: { params: { id: string } }) {
  const [shipment, setShipment] = useState<any>(null);
  const [approvals, setApprovals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/shipments/${params.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(r => r.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/shipments/${params.id}/approvals`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(r => r.json()),
    ]).then(([s, a]) => {
      setShipment(s);
      setApprovals(Array.isArray(a) ? a : []);
      setLoading(false);
    });
  }, [params.id]);

  const handleSelectDriver = async (driverId: string) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shipments/${params.id}/select-driver`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ driverId })
    });
    if (res.ok) {
      alert('Kamyoncu seçildi! İş kesinleşti.');
      window.location.href = '/firma';
    }
  };

  if (loading) return <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>Yükleniyor...</div>;

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      <header style={{ background: '#1e293b', borderBottom: '1px solid #334155', padding: '15px 30px', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <a href="/firma" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>← Geri</a>
        <span style={{ color: 'white', fontWeight: '600' }}>İlan Detayı</span>
      </header>
      <main style={{ padding: '30px', maxWidth: '900px', margin: '0 auto' }}>
        {shipment && (
          <div style={{ background: '#1e293b', padding: '25px', borderRadius: '12px', marginBottom: '25px' }}>
            <h2 style={{ color: 'white', margin: '0 0 15px' }}>{shipment.fromCity} → {shipment.toCity}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '15px' }}>
              {[
                { label: 'Tonaj', value: `${shipment.tonnage} ton` },
                { label: 'Araç Tipi', value: shipment.vehicleType },
                { label: 'Fiyat', value: `₺${shipment.price?.toLocaleString()}` },
                { label: 'Yükleme Tarihi', value: new Date(shipment.loadDate).toLocaleDateString('tr-TR') },
                { label: 'Durum', value: shipment.status },
                { label: 'Yükleme Adresi', value: shipment.fromAddress },
              ].map(item => (
                <div key={item.label} style={{ background: '#0f172a', padding: '15px', borderRadius: '8px' }}>
                  <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '5px' }}>{item.label}</div>
                  <div style={{ color: 'white', fontWeight: '500' }}>{item.value}</div>
                </div>
              ))}
            </div>
            {shipment.notes && <p style={{ color: '#94a3b8', fontSize: '14px' }}>📝 {shipment.notes}</p>}
          </div>
        )}
        <div style={{ background: '#1e293b', padding: '25px', borderRadius: '12px' }}>
          <h3 style={{ color: 'white', marginBottom: '20px' }}>Gelen Onaylar ({approvals.length})</h3>
          {approvals.length === 0 ? (
            <p style={{ color: '#94a3b8', textAlign: 'center', padding: '30px' }}>Henüz onay gelmedi.</p>
          ) : approvals.map(a => (
            <div key={a.id} style={{ background: '#0f172a', padding: '15px', borderRadius: '8px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ color: 'white', fontWeight: '500' }}>{a.driver?.user?.firstName} {a.driver?.user?.lastName}</div>
                <div style={{ color: '#94a3b8', fontSize: '13px' }}>
                  🚛 {a.driver?.plateNumber} · {a.driver?.vehicleType} · ⭐ {a.driver?.rating} · ✅ {a.driver?.totalJobs} iş
                </div>
              </div>
              {shipment?.status === 'active' && (
                <button onClick={() => handleSelectDriver(a.driver?.id)} style={{ padding: '10px 20px', background: '#f97316', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                  Seç
                </button>
              )}
              {a.status === 'selected' && <span style={{ color: '#16a34a', fontWeight: '600' }}>✓ Seçildi</span>}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
