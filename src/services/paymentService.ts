/**
 * Paystack payment helpers (test mode on localhost is fine).
 *
 * Amount: ₦1000 = 100_000 kobo (Paystack always uses the smallest currency unit).
 *
 * Env (add to .env and .env.example):
 *   VITE_PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxx
 *
 * Production: verify on a server/Cloud Function before trusting isPaid.
 * This client flow is OK for development with test keys.
 */

import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

/** ₦1,000 in kobo */
export const PRO_PRICE_KOBO = 100_000;
export const PRO_PRICE_NAIRA = 1000;
export const PRO_PRICE_LABEL = "₦1,000";

export function getPaystackPublicKey(): string {
  const key = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY as string | undefined;
  if (!key) {
    throw new Error(
      "Missing VITE_PAYSTACK_PUBLIC_KEY in .env (use pk_test_... for localhost)"
    );
  }
  return key;
}

/** Unique reference so you can find the payment in Paystack dashboard */
export function makePaymentReference(uid: string): string {
  return `fx_${uid.slice(0, 8)}_${Date.now().toString(36)}`;
}

/**
 * Mark the user as paid in Firestore after Paystack reports success.
 * For production, prefer a Cloud Function that verifies the transaction
 * with Paystack's secret key, then sets these fields.
 */
export async function markUserPaid(
  uid: string,
  meta: {
    reference: string;
    amountKobo?: number;
  }
) {
  await updateDoc(doc(db, "users", uid), {
    isPaid: true,
    paidAt: serverTimestamp(),
    paystackReference: meta.reference,
    paidAmountKobo: meta.amountKobo ?? PRO_PRICE_KOBO,
  });
}
