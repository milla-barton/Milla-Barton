"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { PROJECTS, PortfolioProject } from "@/lib/portfolio-data";

/* ─── tiny helpers ─────────────────────────────────────── */
function useIntersect(cb: () => void, opts?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) cb(); }, opts);
    obs.observe(el);
    return () => obs.disconnect();
  }, [cb, opts]);
  return ref;
}

/* ─── NAV ───────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`} id="nav">
      <div className="nav-inner">
        <a className="nav-logo" href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo/logo.svg" alt="Milla Barton Design" height={32} />
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <a className="nav-phone" href="tel:+33664025668">+33 6 64 02 56 68</a>
          <a className="nav-cta" href="#devis">Devis gratuit →</a>
        </div>
      </div>
    </nav>
  );
}

/* ─── HERO ───────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          <div>
            <div className="hero-badge">Disponible à Paris &amp; Île-de-France</div>
            <h1>Votre <em>architecte d&apos;intérieur</em> pour une rénovation sur mesure</h1>
            <p className="hero-sub">
              De la conception à la réalisation, Milla Barton transforme votre appartement ou maison en un espace qui vous ressemble. Estimation personnalisée sous 48h.
            </p>
            <a href="#devis" className="final-cta-btn" style={{ fontSize: 15, padding: "14px 32px" }}>
              Obtenir mon estimation gratuite →
            </a>
          </div>
          <div className="hero-images">
            <div className="hero-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/hero/hero-1.webp" alt="Salon design Milla Barton" loading="eager" />
            </div>
            <div className="hero-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/hero/hero-2.webp" alt="Cuisine design Milla Barton" loading="eager" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FADE-UP WRAPPER ───────────────────────────────────── */
