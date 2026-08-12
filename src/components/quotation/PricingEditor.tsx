import { useQuotationStore } from '../../store/quotationStore';
import FormSection from './shared/FormSection';
import { NumberField } from './shared/Fields';
import EditableList from './shared/EditableList';
import { formatINR } from '../../utils/currency';
import { getApprovalChargesTotal, getPriceAfterSubsidy } from '../../utils/calculations';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  errors?: Record<string, string>;
}

export default function PricingEditor({ errors = {} }: Props) {
  const {
    quotation,
    updatePricing,
    addApprovalCharge,
    updateApprovalCharge,
    removeApprovalCharge,
    addPricingNote,
    updatePricingNote,
    removePricingNote,
  } = useQuotationStore();
  const { pricing } = quotation;

  return (
    <FormSection title="Project Cost" description="System pricing, subsidy and approval charges.">
      <div className="grid grid-cols-2 gap-4">
        <NumberField
          label="System Price (incl. GST)"
          value={pricing.systemPrice}
          onChange={(v) => updatePricing({ systemPrice: v })}
          required
          error={errors.systemPrice}
        />
        <NumberField
          label="Subsidy Amount"
          value={pricing.subsidyAmount}
          onChange={(v) => updatePricing({ subsidyAmount: v })}
          error={errors.subsidyAmount}
        />
      </div>

      <div className="rounded-lg bg-slate-50 border border-slate-200 px-4 py-3 text-sm space-y-1">
        <div className="flex justify-between">
          <span className="text-slate-500">Grand Total</span>
          <span className="font-semibold text-slate-800">{formatINR(pricing.systemPrice)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Price After Subsidy</span>
          <span className="font-semibold text-emerald-600">{formatINR(getPriceAfterSubsidy(pricing))}</span>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-600">KSEB &amp; Inspectorate Approval Charges</span>
          <button
            type="button"
            onClick={addApprovalCharge}
            className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
          >
            <Plus size={14} /> Add charge
          </button>
        </div>
        <div className="space-y-2">
          {pricing.approvalCharges.map((charge) => (
            <div key={charge.id} className="flex items-center gap-2">
              <input
                value={charge.label}
                onChange={(e) => updateApprovalCharge(charge.id, { label: e.target.value })}
                placeholder="Charge description"
                className="flex-1 rounded-md border border-slate-300 px-2.5 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
              />
              <input
                type="number"
                value={charge.amount}
                onChange={(e) => updateApprovalCharge(charge.id, { amount: parseFloat(e.target.value) || 0 })}
                placeholder="Amount"
                className="w-28 rounded-md border border-slate-300 px-2.5 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
              />
              <button
                type="button"
                onClick={() => removeApprovalCharge(charge.id)}
                className="text-slate-300 hover:text-red-500 transition"
                aria-label="Remove charge"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm px-1">
          <span className="text-slate-500">Total approval charges</span>
          <span className="font-medium text-slate-700">{formatINR(getApprovalChargesTotal(pricing))}</span>
        </div>
      </div>

      <EditableList
        label="Pricing Notes"
        items={pricing.notes}
        onAdd={addPricingNote}
        onUpdate={updatePricingNote}
        onRemove={removePricingNote}
        addLabel="Add note"
      />
    </FormSection>
  );
}
