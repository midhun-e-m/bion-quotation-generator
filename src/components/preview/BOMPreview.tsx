import PageFrame from './PageFrame';
import { previewColors as c } from './previewStyles';
import type { Quotation } from '../../types/quotation';

interface Props {
  quotation: Quotation;
  pageNumber: number;
  totalPages: number;
}

export default function BOMPreview({ quotation, pageNumber, totalPages }: Props) {
  const { companyDetails: company, billOfMaterials, project } = quotation;

  return (
    <PageFrame pageNumber={pageNumber} totalPages={totalPages} company={company}>
      <h2 className="text-center text-sm font-bold mb-1" style={{ color: c.navy }}>
        BILL OF MATERIALS
      </h2>
      <p className="text-center text-[9px] font-bold uppercase mb-3" style={{ color: c.navyDark }}>
        {project.projectTitle}
      </p>

      <table className="w-full border-collapse text-[8px]" style={{ border: `1px solid ${c.navy}` }}>
        <thead>
          <tr style={{ backgroundColor: c.navy }}>
            {['Sl.No', 'Product', 'Specification', 'Make', 'Quantity'].map((h) => (
              <th key={h} className="text-left p-1.5 font-bold text-white border-r" style={{ borderColor: 'rgba(255,255,255,0.25)' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {billOfMaterials.map((item, i) => (
            <tr key={item.id} style={{ borderBottom: `1px solid ${c.border}` }}>
              <td className="p-1.5 border-r" style={{ borderColor: c.border }}>{i + 1}</td>
              <td className="p-1.5 border-r font-bold" style={{ borderColor: c.border }}>{item.product}</td>
              <td className="p-1.5 border-r" style={{ borderColor: c.border }}>{item.specification}</td>
              <td className="p-1.5 border-r" style={{ borderColor: c.border }}>{item.make}</td>
              <td className="p-1.5">{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-center font-bold text-[8px] mt-3 mb-1">
        The rating of all electrical components will be finalized as per the scheme approval from the Electrical
        Inspectorate.
      </p>
      <p className="text-center text-[8px] leading-relaxed" style={{ color: c.textMuted }}>
        The above list of components is approved by ANERT. These materials comply with all the standards and
        specifications laid down by MNRE and CEA.
      </p>
    </PageFrame>
  );
}
