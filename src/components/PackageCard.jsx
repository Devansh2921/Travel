import React from "react";
import { motion } from "framer-motion";

const COLORS = {
    primary: "#1E3A8A",
    primaryLight: "#3B82F6",
    secondary: "#F97316",
    dark: "#1a1a2e",
    muted: "#64748b",
    bg: "#ffffff",
};

export default function PackageCard({ pkg, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.5 }}
            className="group relative overflow-hidden"
            style={{
                background: COLORS.bg,
                borderRadius: 20,
                boxShadow: "8px 8px 20px rgba(0,0,0,0.06), -4px -4px 12px rgba(255,255,255,0.8), inset 1px 1px 2px rgba(255,255,255,0.6)",
                border: "1px solid rgba(0,0,0,0.04)",
            }}
            whileHover={{
                boxShadow: "10px 10px 28px rgba(30,58,138,0.12), -4px -4px 12px rgba(255,255,255,0.9), inset 1px 1px 2px rgba(255,255,255,0.6)",
                border: "1px solid rgba(30,58,138,0.15)",
                y: -4,
            }}
        >
            <div className="p-6 flex flex-col gap-4">
                {/* Duration badge */}
                <div
                    className="self-start px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase"
                    style={{ background: COLORS.secondary, color: "#fff" }}
                >
                    {pkg.duration}
                </div>

                {/* Title */}
                <h3
                    className="text-lg font-semibold leading-snug"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16px,1.6vw,20px)", color: COLORS.dark }}
                >
                    {pkg.title}
                </h3>

                {/* Divider */}
                <div style={{ height: 1, background: `linear-gradient(to right, rgba(30,58,138,0.15), transparent)` }} />

                {/* Price + CTA */}
                <div className="flex items-center justify-between">
                    <div>
                        <div
                            className="text-[10px] tracking-widest uppercase mb-1"
                            style={{ fontFamily: "'Montserrat', sans-serif", color: COLORS.muted }}
                        >
                            Starting from
                        </div>
                        <div
                            className="text-xl font-bold"
                            style={{ fontFamily: "'Cormorant Garamond', serif", color: COLORS.secondary }}
                        >
                            {pkg.price.replace("Starting from ", "")}
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className="px-5 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all"
                        style={{
                            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
                            color: "#fff",
                            fontFamily: "'Montserrat', sans-serif",
                            boxShadow: "0 4px 18px rgba(30,58,138,0.3)",
                        }}
                    >
                        Book Now
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
