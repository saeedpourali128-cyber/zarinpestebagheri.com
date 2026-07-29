import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import { siteConfig } from "@/lib/config/site";

export function Logo() {
  return (
    <Link href="/" className="relative block h-14 w-[215px] shrink-0 sm:h-16 sm:w-[255px]" aria-label={siteConfig.name}>
      <Image
        src="/images/redesign/zarin-daneh-logo-gold.png"
        alt={`${siteConfig.name} — ${siteConfig.legalName}`}
        fill
        priority
        sizes="255px"
        className="object-contain object-right"
      />
    </Link>
  );
}
