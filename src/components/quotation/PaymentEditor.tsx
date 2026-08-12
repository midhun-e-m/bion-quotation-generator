import { useQuotationStore } from '../../store/quotationStore';
import FormSection from './shared/FormSection';
import EditableList from './shared/EditableList';
import { TextField } from './shared/Fields';

export default function PaymentEditor() {
  const {
    quotation,
    addPaymentTerm,
    updatePaymentTerm,
    removePaymentTerm,
    updateBankDetails,
  } = useQuotationStore();
  const { paymentTerms, bankDetails } = quotation;

  return (
    <FormSection title="Payment Terms & Bank Details" description="How and where the customer should pay.">
      <EditableList
        label="Payment Terms"
        items={paymentTerms.terms}
        onAdd={addPaymentTerm}
        onUpdate={updatePaymentTerm}
        onRemove={removePaymentTerm}
        addLabel="Add term"
      />

      <div className="pt-2 border-t border-slate-100">
        <span className="text-xs font-medium text-slate-600 block mb-2">Bank Details</span>
        <div className="grid grid-cols-2 gap-4">
          <TextField label="Bank" value={bankDetails.bankName} onChange={(v) => updateBankDetails({ bankName: v })} />
          <TextField label="Branch" value={bankDetails.branch} onChange={(v) => updateBankDetails({ branch: v })} />
          <TextField
            label="Account Number"
            value={bankDetails.accountNumber}
            onChange={(v) => updateBankDetails({ accountNumber: v })}
          />
          <TextField label="IFSC" value={bankDetails.ifsc} onChange={(v) => updateBankDetails({ ifsc: v })} />
          <div className="col-span-2">
            <TextField
              label="Account Holder Name"
              value={bankDetails.accountHolderName}
              onChange={(v) => updateBankDetails({ accountHolderName: v })}
            />
          </div>
        </div>
      </div>
    </FormSection>
  );
}
