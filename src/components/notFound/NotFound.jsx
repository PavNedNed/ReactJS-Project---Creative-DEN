import { Link } from "react-router";
import AuthHeaderSection from "../shared/ItemHeader";

function NotFound() {
    return (
        <main>

        <AuthHeaderSection
            title="Sorry"
            type="404"
            paragraph="ERROR"
        />

        <section className="container">
          <div className="form-shell" style={{textAlign: "center"}}>
            <h2 className="form-title">PAGE NOT FOUND</h2>
            <div className="form-actions" style={{justifyContent: "center"}}>
              <Link className="btn btn-primary" to="/">Back to home</Link>
            </div>
          </div>
        </section>
      </main>
    );
}

export default NotFound;