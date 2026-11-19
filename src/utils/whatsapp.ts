export interface OrderItem {
  id: string;
  name: string;
  qty: number;
}

export interface CustomerData {
  name: string;
  phone: string;
  note: string;
}

const WHATSAPP_NUMBER = "5548998408153";

export function generateWhatsAppMessage(
  items: OrderItem[],
  customer: CustomerData
): string {
  const itemLines = items
    .map(
      (i) =>
        `• ${i.qty}x ${i.name}`
    )
    .join("\n");

  const message = [
    "Olá, Vibe Afiações! 👋",
    "",
    "Gostaria de pedir um orçamento para afiação.",
    "",
    `👤 Nome: ${customer.name}`,
    `📱 Telefone: ${customer.phone}`,
    "",
    "🔧 Itens:",
    itemLines,
    "",
    customer.note ? `📝 Observação:\n${customer.note}` : "",
    "",
    "Aguardo o orçamento.",
  ]
    .filter((line) => line !== undefined)
    .join("\n")
    .trim();

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 11)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  return value;
}
