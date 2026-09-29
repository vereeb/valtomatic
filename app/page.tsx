export default function Home() {
  return (
    <main className="coming-soon">
      <div className="planet" aria-hidden="true" />
      <header className="coming-soon-header">
        <div className="brand" aria-label="valtomatic">VALTOMATIC</div>
        <p className="header-meta">CRYPTO <span /> EGYSZERŰ <span /> AZONNALI</p>
      </header>
      <section className="coming-soon-content">
        <h1>VALTOMATIC</h1>
        <p className="eyebrow">HAMAROSAN</p>
        <p className="description">Váltás fiat és crypto között, gyorsan, egyszerűen.<br />Az oldal fejlesztés alatt áll, hamarosan elérhető lesz.</p>
      </section>
      <footer><span>© VALTOMATIC</span><span>MAGYAR CRYPTO ÁTVÁLTÁS</span></footer>
    </main>
  );
}
