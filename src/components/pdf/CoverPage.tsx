import { Page, View, Text, Image } from '@react-pdf/renderer';
import { pdfStyles, colors } from './styles';
import type { Quotation } from '../../types/quotation';

interface Props {
  quotation: Quotation;
}

export default function CoverPage({ quotation }: Props) {
  const { companyDetails: company, coverImage } = quotation;

  return (
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.leftAccentBar} fixed />

      {/* Header */}
      <View style={pdfStyles.headerRow}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          {company.logoDataUrl ? (
            <Image src={company.logoDataUrl} style={{ height: 40, objectFit: 'contain' }} />
          ) : (
            <Text style={{ fontSize: 18, fontWeight: 700, color: colors.navy }}>{company.name}</Text>
          )}
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 7.5, color: colors.textMuted }}>Empaneled with MNRE, KSEB &amp; ANERT</Text>
        </View>
      </View>

      {/* Hero image */}
      <View style={{ marginHorizontal: 20, height: 300, backgroundColor: colors.bgLight, position: 'relative', overflow: 'hidden' }}>
        {coverImage ? (
          <Image src={coverImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: colors.navy,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: colors.white, fontSize: 11 }}>Upload a cover image to display it here</Text>
          </View>
        )}

        {/* Why Us heading overlay */}
        <View
          style={{
            position: 'absolute',
            left: 16,
            top: 130,
            backgroundColor: colors.amber,
            paddingHorizontal: 14,
            paddingVertical: 8,
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: 700, color: colors.navyDark }}>{company.whyUsHeading}</Text>
        </View>

        <View
          style={{
            position: 'absolute',
            left: 16,
            right: 16,
            top: 172,
            backgroundColor: 'rgba(18,53,107,0.85)',
            padding: 12,
          }}
        >
          <Text style={{ color: colors.white, fontSize: 8.5, lineHeight: 1.5 }}>{company.whyUsIntro}</Text>
        </View>

        <View style={{ position: 'absolute', left: 16, right: 16, top: 232 }}>
          {company.whyUsHighlights.slice(0, 5).map((h, i) => (
            <View
              key={i}
              style={{
                backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(18,53,107,0.85)',
                paddingHorizontal: 10,
                paddingVertical: 4,
                marginBottom: 3,
              }}
            >
              <Text style={{ fontSize: 7.8, color: i % 2 === 0 ? colors.navyDark : colors.white, fontWeight: 700 }}>
                • {h}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Office info */}
      <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 14, gap: 6 }}>
        <View style={{ flex: 1, backgroundColor: colors.navy, padding: 8 }}>
          <Text style={{ color: colors.white, fontSize: 8, fontWeight: 700, marginBottom: 3 }}>Head Office</Text>
          <Text style={{ color: colors.white, fontSize: 7.3, lineHeight: 1.4 }}>{company.headOfficeAddress}</Text>
          <Text style={{ color: colors.white, fontSize: 7.3, marginTop: 3 }}>{company.headOfficePhones}</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: colors.amber, padding: 8 }}>
          <Text style={{ color: colors.navyDark, fontSize: 8, fontWeight: 700, marginBottom: 3 }}>Regional Office</Text>
          <Text style={{ color: colors.navyDark, fontSize: 7.3, lineHeight: 1.4 }}>{company.regionalOfficeAddress}</Text>
          <Text style={{ color: colors.navyDark, fontSize: 7.3, marginTop: 3 }}>{company.regionalOfficePhones}</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: colors.bgLight, padding: 8, borderWidth: 1, borderColor: colors.border }}>
          <Text style={{ color: colors.navy, fontSize: 8, fontWeight: 700, marginBottom: 3 }}>Branch Office</Text>
          <Text style={{ color: colors.textDark, fontSize: 7.3, lineHeight: 1.4 }}>{company.branchOfficeAddress}</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={pdfStyles.footer}>
        <Text>{company.footerAddressLine}</Text>
        <Text>{company.website}</Text>
        <Text>{company.email}</Text>
      </View>
    </Page>
  );
}
