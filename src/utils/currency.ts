/**
 * Formats a number using the Indian numbering system (lakh/crore grouping)
 * and prefixes it with the Rupee symbol, e.g. 364000 -> "₹3,64,000".
 */
export function formatINR(value: number | string | undefined | null): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (num === undefined || num === null || Number.isNaN(num)) return '₹0';

  const isNegative = num < 0;
  const absValue = Math.abs(Math.round(num));
  const numStr = absValue.toString();

  let formatted: string;
  if (numStr.length <= 3) {
    formatted = numStr;
  } else {
    const lastThree = numStr.substring(numStr.length - 3);
    const rest = numStr.substring(0, numStr.length - 3);
    const restFormatted = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    formatted = `${restFormatted},${lastThree}`;
  }

  return `${isNegative ? '-' : ''}₹${formatted}`;
}

/** Parses a currency-formatted or plain string back into a number. */
export function parseCurrencyInput(value: string): number {
  const cleaned = value.replace(/[₹,\s]/g, '');
  const num = parseFloat(cleaned);
  return Number.isNaN(num) ? 0 : num;
}
