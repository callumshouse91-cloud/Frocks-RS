import Link from "next/link";
import Value from "@/components/Value";
import { getSite, isPlaceholder } from "@/lib/site";

export default function Footer() {
  const { name, contact } = getSite();
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__inner">
        <div>
          <p className="site-footer__name">{name}</p>
          <address>
            <Value>{contact.address}</Value>
          </address>
        </div>
        <dl className="contact-list">
          <dt>Phone</dt>
          <dd>
            {isPlaceholder(contact.phone) ? (
              <Value>{contact.phone}</Value>
            ) : (
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
            )}
          </dd>
          <dt>Email</dt>
          <dd>
            {isPlaceholder(contact.email) ? (
              <Value>{contact.email}</Value>
            ) : (
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            )}
          </dd>
          <dt>Opening hours</dt>
          <dd>
            <Value>{contact.opening_hours}</Value>
          </dd>
        </dl>
        <p>
          <Link href="/book">Book an appointment</Link>
        </p>
      </div>
    </footer>
  );
}
