import type { ReactNode } from 'react';
import { previewColors as c } from './previewStyles';
import type { CompanyDetails } from '../../types/quotation';

interface Props {
  pageNumber: number;
  totalPages: number;
  company: CompanyDetails;
  children: ReactNode;
  noHeader?: boolean;
}

// A4 aspect ratio (210mm x 297mm) rendered as a plain styled div —
// no PDF engine, no iframe. This is purely a visual approximation of
// the generated PDF so the editor feels live without the memory cost
// of running pdf.js in the browser on every keystroke.
export default function PageFrame({ pageNumber, totalPages, company, children, noHeader }: Props) {
  return (
    <div
      className="relative bg-white shadow-md mx-auto mb-6 overflow-hidden"
      style={{ width: '100%', maxWidth: 720, aspectRatio: '210 / 297' }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-[6px]" style={{ backgroundColor: c.navy }} />

      {!noHeader && (
        <div
          className="flex items-center justify-between px-8 pt-6 pb-3 border-b-2"
          style={{ borderColor: c.navy }}
        >
          {company.logoDataUrl ? (
            <img src={company.logoDataUrl} alt={company.name} className="h-8 object-contain" />
          ) : (
            <span className="text-base font-bold" style={{ color: c.navy }}>
              {company.name}
            </span>
          )}
          <div className="text-right text-[9px]" style={{ color: c.textMuted }}>
            <div>{company.website}</div>
            <div>{company.email}</div>
          </div>
        </div>
      )}

      <div className="px-8 py-4 text-[11px] leading-snug overflow-hidden" style={{ color: c.textDark }}>
        {children}
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-8 py-2 border-t text-[8px]"
        style={{ borderColor: c.border, color: c.textMuted }}
      >
        <span>{company.footerAddressLine}</span>
        <span>
          Page {pageNumber} of {totalPages}
        </span>
      </div>
    </div>
  );
}
