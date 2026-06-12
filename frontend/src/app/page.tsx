export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      <header style={{ padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', background: '#f97316', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '18px' }}>BL</div>
          <span style={{ color: 'white', fontWeight: '700', fontSize: '20px' }}>BaniLoad</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <a href="/login" style={{ padding: '10px 20px', border: '1px solid #334155', borderRadius: '8px', textDecoration: 'none', color: '#94a3b8', fontSize: '14px' }}>Giriş</a>
          <a href="/register" style={{ padding: '10px 20px', background: '#f97316', borderRadius: '8px', textDecoration: 'none', color: 'white', fontSize: '14px', fontWeight: '500' }}>Kayıt Ol</a>
        </div>
      </header>
      <main style={{ padding: '80px 40px', maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: '#1e293b', padding: '6px 16px', borderRadius: '20px', color: '#f97316', fontSize: '13px', marginBottom: '20px' }}>🇹🇷 Türkiye'nin Lojistik Platformu</div>
        <h1 style={{ color: 'white', fontSize: '52px', fontWeight: '800', margin: '0 0 20px', lineHeight: 1.1 }}>
          Yükünüzü<br />
          <span style={{ color: '#f97316' }}>Güvenle Taşıyın</span>
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '18px', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
          Firma ve kamyoncuları buluşturan, güvenli ödeme ve sözleşme sistemiyle desteklenen lojistik platformu.
        </p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '80px' }}>
          <a href="/register?role=firma" style={{ padding: '15px 30px', background: '#f97316', borderRadius: '10px', textDecoration: 'none', color: 'white', fontWeight: '600', fontSize: '16px' }}>🏢 Firma Olarak Katıl</a>
          <a href="/register?role=kamyoncu" style={{ padding: '15px 30px', background: '#1e293b', border: '1px solid #334155', borderRadius: '10px', textDecoration: 'none', color: 'white', fontWeight: '600', fontSize: '16px' }}>🚛 Kamyoncu Olarak Katıl</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {[
            { icon: '📋', title: 'Yük İlanı Ver', desc: 'Nereden, nereye, tonaj ve sabit fiyatla ilanınızı oluşturun.' },
            { icon: '🤝', title: 'Kamyoncu Seç', desc: 'Gelen onayları inceleyin, en uygun kamyoncuyu seçin.' },
            { icon: '🔒', title: 'Güvenli Ödeme', desc: 'Teslimat onayından sonra ödeme kamyoncuya aktarılır.' },
          ].map(f => (
            <div key={f.title} style={{ background: '#1e293b', padding: '30px', borderRadius: '12px', textAlign: 'left' }}>
              <div style={{ fontSize: '32px', marginBottom: '15px' }}>{f.icon}</div>
              <h3 style={{ color: 'white', margin: '0 0 10px', fontSize: '18px' }}>{f.title}</h3>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
