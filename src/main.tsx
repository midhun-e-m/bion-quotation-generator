import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Note: StrictMode is intentionally omitted. In dev, StrictMode
// double-invokes renders/effects, which was doubling the cost of
// rebuilding the @react-pdf/renderer preview on every change and
// contributed to the high memory usage / lag in the live preview.
createRoot(document.getElementById('root')!).render(<App />)
