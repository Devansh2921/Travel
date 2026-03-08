import React, { useEffect, useState, useRef } from "react";

const useScrollAnimation = () => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, visible];
};

const stats = [
    { val: "8+", label: "Years of Experience" },
    { val: "50K+", label: "Happy Travellers" },
    { val: "120+", label: "Destinations" },
    { val: "4.9★", label: "Average Rating" },
];

const values = [
    { icon: "🧭", title: "Personalised Planning", desc: "Every trip is built around you — your pace, your interests, your dream. No generic packages, ever." },
    { icon: "💎", title: "Premium Quality", desc: "We partner only with the finest hotels, guides, and experiences — curated through rigorous vetting." },
    { icon: "🌿", title: "Responsible Travel", desc: "We're committed to sustainable, eco-conscious tourism that preserves cultures and natural beauty." },
    { icon: "📞", title: "24/7 Support", desc: "From the moment you book to the moment you return, our team is always just a call away." },
    { icon: "🗺️", title: "Expert Local Knowledge", desc: "Our on-ground partners in every destination ensure you experience the authentic, not the touristy." },
    { icon: "✈️", title: "Seamless Experience", desc: "Flights, hotels, transfers, activities — we coordinate every detail so you just enjoy the journey." },
];

const team = [
    { name: "Arjun Mehta", role: "Founder & CEO", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80", bio: "15 years crafting journeys across 60+ countries." },
    { name: "Priya Sharma", role: "Head of Experiences", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80", bio: "Ex-hotelier obsessed with extraordinary moments." },
    { name: "Rahul Verma", role: "Lead Travel Designer", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80", bio: "Turns your wishlist into a seamless itinerary." },
    { name: "Sneha Kapoor", role: "Client Relations", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80", bio: "Your single point of contact, always available." },
];

const destinations = [
    { name: "Bali", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80" },
    { name: "Santorini", img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80" },
    { name: "Kyoto", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80" },
    { name: "Dubai", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80" },
    { name: "Switzerland", img: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600&q=80" },
    { name: "Maldives", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80" },
];

const BLUE = "#4169E1";
const DEEP = "#1a237e";
const LIGHT_BLUE = "#7ca5f5";

export default function AboutPage() {
    useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);
    const [statsRef, statsVisible] = useScrollAnimation();
    const [valuesRef, valuesVisible] = useScrollAnimation();
    const [teamRef, teamVisible] = useScrollAnimation();
    const [destRef, destVisible] = useScrollAnimation();

    return (
        <div style={{ background: "#080c1e", color: "#fff", fontFamily: "'Montserrat', sans-serif" }}>

            {/* ── HERO ── */}
            <section style={{ position: "relative", height: "70vh", minHeight: 520, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img
                    src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&q=80"
                    alt="About hero"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(26,35,126,0.85) 0%, rgba(8,12,30,0.75) 100%)" }} />
                <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 20px", marginTop: 60 }}>
                    <div style={{ fontSize: 11, letterSpacing: 6, color: LIGHT_BLUE, fontWeight: 600, textTransform: "uppercase", marginBottom: 18 }}>
                        ✦ Our Story ✦
                    </div>
                    <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(44px, 7vw, 86px)", fontWeight: 700, lineHeight: 1.08, marginBottom: 20 }}>
                        We Don't Just Plan Trips.<br />
                        <em style={{ color: LIGHT_BLUE, fontStyle: "italic" }}>We Craft Memories.</em>
                    </h1>
                    <p style={{ fontSize: "clamp(14px, 1.6vw, 17px)", color: "rgba(255,255,255,0.7)", maxWidth: 560, margin: "0 auto", lineHeight: 1.8 }}>
                        Born from a love of discovery, WE PLAN TRIPS has been turning travel dreams into extraordinary reality since 2018.
                    </p>
                </div>
                {/* decorative diagonal */}
                <div style={{ position: "absolute", bottom: -1, left: 0, right: 0 }}>
                    <svg viewBox="0 0 1440 60" style={{ display: "block", width: "100%" }}>
                        <path d="M0,60 L1440,0 L1440,60 Z" fill="#080c1e" />
                    </svg>
                </div>
            </section>

            {/* ── STATS BAR ── */}
            <section ref={statsRef} style={{ background: `linear-gradient(135deg, ${DEEP}, #0d1b4b)`, padding: "50px 5vw", borderBottom: "1px solid rgba(65,105,225,0.2)" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 24, maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
                    {stats.map((s, i) => (
                        <div key={s.label} style={{ opacity: statsVisible ? 1 : 0, transform: statsVisible ? "translateY(0)" : "translateY(20px)", transition: `all 0.6s ${i * 0.1}s` }}>
                            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 5vw, 58px)", color: BLUE, fontWeight: 700, lineHeight: 1 }}>{s.val}</div>
                            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: 2, textTransform: "uppercase", marginTop: 8 }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── OUR STORY ── */}
            <section style={{ padding: "100px 5vw", maxWidth: 1200, margin: "0 auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 60, alignItems: "center" }}>
                    <div>
                        <div style={{ fontSize: 11, letterSpacing: 5, color: BLUE, fontWeight: 600, textTransform: "uppercase", marginBottom: 16 }}>✦ Who We Are</div>
                        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, lineHeight: 1.15, marginBottom: 24, color: "#fff" }}>
                            A Team Obsessed<br />with Your Journey
                        </h2>
                        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, lineHeight: 1.9, marginBottom: 20 }}>
                            Founded in 2018, WE PLAN TRIPS started as a small team of passionate travellers who believed that the best trips aren't found in brochures — they're built conversation by conversation, detail by detail.
                        </p>
                        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, lineHeight: 1.9, marginBottom: 32 }}>
                            Today, we've helped over 50,000 travellers experience the world in a way that's deeply personal, seamlessly organised, and utterly unforgettable. From private villas in Bali to the Northern Lights in Lapland — every trip we craft carries our promise: <em style={{ color: LIGHT_BLUE }}>you'll want to come back for more.</em>
                        </p>
                        <a href="/#packages" style={{ display: "inline-block", background: `linear-gradient(135deg, ${DEEP}, ${BLUE})`, color: "#fff", padding: "13px 36px", borderRadius: 3, textDecoration: "none", fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", boxShadow: "0 8px 30px rgba(65,105,225,0.4)", transition: "transform 0.2s, box-shadow 0.2s" }}
                            onMouseOver={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 14px 36px rgba(65,105,225,0.55)"; }}
                            onMouseOut={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 8px 30px rgba(65,105,225,0.4)"; }}>
                            Explore Packages
                        </a>
                    </div>
                    <div style={{ position: "relative" }}>
                        <div style={{ borderRadius: 4, overflow: "hidden", aspectRatio: "4/5" }}>
                            <img src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&q=80" alt="Travellers" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.88)" }} />
                        </div>
                        {/* floating badge */}
                        <div style={{ position: "absolute", bottom: -24, right: -24, background: `linear-gradient(135deg, ${DEEP}, ${BLUE})`, borderRadius: 4, padding: "22px 28px", boxShadow: "0 12px 40px rgba(65,105,225,0.4)", textAlign: "center" }}>
                            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 700, color: "#fff", lineHeight: 1 }}>8+</div>
                            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", letterSpacing: 2, textTransform: "uppercase", marginTop: 4 }}>Years of Excellence</div>
                        </div>
                        <div style={{ position: "absolute", top: -20, left: -20, width: 100, height: 100, border: `1px solid ${BLUE}`, borderRadius: "50%", opacity: 0.3 }} />
                    </div>
                </div>
            </section>

            {/* ── CORE VALUES ── */}
            <section ref={valuesRef} style={{ background: "linear-gradient(180deg, #080c1e 0%, #0d1226 100%)", padding: "90px 5vw", borderTop: "1px solid rgba(65,105,225,0.12)" }}>
                <div style={{ textAlign: "center", marginBottom: 60 }}>
                    <div style={{ fontSize: 11, letterSpacing: 5, color: BLUE, fontWeight: 600, textTransform: "uppercase", marginBottom: 14 }}>✦ What Drives Us</div>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: 700, color: "#fff" }}>Our Core Values</h2>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, maxWidth: 1100, margin: "0 auto" }}>
                    {values.map((v, i) => (
                        <div key={v.title}
                            style={{ background: "rgba(65,105,225,0.05)", border: "1px solid rgba(65,105,225,0.15)", borderRadius: 4, padding: "36px 30px", opacity: valuesVisible ? 1 : 0, transform: valuesVisible ? "translateY(0)" : "translateY(28px)", transition: `all 0.6s ${i * 0.08}s`, cursor: "default" }}
                            onMouseOver={e => { e.currentTarget.style.background = "rgba(65,105,225,0.1)"; e.currentTarget.style.border = "1px solid rgba(65,105,225,0.4)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                            onMouseOut={e => { e.currentTarget.style.background = "rgba(65,105,225,0.05)"; e.currentTarget.style.border = "1px solid rgba(65,105,225,0.15)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                            <div style={{ fontSize: 42, marginBottom: 18 }}>{v.icon}</div>
                            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: "#fff", fontWeight: 600, marginBottom: 10 }}>{v.title}</h3>
                            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>{v.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── MEET THE TEAM ── */}
            <section ref={teamRef} style={{ padding: "90px 5vw", maxWidth: 1200, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 60 }}>
                    <div style={{ fontSize: 11, letterSpacing: 5, color: BLUE, fontWeight: 600, textTransform: "uppercase", marginBottom: 14 }}>✦ The People Behind the Journeys</div>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: 700, color: "#fff" }}>Meet Our Team</h2>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 28 }}>
                    {team.map((member, i) => (
                        <div key={member.name}
                            style={{ opacity: teamVisible ? 1 : 0, transform: teamVisible ? "translateY(0)" : "translateY(30px)", transition: `all 0.6s ${i * 0.1}s`, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 4, overflow: "hidden" }}
                            onMouseOver={e => { e.currentTarget.style.border = "1px solid rgba(65,105,225,0.4)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(65,105,225,0.12)"; }}
                            onMouseOut={e => { e.currentTarget.style.border = "1px solid rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; }}>
                            <div style={{ height: 260, overflow: "hidden" }}>
                                <img src={member.img} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", transition: "transform 0.5s" }}
                                    onMouseOver={e => e.target.style.transform = "scale(1.06)"}
                                    onMouseOut={e => e.target.style.transform = "scale(1)"} />
                            </div>
                            <div style={{ padding: "20px 22px" }}>
                                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "#fff", fontWeight: 600, marginBottom: 4 }}>{member.name}</h3>
                                <div style={{ fontSize: 10, color: LIGHT_BLUE, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>{member.role}</div>
                                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{member.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── DESTINATIONS WE LOVE ── */}
            <section ref={destRef} style={{ background: "#0d1226", padding: "90px 5vw", borderTop: "1px solid rgba(65,105,225,0.12)" }}>
                <div style={{ textAlign: "center", marginBottom: 60 }}>
                    <div style={{ fontSize: 11, letterSpacing: 5, color: BLUE, fontWeight: 600, textTransform: "uppercase", marginBottom: 14 }}>✦ Where We Take You</div>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: 700, color: "#fff" }}>Destinations We Love</h2>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20, maxWidth: 1100, margin: "0 auto" }}>
                    {destinations.map((d, i) => (
                        <div key={d.name}
                            style={{ position: "relative", borderRadius: 4, overflow: "hidden", height: 220, cursor: "pointer", opacity: destVisible ? 1 : 0, transform: destVisible ? "scale(1)" : "scale(0.95)", transition: `all 0.6s ${i * 0.07}s` }}
                            onMouseOver={e => { e.currentTarget.querySelector("img").style.transform = "scale(1.08)"; e.currentTarget.querySelector(".dest-overlay").style.opacity = "1"; }}
                            onMouseOut={e => { e.currentTarget.querySelector("img").style.transform = "scale(1)"; e.currentTarget.querySelector(".dest-overlay").style.opacity = "0"; }}>
                            <img src={d.img} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }} />
                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,35,126,0.8) 0%, transparent 60%)" }} />
                            <div className="dest-overlay" style={{ position: "absolute", inset: 0, background: "rgba(65,105,225,0.25)", opacity: 0, transition: "opacity 0.4s" }} />
                            <div style={{ position: "absolute", bottom: 18, left: 20 }}>
                                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: "#fff", fontWeight: 700 }}>{d.name}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CTA BANNER ── */}
            <section style={{ position: "relative", overflow: "hidden", padding: "90px 5vw", textAlign: "center", background: `linear-gradient(135deg, ${DEEP} 0%, #0d47a1 100%)` }}>
                <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, border: "1px solid rgba(255,255,255,0.06)", borderRadius: "50%" }} />
                <div style={{ position: "absolute", bottom: -60, left: -60, width: 240, height: 240, border: "1px solid rgba(255,255,255,0.06)", borderRadius: "50%" }} />
                <div style={{ position: "relative", zIndex: 2 }}>
                    <div style={{ fontSize: 11, letterSpacing: 6, color: "rgba(255,255,255,0.6)", fontWeight: 600, textTransform: "uppercase", marginBottom: 18 }}>✦ Ready to Explore?</div>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(38px, 5.5vw, 72px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>
                        Your Next Adventure<br />Starts Here
                    </h2>
                    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.8 }}>
                        Tell us where you want to go — we'll handle everything else and turn it into the trip of a lifetime.
                    </p>
                    <a href="/#packages" style={{ display: "inline-block", background: "#fff", color: DEEP, padding: "14px 44px", borderRadius: 3, textDecoration: "none", fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", boxShadow: "0 8px 30px rgba(0,0,0,0.25)", transition: "transform 0.2s" }}
                        onMouseOver={e => e.target.style.transform = "translateY(-3px)"}
                        onMouseOut={e => e.target.style.transform = "translateY(0)"}>
                        Start Planning
                    </a>
                </div>
            </section>

        </div>
    );
}
