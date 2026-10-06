import Link from "next/link";
import Photo from "@/components/Photo";
import Value from "@/components/Value";
import { getSite } from "@/lib/site";

export default function Home() {
  const { name, hero, about, contact, fitting } = getSite();

  return (
    <>
      <section className="hero">
        <div className="wrap hero__text">
          <h1>Find your wedding dress, at your own pace.</h1>
          <p className="lede">Book an appointment at {name} to try on dresses from the collection.</p>
          <Link href="/book" className="button">
            Book an appointment
          </Link>
        </div>
        <div className="wrap wrap--wide">
          <Photo image={hero.image} alt={hero.alt} ratio="16 / 9" sizes="(min-width: 1100px) 1100px, 100vw" priority />
        </div>
      </section>

      <section className="section" aria-labelledby="how-heading">
        <div className="wrap">
          <h2 id="how-heading">How a fitting works</h2>
          <ol className="steps">
            <li>
              <h3>Book a time</h3>
              <p>Choose a day and time that suits you. Tell us your budget and any dresses you have liked here.</p>
            </li>
            <li>
              <h3>Come in and try on</h3>
              <p>
                Your appointment lasts <Value>{fitting.length}</Value>. You can bring <Value>{fitting.guests}</Value>.
                We show you dresses in your budget and the styles you like, and you try them on.
              </p>
            </li>
            <li>
              <h3>Decide when you are ready</h3>
              <p>If you choose a dress, we explain ordering, alterations and timings so you know what happens next.</p>
            </li>
          </ol>
          <Photo image={about.image} alt={about.alt} ratio="3 / 2" sizes="(min-width: 760px) 700px, 100vw" />
          <p>
            <Link href="/book" className="button">
              Book an appointment
            </Link>
          </p>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="visit-heading">
        <div className="wrap visit">
          <div>
            <h2 id="visit-heading">Visit us</h2>
            <h3>Opening hours</h3>
            <p>
              <Value>{contact.opening_hours}</Value>
            </p>
            <h3>Address</h3>
            <address>
              <Value>{contact.address}</Value>
            </address>
          </div>
          <div className="map-slot" role="img" aria-label="Map – to be added">
            <Value>{contact.map}</Value>
          </div>
        </div>
      </section>
    </>
  );
}
