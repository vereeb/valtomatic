export default function Home() {
  return (
    <main className="coming-soon">
      <header className="coming-soon-header">
        <div className="brand" aria-label="valtomatic">
          <span className="brand-mark">v</span><span>valtomatic</span>
        </div>
        <span className="status-pill">HAMAROSAN</span>
      </header>
      <section className="coming-soon-content">
        <p className="eyebrow">MAGYAR CRYPTO ÁTVÁLTÁS</p>
        <h1>Váltás fiat és crypto között,<em> gyorsan, egyszerűen.</em></h1>
        <p className="description">Az oldal fejlesztés alatt áll, hamarosan elérhető lesz.</p>
      </section>
      <div className="visual" aria-hidden="true">
        <div className="orbit orbit-large" /><div className="orbit orbit-small" />
        <div className="exchange-card"><span>FIAT</span><b>↔</b><span>CRYPTO</span></div>
        <span className="asset asset-eur">EUR</span><span className="asset asset-usd">USD</span><span className="asset asset-usdc">USDC</span><span className="asset asset-sol">SOL</span>
      </div>
      <footer>valtomatic · Hamarosan</footer>
    </main>
  );
}
