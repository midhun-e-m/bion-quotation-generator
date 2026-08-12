import { View, Text, Image } from '@react-pdf/renderer';
import { pdfStyles } from './styles';
import type { CompanyDetails } from '../../types/quotation';

interface Props {
  company: CompanyDetails;
}

export default function PDFHeader({ company }: Props) {
  return (
    <View style={pdfStyles.headerRow} fixed>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        {company.logoDataUrl ? (
          <Image src={company.logoDataUrl} style={pdfStyles.logo} />
        ) : (
          <Text style={{ fontSize: 16, fontWeight: 700, color: '#12356B' }}>{company.name}</Text>
        )}
      </View>
      <View style={pdfStyles.headerRight}>
        <Text>{company.website}</Text>
        <Text>{company.email}</Text>
      </View>
    </View>
  );
}
