import { create } from 'zustand';
import type {
  Quotation,
  CustomerDetails,
  ProjectDetails,
  BOMItem,
  Pricing,
  ApprovalCharge,
  AdditionalExpenses,
  BankDetails,
  WarrantyDetails,
  CompanyDetails,
} from '../types/quotation';
import { createDefaultQuotation } from '../data/defaultQuotation';
import { generateId, generateReferenceNumber } from '../utils/calculations';

interface QuotationState {
  quotation: Quotation;

  // Top level
  updateCustomer: (patch: Partial<CustomerDetails>) => void;
  updateProject: (patch: Partial<ProjectDetails>) => void;
  updateDate: (date: string) => void;
  updateReferenceNumber: (ref: string) => void;
  regenerateReferenceNumber: () => void;

  // Cover image
  setCoverImage: (dataUrl: string) => void;
  removeCoverImage: () => void;

  // BOM
  addBOMItem: (item?: Partial<BOMItem>) => void;
  updateBOMItem: (id: string, patch: Partial<BOMItem>) => void;
  removeBOMItem: (id: string) => void;
  reorderBOMItem: (fromIndex: number, toIndex: number) => void;

  // Pricing
  updatePricing: (patch: Partial<Pricing>) => void;
  addApprovalCharge: () => void;
  updateApprovalCharge: (id: string, patch: Partial<ApprovalCharge>) => void;
  removeApprovalCharge: (id: string) => void;
  addPricingNote: () => void;
  updatePricingNote: (index: number, value: string) => void;
  removePricingNote: (index: number) => void;

  // Additional expenses
  updateAdditionalExpenses: (patch: Partial<AdditionalExpenses>) => void;

  // Terms
  addScopeItem: () => void;
  updateScopeItem: (index: number, value: string) => void;
  removeScopeItem: (index: number) => void;
  addConditionItem: () => void;
  updateConditionItem: (index: number, value: string) => void;
  removeConditionItem: (index: number) => void;

  // Payment terms
  addPaymentTerm: () => void;
  updatePaymentTerm: (index: number, value: string) => void;
  removePaymentTerm: (index: number) => void;

  // Bank
  updateBankDetails: (patch: Partial<BankDetails>) => void;

  // Warranty
  updateWarranty: (patch: Partial<WarrantyDetails>) => void;
  addWarrantyExclusion: () => void;
  updateWarrantyExclusion: (index: number, value: string) => void;
  removeWarrantyExclusion: (index: number) => void;

  // Company
  updateCompanyDetails: (patch: Partial<CompanyDetails>) => void;
  setCompanyLogo: (dataUrl: string) => void;
  removeCompanyLogo: () => void;
  addWhyUsHighlight: () => void;
  updateWhyUsHighlight: (index: number, value: string) => void;
  removeWhyUsHighlight: (index: number) => void;

  // Global
  resetQuotation: () => void;
  loadQuotation: (q: Quotation) => void;
}

