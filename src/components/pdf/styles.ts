import { StyleSheet, Font } from '@react-pdf/renderer';

// BION brand palette (derived from the BION logo: navy blue + steel gray + amber)
export const colors = {
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

Font.registerHyphenationCallback((word) => [word]);

export const pdfStyles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 9.5,
    color: colors.textDark,
    paddingTop: 0,
    paddingBottom: 46,
    paddingHorizontal: 0,
    backgroundColor: colors.white,
  },
  contentPadding: {
    paddingHorizontal: 34,
  },
  leftAccentBar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 6,
    backgroundColor: colors.navy,
  },

  // Header
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 34,
    paddingTop: 22,
    paddingBottom: 12,
    borderBottomWidth: 1.5,
    borderBottomColor: colors.navy,
    marginBottom: 16,
  },
  logo: {
    height: 34,
    objectFit: 'contain',
  },
  headerRight: {
    fontSize: 7.5,
    color: colors.textMuted,
    textAlign: 'right',
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 0.75,
    borderTopColor: colors.border,
    paddingHorizontal: 34,
    paddingTop: 8,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 7.5,
    color: colors.textMuted,
  },
  pageNumber: {
    position: 'absolute',
    bottom: 14,
    right: 34,
    fontSize: 7.5,
    color: colors.textMuted,
  },

  // Typography
  h1: {
    fontSize: 18,
    fontWeight: 700,
    color: colors.navy,
    marginBottom: 4,
  },
  h2: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.navy,
    textAlign: 'center',
    marginBottom: 4,
  },
  h3: {
    fontSize: 10.5,
    fontWeight: 700,
    color: colors.navyDark,
    textAlign: 'center',
    marginBottom: 14,
    textTransform: 'uppercase',
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: 700,
    color: colors.navy,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  paragraph: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: colors.textDark,
    marginBottom: 8,
  },
  bold: {
    fontWeight: 700,
  },

  // Table
  table: {
    borderWidth: 1,
    borderColor: colors.navy,
    marginBottom: 12,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tableRowLast: {
    flexDirection: 'row',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: colors.navy,
  },
  th: {
    padding: 6,
    fontSize: 8.5,
    fontWeight: 700,
    color: colors.white,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.25)',
  },
  td: {
    padding: 6,
    fontSize: 8.5,
    color: colors.textDark,
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },

  // Bullet list
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bulletDot: {
    width: 10,
    fontSize: 9,
    color: colors.navy,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.45,
    color: colors.textDark,
  },

  badge: {
    backgroundColor: colors.amber,
    color: colors.navyDark,
    fontSize: 8.5,
    fontWeight: 700,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
});
