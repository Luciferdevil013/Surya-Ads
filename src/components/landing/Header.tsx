import { siteConfig } from "@/config/site";

const Header = () => {
  const brand = siteConfig.brandName || "Your Business";

  return (
    <header className="mb-[8vh] flex w-full max-w-[520px] items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2.5">
        <div
          aria-hidden="true"
          className={
            "flex h-[38px] w-[38px] flex-none items-center justify-center overflow-hidden rounded-[11px] text-lg font-extrabold text-white " +
            (siteConfig.logoMark ? "" : "bg-gradient-to-br from-primary to-primary-deep")
          }
        >
          {siteConfig.logoMark ? (
            <img src={siteConfig.logoMark} alt="" className="block h-full w-full" />
          ) : (
            (brand.trim()[0] || "B").toUpperCase()
          )}
        </div>
        <span className="truncate text-[17px] font-bold tracking-[-0.01em]">{brand}</span>
      </div>
      <span className="flex-none rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground">
        {siteConfig.onlineLabel}
      </span>
    </header>
  );
};

export default Header;
