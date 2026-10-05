import { Link } from "react-router";
import ItemHeader from "../shared/ItemHeader";

function Create() {
    return (
        <main>

        <ItemHeader 
          title="New listing"
          type="Create listing"
          paragraph="Publish a ready-to-license graphics. Pick a type, set a price, and add a clear preview image."
        />

        <section className="container">
          <form className="form-shell wide" action="#" method="post">
            <h2 className="form-title">Pack details</h2>
            <p className="form-sub">Five fields — enough for a SoftUni CRUD entry without clutter.</p>

            <div className="form-grid">
              <div className="field">
                <label for="title">Title</label>
                <input id="title" name="title" type="text" placeholder="e.g. Orbit Gradient System" required />
              </div>

              <div className="field">
                <label for="category">Category</label>
                <select id="category" name="category" required>
                  <option value="" disabled selected>Choose a category</option>
                  <option value="vector">Vector</option>
                  <option value="raster">Raster</option>
                  <option value="logo">Logo</option>
                  <option value="web">Web</option>
                  <option value="caricature">Caricature</option>
                </select>
                <p className="field-hint">Buyers filter the market by these five pack types.</p>
              </div>

              <div className="field">
                <label for="imageUrl">Image URL</label>
                <input id="imageUrl" name="imageUrl" type="url" placeholder="https://..." required />
              </div>

              <div className="field">
                <label for="price">Price (USD)</label>
                <input id="price" name="price" type="number" min="1" step="1" placeholder="18" required />
              </div>

              <div className="field">
                <label for="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="What is inside the pack, file formats, and suggested use."
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