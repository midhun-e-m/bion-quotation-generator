import PageFrame from './PageFrame';
import { previewColors as c, formatDisplayDate } from './previewStyles';
import type { Quotation } from '../../types/quotation';

interface Props {
  quotation: Quotation;
  pageNumber: number;
  totalPages: number;
}

export default function IntroductionPreview({ quotation, pageNumber, totalPages }: Props) {
  const { companyDetails: company, customer, project } = quotation;

  return (
    <PageFrame pageNumber={pageNumber} totalPages={totalPages} company={company}>
      <h2 className="text-center text-sm font-bold mb-4" style={{ color: c.navy }}>
        {project.quotationTitle}
      </h2>

      <div className="flex justify-between mb-4">
        <div>
          <div className="font-bold text-[10px]">TO,</div>
          <div className="font-bold text-[10px]">{customer.name.toUpperCase()}</div>
          {customer.address && <div className="text-[9px]">{customer.address}</div>}
          <div className="font-bold text-[9px]">{customer.location}</div>
          {customer.phone && <div className="text-[9px]">Ph: {customer.phone}</div>}
          {customer.email && <div className="text-[9px]">{customer.email}</div>}
        </div>
        <div className="text-right text-[9px]">
          <div>{formatDisplayDate(quotation.date)}</div>
          <div className="mt-0.5">REF: {quotation.referenceNumber}</div>
        </div>
      </div>

      <p className="font-bold mb-2 text-[9.5px]">{project.greeting}</p>
      <p className="mb-2 text-[9.5px] leading-relaxed">{project.introParagraph1}</p>
      <p className="mb-2 text-[9.5px] leading-relaxed">{project.introParagraph2}</p>

      <p className="mt-5 text-[9.5px]">{project.closingText}</p>

      <div className="mt-8 p-2.5 text-[8.5px]" style={{ backgroundColor: c.bgLight, borderLeft: `3px solid ${c.amber}`, color: c.textMuted }}>
        Project: {project.projectTitle} • System: {project.systemType} ({project.systemCapacity})
      </div>
    </PageFrame>
  );
}
