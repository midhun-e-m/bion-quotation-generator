import { Page, View, Text } from '@react-pdf/renderer';
import { pdfStyles } from './styles';
import PDFHeader from './PDFHeader';
import PDFFooter from './PDFFooter';
import type { Quotation } from '../../types/quotation';

interface Props {
  quotation: Quotation;
}

export default function TermsPage({ quotation }: Props) {
  const { companyDetails: company, termsAndConditions, project } = quotation;

  return (
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.leftAccentBar} fixed />
      <PDFHeader company={company} />

      <View style={pdfStyles.contentPadding}>
        <Text style={pdfStyles.h2}>WARRANTY TERMS &amp; CONDITIONS</Text>
        <Text style={[pdfStyles.paragraph, { marginBottom: 14 }]}>
          Techno-Commercial Proposal for Design, Supply, Installation &amp; Commissioning of {project.systemCapacity}{' '}
          {project.systemType} is subject to the following terms &amp; conditions.
        </Text>

        <Text style={pdfStyles.sectionLabel}>Scope of Work</Text>
        <View style={{ marginBottom: 14 }}>
          {termsAndConditions.scopeOfWork.map((line, i) => (
            <View key={i} style={pdfStyles.bulletRow}>
              <Text style={pdfStyles.bulletDot}>•</Text>
              <Text style={pdfStyles.bulletText}>{line}</Text>
            </View>
          ))}
        </View>

        <Text style={pdfStyles.sectionLabel}>Conditions Apply</Text>
        <View>
          {termsAndConditions.conditionsApply.map((line, i) => (
            <View key={i} style={pdfStyles.bulletRow}>
              <Text style={pdfStyles.bulletDot}>•</Text>
              <Text style={[pdfStyles.bulletText, { fontWeight: 700 }]}>{line}</Text>
            </View>
          ))}
        </View>
      </View>

      <PDFFooter company={company} />
    </Page>
  );
}
