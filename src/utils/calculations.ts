import type { Pricing } from '../types/quotation';

export function getGrandTotal(pricing: Pricing): number {
  return pricing.systemPrice;
}

export function getPriceAfterSubsidy(pricing: Pricing): number {
  return Math.max(0, pricing.systemPrice - pricing.subsidyAmount);
}

export function getApprovalChargesTotal(pricing: Pricing): number {
  return pricing.approvalCharges.reduce((sum, c) => sum + (c.amount || 0), 0);
}

export function generateReferenceNumber(date: Date = new Date()): string {
  const year = date.getFullYear();
  const nextYearShort = String(year + 1).slice(-2);
  const financialYear =
    date.getMonth() >= 3 // April onwards is FY start in India
      ? `${year}-${nextYearShort}`
      : `${year - 1}-${String(year).slice(-2)}`;
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const random = Math.floor(1000 + Math.random() * 9000);
  return `B/Q/${financialYear}/${month}/${random}`;
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}
