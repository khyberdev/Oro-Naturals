import type { Metadata } from "next";
import { CheckoutClient } from "@/components/checkout/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout | Oro Naturals",
  description:
    "Securely complete your Oro Naturals order — premium cold-pressed extra virgin olive oil delivered to your door.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
