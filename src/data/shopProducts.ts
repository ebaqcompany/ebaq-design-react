export type ShopProduct = {
  slug: string
  title: string
  eyebrow: string
  description: string
  price: string
  oldPrice: string
  checkoutUrl: string
  image: string
  cardImage: string
  published?: boolean
  seo?: {
    title: string
    description: string
    image: string
    ogTitle: string
    ogDescription: string
  }
  problemEyebrow: string
  problemHeading: string
  benefits: string[]
  featureHeading: string
  featureDescription: string
  featureBullets: string[]
  featureImage?: string
  featureSecondaryImage?: string
  steps: string[]
  includedHeading: string
  includedDescription: string
  gallery: string[]
  note: string
  detailSections?: Array<{
    title: string
    description: string
    bullets: string[]
    image: string
    secondaryImage?: string
  }>
  story?: {
    eyebrow: string
    heading: string
    body: string
    byline: string
    profileImage?: string
    videos?: Array<{
      title: string
      wistiaId: string
    }>
  }
  storyAfterIncluded?: boolean
  audience?: {
    eyebrow: string
    heading: string
    groups: string[]
    items?: Array<{
      title: string
      description: string
    }>
    cards?: Array<{
      title: string
      description: string
      image: string
    }>
  }
  testimonials?: string[]
  hideBaseFeature?: boolean
  heroHeading?: string
  heroMediaContain?: boolean
  introTestimonial?: {
    quote: string
    avatar: string
    name: string
  }
  streamlinedContent?: boolean
  finalCta?: {
    heading: string
    description: string
  }
}

const asset = (fileName: string) => `/shop-assets/${fileName}`

export const shopTestimonials = [
  '66389dad0e0776e3d48c6d46_Testimonial-20.png', '66389c803322836f6a09442f_Testimonial-19.png', '608f4c828c3a8637839bf35b_Testimonial-5.jpg', '608f4585f17de87a16f5673d_Testimonial-17.jpg', '608f4584223a1487da45266d_Testimonial-14.jpg', '608f4aa317a30860dda8950e_Testimonial-15.jpg', '6638aa04b042a0edd18aa994_Testimonial-27.png', '6638a1932afc6a8848ea18ad_Testimonial-24.png', '6638aa5bd5399022902742e3_Testimonial-28.png', '6638ab658051fb23669ad3aa_Testimonial-29.png', '66389fc6b1d6847949c59d33_Testimonial-22.png', '608f4f843543acc4a51cd99e_Testimonial-16.jpg', '608f4584cd0e4d01b728cb23_Testimonial-12.jpg', '608f4b8d3583f5693943b83d_Testimonial-11.jpg', '608f458278749809dc6ac13f_Testimonial-8.jpg', '6638a082966b042051bb47d5_Testimonial-23.png', '608f4e943c3edd6a14292a12_Testimonial-1.jpg', '6638a9764056aefa35db9ebd_Testimonial-26.png', '6638a867d428ae078b73490e_Testimonial-25.png', '66389efaaa6657eb319d2eb7_Testimonial-21.png', '608f4d816c94552d12d55def_Testimonial-2.jpg', '608f500a3543ac7a901cdae1_Testimonial-6.jpg', '608f4581c11b33dce2f5c549_Testimonial-4.jpg', '608f4d28297f8d520bb958a9_Testimonial-7.jpg', '608f4cf34869626b50794259_Testimonial-3.jpg', '608f4e3c8c3a863f9f9bfe04_Testimonial-18.jpg',
].map(asset)

