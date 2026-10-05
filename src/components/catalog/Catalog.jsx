import AssetCard from "../shared/AssetCard";
import SectionHead from "./SectionHead";
import { Link } from "react-router";

function Catalog() {
  return (
    <main>
      <SectionHead
        kicker={"Full market"}
        title={"Catalog"}
        paragraph={"Every live listing on Creative DEN — vectors, rasters, logos, web kits, and caricatures."}
      />

      <section className="section" style={{ paddingTop: "1.5rem" }}>
        <div className="container">
          <div className="catalog-toolbar">
            <p className="muted">Showing all assets</p>
            <Link className="btn btn-primary" to="/create">List a pack</Link>
          </div>

          <div className="asset-grid">

            <AssetCard />
            <AssetCard />
            <AssetCard />
            <AssetCard />
            <AssetCard />
            <AssetCard />

          </div>
        </div>
      </section>
    </main>
  );
}

export default Catalog;