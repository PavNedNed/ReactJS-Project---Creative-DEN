import AssetCard from "../shared/AssetCard";
import Hero from "./Hero";
import SectionHead from "./SectionHead";

import useFetch from "../../hooks/useFetch";

function Home() {
    // const { data, loading, error } = useFetch("graphics", "id=eq.2b3bcb56-2047-4d94-9397-58611d5aadc0");
    const { data, loading, error } = useFetch(
        "rest/v1/graphics",
        "select=*&order=createdAt.desc&limit=3");

    
    if (error) {
        console.error(error);
    }

    // console.log(data);

    return (
        <main>
            <Hero />

            <section className="section">
                <div className="container">
                    <SectionHead />

                    {loading && <p>Loading graphics...</p>}
                    {!loading && data.length === 0 && <p>No graphics found.</p>}
                    {!loading && data.length > 0 && (
                    <div className="asset-grid">
                        {data.map((graphic) => (
                            <AssetCard key={graphic.id} graphic={graphic} />
                        ))}

                    </div>
                    )}
                    {error && <p>Error loading graphics.</p>}
                </div>
            </section>
        </main>
    );
}

export default Home;