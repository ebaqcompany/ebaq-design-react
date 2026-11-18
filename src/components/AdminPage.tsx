import { BiGridAlt, BiImageAlt, BiRightArrowAlt } from 'react-icons/bi'
import { Button } from './ui'

export const AdminPage = () => (
  <div className="min-h-screen bg-surface-muted md:flex">
    <aside className="border-b border-black/20 bg-white px-6 py-6 md:min-h-screen md:w-64 md:shrink-0 md:border-b-0 md:border-r">
      <a href="/" aria-label="Ebaq Design home" className="inline-block"><img src="/ebaqdesign-logo-bold.svg" alt="Ebaq Design" className="h-auto w-36" /></a>
      <p className="mt-8 font-mono text-sm uppercase">Studio</p>
      <nav aria-label="Admin navigation" className="mt-4 flex flex-col gap-2">
        <a href="/admin" aria-current="page" className="flex items-center gap-3 rounded-lg bg-surface-muted px-4 py-3 font-semibold"><BiGridAlt aria-hidden="true" size={20} /> Dashboard</a>
        <a href="/tools/cover-generator/studio.html" className="flex items-center gap-3 rounded-lg px-4 py-3 font-semibold hover:bg-surface-muted"><BiImageAlt aria-hidden="true" size={20} /> Blog covers</a>
      </nav>
    </aside>
    <main className="w-full px-[5%] py-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 font-mono text-sm uppercase text-brand-primary">Ebaq Design</p>
        <h1>Studio dashboard</h1>
        <p className="mt-5 max-w-md text-md">Your tools, all in one place.</p>
        <section aria-labelledby="tools-heading" className="mt-12">
          <h2 id="tools-heading" className="heading-h5">Tools</h2>
          <div className="mt-6 max-w-lg rounded-xl border border-black/20 bg-white p-6 md:p-8">
            <BiImageAlt aria-hidden="true" size={28} />
            <h3 className="heading-h6 mt-6">Blog cover generator</h3>
            <p className="mt-3">Create and preview covers for your articles, then download them as WebP.</p>
            <Button asChild className="mt-6"><a href="/tools/cover-generator/studio.html">Open generator <BiRightArrowAlt aria-hidden="true" size={20} /></a></Button>
          </div>
        </section>
      </div>
    </main>
  </div>
)
