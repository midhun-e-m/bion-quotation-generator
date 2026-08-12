import type { Quotation } from '../types/quotation';
import { generateId, generateReferenceNumber } from '../utils/calculations';
import bionLogo from '../assets/bion-logo.png';

export const defaultCompanyDetails: Quotation['companyDetails'] = {
  name: 'BION Water & Energy Solutions',
  tagline: 'Water & Energy Solutions',
  headOfficeAddress: '2nd Floor, Regency Mall, Mamom, Attingal, Trivandrum, Kerala – 695104',
  headOfficePhones: '+91 96453 22221, +91 96453 22227',
  regionalOfficeAddress: 'Ittoop Tower, Karyamparambu Signal Jn, Angamaly, Ernakulam',
  regionalOfficePhones: '+91 96453 22226, +91 96453 22224',
  branchOfficeAddress: 'Sri Sri Arcade, Room No:13/824, Kammanthara Road, Vadakkenchery, Palakkad-678683',
  website: 'www.bionindia.com',
  email: 'info@bionindia.com',
  footerAddressLine: 'Josephine Villa, Anjengo P.O, Trivandrum, Kerala - 695309',
  logoDataUrl: bionLogo,
  signatureBlock: 'For BION Water & Energy Solutions',
  whyUsHeading: 'WHY BION?',
  whyUsIntro:
    'We encourage everyone to use renewable energy and reduce usage of fossil fuels as fossil fuels are the main cause for global warming and climate change. Let\u2019s work together for a better and sustainable future.',
  whyUsHighlights: [
    '26+ years of combined technical experience across water and energy solutions',
    '19 MW+ rooftop installations across Kerala for on-grid, off-grid and hybrid solar power plants',
    '7000+ satisfied customers across Kerala',
    'Empaneled with MNRE, KSEB and ANERT subsidy schemes',
    'Experienced engineers and technicians',
  ],
};

export function createDefaultQuotation(): Quotation {
  return {
    customer: {
      name: 'Mr. Siju M Scaria',
      address: '',
      location: 'Idukki',
      phone: '',
      email: '',
    },
    project: {
      quotationTitle: 'TECHNO COMMERCIAL BUDGETARY OFFER FOR 5KW SOLAR HYBRID POWER PLANT',
      projectTitle: '5KW HYBRID SOLUTION SOLAR POWER PLANT',
      systemType: 'Solar Hybrid Power Plant',
      systemCapacity: '5 KW',
      greeting: 'Dear Sir,',
      introParagraph1:
        'As per our discussion, we are pleased to present the quotation for the supply, installation, and commissioning.',
      introParagraph2:
        'We are looking forward to your valuable order confirmation for the noble mission of creating eco-friendly & cost effective buildings. Please feel free to contact us for any other clarifications, if any. Thanking you and assuring you of our best attention and services at all times.',
      closingText: 'For BION Water & Energy Solutions',
    },
    coverImage: null,
    date: new Date().toISOString().slice(0, 10),
    referenceNumber: generateReferenceNumber(),
    billOfMaterials: [
      { id: generateId(), product: 'Solar Modules', specification: 'Bifacial/Topcon', make: 'Adani/Pahal/Renew/Equivalent', quantity: '545 - 600Wp' },
      { id: generateId(), product: 'PCU/Inverter', specification: '5Kw 1PH 48V Hybrid', make: 'Deye/Feston/Equivalent', quantity: 'As per 5kW' },
      { id: generateId(), product: 'ACDB & DCDB', specification: 'AC & DC (with related components)', make: 'BION/Equivalent', quantity: 'As per' },
      { id: generateId(), product: 'DC Cable', specification: '4sqmm × 1 core', make: 'Sichem/Polycab', quantity: 'As per' },
      { id: generateId(), product: 'AC Cable', specification: 'Al Armoured', make: 'HAVELLS/Equivalent', quantity: 'As per' },
      { id: generateId(), product: 'Accessories', specification: 'Connectors, Earthing, etc.', make: 'As per IS standard', quantity: 'As per' },
      { id: generateId(), product: 'Solar Meter', specification: 'As per', make: 'Techno/Equivalent', quantity: '1 nos' },
    ],
    pricing: {
      systemPrice: 364000,
      gstIncluded: true,
      subsidyAmount: 78000,
      approvalCharges: [
        { id: generateId(), label: 'KSEBL Application Fee + 18% GST', amount: 1000 },
        { id: generateId(), label: 'KSEBL Registration Fee + 18% GST', amount: 5900 },
        { id: generateId(), label: 'Power Purchase Agreement + Documentation Charge', amount: 210 },
      ],
      notes: [
        'Estimation on without battery price.',
        'AC side electrical works under customer scope.',
        'Additional structure works will be extra.',
      ],
    },
    additionalExpenses: {
      siteRequirements: 'Additional site requirements, if any (based on site survey, during the time of installation), will be charged extra to the customer.',
      extraInstallation: '',
      otherExpenses: '',
      notes: '',
    },
    termsAndConditions: {
      scopeOfWork: [
        'BION will energize and hand over the entire power plant to the customer as per ANERT specifications and guidelines.',
        'During the time of the end process, we will provide basic training for the customer regarding O & M of the plant. User manual and warranty card will be provided after commissioning.',
        'Customer should confirm and provide a shadow-free area for mounting solar modules, as well as suitable space for the installation of inverter & junction boxes.',
        'Any modifications to the existing electrical system due to non-conformity with Electrical Inspectorate/KSEB standards will have to be carried out by the customer.',
        'Periodic cleaning of the solar panels on a regular basis to maintain generation shall be done by the customer.',
        'Any additional structure work for providing access for cleaning is the scope of the customer. It is recommended to have a water connection arrangement close to the panel installation area.',
        'Customer shall provide all necessary support for getting approvals from the concerned KSEB section office.',
        'The KSEB feasibility and registration is under the customer scope.',
        'Net meter is under customer scope.',
        'If required, CTPT & RPR will be under customer scope.',
        'Panel board and RPR will be charged extra.',
        'AC and DC cables in excess of 25m length shall be charged extra to the customer.',
      ],
      conditionsApply: [
        'In compliance with KSERC guidelines, any solar system exceeding 10 kW requires an integrated battery backup.',
        'As per revised KSERC regulations, any changes arising thereafter will not be the responsibility of our company.',
      ],
    },
    paymentTerms: {
      terms: [
        '80% of the total system cost should be payable by the customer in advance, after Technical & Commercial confirmation with confirmed work order.',
        '10% on material delivery.',
        '10% after installation.',
        'The cost towards approvals and connectivity shall be paid as required.',
        'Customer should make all payments towards installation of the power plant to BION in any of the forms mentioned below.',
        'Payments should be in the form of Cheque/DD/NEFT/RTGS.',
      ],
    },
    bankDetails: {
      bankName: 'HDFC Bank',
      branch: 'Kadakkavoor',
      accountNumber: '99909645322221',
      ifsc: 'HDFC0001597',
      accountHolderName: 'M/s BION Water & Energy Solutions',
    },
    warranty: {
      totalSystem: '5 Years',
      pcuInverter: '5 Years',
      panel: '30 Years',
      moduleProductWarranty: 'Up to 10 years',
      powerOutputWarranty: 'Up to 25 years for 80% efficiency as per MNRE standards',
      exclusions: [
        'For physical damage, burnt or cracked parts, natural calamities warranty is not applicable.',
      ],
      amcNote: 'After the warranty period, Annual Maintenance Contract (AMC) can be done with mutually agreed terms and conditions.',
    },
    companyDetails: defaultCompanyDetails,
  };
}
