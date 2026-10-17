
import { useEffect, useState } from "react";
import { Link } from "react-router";
import useFetch from "../../hooks/useFetch";

function AssetCard({ graphic }) {
    const [likesCount, setLikesCount] = useState(0);

    const { request } = useFetch(
        "rest/v1/likes",
        "select=*",
        false
    );

    useEffect(() => {
        async function fetchLikes() {
            const likes = await request(
                "GET",
                null,
                `select=*&graphic_id=eq.${graphic.id}`
            );

            if (likes) {
                setLikesCount(likes.length);
            }
        }

        fetchLikes();
    }, [graphic.id]);

    return (
        <article className="asset-card">
            <Link to={`/graphics/${graphic.id}`}>
                <img
                    className="asset-thumb"
                    src={graphic.imageUrl}
                    alt={graphic.title}
                />
            </Link>

            <div className="asset-body">
                <div className="asset-meta">
                    <span className="badge">
                        {graphic.category}
                    </span>

                    <span>
                        {likesCount} {likesCount === 1 ? "like" : "likes"}
                    </span>
                </div>

                <h3 className="asset-title">
                    <Link to={`/graphics/${graphic.id}`}>
                        {graphic.title}
                    </Link>
                </h3>

                <p className="asset-author">
                    by {graphic.author_name}
                </p>

                <div className="asset-footer">
                    <span className="price">
                        ${graphic.price}
                    </span>

                    <Link
                        className="btn btn-ghost"
                        to={`/graphics/${graphic.id}`}
                    >
                        Details
                    </Link>
                </div>
            </div>
        </article>
    );
}

export default AssetCard;