export const shopProducts: ShopProduct[] = [
  {
    slug: 'strategy-guide',
    title: 'The Brand Strategy Guide',
    eyebrow: 'The Brand Strategy Guide',
    heroHeading: 'The most practical guide to brand strategy',
    description: 'Everything you need to learn how to run brand strategy workshops like a pro. Go beyond just logo design. Learn how to build brands the strategic way. Turn ChatGPT into your virtual assistant.',
    price: '$199',
    oldPrice: '$348',
    checkoutUrl: 'https://buy.stripe.com/bIYcQl2Nq7QP6bubJe',
    image: asset('653816fae894d65b885be3e2_brand_strategy_kit_mockup_2_new_1200.jpg'),
    cardImage: asset('653816fae894d65b885be3e2_brand_strategy_kit_mockup_2_new_1200.jpg'),
    problemEyebrow: 'Start with strategy',
    problemHeading: 'Do clients force their ideas onto you?',
    benefits: ['Stop wasting time hoping that your clients will “get it”.', 'Make more money and be able to charge for thinking.', 'Avoid revisions later on, engage the client and nail it at first.', 'Gain prestige and get recognized by clients as a true expert.', 'Rest easy knowing you are equipped with a proven framework.'],
    featureHeading: 'Clear guidance for facilitators',
    featureDescription: 'The facilitator’s guide gives you step-by-step guidance and a script for twelve branding exercises, with resources and real examples for every stage.',
    featureBullets: ['Use the script to guide your participants.', 'Find extra resources for each exercise.', 'Get inspired by real-life examples.'],
    featureImage: 'https://cdn.prod.website-files.com/5de2db6d3719a1a1cee44545/639650f339abd529d50bd001_brand_strategy_script_mockup.jpg',
    steps: ['Run a workshop with your client. Collect ideas and build trust.', 'Write a professional brief to set the project up for success.', 'Design relevant concepts and sell the idea without selling it.'],
    includedHeading: 'Clear guidance, editable worksheets and a ready-to-use presentation',
    includedDescription: 'Use the original workshop files in person or online, customize the templates to your agency, and access the latest material through Branding.study.',
    gallery: [asset('653816fae894d65b885be3e2_brand_strategy_kit_mockup_2_new_1200.jpg'), asset('670ed843ae3385fa3722a322_branding_study_screenshot.jpg'), asset('6686bf1d6b6ffa4fabbfbad5_brand-strategy-worksheets.jpg')],
    note: 'You’re buying downloadable PDF with video tutorials. Buy once, get free updates for life.',
    story: {
      eyebrow: 'Become a brand strategist',
      heading: 'Master the Art of Brand Strategy',
      body: 'Hi! My name is Arek.\n\nI’m the author of the Brand Strategy Kit 2.0\n\nI went from working at some of the top design agencies to launching my own branding firm.\n\nDuring my career, I’ve read countless books, interviewed many experts and studied some of the most popular courses on brand strategy development.\n\nIn the Brand Strategy Kit 2.0, I combine some of the best practices I’ve learned and developed over the years into one comprehensive framework.\n\nUnlike many other “course creators”, I actually use these tools every single day with my clients at Ebaqdesign LLC\n\nNow, I share my tools, tips & tricks to help you succeed as a creative professional.\n\nThis is my story.',
      byline: 'Arek Dvornechuck',
      profileImage: 'https://cdn.prod.website-files.com/5de2db6d3719a1a1cee44545/5de8003e154e7e4d116936f5_arek-dvornechuck-profile-pic-320.jpg',
      videos: [
        { title: 'Run in-person workshops', wistiaId: 'b1vgsx7v50' },
        { title: 'Run workshops remotely', wistiaId: '4k3u5z7j7k' },
      ],
    },
    detailSections: [
      { title: 'Worksheets in various formats', description: 'The Strategy Worksheets come in a variety of file formats, use them both: in-person or online. Add your logo, change fonts and colors to match your agency branding and voila!', bullets: ['Use worksheets with your branding.', 'Open in InDesign, Illustrator or Photoshop.', 'Alternatively use presentation software.'], image: asset('6686bf1d6b6ffa4fabbfbad5_brand-strategy-worksheets.jpg') },
      { title: 'Ready to use presentation', description: 'The Strategy Brief is a fully editable presentation deck to help you deliver brand strategy like a pro. Customize the template to match your agency branding.', bullets: ['Deliver your strategy work like a pro.', 'Make it easy for your client to use.', 'Set the stage for next phase: design.'], image: asset('637faead19d13650d41267d1_brand_strategy_brief_template_mockup.jpg') },
      { title: 'Access to Branding.study', description: 'Get lifetime access to our brand new platform to access the course material from any device, always up to date. Simply sign in with Google to watch videos, browse the guide, download templates and more.', bullets: ['Access the course material online, anytime.', 'Download latest templates and resources.', 'Get access to free updates for life!'], image: asset('670ed843ae3385fa3722a322_branding_study_screenshot.jpg') },
      { title: 'Custom GPT Assistant', description: 'Use our custom GPT, Branding Expert, that we trained on our data. Turn ChatGPT into your personal all-knowing branding expert. Open AI subscription required.', bullets: ['Turn ChatGPT into your branding expert.', 'Upload your docs & get custom ideas.', 'Get answers to all questions in seconds.'], image: asset('654ebb2591ff59529947f460_brand_strategy_guide_GPT_1200.jpg') },
      { title: 'Book of Prompts for ChatGPT', description: 'Get a set of elaborate prompts to help you turn your rough ideas into great insights. Works with ChatGPT, Claude, BingChat & other AI chatbots.', bullets: ['Leverage ChatGPT for idea generation.', 'Our prompts + your data = custom results.', 'Turn any AI chatbot into your assistant!'], image: asset('650225b6ceffc2537c031907_book_of_prompts.jpg') },
    ],
    audience: {
      eyebrow: 'Build brands faster',
      heading: 'For anyone working on branding projects',
      groups: ['Logo Designers', 'Studio Owners', 'Freelancers', 'Brand Strategists', 'Creative Directors', 'Entrepreneurs', 'Marketers', 'Web Designers', 'Students'],
      items: [
        { title: 'Logo Designers', description: 'Want to beyond just logo design? Learn how to deliver complete branding work.' },
        { title: 'Studio Owners', description: 'Establish your processes and templates to owe clients, every single time.' },
        { title: 'Freelancers', description: 'Attract better clients with bigger budget. Land the highest paying gigs.' },
        { title: 'Brand Strategists', description: 'Turn yourself into a brand strategist and charge for strategy workshops.' },
        { title: 'Creative Directors', description: 'Have your in-house team work efficiently on your next branding project.' },
        { title: 'Entrepreneurs', description: 'Launching a business? Learn how to build a strong brand, step-by-step.' },
        { title: 'Marketers', description: 'Feel safe and strong about your compaigns. Convert better with good branding.' },
        { title: 'Web Designers', description: 'Add branding to your web design offering and deliver complete projects.' },
        { title: 'Students', description: 'Have your marketing campaigns covert better with good branding.' },
      ],
    },
    testimonials: shopTestimonials,
    finalCta: {
      heading: 'All you need to build brands, the strategic way',
      description: 'Go beyond just logo design and get paid for creative thinking. Get recognized as an expert and land high paying jobs with ease.',
    },
  },
  {
    slug: 'naming-guide', title: 'The Brand Naming Guide', eyebrow: 'The Brand Naming Guide', heroHeading: 'A proven step-by-step process to brand naming', description: 'Create powerful names that attract customers and boost sales.', price: '$149', oldPrice: '$249', checkoutUrl: 'https://buy.stripe.com/7sI4jPew82wv9nG14y',
    image: asset('650f466d0ef65200ed2e70a9_brand_naming_guide_1600px.jpg'), cardImage: asset('650f62fa0a24b85c4068fab8_brand_naming_guide_900px.jpg'),
    problemEyebrow: 'Naming is hard', problemHeading: 'Do you struggle with naming your brand?',
    benefits: ['Stop wasting time trying to find a name out of thin air.', 'Save money by doing it yourself, naming is fundamental.', 'Avoid renaming later on, and get it right the first time.', 'Take the first step toward starting your dream business.', 'Brainstorm unique company names with our guided process.', 'Rest easy knowing that your name is protected and secure.'],
    featureHeading: 'Master the art of naming', featureDescription: 'Use a structured process to generate, filter and evaluate powerful brand names rather than waiting for inspiration.',
    featureBullets: ['Become a true naming expert.', 'Use lucrative brainstorming exercises.', 'Evaluate brand names like a pro.'],
    steps: ['Define what the name needs to communicate.', 'Generate names with proven creative exercises.', 'Evaluate, shortlist and protect the strongest direction.'],
    includedHeading: 'A complete naming process', includedDescription: 'Follow the guide, worksheets and video tutorials from initial strategy through final evaluation.',
    gallery: [asset('5e2a107f76f9033468de7616_naming-guide-templates.jpg'), asset('5f1eda71882d3e0a526cfdac_brand-naming-guide21.png'), asset('5f1eda8810347305fbc51c31_brand-naming-guide24.png')], note: 'You’re buying downloadable PDF with video tutorials. Buy once, get free updates for life.',
    story: { eyebrow: 'Become a naming expert', heading: 'Master the art of Naming', body: 'Hi! My name is Arek.\n\nI’m the author of this guide and I went from working at top branding agencies to launching my own studio.\n\nNow I share some of the top frameworks to help you succeed.\n\nThis is my story.', byline: 'Arek Dvornechuck', profileImage: 'https://cdn.prod.website-files.com/5de2db6d3719a1a1cee44545/5de8003e154e7e4d116936f5_arek-dvornechuck-profile-pic-320.jpg', videos: [{ title: 'The Brand Naming Guide', wistiaId: '2jo156u0ei' }] },
    detailSections: [{ title: 'Why do I need it?', description: 'The main reasons why naming is so hard is that we don’t have the right tools or processes.', bullets: ['Identify the best strategy for your name.', 'Generate name ideas with proven exercises.', 'Evaluate your names and make the final selection.'], image: asset('5f1ee61006bdccce29b9fa06_naming-guide-mockup1.jpg') }],
    audience: { eyebrow: 'Build brands faster', heading: 'For anyone working on naming projects', groups: ['Entrepreneurs', 'Studio Owners', 'Freelancers', 'Brand Strategists', 'Creative Directors', 'Copywriters'] },
    hideBaseFeature: true,
    finalCta: {
      heading: 'Grab our proven framework to naming a brand',
      description: 'Get clarity and confidence with the ideal approach to naming a brand.',
    },
  },
  {
    slug: 'proposal-template', title: 'The Design Proposal Template', eyebrow: 'The easiest way to craft effective proposals', description: 'An easy-to-use template for branding and rebranding projects with real text to help you create winning proposals fast and easy.', price: '$29', oldPrice: '$49', checkoutUrl: 'https://buy.stripe.com/6oEeYtco02wv57q28e',
    image: asset('615f8f600268224cbf3e92ce_Ebaqdesign_Design_Proposal_Cover2.jpg'), cardImage: asset('61608958195d5b37f2c2db46_ebaqdesign-proposal-template-new9.png'),
    problemEyebrow: 'Organize your process', problemHeading: 'Everything you need to craft proposals that win', benefits: ['Stop guessing—know how to propose your services.', 'Set the standard—buy it once, use it with every client.', 'Win the job—don’t lose clients to your competitors.', 'Save time with a clear process for closing leads.', 'Raise prices and attract bigger clients.'],
    featureHeading: 'Create winning proposals', featureDescription: 'A designer’s worst nightmare is hearing crickets after sending a proposal. Use a real-life example from an actual project.', featureBullets: ['Stylize the template to your liking.', 'Propose design services like a pro.', 'Get your proposals accepted fast.'],
    steps: ['Download and open the template in InDesign.', 'Swap the logo and customize it to match your brand.', 'Send it to your client and win the job fast and easy.'], includedHeading: '20+ page template', includedDescription: 'A proven structure with real text from an actual proposal. Update the branding, company and client details and you are ready to present.',
    gallery: [asset('61608958195d5b37f2c2db46_ebaqdesign-proposal-template-new9.png'), asset('615f9a1a979af7f3688395d3_ebaqdesign-proposal-template-new4.png')], note: 'You’re buying a downloadable InDesign file with free updates for life.',
    detailSections: [
      { title: 'Win better clients', description: 'Make your clients see you as an expert who’s qualified for the job. Stop making guesses and use a template that actually works.', bullets: ['Set yourself apart from cheap designers.', 'Make clients take you more seriously.', 'Respond to RFPs & win new business.'], image: asset('61608958195d5b37f2c2db46_ebaqdesign-proposal-template-new9.png') },
      { title: 'Make more money', description: 'Haggling sucks—it’s very stressful and draining. Prevent it all together and know how to charge more with a proven proposal.', bullets: ['Structure your price in a way that sells.', 'Close bigger leads with higher budget.', 'Negotiate less and win more projects.'], image: asset('615f9a1a979af7f3688395d3_ebaqdesign-proposal-template-new4.png') },
    ],
    story: { eyebrow: 'Built from real client work', heading: 'The Design Proposal Template', body: 'The Design Proposal Template is the result of 15 years experience and hundreds of clients I won as a designer, from being a freelancer to closing leads here at Ebaqdesign.', byline: '— Arek Dvornechuck, Branding Expert' },
    storyAfterIncluded: true,
    audience: { eyebrow: 'Who this is for', heading: 'For anyone who wants to close more leads', groups: ['Freelancers', 'Logo Designers', 'Graphic Designers', 'Studio Owners', 'Creative Directors', 'Design Students'] },
  },
  {
    slug: 'guidelines-kit', title: 'The Brand Guidelines Kit', eyebrow: 'The Brand Guidelines Kit', heroHeading: 'A Comprehensive Brand Guidelines Template', description: 'An easy-to-use, yet very comprehensive brand guidelines template with a real example included, to help you deliver your branding projects like a pro!', price: '$79', oldPrice: '$99', checkoutUrl: 'https://buy.stripe.com/7sI17D1Jmfjh9nGbIN',
    image: asset('651323199967bd11325f6b09_brand-guidelines-template-by-ebaqdesign_1600.jpg'), cardImage: asset('651322cd2b8bfbe336dd0961_brand-guidelines-template-by-ebaqdesign_900.jpg'),
    problemEyebrow: 'Organize your process', problemHeading: 'Everything you need to deliver branding work', benefits: ['Don’t waste time—It takes weeks to create a style guide.', 'Set the standard—Buy it once, use it in every project.', 'Show expertise—Deliver your design work like a pro.', 'Gain prestige—Provide more value to your clients.', 'Raise prices—Attract bigger project & high paying jobs.', 'Rest easy—Get a guarantee that your work looks good.'],
    featureHeading: 'Present work professionally', featureDescription: 'Clients often don’t understand the “design work” that you do, but they will evaluate the quality of your services based on your presentation.', featureBullets: ['Present branding projects like a pro.', 'Feel confident about your work.', 'Get approvals faster.'],
    featureImage: asset('brand-guidelines-template-by-ebaqdesign_apple_1200.jpg'),
    steps: ['Download and open the brand guidelines kit.', 'Freely customize the template in InDesign.', 'Present it to your client and get approval fast.'], includedHeading: '70+ page template', includedDescription: 'A complete structure covering strategy, architecture, logo, colors, typography, patterns, icons, imagery, illustration and composition.',
    gallery: [asset('60a1c56b07330a91a2b098ae_Brand_Guidelines_Template70.png'), asset('60a15d20ddb30ae758cea471_Brand_Guidelines_Template39.png'), asset('60a2ee03147c507195f123b2_Medihuanna Brand Guidelines11.png')], note: 'You’re buying a downloadable PDF. Buy once, get free updates for life.',
    detailSections: [
      { title: 'Make more money', description: 'Make your clients see the value of your work. Rather than just sending logo files, create more impact with a complete style guide.', bullets: ['Set yourself apart from other designers.', 'Make clients see the value of design.', 'Attract better paid jobs.'], image: asset('6513265e6cc0a408d07fe7b6_brand-guidelines-template-by-ebaqdesign_book_1200.jpg') },
      { title: 'Build a great portfolio', description: 'Every designer’s worst nightmare is to see their work in the wild, poorly executed. Ensure consistency across all touch-points with a professional style guide. Get three real examples for your inspiration.', bullets: ['Ensure your work is being used correctly.', 'Build a great portfolio & gain prestige.', 'Be proud of your work.'], image: asset('650499a25c7852dcf45cdd56_brand-guidelines-examples.jpg') },
    ],
    story: { eyebrow: 'Built from real client work', heading: 'The Brand Guidelines Kit', body: 'The Brand Guidelines Kit is the result of my 15+ years of experience as an identity designer, from being a freelancer to running projects here at Ebaqdesign.', byline: '— Arek Dvornechuck, Branding Expert', profileImage: 'https://cdn.prod.website-files.com/5de2db6d3719a1a1cee44545/5de8003e154e7e4d116936f5_arek-dvornechuck-profile-pic-320.jpg' },
    storyAfterIncluded: true,
    audience: { eyebrow: 'Deliver outstanding work', heading: 'For anyone working with, for, or on brands', groups: ['Brand Designers', 'Entrepreneurs', 'Marketers', 'Brand Strategists', 'Creative Directors', 'Consultants'] },
    finalCta: {
      heading: 'Buy it once, use it for every project',
      description: 'The same style guide is being used with real clients at Ebaqdesign. It is all you need in order to deliver high quality work.',
    },
  },
  {
    slug: 'brand-master', title: 'The Brand Master Bundle', eyebrow: 'The Brand Master Bundle', heroHeading: 'Everything you need to become a brand master', heroMediaContain: true, description: 'From strategy, to naming, to storytelling. Get all the essential branding courses bundled together and save over 50%.', price: '$497', oldPrice: '$846', checkoutUrl: 'https://buy.stripe.com/14kdUpds44ED0RacNh',
    image: asset('655a5d7cd628c3fb64e205f5_brand_master_bundle_900px.png'), cardImage: asset('650e0356e719f4ef949e7d3e_brand_master_bundle_1200px.jpg'),
    problemEyebrow: 'Three essential courses', problemHeading: 'Make a big leap and save money at the same time', benefits: ['Turn yourself into a brand strategist.', 'Brainstorm and evaluate brand names like a pro.', 'Create clear and compelling messages.', 'Align everyone around the same vision.', 'Build a strong brand with substance.'],
    featureHeading: 'Build brands faster', featureDescription: 'Essential courses to help agency owners, consultants, business owners and teams build brands like professionals.', featureBullets: ['The Brand Naming Guide', 'The Brand Strategy Guide', 'The Brand Story Guide'],
    steps: ['Start with strategy and align the vision.', 'Create a distinctive, protectable name.', 'Turn the strategy into a clear brand story.'], includedHeading: 'Strategy, naming and storytelling', includedDescription: 'Get the three core courses together with their guides, exercises, editable materials and video tutorials.',
    gallery: [asset('60184bab574fe60bb11cbbf0_brand_masters_bundle_hands_1200.jpg'), asset('653816fae894d65b885be3e2_brand_strategy_kit_mockup_2_new_1200.jpg'), asset('650f024a4a76afdca28ea21e_brand_story_guide_1600.jpg')], note: 'You’re buying downloadable PDFs with video tutorials. Buy once, get free updates for life.',
    story: { eyebrow: 'Three essential courses', heading: 'Make a big leap and save money at the same time', body: 'I’ve bundled all of my three essential courses together to help you make a big leap and save money at the same time.', byline: '— Arek Dvornechuck, Founder' },
    introTestimonial: {
      quote: '“I’ve bundled all of my three essential courses together to help you make a big leap and save money at the same time”',
      avatar: '/arek-pic-pro.jpg',
      name: 'Arek Dvornechuck',
    },
    detailSections: [
      { title: 'The Brand Naming Guide', description: 'Create powerful names that attract customers and boost sales.', bullets: ['Become a true naming expert.', 'Use lucrative brainstorming exercises.', 'Evaluate brand names like a pro.'], image: asset('650f62fa0a24b85c4068fab8_brand_naming_guide_900px.jpg') },
      { title: 'The Brand Strategy Guide', description: 'Go beyond logo design and learn how to build brands the strategic way.', bullets: ['Turn yourself into a brand strategist.', 'Align everyone on the same vision.', 'Build a strong brand with substance.'], image: asset('650241e6ad4667136b699676_brand_strategy_kit_mockup_2_new.jpg') },
      { title: 'The Brand Story Guide', description: 'Create clear and compelling messages, without coming off as a pushy salesman.', bullets: ['Turn yourself into a great storyteller.', 'Marry good design with great copy.', 'Establish your unique brand voice.'], image: asset('650f0274db8fd48fc7921c6b_brand_story_guide_900.jpg') },
    ],
    audience: {
      eyebrow: 'Build brands faster',
      heading: 'Essential courses to help you build brands like a pro',
      groups: ['For agency owners and consultants.', 'For business owners and teams.'],
      cards: [
        {
          title: 'For agency owners and consultants',
          description: 'Get everything you need to win bigger clients and run your own agency like a pro.',
          image: asset('601890882305aa6898e70461_consultants.png'),
        },
        {
          title: 'For business owners and teams',
          description: 'Get everything you need to build your brand in-house faster and easier than ever.',
          image: asset('6018910c5f7f2c263c5b253f_founder.png'),
        },
      ],
    },
    streamlinedContent: true,
    testimonials: shopTestimonials,
    hideBaseFeature: true,
    finalCta: {
      heading: 'Master the art of brand building',
      description: 'Use proven frameworks, tools and techniques to run branding projects with ease.',
    },
  },
  {
    slug: 'storytelling-guide', title: 'The Brand Story Guide', eyebrow: 'The Brand Story Guide', heroHeading: 'A clear method to get your message right', description: 'Create clear and compelling messages, without coming off as a pushy salesman.', price: '$149', oldPrice: '$249', checkoutUrl: 'https://buy.stripe.com/bIY3fL5ZC2wvbvO28c',
    image: asset('650f024a4a76afdca28ea21e_brand_story_guide_1600.jpg'), cardImage: asset('650f0274db8fd48fc7921c6b_brand_story_guide_900.jpg'),
    problemEyebrow: 'Clarify your message', problemHeading: 'Do you struggle with writing a great copy?', benefits: ['Is explaining what you do complicated?', 'Did your last marketing effort flop?', 'Is it time to revamp your website?', 'You don’t have to come off as a pushy salesman to sell.', 'Use a proven filter to clarify your marketing material.', 'Create clear and compelling messages.'],
    featureHeading: 'Master the art of storytelling', featureDescription: 'Turn discovery into key messaging blocks and get client approval before design begins.', featureBullets: ['Turn yourself into a great storyteller.', 'Marry good design with great copy.', 'Establish a unique brand voice.'],
    steps: ['Run a discovery workshop.', 'Create the key messaging blocks.', 'Get the client’s approval fast.'], includedHeading: 'Guidebook, prompts and tutorials', includedDescription: 'A practical guide packed with tools and techniques, a Book of Prompts for AI chatbots, and eight step-by-step video tutorials.',
    gallery: [asset('650f0274db8fd48fc7921c6b_brand_story_guide_900.jpg'), asset('5df562fda58b621452ce0f39_ebaqdesign-storytelling8.png'), asset('60036eddfacbc1a8ecacf4e4_ebaqdesign-storytelling3.png')], note: 'You’re buying downloadable PDF with video tutorials. Buy once, get free updates for life.',
    story: { eyebrow: 'Become a storyteller', heading: 'Master the art of Storytelling', body: 'Hi! My name is Arek.\n\nI’m the author of this guide and I went from working at top branding agencies to launching my own studio.\n\nNow I share some of the top frameworks to help you succeed.\n\nThis is my story.', byline: 'Arek Dvornechuck', profileImage: 'https://cdn.prod.website-files.com/5de2db6d3719a1a1cee44545/5de8003e154e7e4d116936f5_arek-dvornechuck-profile-pic-320.jpg', videos: [{ title: 'The Brand Story Guide', wistiaId: 'm1y20zuis8' }] },
    detailSections: [{ title: 'Why do I need this guide?', description: 'When you onboard a new client and jump straight into design, you often find yourself in endless rounds of revisions and loss of control in your process.', bullets: ['Turn yourself into a great storyteller.', 'Go beyond design and attract bigger clients.', 'Feel safe and strong about your process.'], image: asset('5df565dd6a31d5e06d3ac869_storytelling-guide-pre-macbook.jpg') }],
    audience: { eyebrow: 'Write copy faster', heading: 'For anyone working on marketing projects', groups: ['Graphic Designers', 'Studio Owners', 'Freelancers', 'Brand Strategists', 'Creative Directors', 'Storytellers', 'Marketers', 'Web Designers', 'Copywriters'] },
    hideBaseFeature: true,
    finalCta: {
      heading: "Don't be just a web designer. Level up today!",
      description: 'Go beyond design and get higher paying clients. Be recognized as trusted resource with a proven process that brings results.',
    },
  },
  {
    slug: 'creative-suite', title: 'The Creative Suite Bundle', eyebrow: 'The Creative Suite Bundle', heroHeading: 'Elevate your creative business with ease', description: 'Get the edge in every presentation! Elevate your projects with our trio of sleek, professional templates. Craft winning proposals, write better creative briefs, and showcase your designs like a pro.', price: '$99', oldPrice: '$147', checkoutUrl: 'https://buy.stripe.com/bIY8A573G5IH43m28J',
    image: asset('65b31432fe4c5fe703a1291f_Brand-Designer-Templates.jpg'), cardImage: asset('65b31432fe4c5fe703a1291f_Brand-Designer-Templates.jpg'),
    problemEyebrow: 'Organize your process', problemHeading: 'Everything you need to grow your branding biz', benefits: ['Stop guessing—Know how to sell your branding services.', 'Set the standard—Buy once, use them with every client.', "Win more jobs—Don't loose clients to your competitors.", 'Save time—Have a clear way of presenting your creative work.', 'Raise prices—Attract bigger clients with high paying jobs.', 'Rest easy—Ensure that your creative business looks good.'],
    featureHeading: 'Create winning proposals', featureDescription: "A designer's worst nightmare is to hear crickets after sending a proposal. Use our proven template to make your clients see you as an expert who's qualified for the job.", featureBullets: ['Stylize the template to your liking.', 'Propose design services like a pro.', 'Respond to RFPs & win new business.'],
    featureImage: 'https://cdn.prod.website-files.com/5de2db6d3719a1a1cee44545/65b3149dc1dd77682db8ce8f_Project-Proposal-Template.jpg',
    featureSecondaryImage: 'https://cdn.prod.website-files.com/5de2db6d3719a1a1cee44545/66a1303d0a47114d87e7aa33_Proposal_Vertical_Mockup.jpg',
    steps: ['Download and open the templates in InDesign or Illustrator.', 'Swap the logo, fonts and colors to match your brand.', 'Streamline your process and make yourself look professional.'], includedHeading: "What's Included", includedDescription: 'Three proven templates for winning proposals, clearer briefs and professional brand presentations.',
    gallery: [asset('65c7e4c5060c9cf3c583ce3d_creative-suite-bundle-editable-template.jpg'), asset('65c69ec3b1e09c7a9dbb6abb_Creative_Brief_new22.png'), asset('65c7bf54bce6e7892d128558_Brand_Presentation_new42.png')], note: 'You’re buying downloadable PDFs. Buy once, get free updates for life.',
    detailSections: [
      { title: 'Write better creative briefs', description: 'The next step to a memorable client engagement is a clear and concise creative brief. Our template ensures your ideas resonate and your direction is understood.', bullets: ['Tailor the brief to your project’s unique flair.', 'Make clients take you more seriously.', 'Fast-track your process from brief to approval.'], image: asset('65b3158f50e10f26debb8723_Creative-Brief-Template.jpg'), secondaryImage: 'https://cdn.prod.website-files.com/5de2db6d3719a1a1cee44545/66a13314965319fff506b9bb_Brief_Vertical_Mockup.jpg' },
      { title: 'Present designs like a pro', description: 'Ease the stress of presentations with our expert template. Ensure your concepts are understood and make every design shine. Present like a pro, every time.', bullets: ['Present your projects in a way that sells.', 'Ensure clear understanding of concepts.', 'Secure client engagement and approval.'], image: 'https://cdn.prod.website-files.com/5de2db6d3719a1a1cee44545/65c7f646f9992183ab033e4d_brand-presentation-template-preview.jpg', secondaryImage: asset('66a1348065c338227f177ca3_Pres_Vertical_Mockup.jpg') },
    ],
    story: { eyebrow: 'Built from real client work', heading: 'The Creative Suite Bundle', body: 'The Creative Suite Bundle is the result of nearly 20 years experience and hundreds of clients I won as a designer, from working at top agencies to freelancing at Ebaqdesign.', byline: '— Arek Dvornechuck, Branding Expert' },
    storyAfterIncluded: true,
    audience: { eyebrow: 'Who this is for', heading: 'For anyone aiming to captivate clients', groups: ['Freelancers', 'Logo Designers', 'Graphic Designers', 'Studio Owners', 'Creative Directors', 'Design Students'], items: [
      { title: 'Freelancers', description: 'Maximize your project pitches with tools that showcase your versatility and skill.' },
      { title: 'Logo Designers', description: 'Present your logo concepts in a light that emphasizes their creativity and innovation.' },
      { title: 'Graphic Designers', description: 'Elevate your designs with presentations that speak to your artistic prowess effectively.' },
      { title: 'Studio Owners', description: "Win more jobs, ensuring every client pitch reflects your studio's excellence." },
      { title: 'Creative Directors', description: 'Streamline your presentations with templates that speak to your vision and leadership.' },
      { title: 'Design Students', description: 'Build a solid foundation with templates that set you apart in the creative world.' },
    ] },
    finalCta: {
      heading: 'Elevate your creative career',
      description: 'Advance your creative career with our expert templates. The same templates are being used with real clients at Ebaqdesign. Save with our essential trio bundle. Get yours now!',
    },
  },
  {
    slug: 'rich-designer', title: 'The Rich Designer Book', eyebrow: 'Transform your dreams into reality.', description: 'This book is your roadmap to success—an inspiring journey from creative struggle to career success, from client acquisition to mastering identity design.', price: '$29', oldPrice: '$49', checkoutUrl: 'https://buy.stripe.com/5kA9E9co09YXczS4gQ', published: false,
    image: asset('6599b3bb8190fe5df34aba06_poor-designer-rich-desginer_1200x800.jpg'), cardImage: asset('6599b3bb8190fe5df34aba06_poor-designer-rich-desginer_1200x800.jpg'),
    problemEyebrow: 'Navigate to success', problemHeading: 'Struggling to navigate the branding industry?', benefits: ['Learn how to get a steady inflow of clients.', 'Get endless ideas and thrive under pressure.', 'Learn how to handle client criticism.', 'Build technical skills with proven frameworks.', 'Sell clients on the idea and reduce revisions.'],
    featureHeading: 'A Designer’s Path to Prosperity', featureDescription: 'A practical story and roadmap built from nearly twenty years in design, top agency experience and more than one hundred expert interviews.', featureBullets: ['Elevate your technical prowess.', 'Discover industry frameworks and tricks.', 'Craft an authentic personal brand.'],
    steps: ['Reflect on career-changing ideas from the book.', 'Enhance your skills and craft an impressive portfolio.', 'Build a transformed, successful design career.'], includedHeading: 'Book and video course', includedDescription: 'A downloadable book paired with a 60-minute course covering the skills, business systems and mindset behind a stronger creative career.',
    gallery: [asset('6599b3bb8190fe5df34aba06_poor-designer-rich-desginer_1200x800.jpg'), asset('65a0a3e44746085b3772964e_poor-designer-photos.jpg'), asset('65a0a48469265bf122c92f52_rich-designer-photos.jpg')], note: 'You’re buying a downloadable PDF with video tutorials.',
    story: { eyebrow: 'From rags to riches', heading: 'A Designer’s Path to Prosperity', body: 'I went from struggling with no clients and eviction threats looming over my head to moving to a luxurious apartment and living the life of my sweetest dreams. Along the way, I juggled multiple 9-5 jobs, freelanced for top branding firms, and gained wisdom from countless books and over 100 expert interviews on my podcast. In my new book I share all the tools and tricks I learned along the way, so that you can excel as a creative much faster. This is my story.', byline: 'Arek Dvornechuck' },
    detailSections: [{ title: 'Design the life you deserve', description: 'Step into a journey of success and fulfillment. Establish your expertise, attract bigger clients, and build a career you deserve. Designers often focus on crafting for others, but forget to craft their own life too.', bullets: ['Stand out and attract top clients.', 'Turn your professional goals into reality.', 'Craft an authentic personal brand.'], image: asset('65a023d3fcc781c366425663_2poor-designer-rich-desginer_1200x800.jpg') }],
    audience: { eyebrow: 'Who is this for', heading: 'A vital guide for the journey of every branding expert', groups: ['For aspiring logo designers.', 'For transitioning creatives.'] },
  },
  {
    slug: 'brand-archetypes', title: 'The Brand Archetypes Course', eyebrow: 'The Brand Archetypes Course', heroHeading: 'A comprehensive class on brand archetypes', description: 'Develop an authentic brand personality with a scientific framework based on your audience. Discover how to create a strong and relatable brand with our new AI-generated (but human curated) course about archetypes.', price: '$29', oldPrice: '$49', checkoutUrl: 'https://buy.stripe.com/14kbMh3Rub318jC7t0',
    image: asset('6468e07f864ec9991b60ba9a_mastering_brand_archtypes_cover_square.jpg'), cardImage: asset('6468ded18426474d8031ef48_mastering_brand_archtypes_online_course.jpg'),
    problemEyebrow: 'Brand with archetypes', problemHeading: 'Infuse human qualities into your business', benefits: ['Establish a deep emotional bond with your audience.', 'Set yourself apart from competitors.', 'Carve out an identifiable market position.', 'Shape a distinctive brand personality.', 'Create a consistent tone, language and attitude.'],
    featureHeading: 'A deep dive into the 12 Core Archetypes', featureDescription: 'Discover the universal patterns of behavior that represent distinct personality traits and learn how to use them to differentiate a brand.', featureBullets: ['Explore Spirituality', 'Leave Legacy', 'Pursue Connection', 'Provide Structure'],
    steps: ['Understand all twelve archetypes.', 'Identify the archetype that fits your audience.', 'Build a consistent brand experience around it.'], includedHeading: '12 videos and a 300+ page deck', includedDescription: 'An hour-long course covering each archetype, with examples, characteristics and a visual presentation deck of key takeaways.',
    gallery: [asset('6468e07f864ec9991b60ba9a_mastering_brand_archtypes_cover_square.jpg'), asset('64683501864ec9991bec1a76_brand archetypes 12 gif.gif')], note: 'You’re buying downloadable PDFs. Buy once, get free updates for life.',
    story: { eyebrow: 'Built with the latest AI tools', heading: 'A deep dive into the 12 Core Archetypes', body: 'I’ve used the latest AI tools to create a set of virtual avatars that embody the 12 core archetypes. This enabled me to develop this easy-to-understand and enjoyable-to-watch online course.', byline: '— Arek Dvornechuck, Founder' },
    detailSections: [
      { title: 'Part 1: Explore Spirituality', description: 'In the first part Explore Spirituality, you’ll learn how to infuse your brand with profound meaning and purpose, forging a deep spiritual connection with your audience.', bullets: ['Evoke nostalgia, optimism, and simplicity with the Innocent archetype.', 'Inspire wisdom, knowledge, and reflection with the Sage archetype.', 'Promote adventure, individuality, and freedom with the Explorer archetype.'], image: asset('644f3ee0b0b9200bb7fc0f93_explore_spirituality.jpg') },
      { title: 'Part 2: Leave Legacy', description: 'In the 2nd part, Leave Legacy, you’ll learn how to create a brand that leaves an indelible mark, provokes change, and leads the way to a brighter future.', bullets: ['Provoke rebellion, liberation, and disruption with the Outlaw archetype.', 'Unleash transformation, innovation, and mysticism with the Magician archetype.', 'Ignite courage, determination, and resilience with the Hero archetype.'], image: asset('644f3fe65dc7044b7edba45e_leave_legacy.jpg') },
      { title: 'Part 3: Pursue Connection', description: 'In the 3rd part, Pursue Connection, you’ll uncover the secrets to creating emotional resonance, fostering deep connections that transcend mere transactions.', bullets: ['Reflect authenticity, belonging, and reliability with the Everyman archetype.', 'Promote joy, humor, and lightheartedness with the Jester archetype.', 'Evoke passion, sensuality, and intimacy with the Lover archetype.'], image: asset('644f40adbe86deabfe6f0081_pursue-connection.jpg') },
      { title: 'Part 4: Provide Structure', description: 'In the 4th part, Provide Structure, you’ll master the art of building a strong foundation, earning trust, and becoming a beacon of stability and innovation.', bullets: ['Inspire compassion, generosity, and nurturing with the Caregiver archetype.', 'Reflect authority, control, and leadership with the Ruler archetype.', 'Unleash imagination, creativity & artistic expression with the Creator archetype.'], image: asset('644f414d99646404cff961fc_provide_structure.jpg') },
    ],
    audience: { eyebrow: 'Build brands smarter', heading: 'An essential course to help you build a strong & relatable brand', groups: ['For brand strategists and consultants.', 'For business owners and entrepreneurs.'], cards: [
      { title: 'For brand strategists and consultants', description: 'Learn how to design consistent and creative brand strategies using the archetype-based framework.', image: '/shop-assets/legacy-included/brand-archetypes-consultants.png' },
      { title: 'For business owners and entrepreneurs', description: 'Identify the archetype(s) that best suits your business and develop a unique brand identity.', image: '/shop-assets/legacy-included/brand-archetypes-founder.png' },
    ] },
    hideBaseFeature: true,
    finalCta: {
      heading: 'Master the power of brand archetypes',
      description: 'Everything you ever wanted to know about brand archetypes condensed into an easy-to-understand and enjoyable-to-watch AI-powered online course.',
    },
  },
  {
    slug: 'one-page-style-guide',
    title: 'The One-Page Style Guide Template',
    eyebrow: 'The One-Page Style Guide Template',
    heroHeading: 'An Easy & Fast Way To Create Brand Guidelines',
    description: 'A streamlined, one-page style guide template designed for efficiency and clarity, complete with a real-life example to elevate your branding projects.',
    price: '$19',
    oldPrice: '$29',
    checkoutUrl: 'https://buy.stripe.com/fZe5nTbjWdb943mbJl',
    image: asset('660edd8cb06e1858d54fee01_one-page-style-guide-mockup2.jpg'),
    cardImage: asset('660eee729ac4af526c0d7bd8_one-page-style-guide-mockupthumb.jpg'),
    published: true,
    seo: {
      title: 'One-Page Brand Guidelines Template | Quick Style Guide | Ebaqdesign',
      description: 'Deliver logo projects professionally with this one-page brand guidelines template. Perfect for quick turnarounds and smaller branding deliverables.',
      image: 'https://cdn.prod.website-files.com/5de2db6d3719a1a1cee44545/660ef11e77523b73744f8d3a_one-page-style-guide-thumb.webp',
      ogTitle: 'One-Page Brand Guidelines Template | Ebaqdesign',
      ogDescription: 'Deliver logo projects professionally with this one-page template. Perfect for quick branding deliverables.',
    },
    problemEyebrow: 'Organize your process',
    problemHeading: 'Essentials for delivering branding projects',
    benefits: ['Save Time—Craft a comprehensive style guide in hours.', 'Set the standard—A one-pager that speaks volumes.', 'Show expertise—Deliver your design work like a pro.', 'Gain prestige—Provide more value to your clients.', 'Raise prices—Attract bigger project & high paying jobs.', 'Rest easy—Get a guarantee that your work looks good.'],
    featureHeading: 'Black & white version',
    featureDescription: 'Every project is different, that’s why the product comes with two versions: black and white. Ensure consistency across all touch-points with this clean stylesheet.',
    featureBullets: ['Ensure your work is being used correctly.', 'Build a great portfolio & gain prestige.', 'Be proud of your logo design work.'],
    steps: ['Download and open the style guide template.', 'Freely customize the template in InDesign or Illustrator.', 'Present it to your client and get approval fast!'],
    includedHeading: 'Buy it once, use it for every project',
    includedDescription: 'The same style guide template is being used with real clients at Ebaqdesign. See an example of a $25k identity project delivered for Airport Executive.',
    gallery: [asset('660edd8cb06e1858d54fee01_one-page-style-guide-mockup2.jpg'), asset('660ee0e55fc08054ad6a6b5b_one-page-style-guide-mockup6.jpg'), asset('660ee334e7382f9c829c18c9_one-page-style-guide-mockup1.jpg')],
    note: 'You’re buying a downloadable PDF. Buy once, get free updates for life.',
    detailSections: [
      { title: 'Black & white version', description: 'Every project is different, that’s why the product comes with two versions: black and white. Ensure consistency across all touch-points with this clean stylesheet.', bullets: ['Ensure your work is being used correctly.', 'Build a great portfolio & gain prestige.', 'Be proud of your logo design work.'], image: asset('660edd9c84debef46e96090a_one-page-style-guide-mockup3.jpg') },
      { title: 'Ready-to-use structure', description: 'Don’t waste time on mundane work. Use our modern brand identity poster that clearly lays out how your design work should be used.', bullets: ['Set yourself apart from cheap designers.', 'Make clients see the value of your work.', 'Streamline your process for efficiency.'], image: asset('660eddae357071608652aee9_one-page-style-guide-mockup4.jpg') },
      { title: 'Minimalist layout', description: 'Our minimalist layout allows for various use cases. Simply add your logo, change the colors, typography, and mockups—and you are ready to go!', bullets: ['Present branding projects like a pro.', 'Feel confident about your work.', 'Get approvals fast, with less revisions.'], image: asset('660eddbc34080b89478d4e1f_one-page-style-guide-mockup5.jpg') },
    ],
    story: { eyebrow: 'Built from real client work', heading: 'The One-Page Style Guide is my template that allows me deliver brand identity projects', body: 'The same style guide template is being used with real clients at Ebaqdesign.', byline: '— Arek Dvornechuck, Branding Expert', profileImage: 'https://cdn.prod.website-files.com/5de2db6d3719a1a1cee44545/5de8003e154e7e4d116936f5_arek-dvornechuck-profile-pic-320.jpg' },
    storyAfterIncluded: true,
    hideBaseFeature: true,
    audience: { eyebrow: 'Deliver outstanding work', heading: 'For anyone working with, for, or on brands', groups: ['Brand Designers', 'Entrepreneurs', 'Marketers', 'Brand Strategists', 'Creative Directors', 'Consultants'] },
    finalCta: {
      heading: 'Buy it once, use it for every project',
      description: "The same style guide template is being used with real clients at Ebaqdesign. See an example of a $25k identity project I've delivered recently for Airport Executive.",
    },
  },
]

export const getShopProduct = (slug?: string) => shopProducts.find((product) => product.slug === slug)
