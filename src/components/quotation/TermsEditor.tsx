import { useQuotationStore } from '../../store/quotationStore';
import FormSection from './shared/FormSection';
import EditableList from './shared/EditableList';

export default function TermsEditor() {
  const {
    quotation,
    addScopeItem,
    updateScopeItem,
    removeScopeItem,
    addConditionItem,
    updateConditionItem,
    removeConditionItem,
  } = useQuotationStore();
  const { termsAndConditions } = quotation;

  return (
    <FormSection title="Warranty Terms & Conditions" description="Scope of work and conditions that apply.">
      <EditableList
        label="Scope of Work"
        items={termsAndConditions.scopeOfWork}
        onAdd={addScopeItem}
        onUpdate={updateScopeItem}
        onRemove={removeScopeItem}
        addLabel="Add bullet"
      />
      <EditableList
        label="Conditions Apply"
        items={termsAndConditions.conditionsApply}
        onAdd={addConditionItem}
        onUpdate={updateConditionItem}
        onRemove={removeConditionItem}
        addLabel="Add bullet"
      />
    </FormSection>
  );
}
