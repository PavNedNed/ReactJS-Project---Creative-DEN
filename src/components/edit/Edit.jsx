import { Link, useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";

import useFetch from "../../hooks/useFetch";

import ItemHeader from "../shared/ItemHeader";

const initialValues = {
    title: "",
    imageUrl: "",
    category: "",
    description: "",
    price: 0,
};

function Edit() {
    const { graphicId } = useParams();
    const navigate = useNavigate();

    const { data, loading, error, request } = useFetch(
        "graphics",
        `select=*&id=eq.${graphicId}`
    );

    const [values, setValues] = useState(initialValues);
    // console.log(values);

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
        setValues((currentValues) => ({
            ...currentValues,
            [event.target.name]: event.target.name ? (event.target.type === "number" ? Number(event.target.value) : event.target.value) : event.target.value,
        }));
    }

    async function submitHandler(event) {
        event.preventDefault();

        // const result = await request(
        //     "PUT",
        //     values,
        //     `id=eq.${graphicId}`
        // );

        console.log("OPA!")

        // if (result) {
            navigate(`/graphics/${graphicId}`);
        // }
    }




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
                            <input id="title" name="title" type="text" value={values.title} onChange={changeHandler} required />
                        </div>

                        <div className="field">
                            <label htmlFor="category">Category</label>
                            <select id="category" name="category"  value={values.category} onChange={changeHandler} required>
                                <option value="vector" >Vector</option>
                                <option value="raster" >Raster</option>
                                <option value="logo" >Logo</option>
                                <option value="web" >Web</option>
                                <option value="caricature" >Caricature</option>
                            </select>
                            <p className="field-hint">Dropdown options: vector, raster, logo, web, caricature.</p>
                        </div>

                        <div className="field">
                            <label htmlFor="imageUrl">Image URL</label>
                            <input
                                id="imageUrl"
                                name="imageUrl"
                                type="url"
                                value={values.imageUrl} onChange={changeHandler} 
                                placeholder="image URL"
                                required
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="price">Price (USD)</label>
                            <input id="price" name="price" type="number" min="1" step="1" value={values.price} onChange={changeHandler} required />
                        </div>

                        <div className="field">
                            <label htmlFor="description">Description</label>
                            <textarea id="description" name="description" value={values.description} onChange={changeHandler} required>
                            </textarea>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button className="btn btn-primary" type="submit">Save changes</button>
                        <Link className="btn btn-ghost" to="/details">Cancel</Link>
                    </div>
                </form>
            </section>
        </main>
    );
}

export default Edit;