export const useQuotationStore = create<QuotationState>((set) => ({
  quotation: createDefaultQuotation(),

  updateCustomer: (patch) =>
    set((s) => ({ quotation: { ...s.quotation, customer: { ...s.quotation.customer, ...patch } } })),

  updateProject: (patch) =>
    set((s) => ({ quotation: { ...s.quotation, project: { ...s.quotation.project, ...patch } } })),

  updateDate: (date) => set((s) => ({ quotation: { ...s.quotation, date } })),

  updateReferenceNumber: (referenceNumber) =>
    set((s) => ({ quotation: { ...s.quotation, referenceNumber } })),

  regenerateReferenceNumber: () =>
    set((s) => ({ quotation: { ...s.quotation, referenceNumber: generateReferenceNumber() } })),

  setCoverImage: (dataUrl) => set((s) => ({ quotation: { ...s.quotation, coverImage: dataUrl } })),
  removeCoverImage: () => set((s) => ({ quotation: { ...s.quotation, coverImage: null } })),

  addBOMItem: (item) =>
    set((s) => ({
      quotation: {
        ...s.quotation,
        billOfMaterials: [
          ...s.quotation.billOfMaterials,
          { id: generateId(), product: '', specification: '', make: '', quantity: '', ...item },
        ],
      },
    })),

  updateBOMItem: (id, patch) =>
    set((s) => ({
      quotation: {
        ...s.quotation,
        billOfMaterials: s.quotation.billOfMaterials.map((it) => (it.id === id ? { ...it, ...patch } : it)),
      },
    })),

  removeBOMItem: (id) =>
    set((s) => ({
      quotation: { ...s.quotation, billOfMaterials: s.quotation.billOfMaterials.filter((it) => it.id !== id) },
    })),

  reorderBOMItem: (fromIndex, toIndex) =>
    set((s) => {
      const items = [...s.quotation.billOfMaterials];
      const [moved] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, moved);
      return { quotation: { ...s.quotation, billOfMaterials: items } };
    }),

  updatePricing: (patch) =>
    set((s) => ({ quotation: { ...s.quotation, pricing: { ...s.quotation.pricing, ...patch } } })),

  addApprovalCharge: () =>
    set((s) => ({
      quotation: {
        ...s.quotation,
        pricing: {
          ...s.quotation.pricing,
          approvalCharges: [...s.quotation.pricing.approvalCharges, { id: generateId(), label: '', amount: 0 }],
        },
      },
    })),

  updateApprovalCharge: (id, patch) =>
    set((s) => ({
      quotation: {
        ...s.quotation,
        pricing: {
          ...s.quotation.pricing,
          approvalCharges: s.quotation.pricing.approvalCharges.map((c) => (c.id === id ? { ...c, ...patch } : c)),
        },
      },
    })),

  removeApprovalCharge: (id) =>
    set((s) => ({
      quotation: {
        ...s.quotation,
        pricing: {
          ...s.quotation.pricing,
          approvalCharges: s.quotation.pricing.approvalCharges.filter((c) => c.id !== id),
        },
      },
    })),

  addPricingNote: () =>
    set((s) => ({
      quotation: { ...s.quotation, pricing: { ...s.quotation.pricing, notes: [...s.quotation.pricing.notes, ''] } },
    })),

  updatePricingNote: (index, value) =>
    set((s) => {
      const notes = [...s.quotation.pricing.notes];
      notes[index] = value;
      return { quotation: { ...s.quotation, pricing: { ...s.quotation.pricing, notes } } };
    }),

  removePricingNote: (index) =>
    set((s) => ({
      quotation: {
        ...s.quotation,
        pricing: { ...s.quotation.pricing, notes: s.quotation.pricing.notes.filter((_, i) => i !== index) },
      },
    })),

  updateAdditionalExpenses: (patch) =>
    set((s) => ({ quotation: { ...s.quotation, additionalExpenses: { ...s.quotation.additionalExpenses, ...patch } } })),

  addScopeItem: () =>
    set((s) => ({
      quotation: {
        ...s.quotation,
        termsAndConditions: {
          ...s.quotation.termsAndConditions,
          scopeOfWork: [...s.quotation.termsAndConditions.scopeOfWork, ''],
        },
      },
    })),

  updateScopeItem: (index, value) =>
    set((s) => {
      const scopeOfWork = [...s.quotation.termsAndConditions.scopeOfWork];
      scopeOfWork[index] = value;
      return { quotation: { ...s.quotation, termsAndConditions: { ...s.quotation.termsAndConditions, scopeOfWork } } };
    }),

  removeScopeItem: (index) =>
    set((s) => ({
      quotation: {
        ...s.quotation,
        termsAndConditions: {
          ...s.quotation.termsAndConditions,
          scopeOfWork: s.quotation.termsAndConditions.scopeOfWork.filter((_, i) => i !== index),
        },
      },
    })),

  addConditionItem: () =>
    set((s) => ({
      quotation: {
        ...s.quotation,
        termsAndConditions: {
          ...s.quotation.termsAndConditions,
          conditionsApply: [...s.quotation.termsAndConditions.conditionsApply, ''],
        },
      },
    })),

  updateConditionItem: (index, value) =>
    set((s) => {
      const conditionsApply = [...s.quotation.termsAndConditions.conditionsApply];
      conditionsApply[index] = value;
      return {
        quotation: { ...s.quotation, termsAndConditions: { ...s.quotation.termsAndConditions, conditionsApply } },
      };
    }),

  removeConditionItem: (index) =>
    set((s) => ({
      quotation: {
        ...s.quotation,
        termsAndConditions: {
          ...s.quotation.termsAndConditions,
          conditionsApply: s.quotation.termsAndConditions.conditionsApply.filter((_, i) => i !== index),
        },
      },
    })),

  addPaymentTerm: () =>
    set((s) => ({
      quotation: { ...s.quotation, paymentTerms: { terms: [...s.quotation.paymentTerms.terms, ''] } },
    })),

  updatePaymentTerm: (index, value) =>
    set((s) => {
      const terms = [...s.quotation.paymentTerms.terms];
      terms[index] = value;
      return { quotation: { ...s.quotation, paymentTerms: { terms } } };
    }),

  removePaymentTerm: (index) =>
    set((s) => ({
      quotation: {
        ...s.quotation,
        paymentTerms: { terms: s.quotation.paymentTerms.terms.filter((_, i) => i !== index) },
      },
    })),

  updateBankDetails: (patch) =>
    set((s) => ({ quotation: { ...s.quotation, bankDetails: { ...s.quotation.bankDetails, ...patch } } })),

  updateWarranty: (patch) =>
    set((s) => ({ quotation: { ...s.quotation, warranty: { ...s.quotation.warranty, ...patch } } })),

  addWarrantyExclusion: () =>
    set((s) => ({
      quotation: {
        ...s.quotation,
        warranty: { ...s.quotation.warranty, exclusions: [...s.quotation.warranty.exclusions, ''] },
      },
    })),

  updateWarrantyExclusion: (index, value) =>
    set((s) => {
      const exclusions = [...s.quotation.warranty.exclusions];
      exclusions[index] = value;
      return { quotation: { ...s.quotation, warranty: { ...s.quotation.warranty, exclusions } } };
    }),

  removeWarrantyExclusion: (index) =>
    set((s) => ({
      quotation: {
        ...s.quotation,
        warranty: { ...s.quotation.warranty, exclusions: s.quotation.warranty.exclusions.filter((_, i) => i !== index) },
      },
    })),

  updateCompanyDetails: (patch) =>
    set((s) => ({ quotation: { ...s.quotation, companyDetails: { ...s.quotation.companyDetails, ...patch } } })),

  setCompanyLogo: (dataUrl) =>
    set((s) => ({ quotation: { ...s.quotation, companyDetails: { ...s.quotation.companyDetails, logoDataUrl: dataUrl } } })),

  removeCompanyLogo: () =>
    set((s) => ({ quotation: { ...s.quotation, companyDetails: { ...s.quotation.companyDetails, logoDataUrl: null } } })),

  addWhyUsHighlight: () =>
    set((s) => ({
      quotation: {
        ...s.quotation,
        companyDetails: {
          ...s.quotation.companyDetails,
          whyUsHighlights: [...s.quotation.companyDetails.whyUsHighlights, ''],
        },
      },
    })),

  updateWhyUsHighlight: (index, value) =>
    set((s) => {
      const whyUsHighlights = [...s.quotation.companyDetails.whyUsHighlights];
      whyUsHighlights[index] = value;
      return { quotation: { ...s.quotation, companyDetails: { ...s.quotation.companyDetails, whyUsHighlights } } };
    }),

  removeWhyUsHighlight: (index) =>
    set((s) => ({
      quotation: {
        ...s.quotation,
        companyDetails: {
          ...s.quotation.companyDetails,
          whyUsHighlights: s.quotation.companyDetails.whyUsHighlights.filter((_, i) => i !== index),
        },
      },
    })),

  resetQuotation: () => set({ quotation: createDefaultQuotation() }),
  loadQuotation: (q) => set({ quotation: q }),
}));
