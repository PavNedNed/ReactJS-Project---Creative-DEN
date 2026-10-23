import { Link, useNavigate } from "react-router";
import ItemHeader from "../shared/ItemHeader";
import { useState } from "react";

// import useFetch from "../../hooks/useFetch";

import authValidation from "../../utils/authValidation";
import styles from "../../utils/error-field.module.css";

import { useUserContext } from '../../contexts/UserContext';

import { toast } from "react-toastify";

// This one is an uncontrolled form
function Login() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const { loginHandler } = useUserContext();

    async function submitHandler(event) {
        event.preventDefault();

        // Get values from the form
        const formData = new FormData(event.currentTarget);
        const values = Object.fromEntries(formData);
        //console.log("Submitting values:", values);

        // validate the form values
        const errors = authValidation(values, false);
        setErrors(errors);

        if (Object.keys(errors).length > 0) {
            //console.log("Validation Errors", errors);
            return;
        }

        // send the request to login
        try {
            const result = await loginHandler(
                values.email,
                values.password
            );

            if (result?.access_token) {
                navigate(`/`);
            }
        }
        catch (error) {
            toast.error(error.message || "Login failed. Please try again.");
        }
    }

    const inputClass = (field) => {
        return errors[field] ? styles['error-field'] : '';
    };

    return (
        <main>

            <ItemHeader
                title="Welcome back"
                type="Login"
                paragraph="Access your account to list graphics, edit listings, and like other creators."
            />

            <section className="container">
                <form className="form-shell" onSubmit={submitHandler}>
                    <h2 className="form-title">Sign in</h2>
                    <p className="form-sub">Use the email and password from your Hatchyard registration.</p>

                    <div className="form-grid">
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <input id="email" name="email" type="email" placeholder="you@studio.com" className={inputClass("email")} />
                        </div>
                        {errors.email && <div className={styles['error-message']}>{errors.email}</div>}

                        <div className="field">
                            <label htmlFor="password">Password</label>
                            <input id="password" name="password" type="password" placeholder="Your password" className={inputClass("password")} />
                        </div>
                        {errors.password && <div className={styles['error-message']}>{errors.password}</div>}
                    </div>

                    <div className="form-actions">
                        <button className="btn btn-primary" type="submit">Login</button>
                        <Link className="btn btn-ghost" to="/">Cancel</Link>
                    </div>

                    <p className="auth-switch">
                        No account yet? &nbsp;
                        <Link to="/register">Register here</Link>
                    </p>
                </form>
            </section>
        </main>
    );
}

export default Login;