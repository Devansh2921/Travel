import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import DestinationCard from "./DestinationCard";

export default function DestinationCarousel({ destinations }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [dragDeltaX, setDragDeltaX] = useState(0);
    const containerRef = useRef(null);
    const firstCardRef = useRef(null);

    const CARD_GAP = 24;

    // Measure the actual rendered card width so the step matches CSS exactly
    const [cardWidth, setCardWidth] = useState(300);
    useEffect(() => {
        const measure = () => {
            if (firstCardRef.current) {
                setCardWidth(firstCardRef.current.getBoundingClientRect().width);
            }
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    const STEP = cardWidth + CARD_GAP;

    const prev = useCallback(() => setActiveIndex((i) => Math.max(0, i - 1)), []);
    const next = useCallback(
        () => setActiveIndex((i) => Math.min(destinations.length - 1, i + 1)),
        [destinations.length]
    );

    // Keyboard navigation
    useEffect(() => {
        const handler = (e) => {
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [prev, next]);

    // ── Drag / touch ──────────────────────────────────────────────────────────
    const onMouseDown = (e) => {
        setIsDragging(true);
        setDragStartX(e.clientX);
        setDragDeltaX(0);
    };
    const onMouseMove = useCallback(
        (e) => { if (isDragging) setDragDeltaX(e.clientX - dragStartX); },
        [isDragging, dragStartX]
    );
    const onMouseUp = useCallback(() => {
        if (!isDragging) return;
        setIsDragging(false);
        if (dragDeltaX < -STEP * 0.25) next();
        else if (dragDeltaX > STEP * 0.25) prev();
        setDragDeltaX(0);
    }, [isDragging, dragDeltaX, STEP, next, prev]);

    const onTouchStart = (e) => {
        setIsDragging(true);
        setDragStartX(e.touches[0].clientX);
        setDragDeltaX(0);
    };
    const onTouchMove = useCallback(
        (e) => { if (isDragging) setDragDeltaX(e.touches[0].clientX - dragStartX); },
        [isDragging, dragStartX]
    );
    const onTouchEnd = useCallback(() => {
        if (!isDragging) return;
        setIsDragging(false);
        if (dragDeltaX < -STEP * 0.2) next();
        else if (dragDeltaX > STEP * 0.2) prev();
        setDragDeltaX(0);
    }, [isDragging, dragDeltaX, STEP, next, prev]);

    const translateX = isDragging ? -activeIndex * STEP + dragDeltaX : -activeIndex * STEP;

    // Padding so the active card is centred in the viewport
    const paddingX = `calc(50vw - ${cardWidth / 2}px)`;

    return (
        <section
            id="destinations"
            className="relative py-24 overflow-hidden select-none"
            style={{ background: "#0a0806" }}
        >
            {/* ── Header ── */}
            <div className="text-center mb-14 px-[5vw]">
                <div
                    className="text-[11px] tracking-[5px] uppercase mb-4 font-semibold"
                    style={{ fontFamily: "'Montserrat', sans-serif", color: "#4169E1" }}
                >
                    ✦ Discover the World
                </div>
                <h2
                    className="text-white font-bold leading-none mb-4"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,5.5vw,64px)" }}
                >
                    Top Destinations
                </h2>
                <p
                    className="mx-auto text-sm leading-relaxed"
                    style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(255,255,255,0.45)", maxWidth: 400 }}
                >
                    Handpicked corners of the Earth, curated for the discerning traveller.
                    Drag, swipe, or use arrows to explore.
                </p>
            </div>

            {/* ── Carousel viewport ── */}
            <div
                ref={containerRef}
                className="relative w-full overflow-hidden"
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                {/* Fade edges */}
                <div
                    className="absolute top-0 left-0 h-full pointer-events-none z-20"
                    style={{ width: "10vw", background: "linear-gradient(to right, #0a0806, transparent)" }}
                />
                <div
                    className="absolute top-0 right-0 h-full pointer-events-none z-20"
                    style={{ width: "10vw", background: "linear-gradient(to left, #0a0806, transparent)" }}
                />

                {/* Left arrow */}
                <button
                    onClick={(e) => { e.stopPropagation(); prev(); }}
                    disabled={activeIndex === 0}
                    className="absolute left-[4vw] top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300"
                    style={{
                        border: "1px solid rgba(255,255,255,0.35)",
                        background: "rgba(10,8,6,0.5)",
                        backdropFilter: "blur(12px)",
                        color: activeIndex === 0 ? "rgba(255,255,255,0.2)" : "#fff",
                        opacity: activeIndex === 0 ? 0 : 1,
                        pointerEvents: activeIndex === 0 ? "none" : "auto",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#4169E1";
                        e.currentTarget.style.borderColor = "#4169E1";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(10,8,6,0.5)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
                    }}
                >
                    ←
                </button>

                {/* Right arrow */}
                <button
                    onClick={(e) => { e.stopPropagation(); next(); }}
                    disabled={activeIndex === destinations.length - 1}
                    className="absolute right-[4vw] top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300"
                    style={{
                        border: "1px solid rgba(255,255,255,0.35)",
                        background: "rgba(10,8,6,0.5)",
                        backdropFilter: "blur(12px)",
                        color: activeIndex === destinations.length - 1 ? "rgba(255,255,255,0.2)" : "#fff",
                        opacity: activeIndex === destinations.length - 1 ? 0 : 1,
                        pointerEvents: activeIndex === destinations.length - 1 ? "none" : "auto",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#4169E1";
                        e.currentTarget.style.borderColor = "#4169E1";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(10,8,6,0.5)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
                    }}
                >
                    →
                </button>

                <motion.div
                    className="flex items-center"
                    style={{
                        gap: CARD_GAP,
                        paddingLeft: paddingX,
                        paddingRight: paddingX,
                        paddingTop: 28,
                        paddingBottom: 28,
                        cursor: isDragging ? "grabbing" : "grab",
                        position: "relative",
                        zIndex: 10,
                    }}
                    animate={{ x: translateX }}
                    transition={
                        isDragging
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 280, damping: 32 }
                    }
                >
                    {destinations.map((dest, i) => (
                        <div
                            key={dest.slug}
                            ref={i === 0 ? firstCardRef : null}
                        >
                            <DestinationCard
                                destination={dest}
                                offset={i - activeIndex}
                            />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* ── Controls row ── */}
            <div className="flex items-center justify-center gap-5 mt-10">
                {/* Dot indicators */}
                <div className="flex gap-1.5 items-center">
                    {destinations.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            className="rounded-full transition-all duration-300"
                            style={{
                                width: i === activeIndex ? 28 : 8,
                                height: 8,
                                background: i === activeIndex ? "#4169E1" : "rgba(255,255,255,0.2)",
                                border: "none",
                                padding: 0,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Counter */}
            <div
                className="text-center mt-4 tracking-[3px] text-[11px]"
                style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(255,255,255,0.28)" }}
            >
                {String(activeIndex + 1).padStart(2, "0")} / {String(destinations.length).padStart(2, "0")}
            </div>
        </section>
    );
}
