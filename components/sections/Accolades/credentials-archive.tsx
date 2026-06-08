import {
  Award,
  Landmark,
  Handshake,
  Newspaper,
  ScrollText,
  ArrowUpRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type DocItem = {
  title: string;
  meta: string;
  file: string;
  kind: "PDF" | "Image";
};

type DocGroup = {
  icon: LucideIcon;
  label: string;
  blurb: string;
  items: DocItem[];
};

const groups: DocGroup[] = [
  {
    icon: Award,
    label: "Training & Certification",
    blurb:
      "Formal education in olive cultivation and oil technology, earned in Italy at the Mediterranean's foremost agronomic institute.",
    items: [
      {
        title: "Olive Studies Certification",
        meta: "CIHEAM Bari · Italy",
        file: "Italy study certificate.pdf",
        kind: "PDF",
      },
      {
        title: "Advanced Training Certificate",
        meta: "International Programme · Italy",
        file: "Training Certificate from Italy .pdf",
        kind: "PDF",
      },
      {
        title: "CIHEAM Bari — Certificate I",
        meta: "Mediterranean Agronomic Studies",
        file: "CIHEAM Bari Certificate 1.pdf",
        kind: "PDF",
      },
      {
        title: "CIHEAM Bari — Certificate II",
        meta: "Mediterranean Agronomic Studies",
        file: "CIHEAM Bari Certificate 2.pdf",
        kind: "PDF",
      },
      {
        title: "CIHEAM Bari — Certificate III",
        meta: "Mediterranean Agronomic Studies",
        file: "CIHEAM Bari Certificate 3.pdf",
        kind: "PDF",
      },
    ],
  },
  {
    icon: Landmark,
    label: "Institutional Recognition",
    blurb:
      "Acknowledgement from the world's governing olive body and the Government of Pakistan.",
    items: [
      {
        title: "Visit of the IOC Executive Director",
        meta: "International Olive Council",
        file: "Visit of Executive Director International Olive Oil Council.pdf",
        kind: "PDF",
      },
      {
        title: "Export Acknowledgement",
        meta: "Government of Pakistan",
        file: "International export acknowledgement by GOP.pdf",
        kind: "PDF",
      },
    ],
  },
  {
    icon: Handshake,
    label: "Trusted Partnerships",
    blurb:
      "The wholesale relationships built on the consistency and purity of our oil.",
    items: [
      {
        title: "Khaiti Technologies Limited",
        meta: "Valued Client",
        file: "Client (KHAITY TECHNOLOGIES LIMITED).pdf",
        kind: "PDF",
      },
      {
        title: "Khaiti Technologies — Certificate",
        meta: "Certificate of Supply",
        file: "Khaiti technologies certificate.pdf",
        kind: "PDF",
      },
      {
        title: "Siddiqui's Olive Oil",
        meta: "Valued Client",
        file: "Clients (Siddiqui's Olive Oil) .pdf",
        kind: "PDF",
      },
    ],
  },
  {
    icon: Newspaper,
    label: "Press & Features",
    blurb:
      "Coverage of our estate and founders across national and international media.",
    items: [
      {
        title: "Pakistani Press Coverage",
        meta: "National Media",
        file: "Pakistani press coverage .pdf",
        kind: "PDF",
      },
      {
        title: "Reporterre — Feature Article",
        meta: "France · Print Edition",
        file: "Olive trees, hope for Pakistani farmers in the face of climate change.pdf",
        kind: "PDF",
      },
      {
        title: "Abdullah Khattak — Press Feature",
        meta: "Founder Profile",
        file: "abdullah picture.pdf",
        kind: "PDF",
      },
    ],
  },
  {
    icon: ScrollText,
    label: "Licensing & Official Records",
    blurb:
      "Our registered credentials and official documentation as a producer and exporter.",
    items: [
      {
        title: "Production & Trade License",
        meta: "Registered Producer",
        file: "license.jpeg",
        kind: "Image",
      },
      {
        title: "Official Records — I",
        meta: "Scanned Documentation",
        file: "Scanned Documents.pdf",
        kind: "PDF",
      },
      {
        title: "Official Records — II",
        meta: "Scanned Documentation",
        file: "Scanned Documents (1).pdf",
        kind: "PDF",
      },
    ],
  },
];

function docHref(file: string) {
  return `/docs/${encodeURIComponent(file)}`;
}

export function CredentialsArchive() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-accent">
            The Record
          </p>
          <h2 className="font-serif text-3xl text-primary sm:text-4xl md:text-5xl">
            Credentials &amp; Documentation
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-foreground/65">
            Every certificate, endorsement, and official record — verifiable and
            open for review. Select any document to view the original.
          </p>
        </div>

        <div className="space-y-16">
          {groups.map((group) => (
            <div key={group.label}>
              <div className="mb-8 flex flex-col gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-primary/5 ring-1 ring-accent/30">
                    <group.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-serif text-2xl text-primary">
                    {group.label}
                  </h3>
                </div>
                <p className="max-w-xl font-sans text-sm leading-relaxed text-foreground/55 sm:text-right">
                  {group.blurb}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => (
                  <a
                    key={item.file}
                    href={docHref(item.file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-start gap-4 overflow-hidden rounded-sm border border-border/60 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-lg"
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-sm bg-primary/[0.04] font-serif text-[10px] font-semibold uppercase tracking-wider text-primary/50 ring-1 ring-border/60 transition-colors group-hover:bg-accent/10 group-hover:text-accent group-hover:ring-accent/40">
                      {item.kind}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="font-serif text-base leading-snug text-primary">
                        {item.title}
                      </h4>
                      <p className="mt-1 font-sans text-xs uppercase tracking-[0.12em] text-foreground/45">
                        {item.meta}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 font-sans text-xs font-medium text-primary/60 transition-colors group-hover:text-accent">
                        View original
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <figure className="mx-auto mt-20 max-w-3xl text-center">
          <blockquote className="font-serif text-2xl italic leading-relaxed text-primary text-balance sm:text-3xl">
            &ldquo;It is a true treasure of nature — at once a pillar of food
            security and a resilient crop offering sustainable livelihoods.&rdquo;
          </blockquote>
          <figcaption className="mt-6">
            <div className="mx-auto mb-4 h-px w-12 bg-accent/70" />
            <p className="font-sans text-sm uppercase tracking-[0.15em] text-foreground/55">
              As reported by Reporterre · 2025
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
