import { HiArrowUpRight } from "react-icons/hi2";

type TextLinkProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
};

export const TextLink = ({ href = "#", children, className = "" }: TextLinkProps) => {
  return (
    <a
      href={href}
      className={`text-link group inline-flex items-center gap-1 font-semibold ${className}`}
    >
      <span className="underline underline-offset-4">{children}</span>
      <span className="inline-block overflow-hidden relative w-4 h-4">
        <HiArrowUpRight className="text-link-arrow transition-transform duration-300 ease-out group-hover:translate-x-full group-hover:-translate-y-full" />
        <HiArrowUpRight className="text-link-arrow absolute top-full -left-full transition-transform duration-300 ease-out group-hover:translate-x-full group-hover:-translate-y-full" />
      </span>
    </a>
  );
};

export default TextLink;
