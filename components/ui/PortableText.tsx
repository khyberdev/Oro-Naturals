import { PortableText as PortableTextRenderer } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Link from "next/link";

const components = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mt-10 font-serif text-3xl text-oro-green first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mt-8 font-serif text-2xl text-oro-green">{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mt-4 font-sans leading-relaxed text-oro-charcoal/90">
        {children}
      </p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="mt-6 border-l-2 border-oro-gold pl-6 font-serif italic text-oro-green">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({
      value,
      children,
    }: {
      value?: { href?: string };
      children: React.ReactNode;
    }) => {
      const href = value?.href ?? "#";
      const external = href.startsWith("http");
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-oro-gold underline-offset-4 hover:underline"
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={href}
          className="text-oro-gold underline-offset-4 hover:underline"
        >
          {children}
        </Link>
      );
    },
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="mt-4 list-disc space-y-2 pl-6 font-sans text-oro-charcoal/90">
        {children}
      </ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="mt-4 list-decimal space-y-2 pl-6 font-sans text-oro-charcoal/90">
        {children}
      </ol>
    ),
  },
};

interface PortableTextProps {
  value: PortableTextBlock[];
  className?: string;
}

export function PortableText({ value, className }: PortableTextProps) {
  return (
    <div className={className}>
      <PortableTextRenderer value={value} components={components} />
    </div>
  );
}
