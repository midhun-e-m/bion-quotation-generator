import type { ChangeEvent } from 'react';

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  type?: string;
}

export function TextField({ label, value, onChange, placeholder, error, required, type = 'text' }: FieldProps) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-slate-600">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm text-slate-800 outline-none transition focus:ring-2 focus:ring-blue-500/40 ${
          error ? 'border-red-400' : 'border-slate-300 focus:border-blue-500'
        }`}
      />
      {error && <span className="text-xs text-red-500 mt-1 block">{error}</span>}
    </label>
  );
}

interface NumberFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  error?: string;
  required?: boolean;
}

export function NumberField({ label, value, onChange, error, required }: NumberFieldProps) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-slate-600">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </span>
      <input
        type="number"
        value={Number.isNaN(value) ? '' : value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(parseFloat(e.target.value) || 0)}
        className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm text-slate-800 outline-none transition focus:ring-2 focus:ring-blue-500/40 ${
          error ? 'border-red-400' : 'border-slate-300 focus:border-blue-500'
        }`}
      />
      {error && <span className="text-xs text-red-500 mt-1 block">{error}</span>}
    </label>
  );
}

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export function TextAreaField({ label, value, onChange, placeholder, rows = 3 }: TextAreaProps) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-slate-600">{label}</span>
      <textarea
        value={value}
        placeholder={placeholder}
        rows={rows}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 resize-y"
      />
    </label>
  );
}
