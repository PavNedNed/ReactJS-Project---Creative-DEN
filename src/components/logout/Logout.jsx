import { Link } from "react-router";
import AuthHeaderSection from "../shared/ItemHeader";
import { useEffect, useState } from "react";
import { useUserContext } from '../../contexts/UserContext';

function Logout() {
  const { logoutHandler } = useUserContext();
  const [isLoading, setIsLoading] = useState(true); // Start as true since it fires on mount

  useEffect(() => {
    async function logout() {
      try {
        await logoutHandler();
      } catch (error) {
        console.error('Logout failed:', error);
      } finally {
        setIsLoading(false); // Stop loading once finished
      }
    }

    logout();
  }, []);

  return (
    <main>
      <AuthHeaderSection
        title={isLoading ? "Signing out..." : "Session ended"}
        type="Logged out"
        paragraph=""
      />

      <section className="container">
        <div className="form-shell" style={{ textAlign: "center" }}>
          <h2 className="form-title">
            {isLoading ? "Please wait..." : "See you at the next drop"}
          </h2>
          <p className="form-sub">
            {isLoading ? "Clearing your session..." : "Your session has been cleared."}
          </p>
          
          <div className="form-actions" style={{ justifyContent: "center" }}>
            <Link 
              className={`btn btn-primary ${isLoading ? 'disabled' : ''}`} 
              to="/"
              style={isLoading ? { pointerEvents: 'none', opacity: 0.6 } : {}}
            >
              Back to home
            </Link>
            <Link 
              className={`btn btn-ghost ${isLoading ? 'disabled' : ''}`} 
              to="/login"
              style={isLoading ? { pointerEvents: 'none', opacity: 0.6 } : {}}
            >
              Login again
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Logout;