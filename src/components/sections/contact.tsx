import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { Section } from "@/components/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { resume } from "@/data/resume";
import { useLocale } from "@/hooks/use-locale";

export function Contact() {
  const { t } = useLocale();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = `Portfolio contact from ${name || "someone"}`;
    const body = `${message}\n\n— ${name}${email ? ` <${email}>` : ""}`;
    const href = `mailto:${resume.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  }

  return (
    <Section id="contact" eyebrow={t.section.reachOut} title={t.section.contactTitle}>
      <Card className="mx-auto max-w-2xl">
        <CardContent className="p-6 md:p-8">
          <p className="text-sm text-muted-foreground">
            {t.contact.blurb}
            <a
              className="font-mono font-medium text-foreground underline underline-offset-4"
              href={`mailto:${resume.email}`}
              dir="ltr"
            >
              {resume.email}
            </a>
            {t.contact.blurbSuffix}
          </p>
          <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-medium"
                >
                  {t.contact.name}
                </label>
                <Input
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.contact.placeholderName}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium"
                >
                  {t.contact.email}
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  dir="ltr"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-sm font-medium"
              >
                {t.contact.message}
              </label>
              <Textarea
                id="message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.contact.placeholderMessage}
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" size="lg">
                <Send /> {t.contact.sendViaMail}
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={`mailto:${resume.email}`}>
                  <Mail /> {t.contact.openMailto}
                </a>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Section>
  );
}
