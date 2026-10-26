import { useEffect, useState } from 'react';
import { useQuotationStore } from './store/quotationStore';
import { readPrefillFromUrl, clearPrefillFromUrl, mergeQuotation, fromDashboardPayload } from './utils/prefill';
import GeneratePdfButton from './components/quotation/GeneratePdfButton';
import CustomerForm from './components/quotation/CustomerForm';
import ProjectForm from './components/quotation/ProjectForm';
import ImageUploader from './components/quotation/ImageUploader';
import BOMEditor from './components/quotation/BOMEditor';
import PricingEditor from './components/quotation/PricingEditor';
import AdditionalExpensesEditor from './components/quotation/AdditionalExpensesEditor';
import TermsEditor from './components/quotation/TermsEditor';
import PaymentEditor from './components/quotation/PaymentEditor';
import WarrantyEditor from './components/quotation/WarrantyEditor';
import CompanySettings from './components/quotation/CompanySettings';
import QuotationPreview from './components/quotation/QuotationPreview';
import { RotateCcw, FileText } from 'lucide-react';
import bionLogo from './assets/bion-logo.png';
import type { Quotation } from './types/quotation';

function validateQuotation(q: Quotation) {
  const errors: Record<string, string> = {};
  if (!q.customer.name.trim()) errors.customerName = 'Customer name is required';
  if (!q.date) errors.date = 'Date is required';
  if (!q.referenceNumber.trim()) errors.referenceNumber = 'Reference number is required';
  if (!q.project.quotationTitle.trim()) errors.quotationTitle = 'Quotation title is required';
  if (!q.project.projectTitle.trim()) errors.projectTitle = 'Project title is required';
  if (q.pricing.systemPrice < 0) errors.systemPrice = 'Must be a positive number';
  if (q.pricing.subsidyAmount < 0) errors.subsidyAmount = 'Must be a positive number';
  return errors;
}

export default function App() {
  const quotation = useQuotationStore((s) => s.quotation);
  const resetQuotation = useQuotationStore((s) => s.resetQuotation);
  const loadQuotation = useQuotationStore((s) => s.loadQuotation);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');
  const [prefilled, setPrefilled] = useState(false);

  // Dashboard hand-off: ?data=<encodeURIComponent(JSON) flat payload>, sent
  // by generateQuotation() in the BION dashboard's app.js (see
  // src/utils/prefill.ts). Runs once on mount, merges onto the default
  // template, then scrubs the param from the address bar.
  useEffect(() => {
    const payload = readPrefillFromUrl();
    if (payload) {
      const patch = fromDashboardPayload(payload);
      const current = useQuotationStore.getState().quotation;
      loadQuotation(mergeQuotation(current, patch));
      clearPrefillFromUrl();
      setPrefilled(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const errors = validateQuotation(quotation);
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <img src={bionLogo} alt="BION" className="h-8 w-auto" />
          <div>
            <h1 className="text-sm font-semibold text-slate-800 leading-tight">BION Quotation Generator</h1>
            <p className="text-xs text-slate-400 leading-tight">Water &amp; Energy Solutions</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowResetConfirm(true)}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition"
          >
            <RotateCcw size={14} /> Reset
          </button>
          <GeneratePdfButton quotation={quotation} disabled={hasErrors} />
        </div>
      </header>

      {prefilled && (
        <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2 text-xs text-emerald-700 flex items-center justify-between gap-2">
          <span className="flex items-center gap-2">
            <FileText size={13} /> Customer and project details were prefilled from the dashboard. Review before
            generating the PDF.
          </span>
          <button onClick={() => setPrefilled(false)} className="text-emerald-500 hover:text-emerald-700">
            Dismiss
          </button>
        </div>
      )}

      {hasErrors && (
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-2 text-xs text-amber-700 flex items-center gap-2">
          <FileText size={13} /> Complete the required fields ({Object.keys(errors).length}) before generating the
          PDF.
        </div>
      )}

      {/* Mobile tab switch */}
      <div className="flex md:hidden border-b border-slate-200 bg-white">
        {(['editor', 'preview'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setMobileTab(tab)}
            className={`flex-1 py-2.5 text-sm font-medium capitalize transition ${
              mobileTab === tab ? 'text-[#12356B] border-b-2 border-[#12356B]' : 'text-slate-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main layout */}
      <main className="flex-1 flex flex-col md:flex-row gap-4 p-4 sm:p-6 overflow-hidden">
        <div
          className={`md:w-[46%] lg:w-[42%] overflow-y-auto space-y-4 pr-1 ${
            mobileTab === 'editor' ? 'block' : 'hidden md:block'
          }`}
        >
          <CustomerForm errors={errors} />
          <ProjectForm errors={errors} />
          <ImageUploader />
          <BOMEditor />
          <PricingEditor errors={errors} />
          <AdditionalExpensesEditor />
          <TermsEditor />
          <PaymentEditor />
          <WarrantyEditor />
          <CompanySettings />
          <button
            onClick={() => setShowResetConfirm(true)}
            className="sm:hidden w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition mb-4"
          >
            <RotateCcw size={14} /> Reset quotation
          </button>
        </div>

        <div className={`flex-1 min-h-[400px] ${mobileTab === 'preview' ? 'block' : 'hidden md:block'}`}>
          <QuotationPreview />
        </div>
      </main>

      {/* Reset confirmation modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl">
            <h2 className="text-sm font-semibold text-slate-800 mb-2">Reset quotation?</h2>
            <p className="text-xs text-slate-500 mb-5">
              This will discard all changes and restore the default BION template. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetQuotation();
                  setShowResetConfirm(false);
                }}
                className="rounded-lg bg-red-600 px-3 py-2 text-xs font-medium text-white hover:bg-red-700 transition"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
