import { View, Text } from '@react-pdf/renderer';
import { pdfStyles } from './styles';
import type { CompanyDetails } from '../../types/quotation';

interface Props {
  company: CompanyDetails;
}

export default function PDFFooter({ company }: Props) {
  return (
    <View style={pdfStyles.footer} fixed>
      <Text>{company.footerAddressLine}</Text>
      <Text>{company.headOfficePhones.split(',')[0]}</Text>
      <Text
        render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
      />
    </View>
  );
}
