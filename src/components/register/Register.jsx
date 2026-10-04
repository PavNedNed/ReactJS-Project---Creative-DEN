import { Link } from "react-router";
import AuthHeaderSection from "../shared/AuthHeaderSection";

function Register() {
    return (
        <main>

        <AuthHeaderSection 
            title="Join the yard"
            type="Register"
            paragraph="Create an account to sell graphic packs and like other artists’ work."
        />

        <section className="container">
          <form className="form-shell" action="#" method="post">
            <h2 className="form-title">Create account</h2>
            <p className="form-sub">One profile for browsing, liking, and listing assets.</p>

            <div className="form-grid">
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="you@studio.com" required />
              </div>

              <div className="field">
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" placeholder="At least 6 characters" required />
              </div>

              <div className="field">
                <label htmlFor="repass">Repeat password</label>
                <input id="repass" name="repass" type="password" placeholder="Repeat password" required />
              </div>
            </div>

            <div className="form-actions">
              <button className="btn btn-accent" type="submit">Register</button>
              <Link className="btn btn-ghost" to="/">Cancel</Link>
            </div>

            <p className="auth-switch">
              Already registered?
              <Link to="/login">Login here</Link>
            </p>
          </form>
        </section>
      </main>
    );
}

export default Register;