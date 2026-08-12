import { useQuotationStore } from '../../store/quotationStore';
import CoverPreview from '../preview/CoverPreview';
import IntroductionPreview from '../preview/IntroductionPreview';
import BOMPreview from '../preview/BOMPreview';
import ProjectCostPreview from '../preview/ProjectCostPreview';
import TermsPreview from '../preview/TermsPreview';
import PaymentWarrantyPreview from '../preview/PaymentWarrantyPreview';

const TOTAL_PAGES = 6;

// Lightweight, pure-HTML/CSS approximation of the generated PDF.
// This intentionally avoids @react-pdf/renderer's <PDFViewer>, which
// loads a full pdf.js engine in an iframe and rebuilds a real PDF
// blob on every change — expensive in both CPU and memory, especially
// once the app is hosted with a small RAM budget. The real PDF is
// only built (via @react-pdf/renderer, lazy-loaded) when the user
// clicks "Generate PDF" in GeneratePdfButton.
export default function QuotationPreview() {
  const quotation = useQuotationStore((s) => s.quotation);

  return (
    <div className="h-full w-full overflow-y-auto bg-slate-200 rounded-xl border border-slate-300 shadow-inner p-4">
      <CoverPreview quotation={quotation} pageNumber={1} totalPages={TOTAL_PAGES} />
      <IntroductionPreview quotation={quotation} pageNumber={2} totalPages={TOTAL_PAGES} />
      <BOMPreview quotation={quotation} pageNumber={3} totalPages={TOTAL_PAGES} />
      <ProjectCostPreview quotation={quotation} pageNumber={4} totalPages={TOTAL_PAGES} />
      <TermsPreview quotation={quotation} pageNumber={5} totalPages={TOTAL_PAGES} />
      <PaymentWarrantyPreview quotation={quotation} pageNumber={6} totalPages={TOTAL_PAGES} />
    </div>
  );
}
