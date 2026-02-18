import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { SenseHawkProposal } from './components/proposal/SenseHawkProposal.tsx'
import { BellinghamProposal } from './components/proposal/BellinghamProposal.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/proposal/sensehawk" element={<SenseHawkProposal />} />
        <Route path="/proposal/bellingham" element={<BellinghamProposal />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
