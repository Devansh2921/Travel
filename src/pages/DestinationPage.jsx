import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import destinations from "../data/destinations";
import PackageCard from "../components/PackageCard";

export default function DestinationPage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);

    const destination = destinations.find((d) => d.slug === slug);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
        const t = setTimeout(() => setLoaded(true), 60);
        return () => clearTimeout(t);
    }, [slug]);

    if (!destination) {
        return (
            <div
                className="min-h-screen flex flex-col items-center justify-center gap-6"
                style={{ background: "#0a0806" }}
            >
                <div
                    className="text-5xl text-white"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                    Destination not found
                </div>
                <button
                    onClick={() => navigate("/")}
                    className="px-8 py-3 rounded-full font-bold tracking-widest text-sm uppercase"
                    style={{ background: "linear-gradient(135deg,#ff6b2c,#ff9a5c)", color: "#fff", fontFamily: "'Montserrat', sans-serif" }}
                >
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
            style={{ background: "#0a0806", minHeight: "100vh" }}
        >
            {/* ── HERO ── */}
            <div className="relative overflow-hidden" style={{ height: "100vh", minHeight: 560 }}>
                <img
                    src={destination.heroImg}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                />
                {/* Gradient */}
                <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, rgba(10,8,6,0.28) 0%, rgba(10,8,6,0.52) 55%, rgba(10,8,6,1) 100%)" }}
                />

                {/* Back button */}
                <button
                    onClick={() => navigate("/")}
                    className="absolute top-7 z-10 flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-[12px] font-semibold tracking-widest uppercase transition-all"
                    style={{
                        left: "5vw",
                        background: "rgba(10,8,6,0.55)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        fontFamily: "'Montserrat', sans-serif",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#ff6b2c";
                        e.currentTarget.style.borderColor = "#ff6b2c";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(10,8,6,0.55)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                    }}
                >
                    ← Back
                </button>

                {/* Hero text */}
                <div className="absolute bottom-[8%] px-[5vw]">
                    <div
                        className="text-[11px] tracking-[5px] uppercase font-bold mb-3"
                        style={{ fontFamily: "'Montserrat', sans-serif", color: "#ff6b2c" }}
                    >
                        ✦ {destination.tag} · {destination.country}
                    </div>
                    <h1
                        className="text-white font-bold leading-none mb-5"
                        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(52px,9vw,110px)" }}
                    >
                        {destination.name}
                    </h1>
                    <div
                        className="inline-flex items-center px-5 py-2 rounded-full text-sm font-semibold mr-4"
                        style={{
                            background: "rgba(255,107,44,0.18)",
                            border: "1px solid rgba(255,107,44,0.4)",
                            color: "#ff9a5c",
                            fontFamily: "'Montserrat', sans-serif",
                        }}
                    >
                        {destination.packages.length} Packages Available
                    </div>
                    <span
                        className="text-xs tracking-wide"
                        style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(255,255,255,0.4)" }}
                    >
                        Scroll to explore ↓
                    </span>
                </div>
            </div>

            {/* ── DESCRIPTION ── */}
            <div className="mx-auto px-[5vw] py-20" style={{ maxWidth: 860 }}>
                <div
                    className="text-[11px] tracking-[5px] uppercase font-bold mb-5"
                    style={{ fontFamily: "'Montserrat', sans-serif", color: "#ff6b2c" }}
                >
                    ✦ About {destination.name}
                </div>
                <p
                    className="leading-relaxed text-white/85 italic"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px,2.8vw,28px)" }}
                >
                    {destination.description}
                </p>
            </div>

            {/* Divider */}
            <div
                className="mx-[5vw]"
                style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(255,107,44,0.3), transparent)" }}
            />

            {/* ── PACKAGES ── */}
            <div className="px-[5vw] py-20">
                <div className="text-center mb-14">
                    <div
                        className="text-[11px] tracking-[5px] uppercase font-bold mb-4"
                        style={{ fontFamily: "'Montserrat', sans-serif", color: "#ff6b2c" }}
                    >
                        ✦ Curated Itineraries
                    </div>
                    <h2
                        className="text-white font-bold"
                        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px,5vw,56px)" }}
                    >
                        {destination.name} Packages
                    </h2>
                </div>

                <div className="grid gap-5 mx-auto" style={{ maxWidth: 1200, gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))" }}>
                    {destination.packages.map((pkg, i) => (
                        <PackageCard key={pkg.title} pkg={pkg} index={i} />
                    ))}
                </div>
            </div>

            {/* ── FOOTER CTA ── */}
            <div className="text-center pb-20 px-[5vw]">
                <button
                    onClick={() => navigate("/")}
                    className="px-9 py-3 rounded-full text-xs font-bold tracking-[3px] uppercase transition-all"
                    style={{
                        border: "1px solid rgba(255,255,255,0.2)",
                        color: "rgba(255,255,255,0.6)",
                        background: "none",
                        fontFamily: "'Montserrat', sans-serif",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#ff6b2c";
                        e.currentTarget.style.color = "#ff6b2c";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                        e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                    }}
                >
                    ← Explore More Destinations
                </button>
            </div>
        </motion.div>
    );
}
