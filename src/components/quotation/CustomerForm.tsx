import { useQuotationStore } from '../../store/quotationStore';
import FormSection from './shared/FormSection';
import { TextField } from './shared/Fields';
import { RefreshCw } from 'lucide-react';

interface Props {
  errors?: Record<string, string>;
}

export default function CustomerForm({ errors = {} }: Props) {
  const { quotation, updateCustomer, updateDate, updateReferenceNumber, regenerateReferenceNumber } =
    useQuotationStore();

  return (
    <FormSection title="Customer Details" description="Who this quotation is addressed to.">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <TextField
            label="Customer Name"
            value={quotation.customer.name}
            onChange={(v) => updateCustomer({ name: v })}
            required
            error={errors.customerName}
          />
        </div>
        <div className="col-span-2">
          <TextField
            label="Address"
            value={quotation.customer.address}
            onChange={(v) => updateCustomer({ address: v })}
          />
        </div>
        <TextField
          label="Location"
          value={quotation.customer.location}
          onChange={(v) => updateCustomer({ location: v })}
        />
        <TextField
          label="Phone"
          value={quotation.customer.phone}
          onChange={(v) => updateCustomer({ phone: v })}
        />
        <TextField
          label="Email"
          type="email"
          value={quotation.customer.email}
          onChange={(v) => updateCustomer({ email: v })}
        />
        <TextField
          label="Quotation Date"
          type="date"
          value={quotation.date}
          onChange={updateDate}
          required
          error={errors.date}
        />
        <div className="col-span-2 flex items-end gap-2">
          <div className="flex-1">
            <TextField
              label="Reference Number"
              value={quotation.referenceNumber}
              onChange={updateReferenceNumber}
              required
              error={errors.referenceNumber}
            />
          </div>
          <button
            type="button"
            onClick={regenerateReferenceNumber}
            title="Generate a new reference number"
            className="mb-0.5 inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 transition"
          >
            <RefreshCw size={14} /> Generate
          </button>
        </div>
      </div>
    </FormSection>
  );
}
