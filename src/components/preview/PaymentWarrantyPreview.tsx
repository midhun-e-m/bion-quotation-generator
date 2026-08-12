import PageFrame from './PageFrame';
import { previewColors as c } from './previewStyles';
import type { Quotation } from '../../types/quotation';

interface Props {
  quotation: Quotation;
  pageNumber: number;
  totalPages: number;
}

export default function PaymentWarrantyPreview({ quotation, pageNumber, totalPages }: Props) {
  const { companyDetails: company, paymentTerms, bankDetails, warranty } = quotation;

  return (
    <PageFrame pageNumber={pageNumber} totalPages={totalPages} company={company}>
      <div className="text-[9px] font-bold uppercase mb-1" style={{ color: c.navy }}>
        Payment Terms
      </div>
      <ul className="mb-3 space-y-1">
        {paymentTerms.terms.map((line, i) => (
          <li key={i} className="flex text-[8.5px] leading-relaxed">
            <span className="w-2.5 shrink-0" style={{ color: c.navy }}>•</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>

      <p className="text-[9px] font-bold mb-1.5">M/s {bankDetails.accountHolderName}</p>
      <table className="w-full border-collapse text-[8.5px] mb-3" style={{ border: `1px solid ${c.navy}` }}>
        <tbody>
          {[
            ['Bank', bankDetails.bankName],
            ['Branch', bankDetails.branch],
            ['Account No', bankDetails.accountNumber],
            ['IFSC', bankDetails.ifsc],
          ].map(([label, value]) => (
            <tr key={label} style={{ borderBottom: `1px solid ${c.border}` }}>
              <td className="p-1.5 font-bold w-1/3">{label}</td>
              <td className="p-1.5">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-[9px] font-bold uppercase mb-1" style={{ color: c.navy }}>
        Warranty
      </div>
      <table className="w-full border-collapse text-[8.5px] mb-3" style={{ border: `1px solid ${c.navy}` }}>
        <tbody>
          {[
            ['Total System', warranty.totalSystem],
            ['PCU / Inverter', warranty.pcuInverter],
            ['Panel', warranty.panel],
          ].map(([label, value]) => (
            <tr key={label} style={{ borderBottom: `1px solid ${c.border}` }}>
              <td className="p-1.5 font-bold w-1/2">{label}</td>
              <td className="p-1.5 text-center">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="space-y-1 mb-3">
        <li className="flex text-[8.5px] leading-relaxed">
          <span className="w-2.5 shrink-0" style={{ color: c.navy }}>•</span>
          <span>
            Module product warranty: {warranty.moduleProductWarranty}. Power output warranty: {warranty.powerOutputWarranty}.
          </span>
        </li>
        {warranty.exclusions.map((line, i) => (
          <li key={i} className="flex text-[8.5px] leading-relaxed">
            <span className="w-2.5 shrink-0" style={{ color: c.navy }}>•</span>
            <span>{line}</span>
          </li>
        ))}
        {warranty.amcNote && (
          <li className="flex text-[8.5px] leading-relaxed">
            <span className="w-2.5 shrink-0" style={{ color: c.navy }}>•</span>
            <span>{warranty.amcNote}</span>
          </li>
        )}
      </ul>

      <p className="text-[8.5px] leading-relaxed mb-1">
        We hope our offer is in line with your requirement. For further clarification and discussion please feel
        free to contact us.
      </p>
      <p className="text-[8.5px] leading-relaxed mb-4">Looking forward for your valued order.</p>

      <p className="text-[9px]">Yours faithfully,</p>
      <p className="text-[9px] font-bold mt-6" style={{ color: c.navy }}>
        {company.signatureBlock}
      </p>
    </PageFrame>
  );
}
