"use client";

import { useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { getSupabaseBrowserClient } from "../lib/supabase-browser";

export default function Home() {
  const [message, setMessage] = useState<string | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const flickFrames = useRef(new WeakMap<HTMLSpanElement, number>());

  const handleFlick = (event: ReactMouseEvent<HTMLSpanElement>) => {
    const chip = event.currentTarget;
    const bounds = chip.getBoundingClientRect();
    const deltaX = event.clientX - (bounds.left + bounds.width / 2);
    const deltaY = event.clientY - (bounds.top + bounds.height / 2);
    const distance = Math.hypot(deltaX, deltaY) || 1;
    const strength = 28 + Math.min(distance, 30) * 0.55;
    const impulseX = (deltaX / distance) * strength;
    const impulseY = (deltaY / distance) * strength;
    const baseX = Number.parseFloat(chip.style.getPropertyValue("--nudge-x")) || 0;
    const baseY = Number.parseFloat(chip.style.getPropertyValue("--nudge-y")) || 0;
    const activeFrame = flickFrames.current.get(chip);
    if (activeFrame) cancelAnimationFrame(activeFrame);

    const startedAt = performance.now();
    const duration = 2000;
    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextX = Math.max(-125, Math.min(125, baseX + impulseX * eased));
      const nextY = Math.max(-125, Math.min(125, baseY + impulseY * eased));
      chip.style.setProperty("--nudge-x", `${nextX}px`);
      chip.style.setProperty("--nudge-y", `${nextY}px`);
      if (progress < 1) flickFrames.current.set(chip, requestAnimationFrame(animate));
    };
    chip.style.transition = "none";
    flickFrames.current.set(chip, requestAnimationFrame(animate));
  };

  const handleRegistration = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRegistrationMessage(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      setRegistrationMessage("A regisztrációs szolgáltatás még nincs beállítva. Kérjük, próbáld meg később.");
      return;
    }

    setIsRegistering(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/` },
    });
    setIsRegistering(false);

    if (error) {
      setRegistrationMessage("A regisztráció nem sikerült. Ellenőrizd az adataidat, majd próbáld újra.");
      return;
    }

    setRegistrationMessage("Elküldtük a megerősítő e-mailt. A fiók aktiválásához nyisd meg a benne lévő linket.");
    event.currentTarget.reset();
  };
  return (
    <main className="landing">
      <header className="landing-header">
        <div className="landing-brand" aria-label="valtomatic"><span className="brand-mark">v</span><span>valtomatic</span></div>
        <button className="landing-login" onClick={() => setMessage("A belépési felület hamarosan elkészül.")}>Belépés</button>
      </header>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">CRYPTO ÁTVÁLTÁS MAGYARORSZÁGRA</p>
          <h1>Válts fiat és crypto között, <em>gyorsan, egyszerűen.</em></h1>
          <p className="hero-description">Magyar nyelvű szolgáltatás, magyar támogatással, magyaroknak.</p>
          <div className="hero-actions">
            <button className="hero-primary" onClick={() => setShowRegistration(true)}>Kezdjük el <span>→</span></button>
            <button className="hero-secondary" onClick={() => setMessage("A működés bemutatója hamarosan elkészül.")}>Hogyan működik? <span>↓</span></button>
          </div>
          {message && <p className="landing-message" role="status">{message}</p>}
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="conversion-card"><span className="card-label">ÁTVÁLTÁS</span><div className="conversion-row"><span>FIAT</span><b>↔</b><span>CRYPTO</span></div><div className="card-rule" /><p>Egyszerű, átlátható folyamat</p></div>
          <div className="asset-group fiat-assets"><span className="floating-chip chip-eur" onClick={handleFlick}>EUR</span><span className="floating-chip chip-usd" onClick={handleFlick}>USD</span></div><div className="asset-group crypto-assets"><span className="floating-chip chip-usdc" onClick={handleFlick}>USDC</span><span className="floating-chip chip-eurc" onClick={handleFlick}>EURC</span><span className="floating-chip chip-eurt" onClick={handleFlick}>EURT</span><span className="floating-chip chip-usdt" onClick={handleFlick}>USDT</span><span className="floating-chip chip-sol" onClick={handleFlick}>SOL</span></div>
        </div>
      </section>
      <section className="trust-strip" aria-label="Szolgáltatási alapelvek">
        <div><span className="trust-number">01</span><p>Magyar nyelvű<br />felület és támogatás</p></div>
        <div><span className="trust-number">02</span><p>Gyors és egyszerű váltási folyamat</p></div>
        <div><span className="trust-number">03</span><p>Átlátható számok<br />és működés</p></div>
      </section>
      <footer className="landing-footer"><span>valtomatic · Felületi előnézet</span><span>Első a biztonság</span></footer>
      {showRegistration && <div className="registration-overlay" role="presentation">
        <section className="registration-modal" role="dialog" aria-modal="true" aria-labelledby="registration-title">
          <button className="modal-close" aria-label="Regisztrációs ablak bezárása" onClick={() => setShowRegistration(false)}>×</button>
          <p className="eyebrow">FIÓK LÉTREHOZÁSA</p>
          <h2 id="registration-title">Regisztráció</h2>
          <p className="registration-intro">Add meg az adataidat a kezdéshez.</p>
          <form className="registration-form" onSubmit={handleRegistration}>
            <label>E-mail cím<input type="email" name="email" autoComplete="email" placeholder="pelda@email.hu" required /></label>
            <label>Telefonszám<input type="tel" name="phone" autoComplete="tel" placeholder="+36 30 123 4567" required /></label>
            <label>Jelszó<input type="password" name="password" autoComplete="new-password" placeholder="Legalább 8 karakter" minLength={8} required /></label>
            <button className="registration-submit" type="submit" disabled={isRegistering}>{isRegistering ? "Regisztráció folyamatban…" : "Regisztráció folytatása"} <span>→</span></button>
          </form>
          {registrationMessage && <p className="registration-feedback" role="status">{registrationMessage}</p>}
          <p className="registration-note">A telefonszámot ebben a lépésben még nem mentjük el.</p>
        </section>
      </div>}
    </main>
  );
}
