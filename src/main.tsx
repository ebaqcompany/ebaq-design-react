import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'
import StartPage from './StartPage.tsx'
import { LawFirmLanding } from './components/LawFirmLanding.tsx'
import { CaseStudyPage } from './components/CaseStudyPage.tsx'
import { WorkPage } from './components/WorkPage.tsx'
import { BlogPage } from './components/BlogPage.tsx'
import { BlogPostPage } from './components/BlogPostPage.tsx'
import { PodcastPage } from './components/PodcastPage.tsx'
import { PodcastEpisodePage } from './components/PodcastEpisodePage.tsx'
import { ShopPage } from './components/ShopPage.tsx'
import { AboutPage } from './components/AboutPage.tsx'
import { ContactPage } from './components/ContactPage.tsx'
import { ToolsPage } from './components/ToolsPage.tsx'
import { FulfillmentPolicyPage, PrivacyPolicyPage } from './components/LegalPage.tsx'
import { NotFoundPage } from './components/NotFoundPage.tsx'
import {
  BrandArchetypesPage,
  OnePageStyleGuidePage,
  BrandMasterPage,
  CreativeSuitePage,
  GuidelinesKitPage,
  NamingGuidePage,
  ProposalTemplatePage,
  StorytellingGuidePage,
  StrategyGuidePage,
} from './components/ProductLandingPage.tsx'

const LegacyGearRedirect = () => {
  const { slug = '' } = useParams()
  return <Navigate to={`/blog/${encodeURIComponent(slug)}`} replace />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/start" element={<StartPage />} />
          <Route path="/law-firm-branding" element={<LawFirmLanding />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/fulfillment-policy" element={<FulfillmentPolicyPage />} />
          <Route path="/work/:slug" element={<CaseStudyPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/gear/:slug" element={<LegacyGearRedirect />} />
          <Route path="/gear" element={<Navigate to="/blog" replace />} />
          <Route path="/podcast" element={<PodcastPage />} />
          <Route path="/podcast/:slug" element={<PodcastEpisodePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/strategy-guide" element={<StrategyGuidePage />} />
          <Route path="/shop/naming-guide" element={<NamingGuidePage />} />
          <Route path="/shop/proposal-template" element={<ProposalTemplatePage />} />
          <Route path="/shop/guidelines-kit" element={<GuidelinesKitPage />} />
          <Route path="/shop/brand-master" element={<BrandMasterPage />} />
          <Route path="/shop/storytelling-guide" element={<StorytellingGuidePage />} />
          <Route path="/shop/creative-suite" element={<CreativeSuitePage />} />
          <Route path="/shop/brand-archetypes" element={<BrandArchetypesPage />} />
          <Route path="/shop/one-page-style-guide" element={<OnePageStyleGuidePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
