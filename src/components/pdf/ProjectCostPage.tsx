import { Page, View, Text } from '@react-pdf/renderer';
import { pdfStyles, colors } from './styles';
import PDFHeader from './PDFHeader';
import PDFFooter from './PDFFooter';
import type { Quotation } from '../../types/quotation';
import { formatINR } from '../../utils/currency';
import { getApprovalChargesTotal, getPriceAfterSubsidy } from '../../utils/calculations';

interface Props {
  quotation: Quotation;
}

export default function ProjectCostPage({ quotation }: Props) {
  const { companyDetails: company, pricing, project, additionalExpenses } = quotation;
  const approvalTotal = getApprovalChargesTotal(pricing);
  const afterSubsidy = getPriceAfterSubsidy(pricing);

  const hasExpenseContent =
    additionalExpenses.siteRequirements || additionalExpenses.extraInstallation || additionalExpenses.otherExpenses || additionalExpenses.notes;

  return (
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.leftAccentBar} fixed />
      <PDFHeader company={company} />

      <View style={pdfStyles.contentPadding}>
        <Text style={pdfStyles.h2}>PROJECT COST</Text>
        <Text style={pdfStyles.h3}>{project.projectTitle}</Text>

        <Text style={pdfStyles.sectionLabel}>System Cost</Text>
        <View style={pdfStyles.table}>
          <View style={pdfStyles.tableRow}>
            <Text style={[pdfStyles.td, { width: '65%', fontWeight: 700 }]}>System Price (Including GST)</Text>
            <Text style={[pdfStyles.td, { width: '35%', borderRightWidth: 0, textAlign: 'right', fontWeight: 700 }]}>
              {formatINR(pricing.systemPrice)}
            </Text>
          </View>
          <View style={[pdfStyles.tableRowLast, { backgroundColor: colors.bgLight }]}>
            <Text style={[pdfStyles.td, { width: '65%', fontWeight: 700, fontSize: 10 }]}>GRAND TOTAL</Text>
            <Text
              style={[
                pdfStyles.td,
                { width: '35%', borderRightWidth: 0, textAlign: 'right', fontWeight: 700, fontSize: 10, color: colors.navy },
              ]}
            >
              {formatINR(pricing.systemPrice)}
            </Text>
          </View>
        </View>

        <View style={{ marginBottom: 14 }}>
          <Text style={{ fontSize: 10, fontWeight: 700, color: '#0F8A3E', marginBottom: 5 }}>
            ➤ After subsidy amount: {formatINR(afterSubsidy)}
          </Text>
          {pricing.notes.map((note, i) => (
            <Text key={i} style={{ fontSize: 9, fontWeight: 700, color: '#0F8A3E', marginBottom: 3 }}>
              ➤ {note}
            </Text>
          ))}
        </View>

        <Text style={pdfStyles.sectionLabel}>KSEB &amp; Inspectorate Approval Charges</Text>
        <View style={pdfStyles.table}>
          {pricing.approvalCharges.map((charge, i) => (
            <View
              key={charge.id}
              style={i === pricing.approvalCharges.length - 1 ? pdfStyles.tableRowLast : pdfStyles.tableRow}
            >
              <Text style={[pdfStyles.td, { width: '10%' }]}>{i + 1}</Text>
              <Text style={[pdfStyles.td, { width: '58%' }]}>{charge.label}</Text>
              <Text style={[pdfStyles.td, { width: '32%', borderRightWidth: 0, textAlign: 'right' }]}>
                {formatINR(charge.amount)}
              </Text>
            </View>
          ))}
          <View style={[pdfStyles.tableRowLast, { backgroundColor: colors.bgLight }]}>
            <Text style={[pdfStyles.td, { width: '68%', fontWeight: 700 }]}>TOTAL AMOUNT</Text>
            <Text style={[pdfStyles.td, { width: '32%', borderRightWidth: 0, textAlign: 'right', fontWeight: 700 }]}>
              {formatINR(approvalTotal)}
            </Text>
          </View>
        </View>

        {hasExpenseContent && (
          <View>
            <Text style={pdfStyles.sectionLabel}>Additional Expenses</Text>
            <View style={{ borderWidth: 1, borderColor: colors.border, padding: 10 }}>
              {additionalExpenses.siteRequirements ? (
                <Text style={[pdfStyles.paragraph, { marginBottom: 6 }]}>{additionalExpenses.siteRequirements}</Text>
              ) : null}
              {additionalExpenses.extraInstallation ? (
                <Text style={[pdfStyles.paragraph, { marginBottom: 6 }]}>{additionalExpenses.extraInstallation}</Text>
              ) : null}
              {additionalExpenses.otherExpenses ? (
                <Text style={[pdfStyles.paragraph, { marginBottom: 6 }]}>{additionalExpenses.otherExpenses}</Text>
              ) : null}
              {additionalExpenses.notes ? <Text style={pdfStyles.paragraph}>{additionalExpenses.notes}</Text> : null}
            </View>
          </View>
        )}
      </View>

      <PDFFooter company={company} />
    </Page>
  );
}
