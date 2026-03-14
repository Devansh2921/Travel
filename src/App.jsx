import React, { useState, useEffect, useRef } from "react";
import logo from "./assets/logo.png";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import DestinationCarousel from "./components/DestinationCarousel";
import DestinationPage from "./pages/DestinationPage";
import AboutPage from "./pages/AboutPage";
import destinations from "./data/destinations";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────

const COLORS = {
  primary: "#1E3A8A",
  primaryLight: "#3B82F6",
  secondary: "#F97316",
  secondaryLight: "#FB923C",
  dark: "#1a1a2e",
  muted: "#64748b",
  bg: "#ffffff",
  bgAlt: "#f1f5f9",
  bgAlt2: "#e2e8f0",
  cardBg: "#ffffff",
};

const CLAY = {
  card: {
    background: COLORS.cardBg,
    borderRadius: 20,
    boxShadow: "8px 8px 20px rgba(0,0,0,0.06), -4px -4px 12px rgba(255,255,255,0.8), inset 1px 1px 2px rgba(255,255,255,0.6)",
    border: "1px solid rgba(0,0,0,0.04)",
  },
  cardHover: {
    boxShadow: "10px 10px 28px rgba(30,58,138,0.12), -4px -4px 12px rgba(255,255,255,0.9), inset 1px 1px 2px rgba(255,255,255,0.6)",
    border: `1px solid rgba(30,58,138,0.15)`,
  },
};

// ─── DATA ────────────────────────────────────────────────────────────────────

const testimonials = [
  { name: "Priya Sharma", role: "Honeymooner", text: "WE PLAN TRIPS curated the most magical Bali itinerary for us. Every detail was perfect — the private villa, sunset dinner, cultural tours. Absolutely unforgettable.", avatar: "PS", rating: 5 },
  { name: "Rahul Mehta", role: "Adventure Traveller", text: "The Northern Lights trip exceeded all expectations. Waking up to aurora borealis in a glass igloo was life-changing. WE PLAN TRIPS made it effortless.", avatar: "RM", rating: 5 },
  { name: "Sneha & Arjun", role: "Anniversary Couple", text: "Greece was a dream! Santorini's blue domes, Mykonos nights — WE PLAN TRIPS's premium service made our anniversary genuinely special.", avatar: "SA", rating: 5 },
  { name: "Vikram Nair", role: "Solo Explorer", text: "Japan solo trip with WE PLAN TRIPS was flawlessly planned. From cherry blossoms in Kyoto to ramen in Tokyo — every recommendation was spot on.", avatar: "VN", rating: 5 },
];

