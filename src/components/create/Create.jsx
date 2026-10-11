import { Link, useNavigate } from "react-router";
import ItemHeader from "../shared/ItemHeader";
import { useState } from "react";

import useFetch from "../../hooks/useFetch";

const initialValues = {
    title: "",
    imageUrl: "",
    category: "",
    description: "",
    price: 1,
};

function Create() {
    const [values, setValues] = useState(initialValues);
    // console.log(values);
    const { request, loading, error } = useFetch("graphics");
    const navigate = useNavigate();

    function changeHandler(event) {
        const { name, value, type } = event.target;
        setValues((currentValues) => ({
            ...currentValues,
            [name]: type === "number" ? Number(value) : value,
        }));
    }

    async function submitHandler(event) {
        event.preventDefault();

        // console.log("Submitting values:", values);

        const result = await request(
            "POST",
            values,
        );

        // console.log("OPA!", result);

        if (result) {
            navigate(`/catalog`);
        }
    }

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
                    <p className="form-sub">Fill out the form to create a new listing.</p>

                    <div className="form-grid">
                        <div className="field">
                            <label htmlFor="title">Title</label>
                            <input id="title" name="title" type="text" placeholder="e.g. Graphic design item" value={values.title} onChange={changeHandler} required />
                        </div>

                        <div className="field">
                            <label htmlFor="category">Category</label>
                            <select id="category" name="category" value={values.category} onChange={changeHandler} required>
                                <option value="" >Choose a category</option>
                                <option value="vector">Vector</option>
                                <option value="raster">Raster</option>
                                <option value="logo">Logo</option>
                                <option value="web">Web</option>
                                <option value="caricature">Caricature</option>
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="imageUrl">Image URL</label>
                            <input id="imageUrl" name="imageUrl" type="url" placeholder="https://..." value={values.imageUrl} onChange={changeHandler} required />
                        </div>

                        <div className="field">
                            <label htmlFor="price">Price (USD)</label>
                            <input id="price" name="price" type="number" min="1" step="1" placeholder="18" value={values.price} onChange={changeHandler} required />
                        </div>

                        <div className="field">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="What is inside the pack, file formats, and suggested use."
                                value={values.description} onChange={changeHandler}
                                required
                            ></textarea>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button className="btn btn-primary" type="submit">Create listing</button>
                        <Link className="btn btn-ghost" to="/catalog">Cancel</Link>
                    </div>
                </form>
            </section>
        </main>
    );
}

export default Create;