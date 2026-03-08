import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function DestinationCard({ destination, offset }) {
    const navigate = useNavigate();
    const absOffset = Math.abs(offset);
    const isCenter = absOffset < 0.5;

    // Visual scale & blur based on distance from center
    const scale = Math.max(0.78, 1 - absOffset * 0.1);
    const blur = Math.min(absOffset * 4, 10);
    const opacity = Math.max(0.35, 1 - absOffset * 0.3);
    const zIndex = Math.round(100 - absOffset * 10);

    return (
        <motion.div
            onClick={() => navigate(`/destination/${destination.slug}`)}
            animate={{ scale, opacity, filter: `blur(${blur}px)` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            whileHover={isCenter ? { scale: 1.03 } : {}}
            style={{ zIndex, flexShrink: 0, cursor: "pointer", willChange: "transform, opacity, filter" }}
            className="w-[clamp(220px,26vw,340px)]"
        >
            {/* Card shell */}
            <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                    aspectRatio: "3 / 4",
                    boxShadow: isCenter
                        ? "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1.5px rgba(255,107,44,0.4)"
                        : "0 12px 36px rgba(0,0,0,0.5)",
                }}
            >
                {/* Image */}
                <img
                    src={destination.cardImg}
                    alt={destination.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Tag badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-white text-[10px] font-bold tracking-widest uppercase"
                    style={{ background: "rgba(255,107,44,0.9)" }}>
                    {destination.tag}
                </div>

                {/* Orange ring when center */}
                {isCenter && (
                    <div className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{ boxShadow: "inset 0 0 0 2px rgba(255,107,44,0.5)" }} />
                )}

                {/* Text info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="text-[10px] tracking-[3px] uppercase mb-1"
                        style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(255,255,255,0.55)" }}>
                        {destination.country}
                    </div>
                    <div className="text-2xl font-bold text-white leading-tight mb-2"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        {destination.name}
                    </div>
                    <AnimatePresence>
                        {isCenter && (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 8 }}
                                transition={{ duration: 0.3 }}
                                className="flex items-center gap-2 text-xs font-semibold tracking-wide"
                                style={{ fontFamily: "'Montserrat', sans-serif", color: "#ff9a5c" }}
                            >
                                <span>{destination.packages.length} packages</span>
                                <span style={{ color: "rgba(255,154,92,0.4)" }}>—</span>
                                <span>Explore →</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}