const heroDestinations = [
  { name: "Bali", country: "Indonesia", tagline: "Island of the Gods", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&q=90", slug: "bali" },
  { name: "Dubai", country: "UAE", tagline: "City of Gold & Grandeur", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=90", slug: "dubai" },
  { name: "Northern Lights", country: "Scandinavia", tagline: "Nature's Greatest Light Show", img: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1600&q=90", slug: "northern-lights" },
  { name: "Japan", country: "Japan", tagline: "Where Tradition Meets Tomorrow", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600&q=90", slug: "japan" },
  { name: "Greece", country: "Greece", tagline: "Sunsets Over the Aegean", img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1600&q=90", slug: "greece" },
];

// ─── UTILS ───────────────────────────────────────────────────────────────────

const useScrollAnimation = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    { name: "About Us", href: "/about" },
    { name: "Holiday Packages", href: "/#packages" },
    { name: "Contact", href: "/#contact" },
  ];
  return (
    <nav style={{
      fontFamily: "'Montserrat', sans-serif",
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      transition: "all 0.4s",
      background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(30,58,138,0.1)" : "none",
      boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.06)" : "none",
      padding: "0 5vw",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <img src={logo} alt="We Plan Trips" className="nav-logo" style={{ height: 52, width: "auto", objectFit: "contain" }} />
          <span className="nav-brand" style={{ color: scrolled ? COLORS.primary : "#fff", fontSize: 18, fontWeight: 700, letterSpacing: 2, fontFamily: "'Montserrat', sans-serif", transition: "color 0.3s" }}>WE PLAN TRIPS</span>
        </Link>
        {/* Desktop Links */}
        <div style={{ display: "flex", gap: 36, alignItems: "center" }} className="desktop-nav">
          {links.map(l => (
            <a key={l.name} href={l.href} style={{
              color: scrolled ? COLORS.primary : "rgba(255,255,255,0.9)",
              textDecoration: "none", fontSize: 13, letterSpacing: 2,
              fontFamily: "'Montserrat', sans-serif", fontWeight: 600,
              transition: "color 0.3s", textTransform: "uppercase",
            }}
              onMouseOver={e => e.target.style.color = COLORS.secondary}
              onMouseOut={e => e.target.style.color = scrolled ? COLORS.primary : "rgba(255,255,255,0.9)"}>{l.name}</a>
          ))}
        </div>
        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          display: "none", background: "none", border: "none",
          color: scrolled ? COLORS.primary : "#fff", fontSize: 24, cursor: "pointer",
          transition: "color 0.3s",
        }} className="hamburger">☰</button>
      </div>
      {menuOpen && (
        <div style={{
          background: "rgba(255,255,255,0.98)", padding: "16px 0",
          borderTop: `1px solid ${COLORS.bgAlt2}`,
          borderRadius: "0 0 16px 16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}>
          {links.map(l => <a key={l.name} href={l.href} onClick={() => setMenuOpen(false)} style={{
            display: "block", color: COLORS.primary, padding: "14px 24px",
            textDecoration: "none", fontSize: 14, letterSpacing: 2,
            fontFamily: "'Montserrat', sans-serif", fontWeight: 600,
            textTransform: "uppercase", transition: "background 0.2s",
          }}
            onMouseOver={e => e.target.style.background = COLORS.bgAlt}
            onMouseOut={e => e.target.style.background = "transparent"}>{l.name}</a>)}
        </div>
      )}
      <style>{`
        @media(max-width:768px){ .desktop-nav{display:none!important} .hamburger{display:block!important} }
      `}</style>
    </nav>
  );
}

// ─── HERO DESTINATIONS ───────────────────────────────────────────────────────

function HeroDestinations() {
  const [slide, setSlide] = useState(0);
  const [fade, setFade] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => { setSlide(s => (s + 1) % heroDestinations.length); setFade(true); }, 600);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const goToSlide = (i) => {
    if (i === slide) return;
    setFade(false);
    setTimeout(() => { setSlide(i); setFade(true); }, 300);
  };

  const d = heroDestinations[slide];

  return (
    <section style={{ position: "relative", height: "100vh", minHeight: 650, overflow: "hidden" }}>
      {/* Current slide bg */}
      <div style={{ position: "absolute", inset: 0, transition: "opacity 0.8s ease", opacity: fade ? 1 : 0 }}>
        <img src={d.img} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="eager" />
      </div>

      {/* Gradient overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.55) 100%)" }} />

      {/* Slide content */}
      <div style={{
        position: "relative", zIndex: 4, height: "100%", display: "flex",
        flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "0 20px",
      }}>
        <div style={{
          fontSize: 12, letterSpacing: 6, color: COLORS.secondary,
          fontFamily: "'Montserrat', sans-serif", fontWeight: 700,
          marginBottom: 14, textTransform: "uppercase",
          opacity: fade ? 1 : 0, transition: "opacity 0.6s", transitionDelay: "0.2s",
        }}>
          ✦ {d.country} ✦
        </div>

        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(48px, 8vw, 100px)", color: "#fff",
          lineHeight: 1.0, fontWeight: 700, marginBottom: 14,
          textShadow: "0 4px 30px rgba(0,0,0,0.3)",
          opacity: fade ? 1 : 0, transform: fade ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s ease", transitionDelay: "0.15s",
        }}>
          {d.name}
        </h1>

        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "clamp(15px, 2vw, 20px)", color: "rgba(255,255,255,0.85)",
          maxWidth: 500, lineHeight: 1.6, marginBottom: 32,
          opacity: fade ? 1 : 0, transition: "opacity 0.6s", transitionDelay: "0.3s",
        }}>
          {d.tagline}
        </p>

        <button className="hero-cta-btn" onClick={() => navigate(`/destination/${d.slug}`)} style={{
          display: "inline-block",
          background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
          color: "#fff", padding: "14px 40px", borderRadius: 50,
          border: "none", cursor: "pointer",
          fontFamily: "'Montserrat', sans-serif", fontSize: 13,
          fontWeight: 700, letterSpacing: 3, textTransform: "uppercase",
          boxShadow: "0 8px 30px rgba(30,58,138,0.4)",
          transition: "transform 0.2s, box-shadow 0.2s",
          opacity: fade ? 1 : 0, transitionDelay: "0.4s",
        }}
          onMouseOver={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 12px 40px rgba(30,58,138,0.6)"; }}
          onMouseOut={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 8px 30px rgba(30,58,138,0.4)"; }}>
          Explore Destination
        </button>
      </div>

      {/* Side navigation: vertical dots */}
      <div className="hero-side-dots" style={{
        position: "absolute", right: 40, top: "50%", transform: "translateY(-50%)",
        display: "flex", flexDirection: "column", gap: 14, zIndex: 10,
      }}>
        {heroDestinations.map((dest, i) => (
          <button key={i} onClick={() => goToSlide(i)} style={{
            width: i === slide ? 14 : 10,
            height: i === slide ? 14 : 10,
            borderRadius: "50%",
            background: i === slide ? COLORS.secondary : "rgba(255,255,255,0.5)",
            border: i === slide ? `2px solid #fff` : "2px solid transparent",
            cursor: "pointer",
            transition: "all 0.3s",
            boxShadow: i === slide ? "0 0 12px rgba(249,115,22,0.6)" : "none",
          }}
            title={dest.name}
          />
        ))}
      </div>

      {/* Bottom destination name ticker */}
      <div className="hero-ticker" style={{
        position: "absolute", bottom: 100, left: 0, right: 0, zIndex: 5,
        display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap", padding: "0 20px",
      }}>
        {heroDestinations.map((dest, i) => (
          <button key={dest.slug} onClick={() => goToSlide(i)} className="hero-ticker-btn" style={{
            padding: "8px 20px", borderRadius: 50,
            background: i === slide ? "rgba(255,255,255,0.2)" : "transparent",
            backdropFilter: i === slide ? "blur(10px)" : "none",
            border: i === slide ? "1px solid rgba(255,255,255,0.4)" : "1px solid rgba(255,255,255,0.15)",
            color: i === slide ? "#fff" : "rgba(255,255,255,0.6)",
            fontFamily: "'Montserrat', sans-serif", fontSize: 11,
            fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
            cursor: "pointer", transition: "all 0.3s",
          }}
            onMouseOver={e => { if (i !== slide) e.target.style.color = "#fff"; }}
            onMouseOut={e => { if (i !== slide) e.target.style.color = "rgba(255,255,255,0.6)"; }}>
            {dest.name}
          </button>
        ))}
      </div>

      {/* Slide counter */}
      <div className="hero-counter" style={{
        position: "absolute", bottom: 50, left: "50%", transform: "translateX(-50%)",
        fontFamily: "'Montserrat', sans-serif", fontSize: 12, letterSpacing: 3,
        color: "rgba(255,255,255,0.5)", zIndex: 5,
      }}>
        {String(slide + 1).padStart(2, "0")} / {String(heroDestinations.length).padStart(2, "0")}
      </div>
    </section>
  );
}

// ─── SEARCH BAR ──────────────────────────────────────────────────────────────

function SearchBar() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  const results = query.length > 0
    ? destinations.filter(d => d.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : [];

  return (
    <div className="search-wrapper" style={{
      position: "relative", zIndex: 20, marginTop: -36,
      display: "flex", justifyContent: "center", padding: "0 20px",
    }}>
      <div className="search-bar" style={{
        ...CLAY.card,
        borderRadius: 60, padding: "8px 8px 8px 32px",
        display: "flex", alignItems: "center", gap: 12,
        width: "100%", maxWidth: 680,
        boxShadow: "0 12px 40px rgba(30,58,138,0.1), 0 4px 12px rgba(0,0,0,0.04), inset 1px 1px 2px rgba(255,255,255,0.6)",
        position: "relative",
      }}>
        {/* Search icon */}
        <span style={{ fontSize: 20, color: COLORS.muted }}>🔍</span>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          placeholder="Search your dream destination..."
          style={{
            flex: 1, border: "none", outline: "none", background: "transparent",
            fontFamily: "'Montserrat', sans-serif", fontSize: 15, color: COLORS.dark,
            padding: "12px 0", minWidth: 0,
          }}
        />
        <button className="search-btn" style={{
          background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
          color: "#fff", border: "none", borderRadius: 50,
          padding: "12px 32px", fontFamily: "'Montserrat', sans-serif",
          fontSize: 13, fontWeight: 700, letterSpacing: 2,
          textTransform: "uppercase", cursor: "pointer",
          boxShadow: "0 4px 16px rgba(30,58,138,0.3)",
          transition: "transform 0.2s, box-shadow 0.2s",
          whiteSpace: "nowrap",
        }}
          onMouseOver={e => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 6px 20px rgba(30,58,138,0.45)"; }}
          onMouseOut={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 16px rgba(30,58,138,0.3)"; }}
          onClick={() => { if (results.length > 0) navigate(`/destination/${results[0].slug}`); }}
        >
          Search
        </button>

        {/* Dropdown results */}
        {focused && results.length > 0 && (
          <div style={{
            position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0,
            ...CLAY.card, borderRadius: 20, padding: "8px 0",
            boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
            maxHeight: 300, overflow: "auto",
          }}>
            {results.map(d => (
              <button key={d.slug}
                onMouseDown={() => { setQuery(""); navigate(`/destination/${d.slug}`); }}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  width: "100%", padding: "12px 24px", border: "none",
                  background: "transparent", cursor: "pointer",
                  fontFamily: "'Montserrat', sans-serif", fontSize: 14,
                  color: COLORS.dark, textAlign: "left", transition: "background 0.2s",
                }}
                onMouseOver={e => e.currentTarget.style.background = COLORS.bgAlt}
                onMouseOut={e => e.currentTarget.style.background = "transparent"}
              >
                <img src={d.cardImg} alt={d.name} style={{ width: 44, height: 44, borderRadius: 12, objectFit: "cover" }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{d.name}</div>
                  <div style={{ fontSize: 11, color: COLORS.muted, letterSpacing: 1 }}>{d.country} · {d.packages.length} packages</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SECTION TITLE ───────────────────────────────────────────────────────────

function SectionTitle({ tag, title, sub }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 60 }}>
      <div style={{ fontSize: 11, letterSpacing: 5, color: COLORS.primary, fontFamily: "'Montserrat', sans-serif", fontWeight: 700, textTransform: "uppercase", marginBottom: 12 }}>{tag}</div>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 5vw, 58px)", color: COLORS.dark, fontWeight: 700, lineHeight: 1.1, marginBottom: 16 }}>{title}</h2>
      {sub && <p style={{ fontFamily: "'Montserrat', sans-serif", color: COLORS.muted, fontSize: 15, maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>{sub}</p>}
    </div>
  );
}

// ─── DESTINATION GALLERY (Scrollable Mosaic) ─────────────────────────────────

const galleryDestinations = [
  { name: "Bali", slug: "bali", tag: "Romance", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=85" },
  { name: "Dubai", slug: "dubai", tag: "Luxury", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=85" },
  { name: "Northern Lights", slug: "northern-lights", tag: "Magical", img: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=900&q=85" },
  { name: "Japan", slug: "japan", tag: "Culture", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=900&q=85" },
  { name: "Greece", slug: "greece", tag: "History", img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=900&q=85" },
  { name: "Switzerland", slug: "switzerland", tag: "Scenic", img: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=900&q=85" },
  { name: "Turkey", slug: "turkey", tag: "Heritage", img: "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=900&q=85" },
  { name: "Thailand", slug: "thailand", tag: "Exotic", img: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=900&q=85" },
  { name: "Paris", slug: "paris", tag: "Romance", img: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=900&q=85" },
];

// Each "slide" shows 3 destinations in the mosaic frames
function getSlideGroup(index) {
  const len = galleryDestinations.length;
  return [
    galleryDestinations[index % len],
    galleryDestinations[(index + 1) % len],
    galleryDestinations[(index + 2) % len],
  ];
}

function GalleryFrame({ dest, style: extraStyle }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/destination/${dest.slug}`)}
      style={{
        ...extraStyle,
        position: "relative", overflow: "hidden", cursor: "pointer",
        borderRadius: 24,
        boxShadow: "8px 8px 24px rgba(0,0,0,0.08), -4px -4px 14px rgba(255,255,255,0.7), inset 1px 1px 2px rgba(255,255,255,0.5)",
        border: "1px solid rgba(0,0,0,0.04)",
        transition: "box-shadow 0.3s, border 0.3s",
      }}
      onMouseOver={e => {
        e.currentTarget.style.boxShadow = "12px 12px 32px rgba(30,58,138,0.16), -4px -4px 16px rgba(255,255,255,0.9)";
        e.currentTarget.style.border = "1px solid rgba(30,58,138,0.2)";
        const img = e.currentTarget.querySelector(".gf-img");
        if (img) img.style.transform = "scale(1.06)";
        const ov = e.currentTarget.querySelector(".gf-hover");
        if (ov) ov.style.opacity = "1";
      }}
      onMouseOut={e => {
        e.currentTarget.style.boxShadow = "8px 8px 24px rgba(0,0,0,0.08), -4px -4px 14px rgba(255,255,255,0.7), inset 1px 1px 2px rgba(255,255,255,0.5)";
        e.currentTarget.style.border = "1px solid rgba(0,0,0,0.04)";
        const img = e.currentTarget.querySelector(".gf-img");
        if (img) img.style.transform = "scale(1)";
        const ov = e.currentTarget.querySelector(".gf-hover");
        if (ov) ov.style.opacity = "0";
      }}
    >
      <img className="gf-img" src={dest.img} alt={dest.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }} loading="lazy" />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 45%, transparent 100%)" }} />
      <div className="gf-hover" style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(30,58,138,0.3), rgba(249,115,22,0.12))", opacity: 0, transition: "opacity 0.4s" }} />
      {/* Tag */}
      <div style={{ position: "absolute", top: 16, right: 16, background: COLORS.secondary, padding: "6px 16px", borderRadius: 50 }}>
        <span style={{ color: "#fff", fontSize: 10, fontFamily: "'Montserrat', sans-serif", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>{dest.tag}</span>
      </div>
      {/* Text */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "22px 24px" }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 2.2vw, 32px)", color: "#fff", fontWeight: 700, lineHeight: 1.15, marginBottom: 4, textShadow: "0 2px 12px rgba(0,0,0,0.35)" }}>{dest.name}</h3>
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.75)", fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 6 }}>
          <span>Explore</span><span style={{ fontSize: 14 }}>→</span>
        </div>
      </div>
    </div>
  );
}

function DestinationGallery() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [manualCount, setManualCount] = useState(0);
  const autoRef = useRef(null);

  const totalSlides = galleryDestinations.length;

  const goTo = (newIndex, isManual = false) => {
    setFade(false);
    setTimeout(() => {
      setSlideIndex(((newIndex % totalSlides) + totalSlides) % totalSlides);
      setFade(true);
      if (isManual) setManualCount(c => c + 1);
    }, 350);
  };

  // Auto-scroll after 2 manual interactions
  useEffect(() => {
    if (manualCount >= 2) {
      autoRef.current = setInterval(() => {
        goTo(slideIndex + 1);
      }, 4000);
      return () => clearInterval(autoRef.current);
    }
  }, [manualCount, slideIndex]);

  const group = getSlideGroup(slideIndex);

  // Prev / Next arrow style
  const arrowStyle = {
    position: "absolute", top: "50%", transform: "translateY(-50%)", zIndex: 10,
    width: 48, height: 48, borderRadius: "50%",
    background: "rgba(255,255,255,0.9)", border: "1px solid rgba(0,0,0,0.06)",
    boxShadow: "4px 4px 14px rgba(0,0,0,0.08), -2px -2px 8px rgba(255,255,255,0.7)",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", fontSize: 20, color: COLORS.primary,
    transition: "all 0.25s",
  };

  return (
    <section id="packages" style={{ background: COLORS.bg, padding: "90px 5vw" }}>
      <SectionTitle tag="✦ Explore Destinations" title="Travel Gallery" sub="Click on any destination to discover curated packages and plan your dream trip." />

      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
        {/* Prev Arrow */}
        <button
          onClick={() => goTo(slideIndex - 1, true)}
          style={{ ...arrowStyle, left: -24 }}
          onMouseOver={e => { e.currentTarget.style.background = COLORS.primary; e.currentTarget.style.color = "#fff"; }}
          onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,0.9)"; e.currentTarget.style.color = COLORS.primary; }}
        >←</button>

        {/* Next Arrow */}
        <button
          onClick={() => goTo(slideIndex + 1, true)}
          style={{ ...arrowStyle, right: -24 }}
          onMouseOver={e => { e.currentTarget.style.background = COLORS.primary; e.currentTarget.style.color = "#fff"; }}
          onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,0.9)"; e.currentTarget.style.color = COLORS.primary; }}
        >→</button>

        {/* 3-frame mosaic: 1 large left + 2 stacked right */}
        <div className="gallery-mosaic" style={{
          display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20,
          opacity: fade ? 1 : 0, transform: fade ? "scale(1)" : "scale(0.97)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}>
          {/* Frame 1: Large */}
          <GalleryFrame dest={group[0]} style={{ height: 480 }} />
          {/* Frame 2 & 3: Stacked */}
          <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: 20 }}>
            <GalleryFrame dest={group[1]} style={{ height: "100%" }} />
            <GalleryFrame dest={group[2]} style={{ height: "100%" }} />
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 32 }}>
          {galleryDestinations.map((_, i) => (
            <button key={i} onClick={() => goTo(i, true)} style={{
              width: i === slideIndex ? 28 : 10, height: 10, borderRadius: 50,
              background: i === slideIndex ? COLORS.primary : COLORS.bgAlt2,
              border: "none", cursor: "pointer", transition: "all 0.3s",
            }} />
          ))}
        </div>

        {/* Auto-scroll hint */}
        {manualCount < 2 && (
          <p style={{
            textAlign: "center", marginTop: 14,
            fontFamily: "'Montserrat', sans-serif", fontSize: 11,
            color: COLORS.muted, letterSpacing: 1,
          }}>
            Use arrows to browse · auto-play starts after a few scrolls
          </p>
        )}
      </div>


    </section>
  );
}

// ─── EXPERIENCES ─────────────────────────────────────────────────────────────

function Experiences() {
  const [ref, visible] = useScrollAnimation();
  const items = [
    { icon: "🏄", title: "Special Activities", desc: "Snorkeling, hiking, skydiving — we book the extraordinary." },
    { icon: "🗺️", title: "Private Travel Planning", desc: "Bespoke itineraries crafted around your every preference." },
    { icon: "🏨", title: "Luxury Tours", desc: "Curated stays at the world's finest hotels and resorts." },
    { icon: "🌍", title: "Best Destinations", desc: "Expertly vetted bucket-list destinations across 40+ countries." },
  ];
  return (
    <section ref={ref} id="tours" style={{ background: COLORS.bgAlt, padding: "90px 5vw" }}>
      <SectionTitle tag="✦ Why Choose Us" title="The WE PLAN TRIPS Experience" />
      <div className="experiences-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 28 }}>
        {items.map((item, i) => (
          <div key={item.title} style={{
            ...CLAY.card,
            padding: "40px 30px", textAlign: "center",
            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: `all 0.6s ${i * 0.12}s`, cursor: "default",
          }}
            onMouseOver={e => { Object.assign(e.currentTarget.style, CLAY.cardHover); e.currentTarget.style.transform = "translateY(-6px)"; }}
            onMouseOut={e => { e.currentTarget.style.boxShadow = CLAY.card.boxShadow; e.currentTarget.style.border = CLAY.card.border; e.currentTarget.style.transform = "translateY(0)"; }}>
            <div style={{ fontSize: 50, marginBottom: 20 }}>{item.icon}</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: COLORS.dark, fontWeight: 600, marginBottom: 12 }}>{item.title}</h3>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, color: COLORS.muted, lineHeight: 1.7 }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── PROMO BANNER ─────────────────────────────────────────────────────────────

function PromoBanner() {
  return (
    <section style={{ position: "relative", overflow: "hidden", height: 380, borderRadius: 0 }}>
      <img src="https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=1600&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(30,58,138,0.88), rgba(15,23,42,0.8))` }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", textAlign: "center", padding: "0 20px" }}>
        <div style={{ fontSize: 11, letterSpacing: 5, color: "rgba(255,255,255,0.7)", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, textTransform: "uppercase", marginBottom: 12 }}>LIMITED TIME OFFER</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(48px, 9vw, 110px)", color: "#fff", fontWeight: 700, lineHeight: 0.95, marginBottom: 8 }}>37% Off</h2>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.8)", marginBottom: 32, letterSpacing: 1 }}>Last Minute Travel Deals — Book Before They're Gone</p>
        <a href="#" style={{
          display: "inline-block", background: "#fff", color: COLORS.primary,
          padding: "14px 44px", borderRadius: 50, textDecoration: "none",
          fontFamily: "'Montserrat', sans-serif", fontSize: 12, fontWeight: 700,
          letterSpacing: 3, textTransform: "uppercase",
          transition: "transform 0.2s, box-shadow 0.2s",
          boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
        }}
          onMouseOver={e => { e.target.style.transform = "translateY(-3px)"; }}
          onMouseOut={e => { e.target.style.transform = "translateY(0)"; }}>
          View Deals
        </a>
      </div>
    </section>
  );
}

// ─── VIDEO SECTION ────────────────────────────────────────────────────────────

function VideoSection() {
  return (
    <section style={{ position: "relative", height: 520, overflow: "hidden" }}>
      <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
      <div style={{ position: "absolute", inset: 0, background: "rgba(15,23,42,0.55)" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          border: "2px solid rgba(255,255,255,0.6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", marginBottom: 28, transition: "all 0.3s",
          backdropFilter: "blur(4px)",
        }}
          onMouseOver={e => { e.currentTarget.style.background = `${COLORS.primary}cc`; e.currentTarget.style.border = `2px solid ${COLORS.primary}`; }}
          onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.border = "2px solid rgba(255,255,255,0.6)"; }}>
          <span style={{ color: "#fff", fontSize: 26, paddingLeft: 6 }}>▶</span>
        </div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 5vw, 60px)", color: "#fff", fontWeight: 700, textAlign: "center" }}>Experience the Journey</h2>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.6)", letterSpacing: 2, marginTop: 12 }}>WATCH OUR TRAVEL STORY</p>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────

function Testimonials() {
  const [active, setActive] = useState(0);
  const [ref, visible] = useScrollAnimation();
  return (
    <section ref={ref} style={{ background: COLORS.bgAlt, padding: "90px 5vw" }}>
      <SectionTitle tag="✦ Guest Stories" title="What Our Travellers Say" />
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        {testimonials.map((t, i) => (
          <div key={t.name} style={{ display: i === active ? "block" : "none", textAlign: "center", opacity: visible ? 1 : 0, transition: "opacity 0.6s" }}>
            <div style={{ fontSize: 48, color: COLORS.primary, fontFamily: "'Cormorant Garamond', serif", lineHeight: 1, marginBottom: 20 }}>"</div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 3vw, 26px)", color: COLORS.dark, lineHeight: 1.6, fontStyle: "italic", marginBottom: 36 }}>{t.text}</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, color: "#fff", fontSize: 14 }}>{t.avatar}</div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontFamily: "'Montserrat', sans-serif", color: COLORS.dark, fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", color: COLORS.muted, fontSize: 11, letterSpacing: 2 }}>{t.role}</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 16 }}>
              {"★★★★★".split("").map((s, j) => <span key={j} style={{ color: COLORS.secondary, fontSize: 16 }}>{s}</span>)}
            </div>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 36 }}>
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              width: i === active ? 28 : 10, height: 10, borderRadius: 5,
              background: i === active ? COLORS.primary : COLORS.bgAlt2,
              border: "none", cursor: "pointer", transition: "all 0.3s",
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── STATS ────────────────────────────────────────────────────────────────────

function Stats() {
  const [ref, visible] = useScrollAnimation();
  const items = [
    { val: "50K+", label: "Happy Travellers" },
    { val: "120+", label: "Destinations" },
    { val: "400+", label: "Packages" },
    { val: "4.9★", label: "Average Rating" },
  ];
   return (
    <section ref={ref} className="stats-section" style={{
      background: `linear-gradient(135deg, ${COLORS.primary}, #2563eb)`,
      padding: "70px 5vw",
    }}>
      <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 20, maxWidth: 900, margin: "0 auto" }}>
        {items.map((s, i) => (
          <div key={s.label} style={{ textAlign: "center", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: `all 0.5s ${i * 0.1}s` }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(38px, 5vw, 56px)", color: "#fff", fontWeight: 700 }}>{s.val}</div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: 2, textTransform: "uppercase", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── CONTACT SECTION ─────────────────────────────────────────────────────────

function ContactSection() {
  return (
    <section id="contact" style={{ background: COLORS.bg, padding: "90px 5vw" }}>
      <SectionTitle tag="✦ Get In Touch" title="Contact Us" sub="Have a question or ready to plan your next adventure? Reach out to us." />
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <div className="contact-card" style={{
          ...CLAY.card,
          padding: "40px 36px",
        }}>
          <div style={{ display: "grid", gap: 20 }}>
            <div>
              <label style={{ display: "block", fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 2, color: COLORS.primary, textTransform: "uppercase", marginBottom: 8 }}>Name</label>
              <input placeholder="Your name" style={{
                width: "100%", padding: "14px 18px", borderRadius: 14,
                border: `1px solid ${COLORS.bgAlt2}`, background: COLORS.bgAlt,
                fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: COLORS.dark,
                outline: "none", transition: "border 0.3s", boxSizing: "border-box",
              }}
                onFocus={e => e.target.style.borderColor = COLORS.primary}
                onBlur={e => e.target.style.borderColor = COLORS.bgAlt2}
              />
            </div>
            <div>
              <label style={{ display: "block", fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 2, color: COLORS.primary, textTransform: "uppercase", marginBottom: 8 }}>Email</label>
              <input placeholder="your@email.com" type="email" style={{
                width: "100%", padding: "14px 18px", borderRadius: 14,
                border: `1px solid ${COLORS.bgAlt2}`, background: COLORS.bgAlt,
                fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: COLORS.dark,
                outline: "none", transition: "border 0.3s", boxSizing: "border-box",
              }}
                onFocus={e => e.target.style.borderColor = COLORS.primary}
                onBlur={e => e.target.style.borderColor = COLORS.bgAlt2}
              />
            </div>
            <div>
              <label style={{ display: "block", fontFamily: "'Montserrat', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 2, color: COLORS.primary, textTransform: "uppercase", marginBottom: 8 }}>Message</label>
              <textarea placeholder="Tell us about your dream trip..." rows={4} style={{
                width: "100%", padding: "14px 18px", borderRadius: 14,
                border: `1px solid ${COLORS.bgAlt2}`, background: COLORS.bgAlt,
                fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: COLORS.dark,
                outline: "none", transition: "border 0.3s", resize: "vertical", boxSizing: "border-box",
              }}
                onFocus={e => e.target.style.borderColor = COLORS.primary}
                onBlur={e => e.target.style.borderColor = COLORS.bgAlt2}
              />
            </div>
            <button style={{
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
              color: "#fff", border: "none", padding: "14px 36px", borderRadius: 50,
              fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 700,
              letterSpacing: 3, textTransform: "uppercase", cursor: "pointer",
              boxShadow: "0 6px 20px rgba(30,58,138,0.3)", transition: "all 0.2s",
            }}
              onMouseOver={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 10px 28px rgba(30,58,138,0.4)"; }}
              onMouseOut={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 6px 20px rgba(30,58,138,0.3)"; }}>
              Send Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ background: "#0f172a", borderTop: "none", padding: "70px 5vw 30px" }}>
      <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 40, marginBottom: 50 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <img src={logo} alt="We Plan Trips" style={{ height: 44, width: "auto", objectFit: "contain" }} />
            <span style={{ fontFamily: "'Montserrat', sans-serif", color: "#fff", fontSize: 16, fontWeight: 700, letterSpacing: 2 }}>WE PLAN TRIPS</span>
          </div>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>Curating extraordinary journeys across the globe since 2015. Your world, your way.</p>
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            {["𝕏", "f", "in", "📷"].map(s => (
              <div key={s} style={{
                width: 36, height: 36, borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "rgba(255,255,255,0.5)", fontSize: 14,
                transition: "all 0.2s",
              }}
                onMouseOver={e => { e.currentTarget.style.border = `1px solid ${COLORS.primary}`; e.currentTarget.style.color = COLORS.primaryLight; }}
                onMouseOut={e => { e.currentTarget.style.border = "1px solid rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}>
                {s}
              </div>
            ))}
          </div>
        </div>
        {[
          { title: "Popular Destinations", links: ["Bali", "Dubai", "Japan", "Greece", "Switzerland", "Thailand", "Turkey"] },
          { title: "Travel Packages", links: ["Honeymoon Packages", "Adventure Tours", "Family Holidays", "Solo Travel", "Luxury Retreats"] },
          { title: "Company", links: ["About WE PLAN TRIPS", "Blog", "Careers", "Press", "Contact Us", "Privacy Policy"] },
        ].map(col => (
          <div key={col.title}>
            <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: COLORS.primaryLight, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, marginBottom: 18 }}>{col.title}</h4>
            {col.links.map(l => (
              <a key={l} href="#" style={{
                display: "block", fontFamily: "'Montserrat', sans-serif",
                fontSize: 13, color: "rgba(255,255,255,0.45)",
                textDecoration: "none", marginBottom: 10, transition: "color 0.2s",
              }}
                onMouseOver={e => e.target.style.color = COLORS.primaryLight}
                onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.45)"}>{l}</a>
            ))}
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.3)" }}>© 2026 WE PLAN TRIPS. All rights reserved.</p>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.3)" }}>Crafted with ✦ for the curious traveller</p>
      </div>
    </footer>
  );
}

// ─── LEAD OVERLAY ────────────────────────────────────────────────────────────

function LeadOverlay() {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", destination: "" });

  useEffect(() => {
    // Show overlay after 1.5s delay on first load
    const shown = sessionStorage.getItem("leadShown");
    if (!shown) {
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const handleClose = () => {
    setVisible(false);
    sessionStorage.setItem("leadShown", "1");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend yet — just log and show thank-you
    console.log("Lead captured:", form);
    setSubmitted(true);
    setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("leadShown", "1");
    }, 2200);
  };

  if (!visible) return null;

  const inputStyle = {
    width: "100%", padding: "14px 18px", borderRadius: 14,
    border: `1px solid ${COLORS.bgAlt2}`, background: COLORS.bgAlt,
    fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: COLORS.dark,
    outline: "none", transition: "border 0.3s", boxSizing: "border-box",
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.45)",
      backdropFilter: "blur(6px)",
      animation: "fadeIn 0.4s ease",
    }} onClick={handleClose}>
      <div onClick={e => e.stopPropagation()} className="lead-overlay-card" style={{
        background: COLORS.bg,
        borderRadius: 28,
        padding: "40px 36px",
        width: "90%", maxWidth: 440,
        boxShadow: "16px 16px 40px rgba(0,0,0,0.12), -8px -8px 24px rgba(255,255,255,0.6), inset 2px 2px 4px rgba(255,255,255,0.5)",
        border: "1px solid rgba(0,0,0,0.04)",
        position: "relative",
        animation: "slideUp 0.5s ease",
      }}>
        {/* Close button */}
        <button onClick={handleClose} style={{
          position: "absolute", top: 16, right: 16,
          background: COLORS.bgAlt, border: "none", borderRadius: "50%",
          width: 36, height: 36, cursor: "pointer",
          fontSize: 18, color: COLORS.muted,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background 0.2s",
        }}
          onMouseOver={e => e.target.style.background = COLORS.bgAlt2}
          onMouseOut={e => e.target.style.background = COLORS.bgAlt}>
          ✕
        </button>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "30px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✈️</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: COLORS.dark, fontWeight: 700, marginBottom: 10 }}>Thank you!</h3>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: COLORS.muted }}>We'll get back to you with the best travel options soon.</p>
          </div>
        ) : (
          <>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ fontSize: 11, letterSpacing: 4, color: COLORS.secondary, fontFamily: "'Montserrat', sans-serif", fontWeight: 700, textTransform: "uppercase", marginBottom: 10 }}>✦ Plan Your Dream Trip</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, color: COLORS.dark, fontWeight: 700, lineHeight: 1.2 }}>Let's Start Planning</h3>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, color: COLORS.muted, marginTop: 8 }}>Share your details and we'll curate the perfect trip for you.</p>
            </div>
            <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
              <input required placeholder="Your name" value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = COLORS.primary}
                onBlur={e => e.target.style.borderColor = COLORS.bgAlt2} />
              <input required placeholder="Phone number" type="tel" value={form.phone}
                onChange={e => setForm({...form, phone: e.target.value})}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = COLORS.primary}
                onBlur={e => e.target.style.borderColor = COLORS.bgAlt2} />
              <input required placeholder="Email address" type="email" value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = COLORS.primary}
                onBlur={e => e.target.style.borderColor = COLORS.bgAlt2} />
              <input required placeholder="Where do you want to visit?" value={form.destination}
                onChange={e => setForm({...form, destination: e.target.value})}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = COLORS.primary}
                onBlur={e => e.target.style.borderColor = COLORS.bgAlt2} />
              <button type="submit" style={{
                background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
                color: "#fff", border: "none", padding: "15px 36px", borderRadius: 50,
                fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 700,
                letterSpacing: 3, textTransform: "uppercase", cursor: "pointer",
                boxShadow: "0 6px 20px rgba(30,58,138,0.3)", transition: "all 0.2s",
                marginTop: 4,
              }}
                onMouseOver={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 10px 28px rgba(30,58,138,0.4)"; }}
                onMouseOut={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 6px 20px rgba(30,58,138,0.3)"; }}>
                Submit
              </button>
            </form>
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

// ─── HOME PAGE ──────────────────────────────────────────────────────────────

function HomePage() {
  return (
    <>
      <HeroDestinations />
      <SearchBar />
      <div style={{ paddingTop: 40 }} />
      <DestinationCarousel destinations={destinations} />
      <Stats />
      <DestinationGallery />
      <Experiences />
      <PromoBanner />
      <VideoSection />
      <Testimonials />
      <ContactSection />
    </>
  );
}

// ─── APP ────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <BrowserRouter>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Montserrat:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{background:#ffffff;color:#1a1a2e;overflow-x:hidden;}
        ::-webkit-scrollbar{width:6px;}
        ::-webkit-scrollbar-track{background:#f1f5f9;}
        ::-webkit-scrollbar-thumb{background:#1E3A8A;border-radius:3px;}
        ::selection{background:rgba(30,58,138,0.2);}

        /* ─── MOBILE RESPONSIVE ──────────────────────── */
        @media(max-width: 768px) {
          /* Navbar */
          .nav-logo { height: 40px !important; }
          .nav-brand { font-size: 14px !important; letter-spacing: 1px !important; }

          /* Hero */
          .hero-side-dots { display: none !important; }
          .hero-ticker { bottom: 80px !important; gap: 6px !important; }
          .hero-ticker-btn { padding: 6px 12px !important; font-size: 9px !important; letter-spacing: 1px !important; }
          .hero-counter { bottom: 40px !important; font-size: 10px !important; }
          .hero-cta-btn { padding: 12px 28px !important; font-size: 11px !important; letter-spacing: 2px !important; }

          /* Search bar */
          .search-wrapper { padding: 0 12px !important; margin-top: -28px !important; }
          .search-bar { border-radius: 50px !important; padding: 6px 6px 6px 18px !important; gap: 8px !important; }
          .search-bar input { font-size: 13px !important; padding: 10px 0 !important; }
          .search-btn { padding: 10px 18px !important; font-size: 11px !important; letter-spacing: 1px !important; }

          /* Gallery mosaic */
          .gallery-mosaic { grid-template-columns: 1fr !important; gap: 14px !important; }
          .gallery-mosaic > div:first-child { height: 260px !important; }
          .gallery-mosaic > div:nth-child(2) { gap: 14px !important; }
          .gallery-mosaic > div:nth-child(2) > div { height: 200px !important; }
          #packages > div:nth-child(2) > button:first-child { left: 4px !important; width: 38px !important; height: 38px !important; font-size: 16px !important; }
          #packages > div:nth-child(2) > button:nth-child(2) { right: 4px !important; width: 38px !important; height: 38px !important; font-size: 16px !important; }

          /* Experiences */
          .experiences-grid { grid-template-columns: 1fr !important; gap: 16px !important; }

          /* Stats */
          .stats-section { padding: 50px 5vw !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 24px !important; }

          /* Contact */
          .contact-card { padding: 28px 20px !important; }

          /* Footer */
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }

          /* Promo banner & video section */
          section[style*="height: 380"] { height: 300px !important; }
          section[style*="height: 520"] { height: 380px !important; }

          /* Lead overlay */
          .lead-overlay-card { padding: 28px 20px !important; border-radius: 22px !important; }

          /* Section titles */
          section { padding-left: 4vw !important; padding-right: 4vw !important; }
        }

        @media(max-width: 480px) {
          /* Extra small devices */
          .hero-ticker { display: none !important; }
          .hero-counter { bottom: 30px !important; }
          .search-btn { padding: 10px 14px !important; font-size: 10px !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .gallery-mosaic > div:first-child { height: 200px !important; }
          .gallery-mosaic > div:nth-child(2) > div { height: 160px !important; }
        }
      `}</style>
      <Navbar />
      <LeadOverlay />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destination/:slug" element={<DestinationPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
