import PageFrame from './PageFrame';
import { previewColors as c } from './previewStyles';
import type { Quotation } from '../../types/quotation';

interface Props {
  quotation: Quotation;
  pageNumber: number;
  totalPages: number;
}

export default function TermsPreview({ quotation, pageNumber, totalPages }: Props) {
  const { companyDetails: company, termsAndConditions, project } = quotation;

  return (
    <PageFrame pageNumber={pageNumber} totalPages={totalPages} company={company}>
      <h2 className="text-center text-sm font-bold mb-3" style={{ color: c.navy }}>
        WARRANTY TERMS &amp; CONDITIONS
      </h2>
      <p className="text-[9px] leading-relaxed mb-3">
        Techno-Commercial Proposal for Design, Supply, Installation &amp; Commissioning of {project.systemCapacity}{' '}
        {project.systemType} is subject to the following terms &amp; conditions.
      </p>

      <div className="text-[9px] font-bold uppercase mb-1" style={{ color: c.navy }}>
        Scope of Work
      </div>
      <ul className="mb-3 space-y-1">
        {termsAndConditions.scopeOfWork.map((line, i) => (
          <li key={i} className="flex text-[8.5px] leading-relaxed">
            <span className="w-2.5 shrink-0" style={{ color: c.navy }}>•</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>

      <div className="text-[9px] font-bold uppercase mb-1" style={{ color: c.navy }}>
        Conditions Apply
      </div>
      <ul className="space-y-1">
        {termsAndConditions.conditionsApply.map((line, i) => (
          <li key={i} className="flex text-[8.5px] font-bold leading-relaxed">
            <span className="w-2.5 shrink-0" style={{ color: c.navy }}>•</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </PageFrame>
  );
}
