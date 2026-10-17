import { useState } from "react";
import { Check, Copy, ExternalLink, Mail, Send } from "lucide-react";
import { profile } from "../../data/portfolioData.js";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  function sendMessage(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(
      String(form.get("subject") || "A new mission"),
    );
    const message = encodeURIComponent(
      `From: ${String(form.get("name") || "")}\n\n${String(form.get("message") || "")}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${message}`;
  }

  return (
    <div className="contact-view">
      <div className="view-intro">
        <span className="eyebrow">OPEN TRANSMISSION</span>
        <h2>
          Let’s make <em>something matter.</em>
        </h2>
        <p className="body-copy">
          Have a project, a question, or an idea you can’t stop thinking about?
          Send a signal.
        </p>
      </div>
      <div className="contact-grid">
        <section className="panel-card contact-card">
          <span className="contact-icon">
            <Mail size={21} />
          </span>
          <a className="contact-email" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <button type="button" className="copy-button" onClick={copyEmail}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "COPIED" : "COPY ADDRESS"}
          </button>
          <div className="social-links">
            {profile.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
              >
                {social.label}
                <ExternalLink size={13} />
              </a>
            ))}
          </div>
        </section>
        <form className="panel-card contact-form" onSubmit={sendMessage}>
          <div className="panel-heading">
            <span>TRANSMIT A MESSAGE</span>
            <span className="contact-form__id">MSG_001</span>
          </div>
          <label>
            Your name
            <input
              name="name"
              autoComplete="name"
              placeholder="What should I call you?"
              required
            />
          </label>
          <label>
            Subject
            <input
              name="subject"
              placeholder="A project, an idea, a hello…"
              required
            />
          </label>
          <label>
            Message
            <textarea
              name="message"
              rows="4"
              placeholder="Tell me a little about it."
              required
            />
          </label>
          <button className="send-button" type="submit">
            OPEN EMAIL APP <Send size={14} />
          </button>
          <p className="form-note">
            Your email app will open with this message ready to send.
          </p>
        </form>
      </div>
    </div>
  );
}
