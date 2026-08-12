import { useQuotationStore } from '../../store/quotationStore';
import FormSection from './shared/FormSection';
import { TextField, TextAreaField } from './shared/Fields';

interface Props {
  errors?: Record<string, string>;
}

export default function ProjectForm({ errors = {} }: Props) {
  const { quotation, updateProject } = useQuotationStore();
  const { project } = quotation;

  return (
    <FormSection title="Project Details" description="Title, system info and introductory text for the quotation.">
      <TextField
        label="Quotation Title"
        value={project.quotationTitle}
        onChange={(v) => updateProject({ quotationTitle: v })}
        required
        error={errors.quotationTitle}
      />
      <TextField
        label="Project Title"
        value={project.projectTitle}
        onChange={(v) => updateProject({ projectTitle: v })}
        required
        error={errors.projectTitle}
      />
      <div className="grid grid-cols-2 gap-4">
        <TextField
          label="System Type"
          value={project.systemType}
          onChange={(v) => updateProject({ systemType: v })}
        />
        <TextField
          label="System Capacity"
          value={project.systemCapacity}
          onChange={(v) => updateProject({ systemCapacity: v })}
        />
      </div>
      <TextField label="Greeting" value={project.greeting} onChange={(v) => updateProject({ greeting: v })} />
      <TextAreaField
        label="Introduction Paragraph 1"
        value={project.introParagraph1}
        onChange={(v) => updateProject({ introParagraph1: v })}
      />
      <TextAreaField
        label="Introduction Paragraph 2"
        value={project.introParagraph2}
        onChange={(v) => updateProject({ introParagraph2: v })}
      />
      <TextField
        label="Closing / Signature Text"
        value={project.closingText}
        onChange={(v) => updateProject({ closingText: v })}
      />
    </FormSection>
  );
}
