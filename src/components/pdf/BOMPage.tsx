import { Page, View, Text } from '@react-pdf/renderer';
import { pdfStyles, colors } from './styles';
import PDFHeader from './PDFHeader';
import PDFFooter from './PDFFooter';
import type { Quotation } from '../../types/quotation';

interface Props {
  quotation: Quotation;
}

const COL_WIDTHS = ['9%', '22%', '32%', '22%', '15%'];

export default function BOMPage({ quotation }: Props) {
  const { companyDetails: company, billOfMaterials, project } = quotation;

  return (
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.leftAccentBar} fixed />
      <PDFHeader company={company} />

      <View style={pdfStyles.contentPadding}>
        <Text style={pdfStyles.h2}>BILL OF MATERIALS</Text>
        <Text style={pdfStyles.h3}>{project.projectTitle}</Text>

        <View style={pdfStyles.table}>
          <View style={pdfStyles.tableHeaderRow}>
            <Text style={[pdfStyles.th, { width: COL_WIDTHS[0] }]}>Sl.No</Text>
            <Text style={[pdfStyles.th, { width: COL_WIDTHS[1] }]}>Product</Text>
            <Text style={[pdfStyles.th, { width: COL_WIDTHS[2] }]}>Specification</Text>
            <Text style={[pdfStyles.th, { width: COL_WIDTHS[3] }]}>Make</Text>
            <Text style={[pdfStyles.th, { width: COL_WIDTHS[4], borderRightWidth: 0 }]}>Quantity</Text>
          </View>
          {billOfMaterials.map((item, i) => (
            <View key={item.id} style={i === billOfMaterials.length - 1 ? pdfStyles.tableRowLast : pdfStyles.tableRow}>
              <Text style={[pdfStyles.td, { width: COL_WIDTHS[0] }]}>{i + 1}</Text>
              <Text style={[pdfStyles.td, { width: COL_WIDTHS[1], fontWeight: 700 }]}>{item.product}</Text>
              <Text style={[pdfStyles.td, { width: COL_WIDTHS[2] }]}>{item.specification}</Text>
              <Text style={[pdfStyles.td, { width: COL_WIDTHS[3] }]}>{item.make}</Text>
              <Text style={[pdfStyles.td, { width: COL_WIDTHS[4], borderRightWidth: 0 }]}>{item.quantity}</Text>
            </View>
          ))}
        </View>

        <Text style={{ fontSize: 8.5, fontWeight: 700, textAlign: 'center', marginTop: 6, marginBottom: 4 }}>
          The rating of all electrical components will be finalized as per the scheme approval from the Electrical
          Inspectorate.
        </Text>
        <Text style={{ fontSize: 8.5, textAlign: 'center', color: colors.textMuted, lineHeight: 1.5 }}>
          The above list of components is approved by ANERT. These materials comply with all the standards and
          specifications laid down by MNRE and CEA.
        </Text>
      </View>

      <PDFFooter company={company} />
    </Page>
  );
}
