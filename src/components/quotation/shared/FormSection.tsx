import type { ReactNode } from 'react';

interface FormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="px-5 py-4 border-b border-slate-100">
        <h3 className="text-sm font-semibold tracking-wide text-slate-800 uppercase">{title}</h3>
        {description && <p className="text-xs text-slate-500 mt-1">{description}</p>}
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </section>
  );
}
