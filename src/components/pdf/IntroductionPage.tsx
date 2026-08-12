import { Page, View, Text } from '@react-pdf/renderer';
import { pdfStyles, colors } from './styles';
import PDFHeader from './PDFHeader';
import PDFFooter from './PDFFooter';
import type { Quotation } from '../../types/quotation';

interface Props {
  quotation: Quotation;
}

function formatDisplayDate(iso: string) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
}

export default function IntroductionPage({ quotation }: Props) {
  const { companyDetails: company, customer, project } = quotation;

  return (
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.leftAccentBar} fixed />
      <PDFHeader company={company} />

      <View style={pdfStyles.contentPadding}>
        <Text style={pdfStyles.h2}>{project.quotationTitle}</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 22, marginBottom: 20 }}>
          <View>
            <Text style={{ fontSize: 9.5, fontWeight: 700, marginBottom: 2 }}>TO,</Text>
            <Text style={{ fontSize: 9.5, fontWeight: 700 }}>{customer.name.toUpperCase()}</Text>
            {customer.address ? <Text style={{ fontSize: 9, marginTop: 1 }}>{customer.address}</Text> : null}
            <Text style={{ fontSize: 9.5, fontWeight: 700, marginTop: 1 }}>{customer.location}</Text>
            {customer.phone ? <Text style={{ fontSize: 9, marginTop: 1 }}>Ph: {customer.phone}</Text> : null}
            {customer.email ? <Text style={{ fontSize: 9, marginTop: 1 }}>{customer.email}</Text> : null}
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 9.5 }}>{formatDisplayDate(quotation.date)}</Text>
            <Text style={{ fontSize: 9.5, marginTop: 2 }}>REF: {quotation.referenceNumber}</Text>
          </View>
        </View>

        <Text style={[pdfStyles.paragraph, { fontWeight: 700 }]}>{project.greeting}</Text>
        <Text style={pdfStyles.paragraph}>{project.introParagraph1}</Text>
        <Text style={pdfStyles.paragraph}>{project.introParagraph2}</Text>

        <Text style={{ fontSize: 9.5, marginTop: 24 }}>{project.closingText}</Text>

        <View
          style={{
            marginTop: 40,
            backgroundColor: colors.bgLight,
            padding: 10,
            borderLeftWidth: 3,
            borderLeftColor: colors.amber,
          }}
        >
          <Text style={{ fontSize: 8.5, color: colors.textMuted }}>
            Project: {project.projectTitle} • System: {project.systemType} ({project.systemCapacity})
          </Text>
        </View>
      </View>

      <PDFFooter company={company} />
    </Page>
  );
}
