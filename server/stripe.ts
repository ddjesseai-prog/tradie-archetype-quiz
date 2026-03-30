import Stripe from "stripe";
import { ENV } from "./_core/env";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(ENV.stripeSecretKey, {
      apiVersion: "2026-03-25.dahlia",
    });
  }
  return _stripe;
}

export const BRAND_AUDIT_PRICE_CENTS = 99000; // $990.00 AUD
export const BRAND_AUDIT_PRODUCT_NAME = "Tradie Brand Audit + Strategy Session";

export async function createBrandAuditCheckoutSession({
  archetypeId,
  archetypeName,
  submissionId,
  successUrl,
  cancelUrl,
  customerEmail,
}: {
  archetypeId: string;
  archetypeName: string;
  submissionId: number;
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
}): Promise<{ url: string; sessionId: string }> {
  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: customerEmail,
    line_items: [
      {
        price_data: {
          currency: "aud",
          product_data: {
            name: BRAND_AUDIT_PRODUCT_NAME,
            description: `Personalised brand strategy session for ${archetypeName}. Includes full brand audit, positioning strategy, and 60-min deep-dive call.`,
          },
          unit_amount: BRAND_AUDIT_PRICE_CENTS,
        },
        quantity: 1,
      },
    ],
    metadata: {
      archetypeId,
      submissionId: String(submissionId),
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  if (!session.url) throw new Error("Stripe did not return a checkout URL");

  return { url: session.url, sessionId: session.id };
}
