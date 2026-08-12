import { Document } from '@react-pdf/renderer';
import type { Quotation } from '../../types/quotation';
import CoverPage from './CoverPage';
import IntroductionPage from './IntroductionPage';
import BOMPage from './BOMPage';
import ProjectCostPage from './ProjectCostPage';
import TermsPage from './TermsPage';
import PaymentWarrantyPage from './PaymentWarrantyPage';

interface Props {
  quotation: Quotation;
}

export default function QuotationPDF({ quotation }: Props) {
  return (
    <Document title={`${quotation.referenceNumber} - ${quotation.customer.name}`} author={quotation.companyDetails.name}>
      <CoverPage quotation={quotation} />
      <IntroductionPage quotation={quotation} />
      <BOMPage quotation={quotation} />
      <ProjectCostPage quotation={quotation} />
      <TermsPage quotation={quotation} />
      <PaymentWarrantyPage quotation={quotation} />
    </Document>
  );
}
