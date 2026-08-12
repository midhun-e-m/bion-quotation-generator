import { useQuotationStore } from '../../store/quotationStore';
import FormSection from './shared/FormSection';
import { TextField, TextAreaField } from './shared/Fields';
import EditableList from './shared/EditableList';

export default function WarrantyEditor() {
  const {
    quotation,
    updateWarranty,
    addWarrantyExclusion,
    updateWarrantyExclusion,
    removeWarrantyExclusion,
  } = useQuotationStore();
  const { warranty } = quotation;

  return (
    <FormSection title="Warranty" description="Coverage details shown on the final page.">
      <div className="grid grid-cols-3 gap-4">
        <TextField label="Total System" value={warranty.totalSystem} onChange={(v) => updateWarranty({ totalSystem: v })} />
        <TextField label="PCU / Inverter" value={warranty.pcuInverter} onChange={(v) => updateWarranty({ pcuInverter: v })} />
        <TextField label="Panel" value={warranty.panel} onChange={(v) => updateWarranty({ panel: v })} />
      </div>
      <TextField
        label="Module Product Warranty"
        value={warranty.moduleProductWarranty}
        onChange={(v) => updateWarranty({ moduleProductWarranty: v })}
      />
      <TextField
        label="Power Output Warranty"
        value={warranty.powerOutputWarranty}
        onChange={(v) => updateWarranty({ powerOutputWarranty: v })}
      />
      <EditableList
        label="Warranty Exclusions"
        items={warranty.exclusions}
        onAdd={addWarrantyExclusion}
        onUpdate={updateWarrantyExclusion}
        onRemove={removeWarrantyExclusion}
        addLabel="Add exclusion"
      />
      <TextAreaField label="AMC Note" value={warranty.amcNote} onChange={(v) => updateWarranty({ amcNote: v })} />
    </FormSection>
  );
}
