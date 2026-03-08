import React from "react";
import { motion } from "framer-motion";

export default function PackageCard({ pkg, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.5 }}
            className="group relative rounded-2xl overflow-hidden border"
            style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.08)",
            }}
            whileHover={{
                borderColor: "rgba(255,107,44,0.4)",
                boxShadow: "0 12px 40px rgba(255,107,44,0.1)",
                y: -4,
            }}
        >
            <div className="p-6 flex flex-col gap-4">
                {/* Duration badge */}
                <div
                    className="self-start px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
                    style={{ background: "rgba(255,107,44,0.15)", color: "#ff9a5c", border: "1px solid rgba(255,107,44,0.3)" }}
                >
                    {pkg.duration}
                </div>

                {/* Title */}
                <h3
                    className="text-lg font-semibold leading-snug text-white"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16px,1.6vw,20px)" }}
                >
                    {pkg.title}
                </h3>

                {/* Divider */}
                <div style={{ height: 1, background: "linear-gradient(to right, rgba(255,107,44,0.25), transparent)" }} />

                {/* Price + CTA */}
                <div className="flex items-center justify-between">
                    <div>
                        <div
                            className="text-[10px] tracking-widest uppercase mb-1"
                            style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(255,255,255,0.35)" }}
                        >
                            Starting from
                        </div>
                        <div
                            className="text-xl font-bold"
                            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#ff9a5c" }}
                        >
                            {pkg.price.replace("Starting from ", "")}
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className="px-5 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all"
                        style={{
                            background: "linear-gradient(135deg, #ff6b2c, #ff9a5c)",
                            color: "#fff",
                            fontFamily: "'Montserrat', sans-serif",
                            boxShadow: "0 4px 18px rgba(255,107,44,0.35)",
                        }}
                    >
                        Book Now
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
