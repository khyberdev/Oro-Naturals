import { Quote } from "lucide-react";
import { FadeIn } from "./FadeIn";
import { FoundersVideo } from "./FoundersVideo";

export function FoundersVision() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn className="text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-amber-600">
            The Founder&apos;s Vision
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <figure className="mx-auto max-w-3xl text-center">
            <Quote
              className="mx-auto mb-6 h-10 w-10 text-amber-500/60"
              strokeWidth={1.25}
            />
            <blockquote className="font-serif text-2xl italic leading-relaxed text-emerald-950 text-balance sm:text-3xl md:text-4xl">
              &ldquo;We never set out to simply make oil. We set out to bottle
              the purity of our land — one harvest, one pressing, one family at a
              time.&rdquo;
            </blockquote>
            <figcaption className="mt-8">
              <div className="mx-auto mb-4 h-px w-12 bg-amber-500/70" />
              <p className="font-serif text-lg text-emerald-950">
                Salahuddin Khattak &amp; Abdullah Khattak
              </p>
              <p className="font-sans text-sm text-amber-600">
                Oro Naturals Family Estate
              </p>
            </figcaption>
          </figure>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mx-auto mt-16 max-w-sm">
            <FoundersVideo />
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mx-auto mt-16 max-w-sm">
            <p className="mb-4 text-center text-xs font-medium uppercase tracking-[0.25em] text-amber-600">
              French Reporter Praise
            </p>
            <FoundersVideo src="https://res.cloudinary.com/dbwfsmjol/video/upload/v1780892297/french_kfolbg.mp4" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
