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
import { MStateProposal } from './components/proposal/MStateProposal.tsx'
import { ChesterBowlProposal } from './components/proposal/ChesterBowlProposal.tsx'
import { BrookfieldProposal } from './components/proposal/BrookfieldProposal.tsx'
import { TreeHouseProposal } from './components/proposal/TreeHouseProposal.tsx'
import { LatinoForumProposal } from './components/proposal/LatinoForumProposal.tsx'
import { ByrdTheatreProposal } from './components/proposal/ByrdTheatreProposal.tsx'
import { LawrencevilleProposal } from './components/proposal/LawrencevilleProposal.tsx'
import { LandmarksILProposal } from './components/proposal/LandmarksILProposal.tsx'

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
          <Route path="/proposal/mstate" element={<MStateProposal />} />
          <Route path="/proposal/chesterbowl" element={<ChesterBowlProposal />} />
          <Route path="/proposal/brookfield" element={<BrookfieldProposal />} />
          <Route path="/proposal/treehouse" element={<TreeHouseProposal />} />
          <Route path="/proposal/latinoforum" element={<LatinoForumProposal />} />
          <Route path="/proposal/byrdtheatre" element={<ByrdTheatreProposal />} />
          <Route path="/proposal/lawrenceville" element={<LawrencevilleProposal />} />
          <Route path="/proposal/landmarks-il" element={<LandmarksILProposal />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
