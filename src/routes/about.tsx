import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Eye, HeartHandshake, Target } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: `About Us — ${siteConfig.name}` },
      {
        name: "description",
        content:
          "Learn about ARICHI GLOBAL SYNERGY LTD, our mission, vision, values, and the professional services we provide across IT, real estate, education, and agriculture.",
      },
      { property: "og:title", content: `About Us — ${siteConfig.name}` },
      {
        property: "og:description",
        content:
          "Discover our mission, vision, and commitment to excellence across multiple industries.",
      },
      { property: "og:url", content: absoluteUrl("/about") },
      { property: "og:image", content: `${siteConfig.url}/og-image.png` },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/about") }],
  }),
});

const pillars = [
  {
    icon: Target,
    title: "Mission",
    description:
      "To deliver reliable, high-quality services that create value for our clients, empower our people, and contribute positively to the communities we serve.",
  },
  {
    icon: Eye,
    title: "Vision",
    description:
      "To become a trusted partner of choice for individuals and organizations seeking professional excellence in technology, real estate, education, and agriculture.",
  },
  {
    icon: HeartHandshake,
    title: "Values",
    description:
      "Integrity, professionalism, client focus, innovation, and social responsibility guide every decision we make and every relationship we build.",
  },
];

function AboutPage() {
  return (
    <main className="flex flex-col">
      {/* Hero */}
      <section className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              About ARICHI GLOBAL SYNERGY LTD
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              ARICHI GLOBAL SYNERGY LTD is a diversified company built on the belief that expertise,
              integrity, and partnership can solve complex challenges. We operate across four key
              sectors — information technology, real estate, education, and agriculture — bringing
              practical solutions to the people and organizations we serve.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Who We Are
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Founded with a commitment to excellence, ARICHI GLOBAL SYNERGY LTD brings together
                professionals who understand the unique demands of modern business and community
                development. We combine sector-specific knowledge with a client-first mindset to
                deliver results that matter.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Whether we are advising on technology strategy, facilitating real estate
                transactions, supporting learners, or working with agribusinesses, our approach
                remains the same: listen carefully, plan thoughtfully, and execute with precision.
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-muted/30 p-8">
              <h3 className="text-xl font-semibold text-foreground">What Drives Us</h3>
              <ul className="mt-6 space-y-4">
                {[
                  "A passion for solving real problems",
                  "Respect for our clients and partners",
                  "Continuous learning and improvement",
                  "Sustainable and ethical business practices",
                  "Long-term value over short-term gains",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="border-y border-border/60 bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Foundation
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Everything we do is guided by a clear sense of purpose and a commitment to doing
              business the right way.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map((pillar) => (
              <Card key={pillar.title} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <pillar.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{pillar.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Want to Know More?
          </h2>
          <p className="mt-4 text-muted-foreground">
            We would be happy to discuss how our team can support your goals.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/contact">
                Get in Touch <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/services">Our Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
