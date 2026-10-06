import Image from "next/image";
import Link from "next/link";
import { getSite, isPlaceholder } from "@/lib/site";

export default function Header() {
  const site = getSite();
  return (
    <header className="site-header">
      <div className="wrap site-header__inner">
        <Link href="/" className="wordmark">
          {isPlaceholder(site.logo.image) ? (
            site.name
          ) : (
            <Image src={`/images/${site.logo.image}`} alt={site.logo.alt} width={160} height={160} priority />
          )}
        </Link>
        <Link href="/book" className="button button--small">
          Book<span className="wide-only"> an appointment</span>
        </Link>
      </div>
    </header>
  );
}
