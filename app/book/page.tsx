import type { Metadata } from "next";
import Value from "@/components/Value";
import { getSite, isPlaceholder } from "@/lib/site";

export const metadata: Metadata = { title: "Book an appointment" };

// Holding page until the booking form is built (Step 3).
export default function Book() {
  const { contact } = getSite();
  return (
    <section className="section">
      <div className="wrap">
        <h1>Book an appointment</h1>
        <p>Online booking is coming soon. Until then, please call or email us and we will find a time that suits you.</p>
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
        </dl>
      </div>
    </section>
  );
}
