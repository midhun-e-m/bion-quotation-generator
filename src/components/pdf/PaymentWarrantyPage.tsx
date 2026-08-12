import { Page, View, Text } from '@react-pdf/renderer';
import { pdfStyles, colors } from './styles';
import PDFHeader from './PDFHeader';
import PDFFooter from './PDFFooter';
import type { Quotation } from '../../types/quotation';

interface Props {
  quotation: Quotation;
}

export default function PaymentWarrantyPage({ quotation }: Props) {
  const { companyDetails: company, paymentTerms, bankDetails, warranty } = quotation;

  return (
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.leftAccentBar} fixed />
      <PDFHeader company={company} />

      <View style={pdfStyles.contentPadding}>
        <Text style={pdfStyles.sectionLabel}>Payment Terms</Text>
        <View style={{ marginBottom: 14 }}>
          {paymentTerms.terms.map((line, i) => (
            <View key={i} style={pdfStyles.bulletRow}>
              <Text style={pdfStyles.bulletDot}>•</Text>
              <Text style={pdfStyles.bulletText}>{line}</Text>
            </View>
          ))}
        </View>

        <Text style={{ fontSize: 9.5, fontWeight: 700, marginBottom: 6 }}>
          M/s {bankDetails.accountHolderName}
        </Text>
        <View style={pdfStyles.table}>
          <View style={pdfStyles.tableRow}>
            <Text style={[pdfStyles.td, { width: '30%', fontWeight: 700 }]}>Bank</Text>
            <Text style={[pdfStyles.td, { width: '70%', borderRightWidth: 0 }]}>{bankDetails.bankName}</Text>
          </View>
          <View style={pdfStyles.tableRow}>
            <Text style={[pdfStyles.td, { width: '30%', fontWeight: 700 }]}>Branch</Text>
            <Text style={[pdfStyles.td, { width: '70%', borderRightWidth: 0 }]}>{bankDetails.branch}</Text>
          </View>
          <View style={pdfStyles.tableRow}>
            <Text style={[pdfStyles.td, { width: '30%', fontWeight: 700 }]}>Account No</Text>
            <Text style={[pdfStyles.td, { width: '70%', borderRightWidth: 0 }]}>{bankDetails.accountNumber}</Text>
          </View>
          <View style={pdfStyles.tableRowLast}>
            <Text style={[pdfStyles.td, { width: '30%', fontWeight: 700 }]}>IFSC</Text>
            <Text style={[pdfStyles.td, { width: '70%', borderRightWidth: 0 }]}>{bankDetails.ifsc}</Text>
          </View>
        </View>

        <Text style={pdfStyles.sectionLabel}>Warranty</Text>
        <View style={pdfStyles.table}>
          <View style={pdfStyles.tableRow}>
            <Text style={[pdfStyles.td, { width: '50%', fontWeight: 700 }]}>Total System</Text>
            <Text style={[pdfStyles.td, { width: '50%', borderRightWidth: 0, textAlign: 'center' }]}>
              {warranty.totalSystem}
            </Text>
          </View>
          <View style={pdfStyles.tableRow}>
            <Text style={[pdfStyles.td, { width: '50%', fontWeight: 700 }]}>PCU / Inverter</Text>
            <Text style={[pdfStyles.td, { width: '50%', borderRightWidth: 0, textAlign: 'center' }]}>
              {warranty.pcuInverter}
            </Text>
          </View>
          <View style={pdfStyles.tableRowLast}>
            <Text style={[pdfStyles.td, { width: '50%', fontWeight: 700 }]}>Panel</Text>
            <Text style={[pdfStyles.td, { width: '50%', borderRightWidth: 0, textAlign: 'center' }]}>
              {warranty.panel}
            </Text>
          </View>
        </View>

        <View style={{ marginBottom: 10 }}>
          <View style={pdfStyles.bulletRow}>
            <Text style={pdfStyles.bulletDot}>•</Text>
            <Text style={pdfStyles.bulletText}>
              Module product warranty: {warranty.moduleProductWarranty}. Power output warranty: {warranty.powerOutputWarranty}.
            </Text>
          </View>
          {warranty.exclusions.map((line, i) => (
            <View key={i} style={pdfStyles.bulletRow}>
              <Text style={pdfStyles.bulletDot}>•</Text>
              <Text style={pdfStyles.bulletText}>{line}</Text>
            </View>
          ))}
          {warranty.amcNote ? (
            <View style={pdfStyles.bulletRow}>
              <Text style={pdfStyles.bulletDot}>•</Text>
              <Text style={pdfStyles.bulletText}>{warranty.amcNote}</Text>
            </View>
          ) : null}
        </View>

        <Text style={[pdfStyles.paragraph, { marginTop: 6 }]}>
          We hope our offer is in line with your requirement. For further clarification and discussion please feel
          free to contact us.
        </Text>
        <Text style={pdfStyles.paragraph}>Looking forward for your valued order.</Text>

        <Text style={{ fontSize: 9.5, marginTop: 16 }}>Yours faithfully,</Text>
        <Text style={{ fontSize: 9.5, fontWeight: 700, marginTop: 28, color: colors.navy }}>
          {company.signatureBlock}
        </Text>
      </View>

      <PDFFooter company={company} />
    </Page>
  );
}
