import { Link } from "react-router";

function AssetCard({
    graphic,    
}) {
    return (
        <article className="asset-card">
            <Link to="/details">
                <img
                    className="asset-thumb"
                    src={graphic.imageUrl}
                    alt={graphic.title}
                />
            </Link>
            <div className="asset-body">
                <div className="asset-meta">
                    <span className="badge">{graphic.category}</span>
                    <span>0 likes</span>
                </div>
                <h3 className="asset-title"><Link to="/details">{graphic.title}</Link></h3>
                <p className="asset-author">by {graphic.author_id}</p>
                <div className="asset-footer">
                    <span className="price">${graphic.price}</span>
                    <Link className="btn btn-ghost" to="/details">Details</Link>
                </div>
            </div>
        </article>
    );
}

export default AssetCard;