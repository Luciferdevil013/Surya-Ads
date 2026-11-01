import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site";

const linkClass = "text-[#8E8697] no-underline hover:text-primary-deep hover:underline";

const Footer = () => (
  <footer className="mt-auto pt-10 text-center text-xs leading-[1.7] text-[#ADA6B4]">
    <span>{siteConfig.footerNote}</span> · <span>{siteConfig.brandName}</span>
    <br />
    <Link to="/privacy" className={linkClass}>
      Privacy Policy
    </Link>
    <span className="mx-1.5 opacity-50">·</span>
    <Link to="/terms" className={linkClass}>
      Terms
    </Link>
  </footer>
);

export default Footer;
