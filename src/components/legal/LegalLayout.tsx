import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site";

interface LegalLayoutProps {
  title: string;
  children: ReactNode;
}

/** Shared shell for /privacy and /terms. */
const LegalLayout = ({ title, children }: LegalLayoutProps) => {
  useEffect(() => {
    const prev = document.title;
    document.title = `${title} — ${siteConfig.brandName}`;
    return () => {
      document.title = prev;
    };
  }, [title]);

  const updated =
    siteConfig.legalUpdated ||
    new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="bg-hero min-h-screen leading-[1.65]">
      <div className="mx-auto max-w-[720px] px-5 pb-16 pt-8">
        <Link
          to="/"
          className="mb-7 inline-flex items-center gap-[7px] text-sm font-semibold text-primary-deep no-underline hover:text-[#9A3412] hover:underline"
        >
          &larr; Back to {siteConfig.brandName}
        </Link>
        <h1 className="mb-2 text-[26px] font-extrabold tracking-[-0.02em] min-[481px]:text-[32px]">{title}</h1>
        <p className="mb-8 text-[13px] text-[#736D82]">Last updated: {updated}</p>
        {children}
      </div>
    </div>
  );
};

export const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="mb-2.5 mt-8 text-lg font-bold tracking-[-0.01em]">{children}</h2>
);

export const P = ({ children }: { children: ReactNode }) => (
  <p className="mb-3 text-[15px] text-[#4F4860]">{children}</p>
);

export const UL = ({ items }: { items: string[] }) => (
  <ul className="mb-3 ml-5 list-disc">
    {items.map((item) => (
      <li key={item} className="mb-1.5 text-[15px] text-[#4F4860]">
        {item}
      </li>
    ))}
  </ul>
);

export const ContactEmail = () => (
  <a href={`mailto:${siteConfig.contactEmail}`} className="text-primary-deep hover:text-[#9A3412]">
    {siteConfig.contactEmail}
  </a>
);

export default LegalLayout;
