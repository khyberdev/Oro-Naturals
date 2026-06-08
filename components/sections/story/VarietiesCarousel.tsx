"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import { FadeIn } from "./FadeIn";

const varieties = [
  {
    name: "Arbequina",
    description: "Soft, buttery, with a gentle almond finish.",
    image: "/images/arbequina.png",
  },
  {
    name: "Arbosana",
    description: "Fruity and aromatic with a delicate pepper note.",
    image: "/images/arbosana.png",
  },
  {
    name: "Koroneiki",
    description: "Bold, robust, rich in polyphenols and character.",
    image: "/images/koroneiki.png",
  },
  {
    name: "Manzanilla",
    description: "Balanced and versatile, a true table classic.",
    image: "/images/manzanilla.png",
  },
  {
    name: "Chetoui",
    description: "Intense and green, with a peppery, herbaceous edge.",
    image: "/images/chetoui.png",
  },
  {
    name: "Leccino",
    description: "Mild, sweet, and elegantly smooth on the palate.",
    image: "/images/leccino.png",
  },
  {
    name: "Coratina",
    description: "Powerful and bitter-forward, prized for longevity.",
    image: "/images/coratina.png",
  },
];

export function VarietiesCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragWidth, setDragWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current || !trackRef.current) return;
      const overflow =
        trackRef.current.scrollWidth - containerRef.current.offsetWidth;
      setDragWidth(overflow > 0 ? overflow : 0);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section className="overflow-hidden bg-slate-50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-amber-600">
                The Seven Varieties
              </p>
              <h2 className="font-serif text-3xl text-emerald-950 sm:text-4xl md:text-5xl">
                A Symphony of Cultivars
              </h2>
            </div>
            <p className="flex items-center gap-2 font-sans text-xs uppercase tracking-[0.15em] text-emerald-950/50">
              <MoveHorizontal className="h-4 w-4" />
              Drag to explore
            </p>
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={0.1}>
        <div ref={containerRef} className="mx-auto mt-12 max-w-7xl px-6">
          <motion.div
            ref={trackRef}
            drag="x"
            dragConstraints={{ left: -dragWidth, right: 0 }}
            dragElastic={0.08}
            className="flex w-max cursor-grab gap-6 active:cursor-grabbing"
          >
            {varieties.map((variety) => (
              <article
                key={variety.name}
                className="w-64 flex-shrink-0 select-none overflow-hidden rounded-sm border border-emerald-950/10 bg-white sm:w-72"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-emerald-950">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${variety.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="pointer-events-none absolute bottom-4 left-5 font-serif text-sm italic text-white/70">
                    Oro Naturals
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-emerald-950">
                    {variety.name}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-slate-600">
                    {variety.description}
                  </p>
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </FadeIn>
    </section>
  );
}