function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [vis, setVis] = useState(false);
  const ref = useIntersect(
    useCallback(() => setVis(true), []),
    { threshold: 0.15 }
  );
  return (
    <div
      ref={ref}
      className={`fade-up${vis ? " visible" : ""}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/* ─── PORTFOLIO MODAL ───────────────────────────────────── */
function PortfolioModal({ project, onClose }: { project: PortfolioProject; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const prev = useCallback(() => setIdx(i => (i - 1 + project.images.length) % project.images.length), [project.images.length]);
  const next = useCallback(() => setIdx(i => (i + 1) % project.images.length), [project.images.length]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", h);
    return () => { document.removeEventListener("keydown", h); };
  }, [onClose, prev, next]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <div className="modal-title">{project.title}</div>
              <div className="modal-meta">{project.meta}</div>
            </div>
            <span className="modal-counter">{idx + 1} / {project.images.length}</span>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Fermer">✕</button>
        </div>

        {/* Main viewer */}
        <div className="modal-viewer">
          {project.images.map((img, i) => (
            <div key={i} className={`modal-slide${i === idx ? " active" : ""}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.alt} loading={i === 0 ? "eager" : "lazy"} />
            </div>
          ))}
          <button className="modal-nav prev" onClick={prev} aria-label="Précédent">‹</button>
          <button className="modal-nav next" onClick={next} aria-label="Suivant">›</button>
        </div>

        {/* Thumbnails */}
        <div className="modal-thumbs">
          {project.images.map((img, i) => (
            <button
              key={i}
              className={`modal-thumb${i === idx ? " active" : ""}`}
              onClick={() => setIdx(i)}
              aria-label={`Photo ${i + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.alt} loading="lazy" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── PORTFOLIO SECTION ─────────────────────────────────── */
function Portfolio({
  openProject,
  onOpen,
  onClose,
}: {
  openProject: PortfolioProject | null;
  onOpen: (p: PortfolioProject) => void;
  onClose: () => void;
}) {
  return (
    <section className="section portfolio" id="portfolio">
      <div className="container">
        <div className="section-label">Portfolio</div>
        <h2>Nos dernières réalisations</h2>
        <p className="section-sub">Chaque projet est unique. Découvrez quelques-unes de nos transformations récentes à Paris et en Île-de-France.</p>
        <div className="portfolio-grid">
          {PROJECTS.map((p, i) => (
            <FadeUp key={p.id} delay={i * 80}>
              <div className="portfolio-card" onClick={() => onOpen(p)} role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && onOpen(p)}>
                <div className="portfolio-card-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.coverSrc} alt={p.coverAlt} loading="lazy" />
                </div>
                <div className="portfolio-card-body">
                  <div className="portfolio-card-title serif">{p.title}</div>
                  <div className="portfolio-card-meta">{p.meta}</div>
                  <div className="portfolio-card-tag">{p.tag}</div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
      {openProject && <PortfolioModal project={openProject} onClose={onClose} />}
    </section>
  );
}

/* ─── CONTACT FORM ──────────────────────────────────────── */
function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      if (typeof window !== "undefined" && typeof window.gtagEvent === "function") {
        window.gtagEvent("form_submit", {
          event_category: "lead_form",
          event_label: "devis_gratuit",
          project_type: String(data.projet ?? ""),
          city: String(data.ville ?? ""),
        });
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="section" id="devis" style={{ background: "var(--cream)" }}>
      <div className="container" style={{ maxWidth: 640 }}>
        <div className="form-card">
          {status === "success" ? (
            /* Success replaces form in-place */
            <div style={{ animation: "successPop 0.5s cubic-bezier(0.34,1.56,0.64,1)", textAlign: "center", padding: "24px 0" }}>
              <div style={{
                width: 72, height: 72, borderRadius: "50%",
                background: "linear-gradient(135deg,#22c55e,#16a34a)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 20px",
                boxShadow: "0 8px 32px rgba(34,197,94,0.25)",
                animation: "checkIn 0.5s 0.1s cubic-bezier(0.34,1.56,0.64,1) both",
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 style={{ fontSize: 22, marginBottom: 8 }}>Demande envoyée !</h3>
              <p style={{ fontSize: 15, color: "var(--stone)", fontWeight: 300, lineHeight: 1.7, maxWidth: 360, margin: "0 auto 24px" }}>
                Merci pour votre message. Nous vous répondrons personnellement sous <strong style={{ fontWeight: 600, color: "var(--charcoal)" }}>48h</strong> avec une estimation sur mesure.
              </p>
              <div style={{ borderTop: "1px solid var(--border)", paddingTop: 20, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="tel:+33664025668" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 18px", borderRadius: 100, border: "1px solid var(--border)", fontSize: 13, color: "var(--charcoal)", textDecoration: "none", fontWeight: 500 }}>📞 +33 6 64 02 56 68</a>
                <a href="https://wa.me/33664025668" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 18px", borderRadius: 100, border: "1px solid var(--border)", fontSize: 13, color: "var(--charcoal)", textDecoration: "none", fontWeight: 500 }}>💬 WhatsApp</a>
              </div>
            </div>
          ) : (
            <>
              <h3>Obtenez votre estimation gratuite</h3>
              <p className="form-sub">Réponse personnalisée sous 48h, sans engagement.</p>
              <form id="lead-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="prenom">Prénom *</label>
                    <input type="text" id="prenom" name="prenom" placeholder="Votre prénom" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="nom">Nom *</label>
                    <input type="text" id="nom" name="nom" placeholder="Votre nom" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input type="email" id="email" name="email" placeholder="votre@email.com" required />
                </div>
                <div className="form-group">
                  <label htmlFor="tel">Téléphone *</label>
                  <input type="tel" id="tel" name="tel" placeholder="06 12 34 56 78" required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="projet">Type de projet *</label>
                    <select id="projet" name="projet" required defaultValue="">
                      <option value="" disabled>Sélectionnez...</option>
                      <option value="renovation-appartement">Rénovation d&apos;appartement</option>
                      <option value="renovation-maison">Rénovation de maison</option>
                      <option value="amenagement">Aménagement intérieur</option>
                      <option value="decoration">Décoration</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="surface">Surface (m²)</label>
                    <input type="text" id="surface" name="surface" placeholder="ex. 75" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="ville">Ville / Arrondissement</label>
                  <input type="text" id="ville" name="ville" placeholder="ex. Paris 8e, Meudon..." />
                </div>
                {status === "error" && (
                  <p style={{ fontSize: 13, color: "#dc2626", marginBottom: 10, background: "#fef2f2", padding: "8px 12px", borderRadius: 8, border: "1px solid #fecaca" }}>
                    Une erreur s&apos;est produite. Réessayez ou appelez-nous directement.
                  </p>
                )}
                <button type="submit" className="form-submit" disabled={status === "loading"}>
                  {status === "loading"
                    ? <><span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} /> Envoi…</>
                    : "Recevoir mon estimation gratuite →"
                  }
                </button>
                <p className="form-note">Sans engagement · Réponse sous 48h · Vos données restent confidentielles</p>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── MOBILE STICKY ─────────────────────────────────────── */
function MobileSticky({ modalOpen, onCloseModal, onVisibilityChange }: {
  modalOpen: boolean;
  onCloseModal: () => void;
  onVisibilityChange: (v: boolean) => void;
}) {
  const [scrollShow, setScrollShow] = useState(false);
  useEffect(() => {
    const check = () => {
      if (window.innerWidth >= 768) { setScrollShow(false); return; }
      const scrolled = window.scrollY > 100;
      const el = document.getElementById("devis");
      const formGone = el ? el.getBoundingClientRect().top > window.innerHeight : true;
      setScrollShow(scrolled && formGone);
    };
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    check();
    return () => { window.removeEventListener("scroll", check); window.removeEventListener("resize", check); };
  }, []);

  const show = scrollShow || modalOpen;

  useEffect(() => { onVisibilityChange(show); }, [show, onVisibilityChange]);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (modalOpen) { e.preventDefault(); onCloseModal(); }
  }

  return (
    <div className={`mobile-sticky${show ? " show" : ""}`} id="mobileCta">
      <a href="#devis" onClick={handleClick}>Obtenir mon estimation gratuite →</a>
    </div>
  );
}

/* ─── PAGE ───────────────────────────────────────────────── */
export default function Page() {
  const [openProject, setOpenProject] = useState<PortfolioProject | null>(null);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [cookieVisible, setCookieVisible] = useState(false);
  const closeModal = useCallback(() => setOpenProject(null), []);
  return (
    <>
      <Nav />

      <Hero />

      {/* TRUST BAR */}
      <section className="trust-bar">
        <div className="container">
          <div className="trust-grid">
            <FadeUp><div className="trust-item-num">10+</div><div className="trust-item-label">Années d&apos;expérience</div></FadeUp>
            <FadeUp delay={80}><div className="trust-item-num">4.9<span style={{ fontSize: 18, color: "var(--charcoal)" }}>★</span></div><div className="trust-item-label">Avis Google</div></FadeUp>
            <FadeUp delay={160}><div className="trust-item-num">48h</div><div className="trust-item-label">Réponse garantie</div></FadeUp>
            <FadeUp delay={240}><div className="trust-item-num">100%</div><div className="trust-item-label">Sur mesure</div></FadeUp>
          </div>
        </div>
      </section>

      <Portfolio openProject={openProject} onOpen={setOpenProject} onClose={closeModal} />

      {/* PROCESS */}
      <section className="section" id="process">
        <div className="container">
          <div className="section-label">Comment ça marche</div>
          <h2>Un accompagnement en 3 étapes</h2>
          <p className="section-sub">De la première rencontre à la remise des clés, un processus clair et sans surprise.</p>
          <div className="process-grid">
            <FadeUp>
              <div className="process-card">
                <div className="process-num">01</div>
                <h3>Découverte &amp; évaluation</h3>
                <p>Remplissez le formulaire ci-dessous. Sous 48h, nous vous recontactons pour comprendre vos besoins, évaluer l&apos;espace et définir les grandes lignes du projet.</p>
              </div>
            </FadeUp>
            <FadeUp delay={100}>
              <div className="process-card">
                <div className="process-num">02</div>
                <h3>Conception &amp; maquettes 3D</h3>
                <p>Plans détaillés, visualisations 3D et sélection des matériaux. Vous validez chaque étape avant que les travaux ne commencent.</p>
              </div>
            </FadeUp>
            <FadeUp delay={200}>
              <div className="process-card">
                <div className="process-num">03</div>
                <h3>Réalisation &amp; suivi</h3>
                <p>Nous supervisons l&apos;intégralité du chantier pour garantir une réalisation fidèle aux plans, dans les délais et le budget convenus.</p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section testimonials" id="avis">
        <div className="container">
          <div className="section-label">Avis clients</div>
          <h2>La parole à nos clients</h2>
          <p className="section-sub">Des avis vérifiés sur Google par nos clients en Île-de-France.</p>
          <div className="testimonial-grid">
            {[
              {
                text: "Je recommande vivement Milla ! Elle a fait un travail formidable en créant un design magnifique. Douée pour le design et la couleur, elle a travaillé avec mon budget et conçu un résultat parfait.",
                name: "Adèle G.", project: "Rénovation d'appartement",
                avatar: "/images/avatars/adele.png",
              },
              {
                text: "Nous sommes très reconnaissants d'avoir trouvé Milla. Ce fut un réel plaisir de travailler avec elle. Elle a su s'organiser avec les difficultés de notre maison et la réinventer.",
                name: "Laurent T.", project: "Rénovation maison",
                avatar: "/images/avatars/laurent.png",
              },
              {
                text: "Son talent et son sens aigu de l'esthétique ont transformé mon espace. Je ne pourrais être plus satisfait du résultat !",
                name: "Théo C.", project: "Rénovation intérieure",
                avatar: "/images/avatars/theo.png",
              },
            ].map((t, i) => (
              <FadeUp key={i} delay={i * 100}>
                <div className="testimonial-card">
                  <div className="testimonial-stars">★★★★★</div>
                  <p className="testimonial-text">&ldquo;{t.text}&rdquo;</p>
                  <div className="testimonial-author">
                    <div className="testimonial-avatar">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={t.avatar} alt={t.name} />
                    </div>
                    <div>
                      <div className="testimonial-name">{t.name}</div>
                      <div className="testimonial-project">{t.project}</div>
                      <div className="testimonial-google">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/images/google.png" alt="Google" style={{ height: 12, opacity: 0.5 }} /> Avis Google
                      </div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section" id="about">
        <div className="container">
          <div className="section-label">À propos</div>
          <h2>Milla Barton</h2>
          <div className="about-grid">
            <FadeUp>
              <div className="about-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/company/mila.png" alt="Milla Barton — Architecte d'intérieur" loading="lazy" />
              </div>
            </FadeUp>
            <FadeUp delay={120}>
              <div className="about-text">
                <p>Architecte d&apos;intérieur et décoratrice basée à Neuilly-sur-Seine, j&apos;accompagne les particuliers et professionnels depuis plus de 10 ans.</p>
                <p>Mon équipe et moi proposons des solutions sur mesure pour l&apos;aménagement, le suivi de chantier et la décoration de votre intérieur en France comme à l&apos;étranger.</p>
                <p>Direction de projet, planches de décoration, visualisations 3D, achats et mise en place : je vous accompagne à chaque étape pour transformer votre espace en un lieu qui vous ressemble.</p>
                <div className="about-tags">
                  {["Rénovation complète","Aménagement","Décoration","Suivi de chantier","Maquettes 3D","Paris & IDF"].map(t => (
                    <span key={t} className="about-tag">{t}</span>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <ContactForm />

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="container">
          <h2>Prêt(e) à transformer votre intérieur ?</h2>
          <p>Appelez-nous directement ou remplissez le formulaire ci-dessus.</p>
          <a href="tel:+33664025668" className="final-cta-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            +33 6 64 02 56 68
          </a>
          <p className="final-cta-note">Ou contactez-nous par <a href="https://wa.me/33664025668" style={{ color: "var(--charcoal)", textDecoration: "underline" }}>WhatsApp</a></p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <p>© 2025 Milla Barton Design — Tous droits réservés</p>
        </div>
      </footer>

      <MobileSticky modalOpen={openProject !== null} onCloseModal={closeModal} onVisibilityChange={setStickyVisible} />
      <PhoneFab stickyVisible={stickyVisible} cookieVisible={cookieVisible} />
      <CookieConsent onVisibilityChange={setCookieVisible} />
    </>
  );
}

/* ─── PHONE FAB ─────────────────────────────────────────── */
function PhoneFab({ stickyVisible, cookieVisible }: { stickyVisible: boolean; cookieVisible: boolean }) {
  // Stack: cookie (≈72px) → sticky (74px) → phone fab
  // On mobile when both visible: bottom = cookie(72) + sticky(74) + gaps
  let bottom = "20px";
  if (stickyVisible && cookieVisible) bottom = "calc(74px + 72px + 20px)";
  else if (stickyVisible) bottom = "calc(74px + 12px)";
  else if (cookieVisible) bottom = "calc(72px + 20px)";

  return (
    <a
      href="tel:+33664025668"
      aria-label="Appeler Milla Barton"
      className="phone-fab"
      style={{ bottom }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
    </a>
  );
}

/* ─── COOKIE CONSENT ────────────────────────────────────── */
function CookieConsent({ onVisibilityChange }: { onVisibilityChange: (v: boolean) => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-consent");
    if (!accepted) {
      const t = setTimeout(() => { setVisible(true); onVisibilityChange(true); }, 800);
      return () => clearTimeout(t);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function dismiss(choice: "accepted" | "declined") {
    localStorage.setItem("cookie-consent", choice);
    setVisible(false);
    onVisibilityChange(false);
    if (choice === "accepted" && typeof window.gtagEvent === "function") {
      window.gtagEvent("consent_granted", { consent_type: "analytics" });
    }
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-inner">
        <p className="cookie-text">
          Nous utilisons des cookies pour analyser le trafic et améliorer votre expérience.{" "}
          <a href="/politique-confidentialite" className="cookie-link">En savoir plus</a>
        </p>
        <div className="cookie-actions">
          <button className="cookie-decline" onClick={() => dismiss("declined")}>Refuser</button>
          <button className="cookie-accept" onClick={() => dismiss("accepted")}>Accepter</button>
        </div>
      </div>
    </div>
  );
}
