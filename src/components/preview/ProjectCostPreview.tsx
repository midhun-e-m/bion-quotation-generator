import PageFrame from './PageFrame';
import { previewColors as c } from './previewStyles';
import type { Quotation } from '../../types/quotation';
import { formatINR } from '../../utils/currency';
import { getApprovalChargesTotal, getPriceAfterSubsidy } from '../../utils/calculations';

interface Props {
  quotation: Quotation;
  pageNumber: number;
  totalPages: number;
}

export default function ProjectCostPreview({ quotation, pageNumber, totalPages }: Props) {
  const { companyDetails: company, pricing, project, additionalExpenses } = quotation;
  const approvalTotal = getApprovalChargesTotal(pricing);
  const afterSubsidy = getPriceAfterSubsidy(pricing);
  const hasExpenseContent =
    additionalExpenses.siteRequirements || additionalExpenses.extraInstallation || additionalExpenses.otherExpenses || additionalExpenses.notes;

  return (
    <PageFrame pageNumber={pageNumber} totalPages={totalPages} company={company}>
      <h2 className="text-center text-sm font-bold mb-1" style={{ color: c.navy }}>
        PROJECT COST
      </h2>
      <p className="text-center text-[9px] font-bold uppercase mb-3" style={{ color: c.navyDark }}>
        {project.projectTitle}
      </p>

      <div className="text-[9px] font-bold uppercase mb-1" style={{ color: c.navy }}>
        System Cost
      </div>
      <table className="w-full border-collapse text-[8.5px] mb-3" style={{ border: `1px solid ${c.navy}` }}>
        <tbody>
          <tr style={{ borderBottom: `1px solid ${c.border}` }}>
            <td className="p-1.5 font-bold">System Price (Including GST)</td>
            <td className="p-1.5 text-right font-bold">{formatINR(pricing.systemPrice)}</td>
          </tr>
          <tr style={{ backgroundColor: c.bgLight }}>
            <td className="p-1.5 font-bold text-[10px]">GRAND TOTAL</td>
            <td className="p-1.5 text-right font-bold text-[10px]" style={{ color: c.navy }}>
              {formatINR(pricing.systemPrice)}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="mb-3">
        <div className="text-[9px] font-bold mb-0.5" style={{ color: '#0F8A3E' }}>
          ➤ After subsidy amount: {formatINR(afterSubsidy)}
        </div>
        {pricing.notes.map((note, i) => (
          <div key={i} className="text-[8.5px] font-bold mb-0.5" style={{ color: '#0F8A3E' }}>
            ➤ {note}
          </div>
        ))}
      </div>

      <div className="text-[9px] font-bold uppercase mb-1" style={{ color: c.navy }}>
        KSEB &amp; Inspectorate Approval Charges
      </div>
      <table className="w-full border-collapse text-[8.5px] mb-3" style={{ border: `1px solid ${c.navy}` }}>
        <tbody>
          {pricing.approvalCharges.map((charge, i) => (
            <tr key={charge.id} style={{ borderBottom: `1px solid ${c.border}` }}>
              <td className="p-1.5 w-6">{i + 1}</td>
              <td className="p-1.5">{charge.label}</td>
              <td className="p-1.5 text-right">{formatINR(charge.amount)}</td>
            </tr>
          ))}
          <tr style={{ backgroundColor: c.bgLight }}>
            <td className="p-1.5 font-bold" colSpan={2}>
              TOTAL AMOUNT
            </td>
            <td className="p-1.5 text-right font-bold">{formatINR(approvalTotal)}</td>
          </tr>
        </tbody>
      </table>

      {hasExpenseContent && (
        <div>
          <div className="text-[9px] font-bold uppercase mb-1" style={{ color: c.navy }}>
            Additional Expenses
          </div>
          <div className="p-2.5 text-[8.5px] leading-relaxed space-y-1.5" style={{ border: `1px solid ${c.border}` }}>
            {additionalExpenses.siteRequirements && <p>{additionalExpenses.siteRequirements}</p>}
            {additionalExpenses.extraInstallation && <p>{additionalExpenses.extraInstallation}</p>}
            {additionalExpenses.otherExpenses && <p>{additionalExpenses.otherExpenses}</p>}
            {additionalExpenses.notes && <p>{additionalExpenses.notes}</p>}
          </div>
        </div>
      )}
    </PageFrame>
  );
}
