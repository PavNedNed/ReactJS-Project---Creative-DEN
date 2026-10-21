import { Link, useNavigate } from "react-router";
import ItemHeader from "../shared/ItemHeader";
import { useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import graphicValidation from "../../utils/graphicValidation";
import styles from "../../utils/error-field.module.css";

import useFetch from "../../hooks/useFetch";

const initialValues = {
    title: "",
    imageUrl: "",
    category: "",
    description: "",
    price: 1,
};

function Create() {
    const { user } = useUserContext();
    const authorEmail = user?.user?.email;

    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    const { request, error } = useFetch("rest/v1/graphics", "select=*", false);
    const navigate = useNavigate();

    function changeHandler(event) {
        const { name, value, type } = event.target;
        setValues((currentValues) => ({
            ...currentValues,
            author_name: authorEmail || "",
            [name]: type === "number" ? Number(value) : value,
        }));
    }

    async function submitHandler(event) {
        event.preventDefault();

        const validationErrors = graphicValidation(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        setIsSaving(true);

        try {
            const result = await request("POST", values);

            if (result) {
                navigate("/catalog");
            }
        } finally {
            setIsSaving(false);
        }
    }

    const inputClass = (field) => {
        return errors[field] ? styles["error-field"] : "";
    };

    return (
        <main>
            <ItemHeader
                title="New listing"
                type="Create listing"
                paragraph="Publish a ready-to-license graphics. Pick a type, set a price, and add a clear preview image."
            />

            <section className="container">
                <form className="form-shell wide" onSubmit={submitHandler}>
                    <h2 className="form-title">Graphic details</h2>
                    <p className="form-sub">
                        Fill out the form to create a new listing.
                    </p>

                    {error && (
                        <p className={styles["error-message"]}>
                            Could not create listing: {error}
                        </p>
                    )}

                    <div className="form-grid">
                        <div className="field">
                            <label htmlFor="title">Title</label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                placeholder="e.g. Graphic design item"
                                value={values.title}
                                onChange={changeHandler}
                                className={inputClass("title")}
                            />
                        </div>
                        {errors.title && (
                            <div className={styles["error-message"]}>
                                {errors.title}
                            </div>
                        )}

                        <div className="field">
                            <label htmlFor="category">Category</label>
                            <select
                                id="category"
                                name="category"
                                value={values.category}
                                onChange={changeHandler}
                                className={inputClass("category")}
                            >
                                <option value="">Choose a category</option>
                                <option value="vector">Vector</option>
                                <option value="raster">Raster</option>
                                <option value="logo">Logo</option>
                                <option value="web">Web</option>
                                <option value="caricature">Caricature</option>
                            </select>
                        </div>
                        {errors.category && (
                            <div className={styles["error-message"]}>
                                {errors.category}
                            </div>
                        )}

                        <div className="field">
                            <label htmlFor="imageUrl">Image URL</label>
                            <input
                                id="imageUrl"
                                name="imageUrl"
                                type="url"
                                placeholder="https://..."
                                value={values.imageUrl}
                                onChange={changeHandler}
                                className={inputClass("imageUrl")}
                            />
                        </div>
                        {errors.imageUrl && (
                            <div className={styles["error-message"]}>
                                {errors.imageUrl}
                            </div>
                        )}

                        <div className="field">
                            <label htmlFor="price">Price (USD)</label>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                min="1"
                                step="1"
                                placeholder="18"
                                value={values.price}
                                onChange={changeHandler}
                                className={inputClass("price")}
                            />
                        </div>
                        {errors.price && (
                            <div className={styles["error-message"]}>
                                {errors.price}
                            </div>
                        )}

                        <div className="field">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="What is inside the pack, file formats, and suggested use."
                                value={values.description}
                                onChange={changeHandler}
                                className={inputClass("description")}
                            />
                        </div>
                        {errors.description && (
                            <div className={styles["error-message"]}>
                                {errors.description}
                            </div>
                        )}
                    </div>

                    <div className="form-actions">
                        <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={isSaving}
                        >
                            {isSaving ? "Creating..." : "Create listing"}
                        </button>
                        <Link className="btn btn-ghost" to="/catalog">
                            Cancel
                        </Link>
                    </div>
                </form>
            </section>
        </main>
    );
}

export default Create;