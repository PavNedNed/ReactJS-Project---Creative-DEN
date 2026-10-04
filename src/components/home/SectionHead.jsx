import { Link } from "react-router";

function SectionHead() {
    return (
        <div className="section-head">
            <div>
                <span className="section-kicker">Fresh drops</span>
                <h2 className="section-title">Latest 3 assets</h2>
                <p className="section-lead">
                    The newest listings from Creative DEN creators. Open any pack to like, inspect details, or edit your own.
                </p>
            </div>
            <Link className="btn btn-ghost" to="/catalog">View all</Link>
        </div>
    );
}

export default SectionHead;