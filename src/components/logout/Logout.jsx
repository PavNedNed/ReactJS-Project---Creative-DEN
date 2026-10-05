import { Link } from "react-router";
import AuthHeaderSection from "../shared/AuthHeaderSection";

function Logout() {
    return (
        <main>

        <AuthHeaderSection
            title="Session ended"
            type="Logged out"
            paragraph=""
        />

        <section className="container">
          <div className="form-shell" style={{textAlign: "center"}}>
            <h2 className="form-title">See you at the next drop</h2>
            <p className="form-sub">Your session has been cleared.</p>
            <div className="form-actions" style={{justifyContent: "center"}}>
              <Link className="btn btn-primary" to="/">Back to home</Link>
              <Link className="btn btn-ghost" to="/login">Login again</Link>
            </div>
          </div>
        </section>
      </main>
    );
}

export default Logout;