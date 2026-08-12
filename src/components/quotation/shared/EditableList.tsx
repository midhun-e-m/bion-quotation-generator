import { Plus, Trash2, GripVertical } from 'lucide-react';

interface EditableListProps {
  label: string;
  items: string[];
  onAdd: () => void;
  onUpdate: (index: number, value: string) => void;
  onRemove: (index: number) => void;
  addLabel?: string;
}

export default function EditableList({ label, items, onAdd, onUpdate, onRemove, addLabel = 'Add item' }: EditableListProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-slate-600">{label}</span>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
        >
          <Plus size={14} /> {addLabel}
        </button>
      </div>
      <div className="space-y-2">
        {items.length === 0 && <p className="text-xs text-slate-400 italic">No items yet.</p>}
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-2 group">
            <GripVertical size={14} className="text-slate-300 mt-2.5 shrink-0" />
            <textarea
              value={item}
              onChange={(e) => onUpdate(index, e.target.value)}
              rows={1}
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 resize-y"
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="text-slate-300 hover:text-red-500 mt-2 shrink-0 transition"
              aria-label="Remove item"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
