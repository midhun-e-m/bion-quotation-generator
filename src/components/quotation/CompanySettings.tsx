import { useRef, type ChangeEvent } from 'react';
import { useQuotationStore } from '../../store/quotationStore';
import FormSection from './shared/FormSection';
import { TextField, TextAreaField } from './shared/Fields';
import EditableList from './shared/EditableList';
import { X } from 'lucide-react';

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function CompanySettings() {
  const {
    quotation,
    updateCompanyDetails,
    setCompanyLogo,
    removeCompanyLogo,
    addWhyUsHighlight,
    updateWhyUsHighlight,
    removeWhyUsHighlight,
  } = useQuotationStore();
  const { companyDetails } = quotation;
  const logoInputRef = useRef<HTMLInputElement>(null);

  async function onLogoChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const dataUrl = await fileToDataUrl(file);
      setCompanyLogo(dataUrl);
    }
    e.target.value = '';
  }

  return (
    <FormSection title="Company Settings" description="Branding and contact details used across the whole quotation.">
      <div>
        <span className="text-xs font-medium text-slate-600 block mb-2">Logo</span>
        <div className="flex items-center gap-3">
          {companyDetails.logoDataUrl ? (
            <div className="relative">
              <img src={companyDetails.logoDataUrl} alt="Logo" className="h-14 w-auto object-contain rounded border border-slate-200 bg-white p-1" />
              <button
                type="button"
                onClick={removeCompanyLogo}
                className="absolute -top-2 -right-2 rounded-full bg-white shadow p-0.5 text-slate-500 hover:text-red-500 border border-slate-200"
              >
                <X size={12} />
              </button>
            </div>
          ) : (
            <div className="h-14 w-24 rounded border border-dashed border-slate-300 flex items-center justify-center text-[10px] text-slate-400">
              No logo
            </div>
          )}
          <button
            type="button"
            onClick={() => logoInputRef.current?.click()}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition"
          >
            {companyDetails.logoDataUrl ? 'Replace logo' : 'Upload logo'}
          </button>
          <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={onLogoChange} />
        </div>
      </div>

      <TextField label="Company Name" value={companyDetails.name} onChange={(v) => updateCompanyDetails({ name: v })} />
      <TextField label="Tagline" value={companyDetails.tagline} onChange={(v) => updateCompanyDetails({ tagline: v })} />

      <div className="grid grid-cols-2 gap-4">
        <TextField label="Website" value={companyDetails.website} onChange={(v) => updateCompanyDetails({ website: v })} />
        <TextField label="Email" value={companyDetails.email} onChange={(v) => updateCompanyDetails({ email: v })} />
      </div>

      <TextAreaField
        label="Head Office Address"
        value={companyDetails.headOfficeAddress}
        onChange={(v) => updateCompanyDetails({ headOfficeAddress: v })}
        rows={2}
      />
      <TextField
        label="Head Office Phones"
        value={companyDetails.headOfficePhones}
        onChange={(v) => updateCompanyDetails({ headOfficePhones: v })}
      />
      <TextAreaField
        label="Regional Office Address"
        value={companyDetails.regionalOfficeAddress}
        onChange={(v) => updateCompanyDetails({ regionalOfficeAddress: v })}
        rows={2}
      />
      <TextField
        label="Regional Office Phones"
        value={companyDetails.regionalOfficePhones}
        onChange={(v) => updateCompanyDetails({ regionalOfficePhones: v })}
      />
      <TextAreaField
        label="Branch Office Address"
        value={companyDetails.branchOfficeAddress}
        onChange={(v) => updateCompanyDetails({ branchOfficeAddress: v })}
        rows={2}
      />
      <TextAreaField
        label="Footer Address Line"
        value={companyDetails.footerAddressLine}
        onChange={(v) => updateCompanyDetails({ footerAddressLine: v })}
        rows={2}
      />
      <TextField
        label="Signature Block (e.g. 'For BION ...')"
        value={companyDetails.signatureBlock}
        onChange={(v) => updateCompanyDetails({ signatureBlock: v })}
      />

      <div className="pt-2 border-t border-slate-100 space-y-4">
        <TextField
          label='"Why Us" Heading'
          value={companyDetails.whyUsHeading}
          onChange={(v) => updateCompanyDetails({ whyUsHeading: v })}
        />
        <TextAreaField
          label='"Why Us" Introduction'
          value={companyDetails.whyUsIntro}
          onChange={(v) => updateCompanyDetails({ whyUsIntro: v })}
        />
        <EditableList
          label='"Why Us" Highlights'
          items={companyDetails.whyUsHighlights}
          onAdd={addWhyUsHighlight}
          onUpdate={updateWhyUsHighlight}
          onRemove={removeWhyUsHighlight}
          addLabel="Add highlight"
        />
      </div>
    </FormSection>
  );
}
