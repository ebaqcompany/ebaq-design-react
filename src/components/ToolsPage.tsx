import { Helmet } from 'react-helmet-async'
import { useEffect } from 'react'
import { RxExternalLink } from 'react-icons/rx'
import { Footer15 } from './Footer15'
import { Navbar16 } from './Navbar16'

const tools = [
  {
    name: 'LogoCrafter.app',
    description: 'AI Logo Generator (mobile)',
    url: 'https://logocrafter.app/',
    image: '/images/site/tools-page/logocrafter-ai-logo-maker900-695e9e601d8e7.webp',
  },
  {
    name: 'BrandNamer.app',
    description: 'Free Brand Name Generator',
    url: 'https://brandnamer.app/',
    image: '/images/site/tools-page/brand-namer-app-cover-900.webp',
  },
  {
    name: 'Tagliner.app',
    description: 'Free Brand Tagline Generator',
    url: 'https://tagliner.app/',
    image: '/images/site/tools-page/tagliner-thumb.png',
  },
  {
    name: 'BrandStrategist.ai',
    description: 'AI Brand Strategy Assistant',
    url: 'https://brandstrategist.ai/',
    image: '/images/site/tools-page/ai-brand-startegist.webp',
  },
  {
    name: 'Archetypes.chat',
    description: 'Chat with Brand Archetypes',
    url: 'https://archetypes.chat/',
    image: '/images/site/tools-page/archetypes-chat-thumb.webp',
  },
  {
    name: 'Branding.study',
    description: 'Paid Branding Courses',
    url: 'https://branding.study/',
    image: '/images/site/tools-page/branding-study-screenshot.webp',
  },
  {
    name: 'Guidelines.online',
    description: 'Free Style Guide Generator',
    url: 'https://guidelines.online/',
    image: '/images/site/tools-page/guidelines-online-mockup.webp',
  },
]

export function ToolsPage() {
  useEffect(() => {
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const previous = canonical?.href
    const previousDescription = description?.content
    if (canonical) canonical.href = 'https://www.ebaqdesign.com/tools'
    if (description) description.content = 'Accelerate your branding with free online tools. AI brand consultant, name generator, slogan creator, and more to streamline your brand development process.'
    return () => {
      if (canonical && previous) canonical.href = previous
      if (description && previousDescription) description.content = previousDescription
    }
  }, [])

  return (
    <div className="relative bg-white text-black">
      <Helmet>
        <title>Free Branding Tools | Name Generator, AI Consultant & More | Ebaqdesign</title>
        <meta name="description" content="Accelerate your branding with free online tools. AI brand consultant, name generator, slogan creator, and more to streamline your brand development process." />
        <link rel="canonical" href="https://www.ebaqdesign.com/tools" />
      </Helmet>
      <Navbar16 />
      <main>
        <header className="px-[5%] pb-12 pt-16 text-center md:pb-16 md:pt-24 lg:pb-20 lg:pt-28">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 font-semibold text-brand-primary md:mb-4">Tools &amp; Resources</p>
            <h1>Branding Tools</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">
              Accelerate your process with our specialized tools, and other resources. From naming &amp; slogan generators to an AI-powered brand strategist assistant and beyond.
            </p>
          </div>
        </header>

        <section className="px-[5%] pb-20 md:pb-28 lg:pb-32">
          <div className="container grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
            {tools.map((tool) => (
              <article key={tool.url} className="group flex flex-col items-start">
                <a href={tool.url} target="_blank" rel="noopener noreferrer" className="mb-6 w-full overflow-hidden bg-background-secondary" aria-label={`Open ${tool.name} in a new tab`}>
                  <img src={tool.image} alt="" loading="lazy" className="aspect-[3/2] size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                </a>
                <h2 className="heading-h5 mb-2">
                  <a href={tool.url} target="_blank" rel="noopener noreferrer">{tool.name}</a>
                </h2>
                <p className="text-neutral-600">{tool.description}</p>
                <a href={tool.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 font-semibold">
                  Visit {tool.name}<RxExternalLink aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer15 logo={{ url: '/', src: '/ebaq-mark-one-color.svg', alt: 'Ebaq Design' }} />
    </div>
  )
}
