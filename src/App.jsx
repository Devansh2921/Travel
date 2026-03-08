import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import DestinationCarousel from "./components/DestinationCarousel";
import DestinationPage from "./pages/DestinationPage";
import AboutPage from "./pages/AboutPage";
import destinations from "./data/destinations";

// ─── DATA ────────────────────────────────────────────────────────────────────

const packages = [
  { destination: "Almaty", name: "City Charms & Natural Wonders", duration: "4 Nights", price: "₹45,000", img: "https://images.unsplash.com/photo-1586871608370-4adee64d1794?w=400&q=80" },
  { destination: "Almaty", name: "Issyk Lake, Canyons & Cultural Charms", duration: "4 Nights", price: "₹48,000", img: "https://images.unsplash.com/photo-1586871608370-4adee64d1794?w=400&q=80" },
  { destination: "Almaty", name: "Mountains, Culture & Scenic Wonders", duration: "5 Nights", price: "₹55,000", img: "https://images.unsplash.com/photo-1586871608370-4adee64d1794?w=400&q=80" },
  { destination: "Bali", name: "Romantic Escape | Ubud Culture", duration: "5N 6D", price: "₹62,000", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80" },
  { destination: "Bali", name: "Serene Escape | Love, Luxury & Adventure", duration: "5N 6D", price: "₹68,000", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80" },
  { destination: "Bali", name: "Island Romance | Traditions & Tropical Shores", duration: "6N 7D", price: "₹75,000", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80" },
  { destination: "Dubai", name: "Glamorous Escape | City Highlights & Luxury Cruise", duration: "4N 5D", price: "₹85,000", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80" },
  { destination: "Dubai", name: "Love in Dubai | Resort Luxury & Park Experiences", duration: "4N 5D", price: "₹90,000", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80" },
  { destination: "Dubai", name: "Arabian Honeymoon | Desert Dunes & Iconic Views", duration: "5N 6D", price: "₹1,05,000", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80" },
  { destination: "Northern Lights", name: "Scandinavian Splendour | Oslo & Tromsø", duration: "6N 7D", price: "₹1,45,000", img: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&q=80" },
  { destination: "Northern Lights", name: "Arctic Bliss | Lights & Fjord Landscapes", duration: "10N 11D", price: "₹2,20,000", img: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&q=80" },
  { destination: "Northern Lights", name: "Lapland Dreams | Helsinki to Rovaniemi", duration: "5N 6D", price: "₹1,30,000", img: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&q=80" },
  { destination: "Japan", name: "Cherry Blossom Trail | Tokyo & Kyoto", duration: "6N 7D", price: "₹1,10,000", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80" },
  { destination: "Japan", name: "Fuji & Osaka Adventure | Culture & Cuisine", duration: "7N 8D", price: "₹1,25,000", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80" },
  { destination: "Greece", name: "Santorini Romance | Sunsets & Aegean Blues", duration: "5N 6D", price: "₹1,20,000", img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&q=80" },
  { destination: "Greece", name: "Athens & Mykonos | Heritage & Beaches", duration: "7N 8D", price: "₹1,55,000", img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&q=80" },
  { destination: "Thailand", name: "Phuket Paradise | Beaches & Night Life", duration: "4N 5D", price: "₹55,000", img: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=400&q=80" },
  { destination: "Thailand", name: "Bangkok & Chiang Mai | Culture & Temples", duration: "6N 7D", price: "₹72,000", img: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=400&q=80" },
  { destination: "Switzerland", name: "Alpine Dream | Jungfrau & Interlaken", duration: "6N 7D", price: "₹1,65,000", img: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=400&q=80" },
  { destination: "Vietnam", name: "Ha Long Bay & Hanoi Discovery", duration: "5N 6D", price: "₹58,000", img: "https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=400&q=80" },
  { destination: "Mauritius", name: "Island Bliss | Beaches & Water Sports", duration: "5N 6D", price: "₹95,000", img: "https://images.unsplash.com/photo-1589197331516-4d84b72ebde3?w=400&q=80" },
  { destination: "Turkey", name: "Istanbul & Cappadocia | Hot Air & Heritage", duration: "6N 7D", price: "₹88,000", img: "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=400&q=80" },
];

const testimonials = [
  { name: "Priya Sharma", role: "Honeymooner", text: "ROAM curated the most magical Bali itinerary for us. Every detail was perfect — the private villa, sunset dinner, cultural tours. Absolutely unforgettable.", avatar: "PS", rating: 5 },
  { name: "Rahul Mehta", role: "Adventure Traveller", text: "The Northern Lights trip exceeded all expectations. Waking up to aurora borealis in a glass igloo was life-changing. ROAM made it effortless.", avatar: "RM", rating: 5 },
  { name: "Sneha & Arjun", role: "Anniversary Couple", text: "Greece was a dream! Santorini's blue domes, Mykonos nights — ROAM's premium service made our anniversary genuinely special.", avatar: "SA", rating: 5 },
  { name: "Vikram Nair", role: "Solo Explorer", text: "Japan solo trip with ROAM was flawlessly planned. From cherry blossoms in Kyoto to ramen in Tokyo — every recommendation was spot on.", avatar: "VN", rating: 5 },
];

const heroSlides = [
  { img: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1600&q=90", label: "Bali, Indonesia" },
  { img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=90", label: "Swiss Alps" },
  { img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&q=90", label: "Paris, France" },
  { img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=90", label: "Open Road" },
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
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Destinations", href: "/#destinations" },
    { name: "Tours", href: "/#tours" },
    { name: "Packages", href: "/#packages" }
  ];
  return (
    <nav style={{ fontFamily: "'Cormorant Garamond', serif", position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, transition: "all 0.4s", background: scrolled ? "rgba(10,8,6,0.92)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,107,44,0.15)" : "none", padding: "0 5vw" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 34, height: 34, background: "linear-gradient(135deg, #ff6b2c, #ff9a5c)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>✦</span>
          </div>
          <span style={{ color: "#fff", fontSize: 26, fontWeight: 700, letterSpacing: 4 }}>ROAM</span>
        </div>
        {/* Desktop Links */}
        <div style={{ display: "flex", gap: 36, alignItems: "center" }} className="desktop-nav">
          {links.map(l => (
            <a key={l.name} href={l.href} style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: 14, letterSpacing: 2, fontFamily: "'Montserrat', sans-serif", fontWeight: 500, transition: "color 0.2s" }}
              onMouseOver={e => e.target.style.color = "#ff6b2c"}
              onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.8)"}>{l.name}</a>
          ))}
          <button style={{ background: "none", border: "none", color: "rgba(255,255,255,0.8)", cursor: "pointer", fontSize: 18 }}>⌕</button>
        </div>
        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer" }} className="hamburger">☰</button>
      </div>
      {menuOpen && (
        <div style={{ background: "rgba(10,8,6,0.97)", padding: "16px 0", borderTop: "1px solid rgba(255,107,44,0.2)" }}>
          {links.map(l => <a key={l.name} href={l.href} onClick={() => setMenuOpen(false)} style={{ display: "block", color: "rgba(255,255,255,0.85)", padding: "12px 20px", textDecoration: "none", fontSize: 15, letterSpacing: 2, fontFamily: "'Montserrat', sans-serif" }}>{l.name}</a>)}
        </div>
      )}
      <style>{`
        @media(max-width:768px){ .desktop-nav{display:none!important} .hamburger{display:block!important} }
      `}</style>
    </nav>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function Hero() {
  const [slide, setSlide] = useState(0);
  const [fade, setFade] = useState(true);
  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => { setSlide(s => (s + 1) % heroSlides.length); setFade(true); }, 500);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ position: "relative", height: "100vh", minHeight: 600, overflow: "hidden" }}>
      {/* Slide bg */}
      <div style={{ position: "absolute", inset: 0, transition: "opacity 0.8s", opacity: fade ? 1 : 0 }}>
        <img src={heroSlides[slide].img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="eager" />
      </div>
      {/* Gradient overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,8,6,0.35) 0%, rgba(10,8,6,0.55) 60%, rgba(10,8,6,0.9) 100%)" }} />
      {/* Slide dots */}
      <div style={{ position: "absolute", bottom: 200, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 5 }}>
        {heroSlides.map((_, i) => (
          <button key={i} onClick={() => setSlide(i)} style={{ width: i === slide ? 28 : 8, height: 8, borderRadius: 4, background: i === slide ? "#ff6b2c" : "rgba(255,255,255,0.4)", border: "none", cursor: "pointer", transition: "all 0.3s" }} />
        ))}
      </div>
      {/* Content */}
      <div style={{ position: "relative", zIndex: 4, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 20px" }}>
        <div style={{ fontSize: 12, letterSpacing: 6, color: "#ff6b2c", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, marginBottom: 16, textTransform: "uppercase" }}>✦ Premium Travel Experiences ✦</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(42px, 7vw, 90px)", color: "#fff", lineHeight: 1.05, fontWeight: 700, marginBottom: 20, maxWidth: 900 }}>
          Explore the World<br /><em style={{ color: "#ff9a5c" }}>with ROAM</em>
        </h1>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(14px, 1.8vw, 18px)", color: "rgba(255,255,255,0.75)", maxWidth: 500, lineHeight: 1.7, marginBottom: 36 }}>
          Curated luxury travel experiences across the globe
        </p>
        <a href="#packages" style={{ display: "inline-block", background: "linear-gradient(135deg, #ff6b2c, #ff9a5c)", color: "#fff", padding: "14px 40px", borderRadius: 2, textDecoration: "none", fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", boxShadow: "0 8px 30px rgba(255,107,44,0.4)", transition: "transform 0.2s, box-shadow 0.2s" }}
          onMouseOver={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 12px 40px rgba(255,107,44,0.55)"; }}
          onMouseOut={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 8px 30px rgba(255,107,44,0.4)"; }}>
          Explore Packages
        </a>
      </div>
    </section>
  );
}

// ─── SECTION TITLE ───────────────────────────────────────────────────────────

function SectionTitle({ tag, title, sub }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 60 }}>
      <div style={{ fontSize: 11, letterSpacing: 5, color: "#ff6b2c", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, textTransform: "uppercase", marginBottom: 12 }}>{tag}</div>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 5vw, 58px)", color: "#fff", fontWeight: 700, lineHeight: 1.1, marginBottom: 16 }}>{title}</h2>
      {sub && <p style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(255,255,255,0.5)", fontSize: 15, maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>{sub}</p>}
    </div>
  );
}


// ─── PACKAGES ────────────────────────────────────────────────────────────────

function Packages() {
  const [ref, visible] = useScrollAnimation();
  const [active, setActive] = useState("All");
  const destNames = ["All", ...Array.from(new Set(packages.map(p => p.destination)))];
  const filtered = active === "All" ? packages : packages.filter(p => p.destination === active);

  return (
    <section ref={ref} id="packages" style={{ background: "#0e0b08", padding: "90px 5vw" }}>
      <SectionTitle tag="✦ Handcrafted Journeys" title="Featured Packages" sub="Meticulously crafted itineraries for every kind of traveller." />
      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 50 }}>
        {destNames.map(d => (
          <button key={d} onClick={() => setActive(d)} style={{ padding: "8px 20px", borderRadius: 2, border: `1px solid ${active === d ? "#ff6b2c" : "rgba(255,255,255,0.15)"}`, background: active === d ? "linear-gradient(135deg,#ff6b2c,#ff9a5c)" : "transparent", color: active === d ? "#fff" : "rgba(255,255,255,0.6)", fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: 2, cursor: "pointer", fontWeight: 600, textTransform: "uppercase", transition: "all 0.2s" }}>
            {d}
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
        {filtered.map((p, i) => (
          <div key={p.name + i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 3, overflow: "hidden", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.5s ${(i % 6) * 0.07}s, transform 0.5s ${(i % 6) * 0.07}s` }}
            onMouseOver={e => { e.currentTarget.style.border = "1px solid rgba(255,107,44,0.4)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(255,107,44,0.1)"; }}
            onMouseOut={e => { e.currentTarget.style.border = "1px solid rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }}>
            <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
              <img src={p.img} alt={p.destination} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }} loading="lazy"
                onMouseOver={e => e.target.style.transform = "scale(1.06)"}
                onMouseOut={e => e.target.style.transform = "scale(1)"} />
              <div style={{ position: "absolute", top: 14, right: 14, background: "rgba(255,107,44,0.9)", padding: "4px 12px", borderRadius: 2 }}>
                <span style={{ color: "#fff", fontSize: 10, fontFamily: "'Montserrat', sans-serif", fontWeight: 700, letterSpacing: 1 }}>{p.duration}</span>
              </div>
            </div>
            <div style={{ padding: "20px 22px" }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: "#ff6b2c", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, textTransform: "uppercase", marginBottom: 8 }}>{p.destination}</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "#fff", fontWeight: 600, lineHeight: 1.3, marginBottom: 16 }}>{p.name}</h3>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: 1 }}>STARTING FROM</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "#ff9a5c", fontWeight: 700 }}>{p.price}</div>
                </div>
                <button style={{ background: "none", border: "1px solid rgba(255,107,44,0.5)", color: "#ff6b2c", padding: "8px 18px", borderRadius: 2, cursor: "pointer", fontFamily: "'Montserrat', sans-serif", fontSize: 10, letterSpacing: 2, fontWeight: 600, textTransform: "uppercase", transition: "all 0.2s" }}
                  onMouseOver={e => { e.target.style.background = "#ff6b2c"; e.target.style.color = "#fff"; }}
                  onMouseOut={e => { e.target.style.background = "none"; e.target.style.color = "#ff6b2c"; }}>
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
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
    <section ref={ref} id="tours" style={{ background: "#0a0806", padding: "90px 5vw" }}>
      <SectionTitle tag="✦ Why Choose ROAM" title="The ROAM Experience" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 28 }}>
        {items.map((item, i) => (
          <div key={item.title} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 3, padding: "40px 30px", textAlign: "center", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: `all 0.6s ${i * 0.12}s`, cursor: "default" }}
            onMouseOver={e => { e.currentTarget.style.border = "1px solid rgba(255,107,44,0.35)"; e.currentTarget.style.background = "rgba(255,107,44,0.05)"; }}
            onMouseOut={e => { e.currentTarget.style.border = "1px solid rgba(255,255,255,0.06)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}>
            <div style={{ fontSize: 46, marginBottom: 20 }}>{item.icon}</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: "#fff", fontWeight: 600, marginBottom: 12 }}>{item.title}</h3>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── PROMO BANNER ─────────────────────────────────────────────────────────────

function PromoBanner() {
  return (
    <section style={{ position: "relative", overflow: "hidden", height: 380 }}>
      <img src="https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=1600&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(255,107,44,0.85), rgba(10,8,6,0.8))" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", textAlign: "center", padding: "0 20px" }}>
        <div style={{ fontSize: 11, letterSpacing: 5, color: "rgba(255,255,255,0.7)", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, textTransform: "uppercase", marginBottom: 12 }}>LIMITED TIME OFFER</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(48px, 9vw, 110px)", color: "#fff", fontWeight: 700, lineHeight: 0.95, marginBottom: 8 }}>37% Off</h2>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.8)", marginBottom: 32, letterSpacing: 1 }}>Last Minute Travel Deals — Book Before They're Gone</p>
        <a href="#" style={{ display: "inline-block", background: "#fff", color: "#ff6b2c", padding: "14px 44px", borderRadius: 2, textDecoration: "none", fontFamily: "'Montserrat', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", transition: "transform 0.2s, box-shadow 0.2s", boxShadow: "0 8px 30px rgba(0,0,0,0.2)" }}
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
      <div style={{ position: "absolute", inset: 0, background: "rgba(10,8,6,0.62)" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", marginBottom: 28, transition: "all 0.3s", backdropFilter: "blur(4px)" }}
          onMouseOver={e => { e.currentTarget.style.background = "rgba(255,107,44,0.8)"; e.currentTarget.style.border = "2px solid #ff6b2c"; }}
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
    <section ref={ref} style={{ background: "#0e0b08", padding: "90px 5vw" }}>
      <SectionTitle tag="✦ Guest Stories" title="What Our Travellers Say" />
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        {testimonials.map((t, i) => (
          <div key={t.name} style={{ display: i === active ? "block" : "none", textAlign: "center", opacity: visible ? 1 : 0, transition: "opacity 0.6s" }}>
            <div style={{ fontSize: 48, color: "#ff6b2c", fontFamily: "'Cormorant Garamond', serif", lineHeight: 1, marginBottom: 20 }}>"</div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 3vw, 26px)", color: "rgba(255,255,255,0.88)", lineHeight: 1.6, fontStyle: "italic", marginBottom: 36 }}>{t.text}</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg,#ff6b2c,#ff9a5c)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, color: "#fff", fontSize: 14 }}>{t.avatar}</div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontFamily: "'Montserrat', sans-serif", color: "#fff", fontSize: 14, fontWeight: 600 }}>{t.name}</div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(255,255,255,0.45)", fontSize: 11, letterSpacing: 2 }}>{t.role}</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 16 }}>
              {"★★★★★".split("").map((s, j) => <span key={j} style={{ color: "#ff6b2c", fontSize: 16 }}>{s}</span>)}
            </div>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 36 }}>
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} style={{ width: i === active ? 28 : 10, height: 10, borderRadius: 5, background: i === active ? "#ff6b2c" : "rgba(255,255,255,0.2)", border: "none", cursor: "pointer", transition: "all 0.3s" }} />
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
    <section ref={ref} style={{ background: "linear-gradient(135deg, #1a0e06, #0a0806)", padding: "70px 5vw", borderTop: "1px solid rgba(255,107,44,0.15)", borderBottom: "1px solid rgba(255,107,44,0.15)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 20, maxWidth: 900, margin: "0 auto" }}>
        {items.map((s, i) => (
          <div key={s.label} style={{ textAlign: "center", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: `all 0.5s ${i * 0.1}s` }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(38px, 5vw, 56px)", color: "#ff6b2c", fontWeight: 700 }}>{s.val}</div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: 2, textTransform: "uppercase", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ background: "#060403", borderTop: "1px solid rgba(255,107,44,0.15)", padding: "70px 5vw 30px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 40, marginBottom: 50 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <div style={{ width: 30, height: 30, background: "linear-gradient(135deg, #ff6b2c, #ff9a5c)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 12 }}>✦</span></div>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#fff", fontSize: 22, fontWeight: 700, letterSpacing: 3 }}>ROAM</span>
          </div>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>Curating extraordinary journeys across the globe since 2015. Your world, your way.</p>
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            {["𝕏", "f", "in", "📷"].map(s => (
              <div key={s} style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(255,255,255,0.5)", fontSize: 14, transition: "all 0.2s" }}
                onMouseOver={e => { e.currentTarget.style.border = "1px solid #ff6b2c"; e.currentTarget.style.color = "#ff6b2c"; }}
                onMouseOut={e => { e.currentTarget.style.border = "1px solid rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}>
                {s}
              </div>
            ))}
          </div>
        </div>
        {[
          { title: "Popular Destinations", links: ["Bali", "Dubai", "Japan", "Greece", "Switzerland", "Thailand", "Turkey"] },
          { title: "Travel Packages", links: ["Honeymoon Packages", "Adventure Tours", "Family Holidays", "Solo Travel", "Luxury Retreats"] },
          { title: "Company", links: ["About ROAM", "Blog", "Careers", "Press", "Contact Us", "Privacy Policy"] },
        ].map(col => (
          <div key={col.title}>
            <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: "#ff6b2c", letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, marginBottom: 18 }}>{col.title}</h4>
            {col.links.map(l => (
              <a key={l} href="#" style={{ display: "block", fontFamily: "'Montserrat', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", textDecoration: "none", marginBottom: 10, transition: "color 0.2s" }}
                onMouseOver={e => e.target.style.color = "#ff6b2c"}
                onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.45)"}>{l}</a>
            ))}
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.25)" }}>© 2026 ROAM Travel. All rights reserved.</p>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.25)" }}>Crafted with ✦ for the curious traveller</p>
      </div>
    </footer>
  );
}

// ─── HOME PAGE ──────────────────────────────────────────────────────────────

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <div style={{ paddingTop: 56 }} />
      <DestinationCarousel destinations={destinations} />
      <Stats />
      <Packages />
      <Experiences />
      <PromoBanner />
      <VideoSection />
      <Testimonials />
      <Footer />
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
        body{background:#0a0806;color:#fff;overflow-x:hidden;}
        ::-webkit-scrollbar{width:6px;}
        ::-webkit-scrollbar-track{background:#0a0806;}
        ::-webkit-scrollbar-thumb{background:#ff6b2c;border-radius:3px;}
        ::selection{background:rgba(255,107,44,0.35);}
      `}</style>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destination/:slug" element={<DestinationPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

