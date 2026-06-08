import Image from "next/image";
import Link from "next/link";
import { Price } from "@/components/ui/Price";
import { productImageBlur, productImageUrl } from "@/lib/images";
import { cn } from "@/lib/utils";
import type { ProductCard as ProductCardType } from "@/types/sanity";

interface ProductCardProps {
  product: ProductCardType;
  className?: string;
  priority?: boolean;
}

export function ProductCard({
  product,
  className,
  priority = false,
}: ProductCardProps) {
  const imageUrl = productImageUrl(product.mainImage, 640);
  const blur = productImageBlur(product.mainImage);

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden border border-oro-charcoal/10 bg-white transition-shadow hover:shadow-lg",
        className,
      )}
    >
      <Link href={`/products/${product.slug}`} className="relative aspect-[4/5] overflow-hidden bg-oro-charcoal/5">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.mainImage?.alt ?? product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={priority}
            placeholder={blur ? "blur" : "empty"}
            blurDataURL={blur}
          />
        ) : (
          <div className="flex h-full items-center justify-center font-serif text-oro-charcoal/30">
            No image
          </div>
        )}
        {product.isFeatured && (
          <span className="absolute left-3 top-3 bg-oro-gold px-2 py-1 font-sans text-xs uppercase tracking-widest text-white">
            Featured
          </span>
        )}
        {product.stockLevel === 0 && (
          <span className="absolute right-3 top-3 bg-oro-charcoal/80 px-2 py-1 font-sans text-xs uppercase tracking-widest text-white">
            Sold out
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        {product.category && (
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-oro-gold">
            {product.category.name}
          </p>
        )}
        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-2 font-serif text-xl text-oro-green transition-colors group-hover:text-oro-gold">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 flex-1 font-sans text-sm text-oro-charcoal/70">
          {product.shortDescription}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <Price price={product.price} discountPrice={product.discountPrice} />
          <Link
            href={`/products/${product.slug}`}
            className="font-sans text-xs uppercase tracking-widest text-oro-green underline-offset-4 hover:underline"
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}
