import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Cpu, GraduationCap, Leaf } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: `Our Services — ${siteConfig.name}` },
      {
        name: "description",
        content:
          "Explore the professional services offered by ARICHI GLOBAL SYNERGY LTD: IT consultancy, real estate, educational support, and agro-services.",
      },
      { property: "og:title", content: `Our Services — ${siteConfig.name}` },
      {
        property: "og:description",
        content:
          "IT consultancy, real estate, educational support, and agro-services delivered with integrity.",
      },
      { property: "og:url", content: absoluteUrl("/services") },
      { property: "og:image", content: `${siteConfig.url}/og-image.png` },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/services") }],
  }),
});

const services = [
  {
    icon: Cpu,
    title: "Information Technology Consultancy Activities",
    shortTitle: "IT Consultancy",
    description:
      "We help organizations leverage technology to solve problems, improve efficiency, and drive growth. Our IT consultancy services cover digital strategy, systems integration, process automation, cybersecurity awareness, and technology advisory.",
    offerings: [
      "Digital transformation strategy",
      "IT systems assessment and integration",
      "Process automation advisory",
      "Technology roadmap development",
      "Cybersecurity and risk awareness",
    ],
  },
  {
    icon: Building2,
    title: "Buying and Selling of Own Real Estate",
    shortTitle: "Real Estate",
    description:
      "We engage in the acquisition and disposition of real estate assets, offering clients a straightforward and transparent experience. Whether you are buying your first property or selling an investment, we provide market insight and practical guidance.",
    offerings: [
      "Property acquisition and sales",
      "Market analysis and valuation support",
      "Investment property advisory",
      "Transaction coordination",
      "Portfolio management guidance",
    ],
  },
  {
    icon: GraduationCap,
    title: "Educational Support Services",
    shortTitle: "Educational Support",
    description:
      "Our educational support services are designed to help learners and institutions succeed. We provide tutoring, training resources, curriculum support, and academic guidance tailored to diverse learning needs.",
    offerings: [
      "Private tutoring and academic coaching",
      "Training and workshop facilitation",
      "Study resources and curriculum support",
      "Exam preparation assistance",
      "Educational consulting for institutions",
    ],
  },
  {
    icon: Leaf,
    title: "Agro-Services",
    shortTitle: "Agro-Services",
    description:
      "We support the agricultural sector through farm input supply, agribusiness consulting, and market linkage services. Our goal is to help farmers and agribusinesses improve productivity and achieve sustainable growth.",
    offerings: [
      "Farm input supply and sourcing",
      "Agribusiness consulting",
      "Crop and livestock advisory",
      "Market linkage support",
      "Sustainable farming practices guidance",
    ],
  },
];

function ServicesPage() {
  return (
    <main className="flex flex-col">
      {/* Hero */}
      <section className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Our Services
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Four specialized areas where ARICHI GLOBAL SYNERGY LTD delivers practical, professional
            solutions to individuals, businesses, and communities.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2">
            {services.map((service) => (
              <Card key={service.title} className="flex flex-col">
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{service.shortTitle}</CardTitle>
                  <CardDescription className="text-sm font-medium text-primary/80">
                    {service.title}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  <ul className="mt-6 space-y-2">
                    {service.offerings.map((offering) => (
                      <li key={offering} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{offering}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/60 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Need a Custom Solution?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Contact our team to discuss how we can tailor our services to your specific needs.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link to="/contact">
                Contact Us <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
