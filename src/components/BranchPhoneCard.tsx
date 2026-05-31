import type { Branch } from "../data/branches";

type BranchPhoneCardProps = {
  branch: Branch;
  language: "tr" | "en";
  variant?: "compact" | "contact";
};

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 21s7-4.5 7-10a7 7 0 1 0-14 0c0 5.5 7 10 7 10z" />
      <circle cx="12" cy="11" r="2.5" />
    </svg>
  );
}

export function BranchPhoneCard({
  branch,
  language,
  variant = "compact",
}: BranchPhoneCardProps) {
  const label = branch.label[language];
  const region = branch.region[language];
  const isContact = variant === "contact";

  return (
    <a
      href={`tel:${branch.tel}`}
      className={`group block rounded-xl border border-white/10 bg-white/[0.04] transition duration-300 hover:border-accent/35 hover:bg-white/[0.07] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
        isContact ? "p-4 sm:p-4.5" : "p-3.5"
      }`}
      aria-label={`${label}: ${branch.phone}`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`flex shrink-0 items-center justify-center rounded-lg bg-accent/12 text-accent ring-1 ring-accent/20 transition group-hover:bg-accent/18 ${
            isContact ? "h-10 w-10" : "h-9 w-9"
          }`}
          aria-hidden
        >
          <LocationIcon className={isContact ? "h-[18px] w-[18px]" : "h-4 w-4"} />
        </span>
        <div className="min-w-0 flex-1">
          <p
            className={`font-semibold leading-snug text-white ${
              isContact ? "text-sm sm:text-[15px]" : "text-[13px]"
            }`}
          >
            {label}
          </p>
          <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white/42">
            {region}
          </p>
          <p
            className={`mt-1.5 font-semibold tabular-nums text-white transition group-hover:text-soft-lavender ${
              isContact ? "text-base" : "text-[15px]"
            }`}
          >
            {branch.phone}
          </p>
        </div>
      </div>
    </a>
  );
}
