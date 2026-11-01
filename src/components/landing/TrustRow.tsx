import { siteConfig } from "@/config/site";

const TrustRow = () => {
  const stats = siteConfig.stats || [];
  if (!siteConfig.showTrust || !stats.length) return null;

  return (
    <div className="mt-11 flex flex-wrap items-center justify-center gap-[18px] min-[421px]:gap-[26px]">
      {stats.map((s) => (
        <div key={s.label}>
          <div className="text-[21px] font-extrabold min-[421px]:text-2xl">{s.value}</div>
          <div className="mt-0.5 text-xs font-semibold uppercase tracking-[0.04em] text-[#8A7F86]">{s.label}</div>
        </div>
      ))}
    </div>
  );
};

export default TrustRow;
