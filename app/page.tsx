import ChatWidget from "./components/ChatWidget";

export default function Home() {
  return (
    <div className="site-shell">
      <header className="topbar">
        <p className="brand">Denver Custom Remodeling</p>
        <a className="button button-secondary" href="/contact">
          Book a Consult
        </a>
      </header>

      <main>
        <section className="hero">
          <p className="eyebrow">Design. Build. Enjoy.</p>
          <h1>Complete home remodeling built around how you actually live.</h1>
          <p>
            We provide home remodeling services, kitchen remodeling, bathroom
            remodeling, basement remodeling, and flooring with quality finishes
            that hold up to daily use.
          </p>
          <div className="actions">
            <a className="button" href="#services">
              Explore Services
            </a>
            <a className="button button-secondary" href="#portfolio">
              View Portfolio
            </a>
          </div>
        </section>

        <section id="services" className="section">
          <h2>What We Do</h2>
          <div className="grid">
            <article className="card">
              <h3>Home Remodeling Services</h3>
              <p>Full interior updates planned and delivered start to finish.</p>
            </article>
            <article className="card">
              <h3>Kitchen Remodeling</h3>
              <p>Functional layouts, cabinets, counters, lighting, and finishes.</p>
            </article>
            <article className="card">
              <h3>Bathroom Remodeling</h3>
              <p>Modern vanities, tile work, fixtures, and efficient layouts.</p>
            </article>
            <article className="card">
              <h3>Basement Remodeling</h3>
              <p>Transform unfinished basements into practical living spaces.</p>
            </article>
            <article className="card">
              <h3>Flooring</h3>
              <p>Durable flooring installation for kitchens, baths, and basements.</p>
            </article>
          </div>
        </section>

        <section id="portfolio" className="section">
          <h2>Recent Projects</h2>
          <div className="grid">
            <article className="card">
              <h3>Oak + White Transitional</h3>
              <p>Warm oak lowers, white uppers, and quartz waterfall island.</p>
            </article>
            <article className="card">
              <h3>Small Space Upgrade</h3>
              <p>
                Galley layout optimized with full-height pantry storage and
                under-cabinet lighting.
              </p>
            </article>
            <article className="card">
              <h3>Family Chef Kitchen</h3>
              <p>
                Double ovens, oversized prep sink, and durable matte slab
                cabinetry for daily heavy use.
              </p>
            </article>
          </div>
        </section>

        <section id="contact" className="section section-contact">
          <h2>Let&apos;s Plan Your Remodel</h2>
          <p>
            Email{" "}
            <a
              href="mailto:denvercustomremodeling@gmail.com"
              aria-label="Email Denver Custom Remodeling"
              className="contact-link"
            >
              denvercustomremodeling@gmail.com
            </a>{" "}
            or call <a href="tel:+17204496824">(720) 449-6824</a> to schedule a
            consultation.
          </p>
        </section>
      </main>
      <ChatWidget />
    </div>
  );
}
