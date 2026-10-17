
import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

import useFetch from "../../hooks/useFetch";
import { useUserContext } from "../../contexts/UserContext";

function Details() {
    const navigate = useNavigate();
    const { graphicId } = useParams();
    const { user } = useUserContext();
    // console.log("User from context:", user.user.id);

    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [isLiking, setIsLiking] = useState(false);

    const {
        data,
        loading,
        error,
        request,
    } = useFetch(
        "rest/v1/graphics",
        `id=eq.${graphicId}`
    );

    const {
        request: likesRequest,
    } = useFetch(
        "rest/v1/likes",
        "select=*",
        false
    );

    // Check likes when the graphic is loaded.
    useEffect(() => {
        async function fetchLikes() {
            const allLikes = await likesRequest(
                "GET",
                null,
                `select=*&graphic_id=eq.${graphicId}`
            );

            if (!allLikes) {
                return;
            }

            setLikeCount(allLikes.length);

            if (user?.user?.id) {
                const userLike = allLikes.some(
                    (like) => like.user_id === user.user.id
                );

                setIsLiked(userLike);
            }
        }

        fetchLikes();
    }, [graphicId, user?.user?.id]);

    const likeClickHandler = async () => {
        if (!user?.user?.id) {
            alert("Please log in to like graphics.");
            navigate("/login");
            return;
        }

        if (isLiking) {
            return;
        }

        setIsLiking(true);

        try {
            // Check whether this user already liked this graphic.
            const existingLikes = await likesRequest(
                "GET",
                null,
                `select=*&user_id=eq.${user.user.id}&graphic_id=eq.${graphicId}`
            );

            if (!existingLikes) {
                return;
            }

            if (existingLikes.length > 0) {
                // Remove the existing like.
                const result = await likesRequest(
                    "DELETE",
                    null,
                    `user_id=eq.${user.user.id}&graphic_id=eq.${graphicId}`
                );

                if (result !== null && result !== false) {
                    setIsLiked(false);
                    setLikeCount((count) => Math.max(0, count - 1));
                }
            } else {
                // Add a new like.
                const result = await likesRequest(
                    "POST",
                    {
                        user_id: user.user.id,
                        graphic_id: graphicId,
                    }
                );

                if (result) {
                    setIsLiked(true);
                    setLikeCount((count) => count + 1);
                }
            }
        } catch (err) {
            console.error("Failed to update like:", err);
            alert("Could not update your like. Please try again.");
        } finally {
            setIsLiking(false);
        }
    };

    const deleteGameClickHandler = async (e) => {
        e.preventDefault();

        const confirmed = confirm(
            `Are you sure you want to delete ${data.length > 0 ? data[0].title : "this"
            } graphic?`
        );

        if (!confirmed) {
            return;
        }

        try {
            const result = await request(
                "DELETE",
                null,
                `id=eq.${graphicId}`
            );

            if (result) {
                navigate("/catalog");
            }
        } catch (err) {
            alert(err);
        }
    };

    if (error) {
        console.error(error);
    }

    if (loading) {
        return <p>Loading graphic...</p>;
    }

    if (!data || data.length === 0) {
        return <p>Graphic not found.</p>;
    }

    const graphic = data[0];

    const isOwner = user?.user?.id === graphic.user_id;

    return (
        <main>
            <section className="section">
                <div className="container details-layout">
                    <div className="details-visual">
                        <img
                            src={graphic.imageUrl}
                            alt={graphic.title}
                        />
                    </div>

                    <div className="details-panel">
                        <span className="badge">
                            {graphic.category}
                        </span>

                        <h1>{graphic.title}</h1>

                        <p>{graphic.description}</p>

                        <div className="details-stats">
                            <span>
                                Price: <strong>${graphic.price}</strong>
                            </span>

                            <span>
                                Author: <strong>{graphic.author_name}</strong>
                            </span>

                            <span className="like-count">
                                Likes: <strong>{likeCount}</strong>
                            </span>
                        </div>

                        <div className="btn-group">
                            {!isOwner && (
                                <button
                                    className="btn btn-like"
                                    type="button"
                                    aria-pressed={isLiked}
                                    onClick={likeClickHandler}
                                    disabled={isLiking}
                                >
                                    {isLiking
                                        ? "Processing..."
                                        : isLiked
                                            ? "Unlike this pack"
                                            : "Like this pack"}
                                </button>
                            )}

                            {isOwner && (
                                <>
                                    <Link
                                        className="btn btn-ghost"
                                        to={`/graphics/${graphicId}/edit`}
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        className="btn btn-danger"
                                        type="button"
                                        onClick={deleteGameClickHandler}
                                    >
                                        Delete
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Details;
