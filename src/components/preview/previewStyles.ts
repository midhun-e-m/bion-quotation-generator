// Kept in sync with src/components/pdf/styles.ts so the on-screen
// preview visually matches the generated PDF, without importing
// @react-pdf/renderer (which is heavy and only needed at export time).
export const previewColors = {
  navy: '#12356B',
  navyDark: '#0B2447',
  steel: '#7A8B99',
  amber: '#F4B400',
  amberDark: '#D69E00',
  textDark: '#1E293B',
  textMuted: '#52606D',
  border: '#D8DEE4',
  bgLight: '#F4F6F8',
  white: '#FFFFFF',
};

export function formatDisplayDate(iso: string) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
}
