import { Helmet } from 'react-helmet-async'
import { useEffect } from 'react'
import { Footer15 } from './Footer15'
import { Navbar16 } from './Navbar16'

type Section = { heading: string; paragraphs?: string[]; items?: string[] }

function LegalPage({ title, updated, description, sections }: { title: string; updated: string; description: string; sections: Section[] }) {
  const path = title === 'Privacy Policy' ? '/privacy-policy' : '/fulfillment-policy'
  useEffect(() => {
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    const descriptionMeta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const previous = canonical?.href
    const previousDescription = descriptionMeta?.content
    if (canonical) canonical.href = `https://ebaqdesign.com${path}`
    if (descriptionMeta) descriptionMeta.content = description
    return () => {
      if (canonical && previous) canonical.href = previous
      if (descriptionMeta && previousDescription) descriptionMeta.content = previousDescription
    }
  }, [description, path])

  return (
    <div className="relative bg-white">
      <Helmet>
        <title>{title} | Ebaqdesign</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://ebaqdesign.com${path}`} />
      </Helmet>
      <Navbar16 />
      <main className="px-[5%] py-16 md:py-24 lg:py-28">
        <article className="container max-w-lg">
          <p className="mb-3 font-semibold text-brand-primary md:mb-4">Legal</p>
          <h1>{title}</h1>
          <p className="mt-5 text-sm text-black/60 md:mt-6">Last updated {updated}</p>
          <div className="mt-12 space-y-10 md:mt-16 md:space-y-12">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="heading-h3 mb-5">{section.heading}</h2>
                <div className="space-y-4 leading-[1.6] text-black/75">
                  {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.items && <ul className="list-disc space-y-2 pl-6">{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer15 logo={{ url: '/', src: '/ebaq-mark-one-color.svg', alt: 'Ebaq Design' }} />
    </div>
  )
}

export function PrivacyPolicyPage() {
  return <LegalPage title="Privacy Policy" updated="14th December 2019" description="Read the privacy policy for Ebaqdesign. Learn how we collect, use, and protect your personal information when you use our website and services." sections={[
    { heading: 'Overview', paragraphs: ['Ebaqdesign (“us”, “we”, or “our”) operates the ebaqdesign.com website (the “Service”).', 'This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.', 'We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy.'] },
    { heading: 'Information Collection And Use', paragraphs: ['We collect several different types of information for various purposes to provide and improve our Service to you.'], items: ['Email address', 'First name and last name', 'Phone number', 'Cookies and Usage Data'] },
    { heading: 'Usage Data', paragraphs: ['We may collect information about how the Service is accessed and used. This may include your IP address, browser type and version, pages visited, visit date and time, time spent on pages, unique device identifiers, and other diagnostic data.'] },
    { heading: 'Tracking & Cookies Data', paragraphs: ['We use cookies and similar tracking technologies to track activity on our Service and hold certain information. You can instruct your browser to refuse cookies or indicate when a cookie is being sent.'], items: ['Session cookies to operate the Service', 'Preference cookies to remember settings', 'Security cookies for security purposes'] },
    { heading: 'Use of Data', items: ['Provide and maintain the Service', 'Notify you about changes to the Service', 'Provide customer care and support', 'Analyze and improve the Service', 'Monitor usage', 'Detect, prevent, and address technical issues'] },
    { heading: 'Transfer And Disclosure Of Data', paragraphs: ['Your information may be transferred to and maintained on computers outside your jurisdiction. If you are outside the United States, please note that information may be transferred to and processed in the United States.', 'Ebaqdesign may disclose personal data to comply with a legal obligation, protect its rights or property, investigate possible wrongdoing, protect personal safety, or protect against legal liability.'] },
    { heading: 'Security And Service Providers', paragraphs: ['No method of internet transmission or electronic storage is completely secure. While we use commercially acceptable means to protect personal data, we cannot guarantee absolute security.', 'Third-party service providers may access personal data only to perform tasks on our behalf and are obligated not to disclose or use it for another purpose. Google Analytics may be used to monitor and analyze use of the Service.'] },
    { heading: 'Links And Children’s Privacy', paragraphs: ['We are not responsible for the privacy practices of third-party sites linked from the Service.', 'The Service does not address anyone under 18. We do not knowingly collect personally identifiable information from children.'] },
    { heading: 'Changes And Contact', paragraphs: ['We may update this Privacy Policy by posting a new version on this page.', 'Questions about this policy may be sent to arek@ebaqdesign.com.'] },
  ]} />
}

export function FulfillmentPolicyPage() {
  return <LegalPage title="Fulfillment Policy" updated="April 2nd 2024" description="Read the fulfillment policy for Ebaqdesign digital products and services. Information about delivery, refunds, and customer support." sections={[
    { heading: 'Overview', paragraphs: ['This fulfillment policy informs customers about the purchase, delivery, and terms of use associated with Ebaqdesign digital products. By purchasing from the site, you agree to these terms.'] },
    { heading: 'Digital Products and Delivery', items: ['All products offered on Ebaqdesign.com are digital downloadable PDFs. No physical products are included.', 'After successful payment through Stripe, customers are immediately provided a download link on the final Stripe purchase confirmation page.', 'Customers are responsible for ensuring their devices can open PDF files. Ebaqdesign LLC is not responsible for device or software compatibility issues.'] },
    { heading: 'Payment Processing', paragraphs: ['Payments are securely processed through Stripe. Stripe may require additional verification information according to its security policies.'] },
    { heading: 'No Returns or Refunds', items: ['Due to the immediate digital nature of the products, Ebaqdesign LLC does not offer returns or refunds once a product has been downloaded.', 'Review product descriptions carefully before purchase. Contact us immediately if you have trouble accessing or downloading a product.'] },
    { heading: 'Customer Support', paragraphs: ['For help with digital products, email arek@ebaqdesign.com or call +1 929-245-9811. We will respond as quickly as possible.'] },
    { heading: 'Policy Modifications', paragraphs: ['Ebaqdesign LLC may modify this policy at any time. Changes become effective when posted on the website. Please review this policy periodically for updates.'] },
  ]} />
}
