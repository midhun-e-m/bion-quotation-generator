# BION Quotation Generator

A frontend-only, professional quotation editor and PDF generator for **BION | Water & Energy Solutions**, built with React, Vite, TypeScript, Tailwind CSS, Zustand and `@react-pdf/renderer`.

It reproduces the structure of BION's 6-page commercial quotations (cover page, introduction, bill of materials, project cost, warranty terms, and payment/warranty) while keeping every field fully editable.

## Tech stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Zustand (global quotation state)
- React Hook Form-style controlled fields, with validation on required fields
- `@react-pdf/renderer` (PDF generation — no browser print, no backend)
- `lucide-react` for icons

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To build a production bundle:

```bash
npm run build
npm run preview
```

Everything runs client-side — there is no backend, and no data ever leaves the browser except the generated PDF you download.

## How it works

- **Editor (left panel):** customer details, project details, cover image upload, bill of materials, pricing, additional expenses, terms & conditions, payment terms, bank details, warranty, and company/branding settings.
- **Live preview (right panel):** an embedded PDF viewer (`@react-pdf/renderer`'s `PDFViewer`) rendering the *exact* same document model used for the final download, so there's only one source of truth.
- **Generate PDF:** the header button uses `PDFDownloadLink` to produce and download a multi-page A4 PDF. It's disabled until the required fields (customer name, date, reference number, quotation title, project title) are filled in.
- **Reset:** clears all edits and restores the default BION sample quotation, after a confirmation dialog.

## Project structure

```
src/
  components/
    quotation/        # Editor forms + live preview
      shared/          # Reusable form primitives (fields, editable lists, sections)
    pdf/               # @react-pdf/renderer document + page components
  store/
    quotationStore.ts  # Zustand store — single source of truth
  types/
    quotation.ts        # Shared TypeScript data model
  utils/
    currency.ts          # Indian (lakh/crore) currency formatting
    calculations.ts       # Pricing totals + reference number generation
  data/
    defaultQuotation.ts    # Default sample data (separate from rendering code)
  assets/
    bion-logo.png            # BION letter logo, used as the default header/cover logo
```

## Notes on extensibility

The data model, Zustand store, and PDF renderer are intentionally decoupled from the editor UI so the following can be layered on later without a rewrite:

- Backend persistence (Firebase/Supabase/Postgres) — swap `resetQuotation`/`loadQuotation` for API calls
- Authentication and roles
- A saved-quotations list, search, and duplication
- A customer/product database to autofill BOM items
- Multiple quotation templates
- Cloud image storage instead of base64 data URLs

## Known limitations (v1)

- Images are stored as base64 data URLs in memory only — refreshing the page clears the quotation (no persistence yet, by design for v1).
- The live preview uses `@react-pdf/renderer`'s built-in `PDFViewer`, which relies on the browser's native PDF plugin; if a browser has that disabled, use the "Generate PDF" download instead.
