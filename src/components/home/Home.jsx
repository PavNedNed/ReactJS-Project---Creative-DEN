import AssetCard from "../shared/AssetCard";
import Hero from "./Hero";
import SectionHead from "./SectionHead";

import useFetch from "../../hooks/useFetch";

function Home() {
    // const { data, loading, error } = useFetch("graphics", "id=eq.2b3bcb56-2047-4d94-9397-58611d5aadc0");
    const { data, loading, error } = useFetch(
        "graphics",
        "select=*&order=createdAt.desc&limit=3");

    if (loading) {
        return <p>Loading graphics...</p>;
    }

    if (error) {
        console.error(error);
        return;
    }

    console.log(data);



    return (
        <main>
            <Hero />

            <section className="section">
                <div className="container">
                    <SectionHead />

                    <div className="asset-grid">
                        {data.map((graphic) => (
                            <AssetCard key={graphic.id} graphic={graphic} />
                        ))}

                    </div>
                </div>
            </section>
        </main>
    );
}

export default Home;