import { Link } from "react-router";
import AuthHeaderSection from "../shared/AuthHeaderSection";

function Login() {
    return (
        <main>

        <AuthHeaderSection
            title="Welcome back"
            type="Login"
            paragraph="Access your account to list graphics, edit listings, and like other creators."
        />

        <section className="container">
          <form className="form-shell" action="#" method="post">
            <h2 className="form-title">Sign in</h2>
            <p className="form-sub">Use the email and password from your Hatchyard registration.</p>

            <div className="form-grid">
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="you@studio.com" required />
              </div>

              <div className="field">
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" placeholder="Your password" required />
              </div>
            </div>

            <div className="form-actions">
              <button className="btn btn-primary" type="submit">Login</button>
              <Link className="btn btn-ghost" to="/">Cancel</Link>
            </div>

            <p class="auth-switch">
              No account yet? 
              <Link to="/register">Register here</Link>
            </p>
          </form>
        </section>
      </main>
    );
}

export default Login;