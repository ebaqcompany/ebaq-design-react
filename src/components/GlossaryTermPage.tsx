import { Navigate, useParams } from "react-router-dom";
import { glossary } from "../data/glossary";

// Individual /glossary/:slug routes were consolidated into the single /glossary reference page
// to eliminate thin pages and keyword cannibalization. Client-side visits redirect cleanly to the anchor.
export const GlossaryTermPage = () => {
  const { slug } = useParams();
  const entry = glossary.find((item) => item.slug === slug);
  return <Navigate to={entry ? `/glossary#${entry.slug}` : "/glossary"} replace />;
};
