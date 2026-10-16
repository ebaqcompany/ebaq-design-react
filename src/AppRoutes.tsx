import { lazy, Suspense, type ComponentType, type ReactNode } from 'react'
import { Routes, Route, Navigate, matchRoutes, useParams } from 'react-router-dom'

type Page = ComponentType & { preload: () => Promise<ComponentType> }

// Every page module, each its own chunk, so a visitor downloads the code for the page they opened
// rather than the whole site.
const pageModules = import.meta.glob<Record<string, ComponentType>>(['./App.tsx', './StartPage.tsx', './components/*Page.tsx', './components/*Landing.tsx'])

// Once a page's chunk has loaded it renders synchronously: main.tsx loads the first route before
// mounting (no blank frame over the prerendered HTML), and the prerender build loads them all up
// front because renderToString can't wait for React.lazy.
const page = (module: string, exportName = 'default'): Page => {
  let loaded: ComponentType | undefined
  let pending: Promise<ComponentType> | undefined
  const preload = () => (pending ??= pageModules[module]().then((exports) => (loaded = exports[exportName])))
  const Lazy = lazy(() => preload().then((component) => ({ default: component })))
  const Page = () => {
    const Component = loaded ?? Lazy
    return <Component />
  }
  return Object.assign(Page, { preload })
}

const Home = page('./App.tsx')
const StartPage = page('./StartPage.tsx')
const LawFirmLanding = page('./components/LawFirmLanding.tsx', 'LawFirmLanding')
const AiHealthcareLanding = page('./components/AiHealthcareLanding.tsx', 'AiHealthcareLanding')
const SaasBrandingLanding = page('./components/SaasBrandingLanding.tsx', 'SaasBrandingLanding')
const LuxuryBrandingLanding = page('./components/LuxuryBrandingLanding.tsx', 'LuxuryBrandingLanding')
const CannabisBrandingLanding = page('./components/CannabisBrandingLanding.tsx', 'CannabisBrandingLanding')
const ConsultancyBrandingLanding = page('./components/ConsultancyBrandingLanding.tsx', 'ConsultancyBrandingLanding')
const SaasWebDesignLanding = page('./components/SaasWebDesignLanding.tsx', 'SaasWebDesignLanding')
const AiStartupBrandingLanding = page('./components/AiStartupBrandingLanding.tsx', 'AiStartupBrandingLanding')
const CaseStudyPage = page('./components/CaseStudyPage.tsx', 'CaseStudyPage')
const WorkPage = page('./components/WorkPage.tsx', 'WorkPage')
const BlogPage = page('./components/BlogPage.tsx', 'BlogPage')
const BlogPostPage = page('./components/BlogPostPage.tsx', 'BlogPostPage')
const PodcastPage = page('./components/PodcastPage.tsx', 'PodcastPage')
const PodcastEpisodePage = page('./components/PodcastEpisodePage.tsx', 'PodcastEpisodePage')
const ShopPage = page('./components/ShopPage.tsx', 'ShopPage')
const AboutPage = page('./components/AboutPage.tsx', 'AboutPage')
const ContactPage = page('./components/ContactPage.tsx', 'ContactPage')
const ToolsPage = page('./components/ToolsPage.tsx', 'ToolsPage')
const PrivacyPolicyPage = page('./components/LegalPage.tsx', 'PrivacyPolicyPage')
const FulfillmentPolicyPage = page('./components/LegalPage.tsx', 'FulfillmentPolicyPage')
const NotFoundPage = page('./components/NotFoundPage.tsx', 'NotFoundPage')
const ServicesPage = page('./components/ServicesPage.tsx', 'ServicesPage')
const BrandStrategyPage = page('./components/BrandStrategyPage.tsx', 'BrandStrategyPage')
const LogoDesignPage = page('./components/LogoDesignPage.tsx', 'LogoDesignPage')
const IdentitySystemsPage = page('./components/IdentitySystemsPage.tsx', 'IdentitySystemsPage')
const WebDesignPage = page('./components/WebDesignPage.tsx', 'WebDesignPage')
const WebDevelopmentPage = page('./components/WebDevelopmentPage.tsx', 'WebDevelopmentPage')
const MotionGraphicsPage = page('./components/MotionGraphicsPage.tsx', 'MotionGraphicsPage')
const PricingPage = page('./components/PricingPage.tsx', 'PricingPage')
const product = (name: string) => page('./components/ProductLandingPage.tsx', name)

