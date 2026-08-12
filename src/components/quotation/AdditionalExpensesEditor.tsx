import { useQuotationStore } from '../../store/quotationStore';
import FormSection from './shared/FormSection';
import { TextAreaField } from './shared/Fields';

export default function AdditionalExpensesEditor() {
  const { quotation, updateAdditionalExpenses } = useQuotationStore();
  const { additionalExpenses } = quotation;

  return (
    <FormSection title="Additional Expenses" description="Any site-specific charges or notes not covered above.">
      <TextAreaField
        label="Additional Site Requirements"
        value={additionalExpenses.siteRequirements}
        onChange={(v) => updateAdditionalExpenses({ siteRequirements: v })}
      />
      <TextAreaField
        label="Extra Installation Charges"
        value={additionalExpenses.extraInstallation}
        onChange={(v) => updateAdditionalExpenses({ extraInstallation: v })}
      />
      <TextAreaField
        label="Other Expenses"
        value={additionalExpenses.otherExpenses}
        onChange={(v) => updateAdditionalExpenses({ otherExpenses: v })}
      />
      <TextAreaField
        label="Notes"
        value={additionalExpenses.notes}
        onChange={(v) => updateAdditionalExpenses({ notes: v })}
      />
    </FormSection>
  );
}
