import { useState } from "react";
import { Link } from "react-router";

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleHandler = () => {
        setIsOpen(isOpen => !isOpen);
    };

    return (
        <header className="site-header">
            <div className="container nav">

                <Link className="brand" to="/">
                    <img src="/logo.png" alt="Logo" />
                </Link>

                <button
                    className="nav-toggle"
                    type="button"
                    aria-label="Toggle navigation"
                    aria-expanded={isOpen}
                    onClick={toggleHandler}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <ul className={`nav-links ${isOpen ? "is-open" : ""}`}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>

                    <li>
                        <Link to="/catalog">Catalog</Link>
                    </li>

                    <li>
                        <Link to="/about">About</Link>
                    </li>

                    <li>
                        <Link to="/login">Login</Link>
                    </li>

                    <li>
                        <Link className="nav-cta" to="/register">
                            Register
                        </Link>
                    </li>
                </ul>

            </div>
        </header>
    );
}

export default Header;