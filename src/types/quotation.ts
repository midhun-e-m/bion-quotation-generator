// Core data model for a BION quotation.
// This is the single source of truth used by both the editor UI,
// the live preview, and the PDF renderer.

export interface CustomerDetails {
  name: string;
  address: string;
  location: string;
  phone: string;
  email: string;
}

export interface ProjectDetails {
  quotationTitle: string;
  projectTitle: string;
  systemType: string;
  systemCapacity: string;
  greeting: string;
  introParagraph1: string;
  introParagraph2: string;
  closingText: string;
}

export interface BOMItem {
  id: string;
  product: string;
  specification: string;
  make: string;
  quantity: string;
}

export interface ApprovalCharge {
  id: string;
  label: string;
  amount: number;
}

export interface Pricing {
  systemPrice: number;
  gstIncluded: boolean;
  subsidyAmount: number;
  approvalCharges: ApprovalCharge[];
  notes: string[];
}

export interface AdditionalExpenses {
  siteRequirements: string;
  extraInstallation: string;
  otherExpenses: string;
  notes: string;
}

export interface TermsAndConditions {
  scopeOfWork: string[];
  conditionsApply: string[];
}

export interface PaymentTerms {
  terms: string[];
}

export interface BankDetails {
  bankName: string;
  branch: string;
  accountNumber: string;
  ifsc: string;
  accountHolderName: string;
}

export interface WarrantyDetails {
  totalSystem: string;
  pcuInverter: string;
  panel: string;
  moduleProductWarranty: string;
  powerOutputWarranty: string;
  exclusions: string[];
  amcNote: string;
}

export interface CompanyDetails {
  name: string;
  tagline: string;
  headOfficeAddress: string;
  headOfficePhones: string;
  regionalOfficeAddress: string;
  regionalOfficePhones: string;
  branchOfficeAddress: string;
  website: string;
  email: string;
  footerAddressLine: string;
  logoDataUrl: string | null;
  signatureBlock: string;
  whyUsHeading: string;
  whyUsIntro: string;
  whyUsHighlights: string[];
}

export interface Quotation {
  customer: CustomerDetails;
  project: ProjectDetails;
  coverImage: string | null;
  date: string; // ISO yyyy-mm-dd
  referenceNumber: string;
  billOfMaterials: BOMItem[];
  pricing: Pricing;
  additionalExpenses: AdditionalExpenses;
  termsAndConditions: TermsAndConditions;
  paymentTerms: PaymentTerms;
  bankDetails: BankDetails;
  warranty: WarrantyDetails;
  companyDetails: CompanyDetails;
}
