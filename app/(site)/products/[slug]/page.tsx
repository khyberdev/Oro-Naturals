import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/ui/AddToCartButton";
import { PortableText } from "@/components/ui/PortableText";
import { Price } from "@/components/ui/Price";
import { productImageBlur, productImageUrl } from "@/lib/images";
import {
  getProductBySlug,
  getProductSlugs,
} from "@/lib/sanity/fetch";
import type { SanityImage } from "@/types/sanity";

interface ProductPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.name} | Oro Naturals`,
    description: product.shortDescription,
  };
}

function GalleryImage({ image, priority }: { image: SanityImage; priority?: boolean }) {
  const src = productImageUrl(image, 1200);
  const blur = productImageBlur(image);
  if (!src) return null;

  return (
    <div className="relative aspect-square overflow-hidden bg-oro-charcoal/5">
      <Image
        src={src}
        alt={image.alt ?? "Product image"}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover"
        priority={priority}
        placeholder={blur ? "blur" : "empty"}
        blurDataURL={blur}
      />
    </div>
  );
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const gallery = product.gallery?.filter((img) => img?.asset?.url) ?? [];

  return (
    <article className="mx-auto max-w-7xl px-6 pb-16 pt-28 lg:px-8">
      <nav className="mb-8 font-sans text-sm text-oro-charcoal/60">
        <Link href="/shop" className="hover:text-oro-gold">
          Shop
        </Link>
        {product.category && (
          <>
            <span className="mx-2">/</span>
            <Link
              href={`/products?category=${product.category.slug}`}
              className="hover:text-oro-gold"
            >
              {product.category.name}
            </Link>
          </>
        )}
        <span className="mx-2">/</span>
        <span className="text-oro-charcoal">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-4">
          {product.mainImage?.asset?.url && (
            <GalleryImage image={product.mainImage} priority />
          )}
          {gallery.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {gallery.map((image, i) => (
                <GalleryImage key={i} image={image} />
              ))}
            </div>
          )}
        </div>

        <div>
          {product.category && (
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-oro-gold">
              {product.category.name}
            </p>
          )}
          <h1 className="mt-2 font-serif text-4xl text-oro-green lg:text-5xl">
            {product.name}
          </h1>
          <div className="mt-6">
            <Price
              price={product.price}
              discountPrice={product.discountPrice}
              size="lg"
            />
          </div>
          <p className="mt-6 font-sans leading-relaxed text-oro-charcoal/80">
            {product.shortDescription}
          </p>
          <p className="mt-4 font-sans text-sm text-oro-charcoal/50">
            {product.stockLevel > 0
              ? `${product.stockLevel} in stock`
              : "Currently unavailable"}
          </p>
          <div className="mt-8 max-w-md">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>

      {product.detailedDescription && product.detailedDescription.length > 0 && (
        <section className="mx-auto mt-20 max-w-3xl border-t border-oro-charcoal/10 pt-16">
          <h2 className="font-serif text-3xl text-oro-green">Details</h2>
          <div className="mt-8">
            <PortableText value={product.detailedDescription} />
          </div>
        </section>
      )}
    </article>
  );
}
