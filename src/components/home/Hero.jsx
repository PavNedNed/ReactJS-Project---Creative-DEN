import { Link } from "react-router";

function Hero() {
    return (
        <section className="hero">
          <div className="hero-media" aria-hidden="true"></div>
          <div className="hero-content">
            <p className="hero-brand">Creative DEN</p>
            <h1 className="hero-title">Graphics built to ship today.</h1>
            <p className="hero-text">
              A compact market for vectors, rasters, logos, web kits, and caricatures — priced simply, licensed clearly.
            </p>
            <div className="btn-group">
              <Link className="btn btn-accent" to="/catalog">Browse catalog</Link>
              <Link className="btn btn-ghost" to="/register" style={{borderColor: "#fffdf8", color: "#fffdf8"}}>Start selling</Link>
            </div>
          </div>
        </section>
    );
}

export default Hero;