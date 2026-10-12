import { Link, useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";

import graphicValidation from "../../utils/graphicValidation";
import styles from "../../utils/error-field.module.css";

import useFetch from "../../hooks/useFetch";

import ItemHeader from "../shared/ItemHeader";

const initialValues = {
    title: "",
    imageUrl: "",
    category: "",
    description: "",
    price: 1,
};

function Edit() {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    // console.log(values);

    const { graphicId } = useParams();
    const navigate = useNavigate();

    const { data, loading, error, request } = useFetch(
        "graphics",
        `select=*&id=eq.${graphicId}`
    );



    // Populate the controlled form after fetching
    useEffect(() => {
        if (data.length > 0) {
            setValues({
                title: data[0].title ?? "",
                imageUrl: data[0].imageUrl ?? "",
                category: data[0].category ?? "",
                description: data[0].description ?? "",
                price: data[0].price ?? "",
            });
        }
    }, [data]);

    function changeHandler(event) {
        const { name, value, type } = event.target;
        setValues((currentValues) => ({
            ...currentValues,
            [name]: type === "number" ? Number(value) : value,
        }));
    }

    async function submitHandler(event) {
        // console.log("Submitting values:", values);

        event.preventDefault();

        // validate the form values
        const errors = graphicValidation(values);
        setErrors(errors);

        if (Object.keys(errors).length > 0) {
            // console.log("Validation Errors", errors);
            return;
        }

        const result = await request(
            "PATCH",
            values,
            `id=eq.${graphicId}`
        );

        // console.log("OPA!", result);

        if (result) {
            navigate(`/graphics/${graphicId}`);
        }
    }

    const inputClass = (field) => {
        return errors[field] ? styles['error-field'] : '';
    };

    return (
        <main>

            <ItemHeader
                title="Update listing"
                type="Edit listing"
                paragraph="Change title, category, preview, price, or description."
            />

            <section className="container">
                <form className="form-shell wide" onSubmit={submitHandler}>
                    <h2 className="form-title">Edit pack</h2>
                    <p className="form-sub">Edit the details of your listing below.</p>

                    <div className="form-grid">
                        <div className="field">
                            <label htmlFor="title">Title</label>
                            <input id="title" name="title" type="text" value={values.title} onChange={changeHandler} className={inputClass("title")} />
                        </div>
                        {errors.title && <div className={styles['error-message']}>{errors.title}</div>}

                        <div className="field">
                            <label htmlFor="category">Category</label>
                            <select id="category" name="category" value={values.category} onChange={changeHandler} className={inputClass("category")}>
                                <option value="vector" >Vector</option>
                                <option value="raster" >Raster</option>
                                <option value="logo" >Logo</option>
                                <option value="web" >Web</option>
                                <option value="caricature" >Caricature</option>
                            </select>
                            <p className="field-hint">Dropdown options: vector, raster, logo, web, caricature.</p>
                        </div>
                        {errors.category && <div className={styles['error-message']}>{errors.category}</div>}

                        <div className="field">
                            <label htmlFor="imageUrl">Image URL</label>
                            <input
                                id="imageUrl"
                                name="imageUrl"
                                type="url"
                                value={values.imageUrl} onChange={changeHandler} className={inputClass("imageUrl")}
                                placeholder="Image URL"
                            
                            />
                        </div>
                        {errors.imageUrl && <div className={styles['error-message']}>{errors.imageUrl}</div>}

                        <div className="field">
                            <label htmlFor="price">Price (USD)</label>
                            <input id="price" name="price" type="number" min="1" step="1" value={values.price} onChange={changeHandler} className={inputClass("price")} />
                        </div>
                        {errors.price && <div className={styles['error-message']}>{errors.price}</div>}

                        <div className="field">
                            <label htmlFor="description">Description</label>
                            <textarea id="description" name="description" value={values.description} onChange={changeHandler} className={inputClass("description")}>
                            </textarea>
                        </div>
                        {errors.description && <div className={styles['error-message']}>{errors.description}</div>}
                    </div>

                    <div className="form-actions">
                        <button className="btn btn-primary" type="submit">Save changes</button>
                        <Link className="btn btn-ghost" to={`/graphics/${graphicId}`}>Cancel</Link>
                    </div>
                </form>
            </section>
        </main>
    );
}

export default Edit;