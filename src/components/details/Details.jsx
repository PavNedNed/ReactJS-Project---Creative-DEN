import { Link } from "react-router";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router";

function Details() {
    const graphicId = useParams().graphicId;

    const { data, loading, error } = useFetch(
        "graphics",
        `id=eq.${graphicId}`
    );

    if (error) {
        console.error(error);
    }

    // console.log(data);


    return (
        <main>
            <section className="section">
                <div className="container details-layout">
                    <div className="details-visual">
                        <img
                            src={data.length > 0 ? data[0].imageUrl : "Loading..."}
                            alt={data.length > 0 ? data[0].title : "Loading..."}
                        />
                    </div>

                    <div className="details-panel">
                        <span className="badge">vector</span>
                        <h1>{data.length > 0 ? data[0].title : "Loading..."}</h1>
                        <p>
                            {data.length > 0 ? data[0].description : "Loading..."}  
                        </p>

                        <div className="details-stats">
                            <span>Price: <strong>{data.length > 0 ? `$${data[0].price}` : "Loading..."} </strong></span>
                            <span>Author: <strong>{data.length > 0 ? data[0].author_id : "Loading..."} </strong></span>
                            <span className="like-count">Likes: <strong id="likeValue">-</strong></span>
                        </div>

                        {/* <!-- Guest / other-user actions: show Like. Owner actions: Edit + Delete. --> */}
                        <div className="btn-group">
                            <button className="btn btn-like" id="likeBtn" type="button" aria-pressed="false">
                                Like this pack
                            </button>
                            <Link className="btn btn-ghost" to="/edit">Edit</Link>
                            <button className="btn btn-danger" type="button">Delete</button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Details;