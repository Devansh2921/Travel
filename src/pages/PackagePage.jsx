import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import destinations from "../data/destinations";

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
};

// Online PNG icon URLs (flat style travel icons)
const ICONS = {
    duration: "https://cdn-icons-png.flaticon.com/128/2784/2784459.png",
    calendar: "https://cdn-icons-png.flaticon.com/128/2693/2693507.png",
    price: "https://cdn-icons-png.flaticon.com/128/2489/2489756.png",
    hotel: "https://cdn-icons-png.flaticon.com/128/2933/2933921.png",
    checkIn: "https://cdn-icons-png.flaticon.com/128/3652/3652267.png",
    checkOut: "https://cdn-icons-png.flaticon.com/128/3652/3652191.png",
    meals: "https://cdn-icons-png.flaticon.com/128/3480/3480823.png",
    location: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
    included: "https://cdn-icons-png.flaticon.com/128/8832/8832138.png",
    excluded: "https://cdn-icons-png.flaticon.com/128/1828/1828843.png",
    highlight: "https://cdn-icons-png.flaticon.com/128/7641/7641727.png",
    airplane: "https://cdn-icons-png.flaticon.com/128/3125/3125713.png",
    suitcase: "https://cdn-icons-png.flaticon.com/128/3460/3460335.png",
};

// Destination-specific gallery images for richer visual content
const DEST_IMAGES = {
    almaty: [
        "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80",
        "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&q=80",
        "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80",
        "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&q=80",
        "https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=800&q=80",
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
    ],
};

