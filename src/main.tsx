import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'
import { LawFirmLanding } from './components/LawFirmLanding.tsx'
import { SenseHawkProposal } from './components/proposal/SenseHawkProposal.tsx'
import { BellinghamProposal } from './components/proposal/BellinghamProposal.tsx'
import { CAKProposal } from './components/proposal/CAKProposal.tsx'
import { AugustaProposal } from './components/proposal/AugustaProposal.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/law-firm-branding" element={<LawFirmLanding />} />
          <Route path="/proposal/sensehawk" element={<SenseHawkProposal />} />
          <Route path="/proposal/bellingham" element={<BellinghamProposal />} />
          <Route path="/proposal/cak" element={<CAKProposal />} />
          <Route path="/proposal/augusta" element={<AugustaProposal />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
