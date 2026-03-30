import React, { useEffect, useState } from "react";
import { useLocation, useSearch } from "wouter";
import { CheckCircle2, ArrowRight, Calendar } from "lucide-react";
import { ARCHETYPES } from "../../../shared/archetypes";
import type { ArchetypeId } from "../../../shared/archetypes";

// Google Calendar appointment booking link
const BOOKING_URL = "https://calendar.app.google/TYBu1hoGu8V4Zdvs8";

export default function PaymentSuccess() {
  const [, navigate] = useLocation();
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);

  const archetypeParam = params.get("archetype") as ArchetypeId | null;
  const submissionId = params.get("submissionId");

  const archetype = archetypeParam ? ARCHETYPES[archetypeParam] : null;
  const [countdown, setCountdown] = useState(5);

  // Auto-redirect to Calendly after 5 seconds
  useEffect(() => {
    if (countdown <= 0) {
      window.location.href = BOOKING_URL;
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="max-w-lg w-full space-y-8 text-center">

        {/* Success icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-primary/15 border-2 border-primary/40 flex items-center justify-center">
            <CheckCircle2 size={40} className="text-primary" />
          </div>
        </div>

        {/* Heading */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-black mb-3">Payment confirmed.</h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            Your{" "}
            <span className="text-foreground font-semibold">
              {archetype ? `${archetype.name} Brand Audit` : "Brand Audit"}
            </span>{" "}
            is booked. Now lock in your session time with Jesse.
          </p>
        </div>

        {/* What happens next */}
        <div className="bg-card border border-border rounded-2xl p-6 text-left space-y-4">
          <h3 className="text-xs font-black tracking-widest uppercase text-primary">What happens next</h3>
          {[
            "Pick a time that works for you on the next screen",
            "You'll receive a confirmation email with the Zoom link",
            "Jesse reviews your archetype profile before the call",
            "60-minute session — your brand strategy built live",
            "Written action plan delivered within 24 hours",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3 text-sm">
              <span className="text-primary font-bold text-xs w-5 shrink-0 mt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-muted-foreground">{step}</span>
            </div>
          ))}
        </div>

        {/* Calendly CTA */}
        <div className="space-y-3">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-black py-5 rounded-xl text-lg hover:bg-primary/90 active:scale-[0.98] transition-all shadow-xl shadow-primary/25"
          >
            <Calendar size={20} />
            Book My Session on Google Calendar
            <ArrowRight size={20} />
          </a>
          <p className="text-xs text-muted-foreground/60">
            Redirecting automatically in {countdown} second{countdown !== 1 ? "s" : ""}...
          </p>
        </div>

        {/* Back to results */}
        {submissionId && archetypeParam && (
          <button
            onClick={() => navigate(`/results?submissionId=${submissionId}&archetype=${archetypeParam}&unlocked=1`)}
            className="text-sm text-muted-foreground/60 hover:text-muted-foreground transition-colors"
          >
            Back to my playbook
          </button>
        )}

      </div>
    </div>
  );
}
