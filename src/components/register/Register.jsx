import { Link, useNavigate  } from "react-router";
import ItemHeader from "../shared/ItemHeader";
import { useState } from "react";

import useFetch from "../../hooks/useFetch";

import authValidation from "../../utils/authValidation";
import styles from "../../utils/error-field.module.css";

import { useUserContext } from '../../contexts/UserContext';

// This one is an uncontrolled form
function Register() {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { registerHandler } = useUserContext();

  const { data, loading, error, request } = useFetch(
      "auth/v1/signup",
      "",
      false,
  );

  if (error) {
      console.error(error);
  }

  async function submitHandler(event) {
        event.preventDefault();

        // Get values from the form
        const formData = new FormData(event.currentTarget);
        const values = Object.fromEntries(formData);
        //console.log("Submitting values:", values);
    
        // validate the form values
        const errors = authValidation(values, true);
        setErrors(errors);

        if (Object.keys(errors).length > 0) {
            //console.log("Validation Errors", errors);
            return;
        }

         // send the request to login
        try {
            const result = await registerHandler(
                values.email,
                values.password
            );

            if (result) {
                navigate(`/`);
            }
        }
        catch (error) {
            console.log("Error:", error.message); // vij tuk
        }        

        // console.log("Register values:", values);
    }

    const inputClass = (field) => {
        return errors[field] ? styles['error-field'] : '';
    };


    return (
        <main>

        <ItemHeader
            title="Join the yard"
            type="Register"
            paragraph="Create an account to sell graphic packs and like other artists’ work."
        />

        <section className="container">
          <form className="form-shell" onSubmit={submitHandler}>
            <h2 className="form-title">Create account</h2>
            <p className="form-sub">One profile for browsing, liking, and listing assets.</p>

            <div className="form-grid">
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="you@studio.com" className={inputClass("email")} />
              {errors.email && <div className={styles['error-message']}>{errors.email}</div>}
              </div>

              <div className="field">
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" placeholder="At least 6 characters" className={inputClass("password")} />
              {errors.password && <div className={styles['error-message']}>{errors.password}</div>}
              </div>

              <div className="field">
                <label htmlFor="repass">Repeat password</label>
                <input id="repass" name="repass" type="password" placeholder="Repeat password" className={inputClass("repass")} />
              {errors.repass && <div className={styles['error-message']}>{errors.repass}</div>}
              </div>
            </div>

            <div className="form-actions">
              <button className="btn btn-accent" type="submit">Register</button>
              <Link className="btn btn-ghost" to="/">Cancel</Link>
            </div>

            <p className="auth-switch">
              Already registered? &nbsp;
              <Link to="/login">Login here</Link>
            </p>
          </form>
        </section>
      </main>
    );
}

export default Register;