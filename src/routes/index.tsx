import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Cpu, GraduationCap, Leaf, ShieldCheck, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: siteConfig.name },
      { name: "description", content: siteConfig.description },
      { property: "og:title", content: siteConfig.name },
      { property: "og:description", content: siteConfig.description },
      { property: "og:url", content: absoluteUrl("/") },
      { property: "og:image", content: `${siteConfig.url}/og-image.png` },
      { name: "twitter:title", content: siteConfig.name },
      { name: "twitter:description", content: siteConfig.description },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/") }],
  }),
});

const services = [
  {
    icon: Cpu,
    title: "IT Consultancy",
    description:
      "Strategic technology guidance, digital transformation, and systems integration for modern businesses.",
  },
  {
    icon: Building2,
    title: "Real Estate",
    description:
      "Buying and selling of own real estate with transparent processes and market-focused advice.",
  },
  {
    icon: GraduationCap,
    title: "Educational Support",
    description:
      "Tutoring, training resources, and academic support services that help learners reach their potential.",
  },
  {
    icon: Leaf,
    title: "Agro-Services",
    description:
      "Agricultural support, farm input supply, and agribusiness consulting for sustainable growth.",
  },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    description: "We operate with honesty, transparency, and accountability in every engagement.",
  },
  {
    icon: Users,
    title: "Partnership",
    description: "We build lasting relationships with clients, communities, and stakeholders.",
  },
];

function HomePage() {
  return (
    <main className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary px-4 py-24 text-primary-foreground sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              ARICHI GLOBAL SYNERGY LTD
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-primary-foreground/90 sm:text-xl">
              Delivering diversified professional services across information technology, real
              estate, education, and agriculture. We combine expertise with integrity to help our
              clients and communities thrive.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/services">
                  Explore Services <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              What We Do
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Four focused service areas designed to create value and drive sustainable growth.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Card key={service.title} className="group transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <service.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10">
            <Button asChild variant="outline">
              <Link to="/services">
                View All Services <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="border-y border-border/60 bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Built on Trust, Driven by Results
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                ARICHI GLOBAL SYNERGY LTD brings together experienced professionals across multiple
                industries. We are committed to ethical business practices, client-focused
                solutions, and long-term value creation.
              </p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {values.map((value) => (
                  <div key={value.title} className="flex gap-4">
                    <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <value.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{value.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <Button asChild>
                  <Link to="/about">
                    Learn More About Us <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-background p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-foreground">Why Choose Us?</h3>
              <ul className="mt-6 space-y-4">
                {[
                  "Multi-sector expertise under one trusted brand",
                  "Client-centered approach to every project",
                  "Ethical, transparent business practices",
                  "Commitment to quality and continuous improvement",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl bg-primary px-6 py-12 text-primary-foreground sm:px-12 lg:py-16">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to Work With Us?
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/90">
                Reach out today to discuss how ARICHI GLOBAL SYNERGY LTD can support your business,
                property, educational, or agricultural needs.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" variant="secondary">
                  <Link to="/contact">Get in Touch</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <Link to="/services">Our Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
