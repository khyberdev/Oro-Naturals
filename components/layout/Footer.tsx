"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import type { SiteSettings } from "@/types/sanity";

const quickLinks = [
  { label: "Shop All", href: "/shop" },
  { label: "Our Story", href: "/our-story" },
  { label: "Extraction Process", href: "/extraction-process" },
  { label: "Accolades", href: "/accolades" },
  { label: "Contact Us", href: "/#contact" },
];

const socialLinks = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/oronaturals.store/",
    label: "Instagram",
  },
];

interface FooterProps {
  settings?: SiteSettings | null;
}

export function Footer({ settings }: FooterProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  const address =
    settings?.address ??
    "Maraji, Nowshera,\nKhyber Pakhtunkhwa, Pakistan";
  const phone = settings?.phoneNumber ?? "+92 123 456 7890";
  const emailContact = settings?.contactEmail ?? "hello@oronaturals.com";
  const tagline =
    settings?.ourStory?.slice(0, 140) ??
    "Premium cold-pressed olive oil from the heart of Khyber Pakhtunkhwa.";

  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="mb-6 flex items-center gap-3">
              <Image
                src="/images/oro-logo.png"
                alt="Oro Naturals Logo"
                width={50}
                height={50}
                className="h-12 w-12 object-contain"
              />
              <div className="flex flex-col items-start">
                <span className="text-[10px] uppercase tracking-[0.3em] text-accent">
                  Nature&apos;s Luxury
                </span>
                <span className="font-serif text-xl text-primary-foreground">
                  ORO NATURALS
                </span>
              </div>
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-primary-foreground/70">
              {tagline}
              {settings?.ourStory && settings.ourStory.length > 140 ? "…" : ""}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-6 font-serif text-lg text-primary-foreground">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 transition-colors duration-300 hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-serif text-lg text-primary-foreground">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-accent" />
                <span className="whitespace-pre-line text-sm text-primary-foreground/70">
                  {address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0 text-accent" />
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="text-sm text-primary-foreground/70 transition-colors duration-300 hover:text-accent"
                >
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0 text-accent" />
                <a
                  href={`mailto:${emailContact}`}
                  className="text-sm text-primary-foreground/70 transition-colors duration-300 hover:text-accent"
                >
                  {emailContact}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-serif text-lg text-primary-foreground">
              Newsletter
            </h4>
            <p className="mb-4 text-sm text-primary-foreground/70">
              Subscribe for exclusive offers and updates from our farm.
            </p>
            <form onSubmit={handleSubmit} className="flex items-center gap-3 border-b border-primary-foreground/30 pb-2 transition-colors duration-300 focus-within:border-accent">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full border-0 bg-transparent text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none"
                required
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex-shrink-0 text-xs font-medium uppercase tracking-[0.15em] text-accent transition-colors duration-300 hover:text-primary-foreground"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-primary-foreground/50">
              © {new Date().getFullYear()} Oro Naturals. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="#privacy"
                className="text-xs text-primary-foreground/50 transition-colors duration-300 hover:text-accent"
              >
                Privacy Policy
              </Link>
              <Link
                href="#terms"
                className="text-xs text-primary-foreground/50 transition-colors duration-300 hover:text-accent"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
