import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BaniLoad - Lojistik Platform',
  description: 'Türkiye\'nin lojistik platformu. Firma ve kamyoncuları buluşturan yük ilanı sistemi.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#f9fafb' }}>
        {children}
      </body>
    </html>
  );
}
