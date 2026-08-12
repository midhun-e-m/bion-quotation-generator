import { useState } from 'react';
import { Download } from 'lucide-react';
import type { Quotation } from '../../types/quotation';

interface Props {
  quotation: Quotation;
  disabled?: boolean;
}

// @react-pdf/renderer is a large library (it bundles its own PDF
// layout engine). Importing it statically at the top of the app means
// it's parsed and kept in memory the whole time the app is open, even
// if the user never downloads a PDF. Loading it dynamically, only
// when this button is clicked, keeps the app's baseline memory (and
// initial bundle size) much smaller.
export default function GeneratePdfButton({ quotation, disabled }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (disabled || loading) return;
    setLoading(true);
    try {
      const [{ pdf }, { default: QuotationPDF }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('../pdf/QuotationPDF'),
      ]);

      const blob = await pdf(<QuotationPDF quotation={quotation} />).toBlob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `${quotation.referenceNumber.replace(/\//g, '-')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Release the blob URL once the browser has had a chance to
      // start the download, so it doesn't linger in memory.
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleGenerate}
      disabled={disabled || loading}
      title={disabled ? 'Fill required fields before generating the PDF' : undefined}
      className="inline-flex items-center gap-1.5 rounded-lg bg-[#12356B] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0B2447] disabled:opacity-40 disabled:cursor-not-allowed transition"
    >
      <Download size={14} /> {loading ? 'Preparing PDF…' : 'Generate PDF'}
    </button>
  );
}
