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
    <Section
      id="contact"
      eyebrow={t.section.reachOut}
      title={t.section.contactTitle}
      aside={
        <>
          {t.contact.blurb}
          <a
            className="font-mono text-brand underline-offset-4 hover:underline"
            href={`mailto:${resume.email}`}
            dir="ltr"
          >
            {resume.email}
          </a>
          {t.contact.blurbSuffix}
        </>
      }
    >
      <Card className="max-w-2xl">
        <div className="panel-head">
          <span className="inline-flex items-center gap-2">
            <span className="live-dot" />
            <span className="text-muted-foreground">message</span>
          </span>
          <span className="text-faint">mailto · direct</span>
        </div>
        <CardContent className="p-5 md:p-6">
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block font-mono text-[11px] uppercase tracking-[0.06em] text-subtle"
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
                  className="mb-2 block font-mono text-[11px] uppercase tracking-[0.06em] text-subtle"
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
                className="mb-2 block font-mono text-[11px] uppercase tracking-[0.06em] text-subtle"
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
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <Button type="submit">
                <Send /> {t.contact.sendViaMail}
              </Button>
              <Button asChild variant="outline">
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