const LegacyGearRedirect = () => {
  const { slug = '' } = useParams()
  return <Navigate to={`/blog/${encodeURIComponent(slug)}`} replace />
}

type RouteEntry = { path: string; page?: Page; element?: ReactNode }

const routes: RouteEntry[] = [
  { path: '/', page: Home },
  { path: '/start', page: StartPage },
  { path: '/law-firm-branding', page: LawFirmLanding },
  { path: '/ai-healthcare-branding', page: AiHealthcareLanding },
  { path: '/saas-branding', page: SaasBrandingLanding },
  { path: '/luxury-branding', page: LuxuryBrandingLanding },
  { path: '/cannabis-branding', page: CannabisBrandingLanding },
  { path: '/consultancy-branding', page: ConsultancyBrandingLanding },
  { path: '/saas-web-design', page: SaasWebDesignLanding },
  { path: '/ai-startup-branding', page: AiStartupBrandingLanding },
  { path: '/work', page: WorkPage },
  { path: '/about', page: AboutPage },
  { path: '/contact', page: ContactPage },
  { path: '/tools', page: ToolsPage },
  { path: '/pricing', page: PricingPage },
  { path: '/services', page: ServicesPage },
  { path: '/services/brand-strategy', page: BrandStrategyPage },
  { path: '/services/logo-design', page: LogoDesignPage },
  { path: '/services/identity-systems', page: IdentitySystemsPage },
  { path: '/services/web-design', page: WebDesignPage },
  { path: '/services/web-development', page: WebDevelopmentPage },
  { path: '/services/motion-graphics', page: MotionGraphicsPage },
  { path: '/privacy-policy', page: PrivacyPolicyPage },
  { path: '/fulfillment-policy', page: FulfillmentPolicyPage },
  { path: '/work/:slug', page: CaseStudyPage },
  { path: '/blog', page: BlogPage },
  { path: '/blog/:slug', page: BlogPostPage },
  { path: '/gear/:slug', element: <LegacyGearRedirect /> },
  { path: '/gear', element: <Navigate to="/blog" replace /> },
  { path: '/podcast', page: PodcastPage },
  { path: '/podcast/:slug', page: PodcastEpisodePage },
  { path: '/shop', page: ShopPage },
  { path: '/shop/strategy-guide', page: product('StrategyGuidePage') },
  { path: '/shop/naming-guide', page: product('NamingGuidePage') },
  { path: '/shop/proposal-template', page: product('ProposalTemplatePage') },
  { path: '/shop/guidelines-kit', page: product('GuidelinesKitPage') },
  { path: '/shop/brand-master', page: product('BrandMasterPage') },
  { path: '/shop/storytelling-guide', page: product('StorytellingGuidePage') },
  { path: '/shop/creative-suite', page: product('CreativeSuitePage') },
  { path: '/shop/brand-archetypes', page: product('BrandArchetypesPage') },
  { path: '/shop/one-page-style-guide', page: product('OnePageStyleGuidePage') },
  { path: '*', page: NotFoundPage },
]

// Load the chunk for whichever page a path renders (the first route on boot, the next one on link hover).
export const preloadRoute = (pathname: string) =>
  Promise.all((matchRoutes(routes, pathname) ?? []).map(({ route }) => route.page?.preload()))

export const preloadAllRoutes = () => Promise.all(routes.map((route) => route.page?.preload()))

// Shared by the browser entry (main.tsx) and the build-time prerender (entry-server.tsx).
// Navigations run as transitions, so while the next page's chunk loads the current page stays on screen.
export const AppRoutes = () => (
  <Suspense fallback={null}>
    <Routes>
      {routes.map(({ path, page: RoutePage, element }) => (
        <Route key={path} path={path} element={element ?? (RoutePage && <RoutePage />)} />
      ))}
    </Routes>
  </Suspense>
)
