/** Oro Naturals WhatsApp business number (international format, no +). */
export const WHATSAPP_NUMBER = "923172255555";

const INQUIRY_PRETEXT = "Hey Oro Naturals , I need to inquire about ";

/**
 * Build a wa.me link that opens a chat with the Oro Naturals number,
 * pre-filled with the inquiry pretext plus an optional subject.
 */
export function whatsappInquiryLink(subject?: string): string {
  const message = subject ? `${INQUIRY_PRETEXT}${subject}` : INQUIRY_PRETEXT;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
