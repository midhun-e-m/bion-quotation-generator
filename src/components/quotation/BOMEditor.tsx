import { useQuotationStore } from '../../store/quotationStore';
import FormSection from './shared/FormSection';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

export default function BOMEditor() {
  const { quotation, addBOMItem, updateBOMItem, removeBOMItem, reorderBOMItem } = useQuotationStore();
  const items = quotation.billOfMaterials;

  return (
    <FormSection title="Bill of Materials" description="Products included in the system.">
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={item.id} className="rounded-lg border border-slate-200 p-3 relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Item {index + 1}</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => reorderBOMItem(index, index - 1)}
                  className="text-slate-300 hover:text-slate-600 disabled:opacity-30 disabled:hover:text-slate-300 transition"
                  aria-label="Move up"
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  type="button"
                  disabled={index === items.length - 1}
                  onClick={() => reorderBOMItem(index, index + 1)}
                  className="text-slate-300 hover:text-slate-600 disabled:opacity-30 disabled:hover:text-slate-300 transition"
                  aria-label="Move down"
                >
                  <ArrowDown size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => removeBOMItem(item.id)}
                  className="text-slate-300 hover:text-red-500 transition ml-1"
                  aria-label="Delete item"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                value={item.product}
                onChange={(e) => updateBOMItem(item.id, { product: e.target.value })}
                placeholder="Product"
                className="rounded-md border border-slate-300 px-2.5 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
              />
              <input
                value={item.make}
                onChange={(e) => updateBOMItem(item.id, { make: e.target.value })}
                placeholder="Make"
                className="rounded-md border border-slate-300 px-2.5 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
              />
              <input
                value={item.specification}
                onChange={(e) => updateBOMItem(item.id, { specification: e.target.value })}
                placeholder="Specification"
                className="col-span-2 rounded-md border border-slate-300 px-2.5 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
              />
              <input
                value={item.quantity}
                onChange={(e) => updateBOMItem(item.id, { quantity: e.target.value })}
                placeholder="Quantity"
                className="rounded-md border border-slate-300 px-2.5 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
              />
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => addBOMItem()}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        <Plus size={16} /> Add item
      </button>
    </FormSection>
  );
}
