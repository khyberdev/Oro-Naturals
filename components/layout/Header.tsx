import Link from "next/link";
import { getCategories } from "@/lib/sanity/fetch";

export async function Header() {
  const categories = await getCategories();

  return (
    <header className="sticky top-0 z-50 border-b border-oro-charcoal/10 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <Link href="/" className="font-serif text-2xl tracking-wide text-oro-green">
          Oro Naturals
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/products"
            className="font-sans text-sm uppercase tracking-[0.15em] text-oro-charcoal transition-colors hover:text-oro-gold"
          >
            Shop
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/products?category=${cat.slug}`}
              className="font-sans text-sm uppercase tracking-[0.15em] text-oro-charcoal/80 transition-colors hover:text-oro-gold"
            >
              {cat.name}
            </Link>
          ))}
        </nav>

        <Link
          href="/products"
          className="font-sans text-sm uppercase tracking-[0.15em] text-oro-green md:hidden"
        >
          Shop
        </Link>
      </div>
    </header>
  );
}
