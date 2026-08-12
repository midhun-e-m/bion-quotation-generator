import { useRef, useState, type ChangeEvent } from 'react';
import { useQuotationStore } from '../../store/quotationStore';
import FormSection from './shared/FormSection';
import { ImagePlus, X } from 'lucide-react';

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ImageUploader() {
  const { quotation, setCoverImage, removeCoverImage } = useQuotationStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  async function handleFile(file: File | undefined) {
    if (!file || !file.type.startsWith('image/')) return;
    const dataUrl = await fileToDataUrl(file);
    setCoverImage(dataUrl);
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    handleFile(e.target.files?.[0]);
    e.target.value = '';
  }

  return (
    <FormSection title="Cover Image" description="Large hero image used on the quotation's cover page.">
      {quotation.coverImage ? (
        <div className="relative rounded-lg overflow-hidden border border-slate-200">
          <img src={quotation.coverImage} alt="Cover" className="w-full h-48 object-cover" />
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="rounded-md bg-white/90 px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow hover:bg-white transition"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={removeCoverImage}
              className="rounded-md bg-white/90 p-1.5 text-slate-700 shadow hover:bg-red-50 hover:text-red-600 transition"
              aria-label="Remove image"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}
          onClick={() => inputRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-10 text-center cursor-pointer transition ${
            dragOver ? 'border-blue-400 bg-blue-50' : 'border-slate-300 hover:border-slate-400 bg-slate-50'
          }`}
        >
          <ImagePlus className="text-slate-400" size={28} />
          <p className="text-sm text-slate-500">
            <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-slate-400">PNG, JPG or WEBP</p>
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onInputChange} />
    </FormSection>
  );
}
