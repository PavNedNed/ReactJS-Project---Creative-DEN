import AssetCard from "../shared/AssetCard";
import SectionHead from "./SectionHead";
import { Link } from "react-router";
import { useState } from "react";

import useFetch from "../../hooks/useFetch";
import DropDownButton from "./DrobDownButton";

function Catalog() {
    const [category, setCategory] = useState("all");

    const query = category === "all"
        ? "select=*&order=createdAt.desc"
        : `select=*&category=eq.${category}&order=createdAt.desc`;

        // console.log("QUERY: " + query)

    const { data, loading, error } = useFetch("graphics", query);

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    if (error) {
        console.error(error);
    }

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

                        <DropDownButton onChange={handleCategoryChange} />

                        {/* <p className="muted">Showing all assets</p>                         */}

                        <Link className="btn btn-primary" to="/graphics/create">Create listing</Link>
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