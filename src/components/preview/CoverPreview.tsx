import PageFrame from './PageFrame';
import { previewColors as c } from './previewStyles';
import type { Quotation } from '../../types/quotation';

interface Props {
  quotation: Quotation;
  pageNumber: number;
  totalPages: number;
}

export default function CoverPreview({ quotation, pageNumber, totalPages }: Props) {
  const { companyDetails: company, coverImage } = quotation;

  return (
    <PageFrame pageNumber={pageNumber} totalPages={totalPages} company={company} noHeader>
      <div className="flex items-center justify-between mb-3">
        {company.logoDataUrl ? (
          <img src={company.logoDataUrl} alt={company.name} className="h-8 object-contain" />
        ) : (
          <span className="text-base font-bold" style={{ color: c.navy }}>
            {company.name}
          </span>
        )}
        <span className="text-[8px]" style={{ color: c.textMuted }}>
          Empaneled with MNRE, KSEB &amp; ANERT
        </span>
      </div>

      <div className="relative w-full h-[62%] overflow-hidden" style={{ backgroundColor: c.bgLight }}>
        {coverImage ? (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: c.navy }}>
            <span className="text-white text-[10px]">Upload a cover image to display it here</span>
          </div>
        )}

        <div className="absolute left-3 top-8 px-3 py-1.5" style={{ backgroundColor: c.amber }}>
          <span className="text-lg font-bold" style={{ color: c.navyDark }}>
            {company.whyUsHeading}
          </span>
        </div>

        <div
          className="absolute left-3 right-3 top-16 p-2.5 text-[8px] text-white leading-snug"
          style={{ backgroundColor: 'rgba(18,53,107,0.85)' }}
        >
          {company.whyUsIntro}
        </div>

        <div className="absolute left-3 right-3 top-[38%] space-y-1">
          {company.whyUsHighlights.slice(0, 5).map((h, i) => (
            <div
              key={i}
              className="px-2.5 py-1 text-[7.5px] font-bold"
              style={{
                backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(18,53,107,0.85)',
                color: i % 2 === 0 ? c.navyDark : c.white,
              }}
            >
              • {h}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-1.5 mt-2">
        <div className="flex-1 p-2" style={{ backgroundColor: c.navy }}>
          <div className="text-[7.5px] font-bold text-white mb-0.5">Head Office</div>
          <div className="text-[6.8px] text-white leading-snug">{company.headOfficeAddress}</div>
        </div>
        <div className="flex-1 p-2" style={{ backgroundColor: c.amber }}>
          <div className="text-[7.5px] font-bold mb-0.5" style={{ color: c.navyDark }}>
            Regional Office
          </div>
          <div className="text-[6.8px] leading-snug" style={{ color: c.navyDark }}>
            {company.regionalOfficeAddress}
          </div>
        </div>
        <div className="flex-1 p-2 border" style={{ backgroundColor: c.bgLight, borderColor: c.border }}>
          <div className="text-[7.5px] font-bold mb-0.5" style={{ color: c.navy }}>
            Branch Office
          </div>
          <div className="text-[6.8px] leading-snug">{company.branchOfficeAddress}</div>
        </div>
      </div>
    </PageFrame>
  );
}
