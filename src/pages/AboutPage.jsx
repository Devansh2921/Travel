import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function AboutPage() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-screen text-white pb-32"
            style={{ background: "#0a0806" }}
        >
            {/* ── Hero Section ── */}
            <section className="relative h-[65vh] min-h-[500px] overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&q=80"
                        alt="Serene landscape"
                        className="w-full h-full object-cover"
                        loading="eager"
                    />
                </div>
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(to bottom, rgba(10,8,6,0.3) 0%, rgba(10,8,6,0.7) 60%, #0a0806 100%)",
                    }}
                />

                <div className="relative z-10 text-center px-6 mt-20">
                    <div
                        className="text-[11px] tracking-[6px] text-[#ff6b2c] uppercase font-semibold mb-6"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                        ✦ Our Story ✦
                    </div>
                    <h1
                        className="font-bold leading-[1.1] mb-6 max-w-4xl mx-auto"
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(48px, 8vw, 84px)",
                        }}
                    >
                        Redefining Luxury Travel
                    </h1>
                </div>
            </section>

            {/* ── Content Section ── */}
            <section className="max-w-4xl mx-auto px-[5vw] pt-20">
                <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center mb-32">
                    <div>
                        <h2
                            className="text-4xl md:text-5xl font-bold mb-8text-[#ff9a5c]"
                            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#ff9a5c", marginBottom: "24px" }}
                        >
                            Journey Beyond the Ordinary
                        </h2>
                        <p
                            className="text-[15px] leading-relaxed mb-6"
                            style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(255,255,255,0.7)" }}
                        >
                            Founded in 2018, ROAM was born out of a profound passion for unparalleled discovery. We believe that true luxury lies not just in five-star accommodations, but in the rarity of the experience and the authenticity of the connection.
                        </p>
                        <p
                            className="text-[15px] leading-relaxed"
                            style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(255,255,255,0.7)" }}
                        >
                            Our team of expert curators spans the globe, painstakingly vetting every detail to ensure your journey is seamless, intimate, and entirely tailored to your personal rhythm.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="aspect-[4/5] overflow-hidden rounded-[3px]">
                            <img
                                src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&q=80"
                                alt="Traveler"
                                className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                        <div className="absolute -bottom-8 -left-8 w-40 h-40 border border-[#ff6b2c]/30 rounded-full z-[-1]" />
                    </div>
                </div>

                {/* ── Philosophy ── */}
                <div className="text-center mb-24">
                    <h2
                        className="text-4xl font-bold mb-16"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                        Our Core Pillars
                    </h2>
                    <div className="grid sm:grid-cols-3 gap-12">
                        {[
                            {
                                no: "01",
                                title: "Curation",
                                text: "Every itinerary is a handcrafted masterpiece, designed around your distinct preferences.",
                            },
                            {
                                no: "02",
                                title: "Exclusivity",
                                text: "Access to private estates, secluded wonders, and experiences money alone cannot buy.",
                            },
                            {
                                no: "03",
                                title: "Sustainability",
                                text: "Partnering with eco-conscious estates to preserve the natural beauty we explore.",
                            },
                        ].map((pillar) => (
                            <div key={pillar.no}>
                                <div
                                    className="text-[#ff6b2c] text-xl font-semibold mb-4"
                                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                                >
                                    {pillar.no}.
                                </div>
                                <h3
                                    className="text-2xl font-bold mb-4"
                                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                                >
                                    {pillar.title}
                                </h3>
                                <p
                                    className="text-[13px] leading-relaxed text-white/50"
                                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                                >
                                    {pillar.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </motion.div>
    );
}
