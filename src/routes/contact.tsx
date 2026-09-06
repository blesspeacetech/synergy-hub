import { createFileRoute } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { contactSchema, type ContactInput } from "@/lib/contact";
import { submitContact } from "@/lib/contactFn";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: `Contact Us — ${siteConfig.name}` },
      {
        name: "description",
        content:
          "Get in touch with ARICHI GLOBAL SYNERGY LTD for inquiries about our IT consultancy, real estate, educational support, and agro-services.",
      },
      { property: "og:title", content: `Contact Us — ${siteConfig.name}` },
      {
        property: "og:description",
        content: "Reach out to ARICHI GLOBAL SYNERGY LTD for professional service inquiries.",
      },
      { property: "og:url", content: absoluteUrl("/contact") },
      { property: "og:image", content: `${siteConfig.url}/og-image.png` },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/contact") }],
  }),
});

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "Nigeria",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+234 (0) 000 000 0000",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@arichiglobalsynergy.com",
  },
];

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(contactSchema) as any,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    },
  });

  const onSubmit = handleSubmit(async (values: ContactInput) => {
    setServerError(null);
    try {
      const res = await submitContact({ data: values });
      if (res.success) {
        setSubmitted(true);
        reset();
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to send message. Please try again.";
      setServerError(message);
    }
  });

  return (
    <main className="flex flex-col">
      {/* Hero */}
      <section className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Have a question or want to discuss a project? We would love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Contact Info */}
            <div className="space-y-6 lg:col-span-1">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground">Get in Touch</h2>
                <p className="mt-3 text-muted-foreground">
                  Fill out the form and our team will get back to you as soon as possible.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <Card key={item.label}>
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.value}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="rounded-xl border border-border/60 bg-muted/30 p-6">
                <h3 className="font-semibold text-foreground">Business Hours</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Monday — Friday: 8:00 AM — 5:00 PM
                </p>
                <p className="text-sm text-muted-foreground">Saturday — Sunday: Closed</p>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="rounded-lg bg-primary/10 p-6 text-center">
                    <h3 className="text-lg font-semibold text-primary">Message Sent</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Thank you for reaching out. Our team will review your message and respond
                      shortly.
                    </p>
                    <Button className="mt-4" variant="outline" onClick={() => setSubmitted(false)}>
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-6" noValidate>
                    {/* Honeypot - hidden from users, bots will fill it */}
                    <div className="hidden" aria-hidden="true">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        type="text"
                        autoComplete="off"
                        tabIndex={-1}
                        placeholder=""
                        {...register("website")}
                      />
                    </div>

                    {serverError ? (
                      <div
                        role="alert"
                        className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                      >
                        {serverError}
                      </div>
                    ) : null}

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          autoComplete="given-name"
                          placeholder="John"
                          aria-invalid={!!errors.firstName}
                          {...register("firstName")}
                        />
                        {errors.firstName ? (
                          <p className="text-sm text-destructive">{errors.firstName.message}</p>
                        ) : null}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          autoComplete="family-name"
                          placeholder="Doe"
                          aria-invalid={!!errors.lastName}
                          {...register("lastName")}
                        />
                        {errors.lastName ? (
                          <p className="text-sm text-destructive">{errors.lastName.message}</p>
                        ) : null}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="john.doe@example.com"
                        aria-invalid={!!errors.email}
                        {...register("email")}
                      />
                      {errors.email ? (
                        <p className="text-sm text-destructive">{errors.email.message}</p>
                      ) : null}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="How can we help you?"
                        aria-invalid={!!errors.subject}
                        {...register("subject")}
                      />
                      {errors.subject ? (
                        <p className="text-sm text-destructive">{errors.subject.message}</p>
                      ) : null}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your inquiry..."
                        rows={5}
                        aria-invalid={!!errors.message}
                        {...register("message")}
                      />
                      {errors.message ? (
                        <p className="text-sm text-destructive">{errors.message.message}</p>
                      ) : null}
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full sm:w-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending…" : "Send Message"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
