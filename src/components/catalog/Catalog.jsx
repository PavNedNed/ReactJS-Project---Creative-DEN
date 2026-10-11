import AssetCard from "../shared/AssetCard";
import SectionHead from "./SectionHead";
import { Link } from "react-router";

import useFetch from "../../hooks/useFetch";

function Catalog() {
    const { data, loading, error } = useFetch(
        "graphics",
        "select=*&order=createdAt.desc");


    if (error) {
        console.error(error);
    }

    // console.log(data);

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

                        {loading && <p>Loading graphics...</p>}
                        {!loading && data.length === 0 && <p>No graphics found.</p>}
                        {!loading && data.length > 0 && data.map((graphic) => (
                            <AssetCard key={graphic.id} graphic={graphic} />
                        ))}
                        {error && <p>Error loading graphics.</p>}

                    </div>
                </div>
            </section>
        </main>
    );
}

export default Catalog;