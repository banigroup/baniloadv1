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
    <div style={{ minHeight:
