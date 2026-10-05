import { Link } from "react-router";

function About() {
    return (
        <main>
        <section className="page-hero">
          <div className="container">
            <span className="section-kicker">The idea</span>
            <h1>About Creative DEN</h1>
            <p>
              Creative DEN is a stripped-down graphics market: creators list graphics, and the community likes work that deserves a second look.
            </p>
          </div>
        </section>

        <section className="section" style={{ paddingTop: "1.25rem" }}>
          <div className="container">
            <div className="about-grid">
              <div className="about-copy">
                <h2>Not a megastore. A workbench market.</h2>
                <p>
                  Inspired by big stock sites: one catalog, clear create/edit forms,
                  login for sellers, and a like action for graphics you do not own.
                </p>
                <div className="btn-group">
                  <Link className="btn btn-primary" to="/catalog">Open catalog</Link>
                  <Link className="btn btn-ghost" to="/register">Join as creator</Link>
                </div>
              </div>
              <div className="about-visual" role="img" aria-label="Design studio atmosphere"></div>
            </div>

            <div className="pillars">
              <div className="pillar">
                <h3>Five design types</h3>
                <p>Vector, raster, logo, web, and caricature — chosen once in create/edit, shown everywhere else.</p>
              </div>
              <div className="pillar">
                <h3>Latest on home</h3>
                <p>The home page is a shopfront for the newest three listings, not a dump of the whole catalog.</p>
              </div>
              <div className="pillar">
                <h3>Likes that matter</h3>
                <p>Users can like other creators’ assets on the details page — a simple social signal for quality.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
}

export default About;