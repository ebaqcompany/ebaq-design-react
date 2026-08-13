import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'
import StartPage from './StartPage.tsx'
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
import { StartupRedesignArchive } from './components/StartupRedesignArchive.tsx'
import { getConceptsByIndustry, getConceptsByStyle } from './data/startupRedesignConcepts.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/start" element={<StartPage />} />
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
          <Route path="/startup-redesign-lab" element={<StartupRedesignArchive />} />
          <Route
            path="/glassmorphism-web-design"
            element={
              <StartupRedesignArchive
                bucketTitle="Glassmorphism web design"
                bucketDescription="Draft SEO bucket for startup hero concepts using glassmorphism: translucent cards, layered depth, glow, and motion-rich interaction."
                concepts={getConceptsByStyle('glassmorphism-web-design')}
              />
            }
          />
          <Route
            path="/cybersecurity-startup-web-design"
            element={
              <StartupRedesignArchive
                bucketTitle="Cybersecurity startup web design"
                bucketDescription="Draft SEO bucket for AI security and SOC startup homepage concepts where trust, speed, and signal clarity need to land above the fold."
                concepts={getConceptsByIndustry('cybersecurity-startup-web-design')}
              />
            }
          />
          <Route
            path="/healthcare-startup-web-design"
            element={
              <StartupRedesignArchive
                bucketTitle="Healthcare startup web design"
                bucketDescription="Draft SEO bucket prepared for upcoming healthcare, biotech, and clinical AI startup redesign concepts."
                concepts={getConceptsByIndustry('healthcare-startup-web-design')}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
