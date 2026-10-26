// Reads customer/proposal data handed off by the BION dashboard and merges
// it onto the default quotation template.
//
// Hand-off contract (set by the dashboard's generateQuotation() in app.js):
// the dashboard opens this app in a new tab/window with a `data` query
// param containing `encodeURIComponent(JSON.stringify(payload))`, where
// payload is a FLAT object (not nested, not base64):
//
//   {
//     customerName, phone, email, address, district, section,
//     itemName,   // the customer's primary Proposal.name
//     tags,       // the primary Proposal.tags, e.g. "5.04KW, On Grid, HAVELLS"
//     amount,     // the primary Proposal.totalCost
//   }
//
// `URLSearchParams.get()` already un-escapes the percent-encoding, so the
// string returned is the raw JSON — just JSON.parse it.

import type { Quotation } from '../types/quotation';

const PREFILL_PARAM = 'data';

/** The exact (flat) shape the BION dashboard sends — see generateQuotation()
 * in the dashboard's app.js. All fields are optional in practice since the
 * dashboard fills them with "" / 0 when the customer/proposal lacks data. */
export interface DashboardQuotationPayload {
  customerName?: string;
  phone?: string;
  email?: string;
  address?: string;
  district?: string;
  section?: string;
  itemName?: string;
  tags?: string;
  amount?: number;
}

/** A patch quotation fields group-by-group — each group is itself partial,
 * unlike `Partial<Quotation>` (whose nested objects would otherwise be
 * required-in-full by TypeScript, inviting accidental blanking of sibling
 * fields when only one key is actually known). */
export interface QuotationPrefillPatch {
  customer?: Partial<Quotation['customer']>;
  project?: Partial<Quotation['project']>;
  pricing?: Partial<Quotation['pricing']>;
}

/** Reads and JSON-parses the `data` query param, if present. Returns null
 * (and logs a warning) if the param is missing or not valid JSON — callers
 * should fall back to the default quotation in that case. */
export function readPrefillFromUrl(): DashboardQuotationPayload | null {
  try {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get(PREFILL_PARAM);
    if (!raw) return null;
    return JSON.parse(raw) as DashboardQuotationPayload;
  } catch (err) {
    console.warn('[prefill] Could not parse the "data" query param, ignoring it.', err);
    return null;
  }
}

/** Removes the `data` param from the address bar after it's been applied,
 * so reloading/bookmarking doesn't re-apply (or keep exposing) the payload. */
export function clearPrefillFromUrl(): void {
  const url = new URL(window.location.href);
  if (!url.searchParams.has(PREFILL_PARAM)) return;
  url.searchParams.delete(PREFILL_PARAM);
  window.history.replaceState({}, '', url.toString());
}

/** Maps the dashboard's flat payload onto a grouped, partial patch. Only
 * includes a field when the dashboard actually sent a non-empty value, so
 * merging never blanks out a good default (e.g. `location: 'Idukki'`). */
export function fromDashboardPayload(payload: DashboardQuotationPayload): QuotationPrefillPatch {
  const patch: QuotationPrefillPatch = {};

  const customer: Partial<Quotation['customer']> = {};
  if (payload.customerName) customer.name = payload.customerName;
  if (payload.address) customer.address = payload.address;
  if (payload.district || payload.section) customer.location = payload.district || payload.section || '';
  if (payload.phone) customer.phone = payload.phone;
  if (payload.email) customer.email = payload.email;
  if (Object.keys(customer).length) patch.customer = customer;

  const project: Partial<Quotation['project']> = {};
  if (payload.itemName) project.projectTitle = payload.itemName;
  const capacityMatch = payload.tags?.match(/([\d.]+\s*KW)/i) ?? payload.itemName?.match(/([\d.]+\s*KW)/i);
  if (capacityMatch) project.systemCapacity = capacityMatch[1].toUpperCase();
  if (Object.keys(project).length) patch.project = project;

  if (payload.amount != null && payload.amount > 0) {
    patch.pricing = { systemPrice: payload.amount };
  }

  return patch;
}

/** Deep-merges a grouped patch onto a base Quotation, field by field within
 * each group, instead of a shallow `{...base, ...patch}` which would wipe
 * out sibling fields (e.g. patch.customer = {name} would otherwise blank
 * out address/phone/email). */
export function mergeQuotation(base: Quotation, patch: QuotationPrefillPatch): Quotation {
  return {
    ...base,
    customer: { ...base.customer, ...(patch.customer ?? {}) },
    project: { ...base.project, ...(patch.project ?? {}) },
    pricing: { ...base.pricing, ...(patch.pricing ?? {}) },
  };
}