export default function PackagePage() {
    const { destSlug, pkgSlug } = useParams();
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);

    const destination = destinations.find((d) => d.slug === destSlug);
    const pkg = destination?.packages.find((p) => p.slug === pkgSlug);
    const images = DEST_IMAGES[destSlug] || [];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
        const t = setTimeout(() => setLoaded(true), 60);
        return () => clearTimeout(t);
    }, [destSlug, pkgSlug]);

    if (!destination || !pkg) {
        return (
            <div style={{
                minHeight: "100vh", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 24,
                background: COLORS.bg, fontFamily: "'Montserrat', sans-serif",
            }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, color: COLORS.dark }}>
                    Package not found
                </div>
                <button onClick={() => navigate("/")} style={{
                    padding: "12px 36px", borderRadius: 50,
                    background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
                    color: "#fff", border: "none", cursor: "pointer",
                    fontFamily: "'Montserrat', sans-serif", fontSize: 12,
                    fontWeight: 700, letterSpacing: 3, textTransform: "uppercase",
                }}>
                    ← Back Home
                </button>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 16 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            style={{ background: COLORS.bg, minHeight: "100vh" }}
        >
            {/* ── HERO ── */}
            <div style={{
                position: "relative", overflow: "hidden",
                height: "75vh", minHeight: 480,
            }}>
                <img src={destination.heroImg} alt={destination.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.15) 100%)",
                }} />
                <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 40%, rgba(0,0,0,0.5) 100%)",
                }} />

                {/* Back button */}
                <button onClick={() => navigate(`/destination/${destSlug}`)} style={{
                    position: "absolute", top: 100, left: "5vw", zIndex: 10,
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "10px 24px", borderRadius: 50,
                    background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#fff", fontSize: 12, fontWeight: 600,
                    letterSpacing: 2, textTransform: "uppercase",
                    fontFamily: "'Montserrat', sans-serif",
                    cursor: "pointer", transition: "all 0.3s",
                }}
                    onMouseEnter={e => { e.currentTarget.style.background = COLORS.primary; e.currentTarget.style.borderColor = COLORS.primary; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                >
                    ← Back to {destination.name}
                </button>

                {/* Hero content */}
                <div style={{
                    position: "absolute", bottom: "8%", left: 0, right: 0,
                    padding: "0 5vw", maxWidth: 800,
                }}>
                    <div style={{
                        display: "flex", alignItems: "center", gap: 10, marginBottom: 14,
                    }}>
                        <img src={ICONS.airplane} alt="" style={{ width: 18, height: 18, filter: "brightness(0) invert(1)", opacity: 0.6 }} />
                        <span style={{
                            fontSize: 11, letterSpacing: 5, color: COLORS.secondary,
                            fontFamily: "'Montserrat', sans-serif", fontWeight: 700,
                            textTransform: "uppercase",
                        }}>
                            {destination.name} · {pkg.duration}
                        </span>
                    </div>
                    <h1 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "clamp(32px, 6vw, 64px)", color: "#fff",
                        fontWeight: 700, lineHeight: 1.1, marginBottom: 20,
                    }}>
                        {pkg.title}
                    </h1>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        {pkg.destinationsCovered?.map(d => (
                            <span key={d} style={{
                                padding: "6px 18px", borderRadius: 50,
                                background: "rgba(255,255,255,0.1)",
                                backdropFilter: "blur(8px)",
                                border: "1px solid rgba(255,255,255,0.18)",
                                color: "rgba(255,255,255,0.85)",
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: 11, fontWeight: 600, letterSpacing: 1,
                            }}>
                                {d}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── QUICK INFO BAR ── */}
            <div className="pkg-info-bar" style={{
                background: COLORS.primary, padding: "0 5vw",
                display: "flex", alignItems: "stretch",
                flexWrap: "wrap",
            }}>
                {[
                    { icon: ICONS.duration, label: "Duration", value: pkg.duration },
                    { icon: ICONS.calendar, label: "Best Time", value: destination.bestTime || "Year Round" },
                    { icon: ICONS.location, label: "Location", value: destination.country },
                ].map((item, i) => (
                    <div key={i} style={{
                        flex: 1, minWidth: 180, padding: "22px 28px",
                        display: "flex", alignItems: "center", gap: 16,
                        borderRight: i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none",
                    }}>
                        <img src={item.icon} alt="" style={{ width: 28, height: 28, filter: "brightness(0) invert(1)", opacity: 0.7 }} />
                        <div>
                            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.45)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 3 }}>{item.label}</div>
                            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: "#fff", fontWeight: 600 }}>{item.value}</div>
                        </div>
                    </div>
                ))}
                <a href="/#contact" className="pkg-enquire-btn" style={{
                    padding: "22px 40px", display: "flex", alignItems: "center", gap: 10,
                    background: COLORS.secondary, color: "#fff",
                    fontFamily: "'Montserrat', sans-serif", fontSize: 12,
                    fontWeight: 700, letterSpacing: 3, textTransform: "uppercase",
                    textDecoration: "none", transition: "background 0.3s",
                    marginLeft: "auto",
                }}
                    onMouseOver={e => e.currentTarget.style.background = COLORS.secondaryLight}
                    onMouseOut={e => e.currentTarget.style.background = COLORS.secondary}
                >
                    <img src={ICONS.suitcase} alt="" style={{ width: 18, height: 18, filter: "brightness(0) invert(1)" }} />
                    Enquire Now
                </a>
            </div>

            {/* ── IMAGE GALLERY STRIP ── */}
            {images.length > 0 && (
                <div style={{
                    padding: "50px 5vw 0", background: COLORS.bg,
                }}>
                    <div className="pkg-gallery-strip" style={{
                        display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16,
                        maxWidth: 1200, margin: "0 auto",
                    }}>
                        {images.slice(0, 3).map((img, i) => (
                            <div key={i} style={{
                                borderRadius: 20, overflow: "hidden",
                                aspectRatio: i === 0 ? "16/10" : "16/10",
                                boxShadow: "6px 6px 18px rgba(0,0,0,0.07), -3px -3px 10px rgba(255,255,255,0.7)",
                            }}>
                                <img src={img} alt={`${destination.name} ${i + 1}`}
                                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                                    loading="lazy"
                                    onMouseOver={e => e.target.style.transform = "scale(1.05)"}
                                    onMouseOut={e => e.target.style.transform = "scale(1)"}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── HIGHLIGHTS ── */}
            {pkg.highlights && pkg.highlights.length > 0 && (
                <div style={{ padding: "60px 5vw", maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ fontSize: 11, letterSpacing: 5, color: COLORS.primary, fontFamily: "'Montserrat', sans-serif", fontWeight: 700, textTransform: "uppercase", marginBottom: 12 }}>
                        Package Highlights
                    </div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 44px)", color: COLORS.dark, fontWeight: 700, marginBottom: 36 }}>
                        What Makes This Trip Special
                    </h2>
                    <div className="pkg-highlights-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                        {pkg.highlights.map((h, i) => (
                            <div key={i} style={{
                                display: "flex", gap: 16, alignItems: "flex-start",
                                padding: "22px 26px", borderRadius: 18,
                                background: COLORS.bg,
                                border: "1px solid rgba(0,0,0,0.05)",
                                boxShadow: "6px 6px 18px rgba(0,0,0,0.04), -3px -3px 10px rgba(255,255,255,0.6)",
                                transition: "transform 0.3s, box-shadow 0.3s",
                            }}
                                onMouseOver={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "8px 8px 24px rgba(30,58,138,0.08), -3px -3px 10px rgba(255,255,255,0.8)"; }}
                                onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "6px 6px 18px rgba(0,0,0,0.04), -3px -3px 10px rgba(255,255,255,0.6)"; }}
                            >
                                <img src={ICONS.highlight} alt="" style={{ width: 28, height: 28, flexShrink: 0, marginTop: 2 }} />
                                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: COLORS.dark, lineHeight: 1.6, margin: 0 }}>
                                    {h}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── ITINERARY ── */}
            {pkg.itinerary && pkg.itinerary.length > 0 && (
                <div style={{ padding: "60px 5vw", background: COLORS.bgAlt }}>
                    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
                        <div style={{ fontSize: 11, letterSpacing: 5, color: COLORS.primary, fontFamily: "'Montserrat', sans-serif", fontWeight: 700, textTransform: "uppercase", marginBottom: 12 }}>
                            Day by Day
                        </div>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 44px)", color: COLORS.dark, fontWeight: 700, marginBottom: 44 }}>
                            Your Itinerary
                        </h2>

                        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                            {pkg.itinerary.map((day, i) => (
                                <div key={i} className="pkg-itinerary-row" style={{ display: "flex", gap: 28, position: "relative" }}>
                                    {/* Timeline */}
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 50 }}>
                                        <div style={{
                                            width: 44, height: 44, borderRadius: "50%",
                                            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            color: "#fff", fontFamily: "'Montserrat', sans-serif",
                                            fontSize: 14, fontWeight: 700, flexShrink: 0,
                                            boxShadow: "0 4px 16px rgba(30,58,138,0.25)",
                                        }}>
                                            {day.day}
                                        </div>
                                        {i < pkg.itinerary.length - 1 && (
                                            <div style={{
                                                width: 2, flex: 1, minHeight: 20,
                                                background: `linear-gradient(to bottom, ${COLORS.primaryLight}, ${COLORS.bgAlt2})`,
                                            }} />
                                        )}
                                    </div>

                                    {/* Content card */}
                                    <div style={{
                                        flex: 1, marginBottom: 24,
                                        background: COLORS.bg, borderRadius: 22,
                                        padding: "28px 30px",
                                        boxShadow: "6px 6px 18px rgba(0,0,0,0.04), -3px -3px 10px rgba(255,255,255,0.7)",
                                        border: "1px solid rgba(0,0,0,0.04)",
                                        display: "flex", flexDirection: "column", gap: 0,
                                    }}>
                                        {/* Day image — show for days with activities */}
                                        {images[i] && day.activities.length > 0 && (
                                            <div style={{
                                                borderRadius: 14, overflow: "hidden",
                                                marginBottom: 18, aspectRatio: "21/9",
                                            }}>
                                                <img src={images[i]} alt={day.title}
                                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                    loading="lazy"
                                                />
                                            </div>
                                        )}
                                        <div style={{
                                            fontFamily: "'Montserrat', sans-serif", fontSize: 10,
                                            color: COLORS.secondary, fontWeight: 700,
                                            letterSpacing: 3, textTransform: "uppercase", marginBottom: 8,
                                        }}>
                                            Day {day.day}
                                        </div>
                                        <h3 style={{
                                            fontFamily: "'Playfair Display', serif", fontSize: 22,
                                            color: COLORS.dark, fontWeight: 700, marginBottom: 12,
                                        }}>
                                            {day.title}
                                        </h3>
                                        <p style={{
                                            fontFamily: "'Montserrat', sans-serif", fontSize: 14,
                                            color: COLORS.muted, lineHeight: 1.7, marginBottom: day.activities.length > 0 ? 18 : 0,
                                        }}>
                                            {day.description}
                                        </p>
                                        {day.activities.length > 0 && (
                                            <div style={{
                                                display: "flex", flexDirection: "column", gap: 10,
                                                padding: "16px 20px", borderRadius: 14,
                                                background: COLORS.bgAlt,
                                            }}>
                                                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: COLORS.primary, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Activities</div>
                                                {day.activities.map((a, j) => (
                                                    <div key={j} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                                                        <div style={{
                                                            width: 7, height: 7, borderRadius: "50%",
                                                            background: `linear-gradient(135deg, ${COLORS.secondary}, ${COLORS.secondaryLight})`,
                                                            flexShrink: 0,
                                                        }} />
                                                        <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, color: COLORS.dark, fontWeight: 500 }}>
                                                            {a}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ── SECOND IMAGE ROW ── */}
            {images.length > 3 && (
                <div style={{ padding: "50px 5vw", background: COLORS.bg }}>
                    <div className="pkg-gallery-strip" style={{
                        display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16,
                        maxWidth: 1200, margin: "0 auto",
                    }}>
                        {images.slice(3, 6).map((img, i) => (
                            <div key={i} style={{
                                borderRadius: 20, overflow: "hidden",
                                aspectRatio: "16/10",
                                boxShadow: "6px 6px 18px rgba(0,0,0,0.07), -3px -3px 10px rgba(255,255,255,0.7)",
                            }}>
                                <img src={img} alt={`${destination.name} ${i + 4}`}
                                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                                    loading="lazy"
                                    onMouseOver={e => e.target.style.transform = "scale(1.05)"}
                                    onMouseOut={e => e.target.style.transform = "scale(1)"}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── STAY DETAILS ── */}
            {pkg.stay && (
                <div style={{ padding: "60px 5vw", background: COLORS.bgAlt }}>
                    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
                        <div style={{ fontSize: 11, letterSpacing: 5, color: COLORS.primary, fontFamily: "'Montserrat', sans-serif", fontWeight: 700, textTransform: "uppercase", marginBottom: 12 }}>
                            Your Accommodation
                        </div>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 44px)", color: COLORS.dark, fontWeight: 700, marginBottom: 32 }}>
                            Stay Details
                        </h2>
                        <div style={{
                            background: COLORS.bg, borderRadius: 24, overflow: "hidden",
                            border: "1px solid rgba(0,0,0,0.04)",
                            boxShadow: "8px 8px 24px rgba(0,0,0,0.06), -4px -4px 14px rgba(255,255,255,0.7)",
                        }}>
                            {/* Hotel header with accent strip */}
                            <div style={{
                                background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
                                padding: "24px 32px", display: "flex", alignItems: "center", gap: 16,
                            }}>
                                <img src={ICONS.hotel} alt="" style={{ width: 32, height: 32, filter: "brightness(0) invert(1)" }} />
                                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#fff", fontWeight: 700 }}>
                                    {pkg.stay.hotel}
                                </h3>
                            </div>
                            {/* Details grid */}
                            <div className="pkg-stay-grid" style={{
                                display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
                                padding: "28px 32px", gap: 20,
                            }}>
                                {[
                                    { icon: ICONS.location, label: "Location", value: pkg.stay.location },
                                    { icon: ICONS.duration, label: "Duration", value: pkg.stay.nights },
                                    { icon: ICONS.checkIn, label: "Check-In", value: pkg.stay.checkIn },
                                    { icon: ICONS.checkOut, label: "Check-Out", value: pkg.stay.checkOut },
                                ].map(item => (
                                    <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                                        <img src={item.icon} alt="" style={{ width: 22, height: 22, opacity: 0.6, marginTop: 2 }} />
                                        <div>
                                            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: COLORS.muted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>{item.label}</div>
                                            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 15, color: COLORS.dark, fontWeight: 600 }}>{item.value}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={{
                                padding: "0 32px 24px",
                            }}>
                                <div style={{
                                    padding: "12px 20px", borderRadius: 12,
                                    background: `linear-gradient(135deg, rgba(30,58,138,0.06), rgba(59,130,246,0.06))`,
                                    display: "inline-flex", alignItems: "center", gap: 10,
                                }}>
                                    <img src={ICONS.meals} alt="" style={{ width: 20, height: 20, opacity: 0.7 }} />
                                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, color: COLORS.primary, fontWeight: 600 }}>{pkg.stay.meals}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── INCLUSIONS & EXCLUSIONS ── */}
            <div style={{ padding: "60px 5vw", background: COLORS.bg }}>
                <div className="pkg-inc-exc-grid" style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
                    {/* Inclusions */}
                    {pkg.inclusions && (
                        <div style={{
                            background: COLORS.bgAlt, borderRadius: 24, overflow: "hidden",
                            border: "1px solid rgba(0,0,0,0.04)",
                            boxShadow: "6px 6px 18px rgba(0,0,0,0.04), -3px -3px 10px rgba(255,255,255,0.6)",
                        }}>
                            <div style={{
                                background: "linear-gradient(135deg, #16a34a, #22c55e)",
                                padding: "18px 28px", display: "flex", alignItems: "center", gap: 12,
                            }}>
                                <img src={ICONS.included} alt="" style={{ width: 22, height: 22, filter: "brightness(0) invert(1)" }} />
                                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#fff", fontWeight: 700 }}>
                                    What's Included
                                </h3>
                            </div>
                            <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
                                {pkg.inclusions.map((item, i) => (
                                    <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                                        <img src={ICONS.included} alt="" style={{ width: 18, height: 18, flexShrink: 0, marginTop: 2 }} />
                                        <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: COLORS.dark, lineHeight: 1.5 }}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Exclusions */}
                    {pkg.exclusions && (
                        <div style={{
                            background: COLORS.bgAlt, borderRadius: 24, overflow: "hidden",
                            border: "1px solid rgba(0,0,0,0.04)",
                            boxShadow: "6px 6px 18px rgba(0,0,0,0.04), -3px -3px 10px rgba(255,255,255,0.6)",
                        }}>
                            <div style={{
                                background: "linear-gradient(135deg, #dc2626, #ef4444)",
                                padding: "18px 28px", display: "flex", alignItems: "center", gap: 12,
                            }}>
                                <img src={ICONS.excluded} alt="" style={{ width: 22, height: 22, filter: "brightness(0) invert(1)" }} />
                                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#fff", fontWeight: 700 }}>
                                    What's Not Included
                                </h3>
                            </div>
                            <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
                                {pkg.exclusions.map((item, i) => (
                                    <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                                        <img src={ICONS.excluded} alt="" style={{ width: 18, height: 18, flexShrink: 0, marginTop: 2 }} />
                                        <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, color: COLORS.muted, lineHeight: 1.5 }}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ── BOTTOM CTA ── */}
            <div style={{
                textAlign: "center", padding: "70px 5vw",
                background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
                position: "relative", overflow: "hidden",
            }}>
                {/* Decorative pattern */}
                <div style={{
                    position: "absolute", inset: 0, opacity: 0.05,
                    backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                    <h2 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "clamp(28px, 4vw, 48px)", color: "#fff",
                        fontWeight: 700, marginBottom: 16,
                    }}>
                        Ready to Explore {destination.name}?
                    </h2>
                    <p style={{
                        fontFamily: "'Montserrat', sans-serif", fontSize: 15,
                        color: "rgba(255,255,255,0.7)", marginBottom: 36,
                        maxWidth: 500, margin: "0 auto 36px",
                    }}>
                        Get in touch with our travel experts and we'll plan your perfect trip.
                    </p>
                    <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                        <a href="/#contact" style={{
                            padding: "16px 44px", borderRadius: 50,
                            background: COLORS.secondary, color: "#fff",
                            fontFamily: "'Montserrat', sans-serif", fontSize: 12,
                            fontWeight: 700, letterSpacing: 3, textTransform: "uppercase",
                            textDecoration: "none",
                            boxShadow: "0 6px 24px rgba(249,115,22,0.4)",
                            transition: "transform 0.2s, box-shadow 0.2s",
                        }}
                            onMouseOver={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 10px 32px rgba(249,115,22,0.5)"; }}
                            onMouseOut={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 6px 24px rgba(249,115,22,0.4)"; }}
                        >
                            Contact Us
                        </a>
                        <button onClick={() => navigate(`/destination/${destSlug}`)} style={{
                            padding: "16px 44px", borderRadius: 50,
                            background: "transparent", color: "#fff",
                            border: "1px solid rgba(255,255,255,0.35)",
                            cursor: "pointer",
                            fontFamily: "'Montserrat', sans-serif", fontSize: 12,
                            fontWeight: 700, letterSpacing: 3, textTransform: "uppercase",
                            transition: "all 0.2s",
                        }}
                            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; }}
                            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; }}
                        >
                            ← All Packages
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                @media(max-width: 768px) {
                    .pkg-info-bar { flex-direction: column !important; }
                    .pkg-info-bar > div { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.1) !important; }
                    .pkg-info-bar > div:last-child { border-bottom: none !important; }
                    .pkg-enquire-btn { width: 100% !important; justify-content: center !important; margin-left: 0 !important; }
                    .pkg-highlights-grid { grid-template-columns: 1fr !important; }
                    .pkg-stay-grid { grid-template-columns: repeat(2, 1fr) !important; }
                    .pkg-inc-exc-grid { grid-template-columns: 1fr !important; }
                    .pkg-gallery-strip { grid-template-columns: 1fr !important; }
                    .pkg-itinerary-row { gap: 16px !important; }
                }
                @media(max-width: 480px) {
                    .pkg-stay-grid { grid-template-columns: 1fr !important; }
                    .pkg-itinerary-row { flex-direction: column !important; gap: 0 !important; }
                    .pkg-itinerary-row > div:first-child { flex-direction: row !important; width: auto !important; gap: 12px !important; margin-bottom: 10px !important; }
                    .pkg-itinerary-row > div:first-child > div:last-child { display: none !important; }
                }
            `}</style>
        </motion.div>
    );
}
