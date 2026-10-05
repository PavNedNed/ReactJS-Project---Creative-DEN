import { Link } from "react-router";

function Details() {
    return (
        <main>
            <section className="section">
                <div className="container details-layout">
                    <div className="details-visual">
                        <img
                            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80"
                            alt="Orbit Gradient System preview"
                        />
                    </div>

                    <div className="details-panel">
                        <span className="badge">vector</span>
                        <h1>Orbit Gradient System</h1>
                        <p>
                            Editable mesh gradients, grain overlays, and poster-ready vector frames for launch campaigns.
                            Includes SVG masters and export-ready PNGs.
                        </p>

                        <div className="details-stats">
                            <span>Price: <strong>$18</strong></span>
                            <span>Author: <strong>Mira Cole</strong></span>
                            <span className="like-count">Likes: <strong id="likeValue">12</strong></span>
                        </div>

                        {/* <!-- Guest / other-user actions: show Like. Owner actions: Edit + Delete. --> */}
                        <div className="btn-group">
                            <button className="btn btn-like" id="likeBtn" type="button" aria-pressed="false">
                                Like this pack
                            </button>
                            <Link className="btn btn-ghost" to="/edit">Edit</Link>
                            <button className="btn btn-danger" type="button">Delete</button>
                        </div>
                        <p className="field-hint" style={{ marginTop: "1rem" }}>
                            In React: show <strong>Like</strong> only for logged-in users who are not the owner.
                            Show <strong>Edit/Delete</strong> only for the owner. Guests see neither action set.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Details;