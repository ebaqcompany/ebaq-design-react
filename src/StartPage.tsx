import { Helmet } from "react-helmet-async";
import { BookerSection } from "./components";

export default function StartPage() {
  return <main className="min-h-screen bg-black"><Helmet><title>Book a Call | Ebaq Design</title><meta name="description" content="Book a call with Arek Dvornechuck to discuss your branding, website, or motion design project." /><link rel="canonical" href="https://www.ebaqdesign.com/start" /></Helmet><BookerSection pinLogoToViewport /></main>;
}
