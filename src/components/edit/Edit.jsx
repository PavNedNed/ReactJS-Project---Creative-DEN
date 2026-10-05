import { Link } from "react-router"
import ItemHeader from "../shared/ItemHeader";

function Edit() {
    return (
        <main>

            <ItemHeader
                title="Update listing"
                type="Edit listing"
                paragraph="Change title, category, preview, price, or description."
            />

            <section className="container">
                <form className="form-shell wide" action="#" method="post">
                    <h2 className="form-title">Edit pack</h2>
                    <p className="form-sub">Sample values prefilled — replace with your entry data in React.</p>

                    <div className="form-grid">
                        <div className="field">
                            <label htmlFor="title">Title</label>
                            <input id="title" name="title" type="text" value="Orbit Gradient System" required />
                        </div>

                        <div className="field">
                            <label htmlFor="category">Category</label>
                            <select id="category" name="category" required>
                                <option value="vector" selected>Vector</option>
                                <option value="raster">Raster</option>
                                <option value="logo">Logo</option>
                                <option value="web">Web</option>
                                <option value="caricature">Caricature</option>
                            </select>
                            <p className="field-hint">Dropdown options: vector, raster, logo, web, caricature.</p>
                        </div>

                        <div className="field">
                            <label htmlFor="imageUrl">Image URL</label>
                            <input
                                id="imageUrl"
                                name="imageUrl"
                                type="url"
                                value="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80"
                                required
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="price">Price (USD)</label>
                            <input id="price" name="price" type="number" min="1" step="1" value="18" required />
                        </div>

                        <div className="field">
                            <label htmlFor="description">Description</label>
                            <textarea id="description" name="description" required>
                                Editable mesh gradients, grain overlays, and poster-ready vector frames for launch campaigns.
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