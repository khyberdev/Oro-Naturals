"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCartStore } from "@/store/useCartStore"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Our Story", href: "/our-story" },
  { label: "Extraction Process", href: "/extraction-process" },
  { label: "Accolades", href: "/accolades" },
]

export function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const itemCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  )
  const openCart = useCartStore((state) => state.openCart)

  const isSolid = isScrolled || !isHome

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        isSolid || isOpen
          ? "border-b border-white/10 bg-emerald-950/90 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-8">
          <Link href="/" className="flex min-w-max items-center gap-3">
            <Image
              src="/images/oro-logo.png"
              alt="Oro Naturals Logo"
              width={50}
              height={50}
              className="h-10 w-10 object-contain md:h-12 md:w-12"
            />
            <span className="font-serif text-xl leading-tight tracking-wide text-white transition-colors duration-300 md:text-2xl">
              ORO NATURALS
            </span>
          </Link>

          <div className="hidden flex-1 items-center justify-end gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium uppercase tracking-wide text-white/90 transition-colors duration-300 hover:text-oro-gold"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={openCart}
              className="relative p-2 text-white transition-colors duration-300 hover:text-oro-gold"
              aria-label={
                mounted && itemCount > 0
                  ? `Open shopping bag, ${itemCount} items`
                  : "Open shopping bag"
              }
            >
              <ShoppingBag className="h-5 w-5" />
              {mounted && itemCount > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-oro-gold px-1 text-[10px] font-semibold leading-none text-emerald-950">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              ) : null}
            </button>

            <button
              type="button"
              className="p-2 text-white transition-colors duration-300 md:hidden"
              onClick={() => setIsOpen((open) => !open)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <div
          id="mobile-navigation"
          className={cn(
            "overflow-hidden transition-all duration-500 ease-in-out md:hidden",
            isOpen ? "max-h-96 pb-6" : "max-h-0",
          )}
        >
          <div className="flex flex-col gap-4 border-t border-white/15 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-2 text-sm font-medium uppercase tracking-wide text-white/90 transition-colors duration-300 hover:text-oro-gold"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
