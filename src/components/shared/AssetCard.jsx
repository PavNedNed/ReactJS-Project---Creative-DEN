import { Link } from "react-router";

function AssetCard() {
    return (
        <article className="asset-card">
            <Link to="/details">
                <img
                    className="asset-thumb"
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80"
                    alt="Abstract vector gradients pack preview"
                />
            </Link>
            <div className="asset-body">
                <div className="asset-meta">
                    <span className="badge">vector</span>
                    <span>12 likes</span>
                </div>
                <h3 className="asset-title"><Link to="/details">Orbit Gradient System</Link></h3>
                <p className="asset-author">by Pavel Nedelchev</p>
                <div className="asset-footer">
                    <span className="price">$18</span>
                    <Link className="btn btn-ghost" to="/details">Details</Link>
                </div>
            </div>
        </article>
    );
}

export default AssetCard;