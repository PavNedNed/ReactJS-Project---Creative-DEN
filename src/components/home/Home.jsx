import AssetCard from "../shared/AssetCard";
import Hero from "./Hero";
import SectionHead from "./SectionHead";

function Home() {
    return (
        <main>
        <Hero />

        <section className="section">
          <div className="container">
            <SectionHead />

            <div className="asset-grid">

              <AssetCard />
              <AssetCard />
              <AssetCard />
              
            </div>
          </div>
        </section>
      </main>
    );
}

export default Home;