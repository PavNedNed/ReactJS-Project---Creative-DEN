import { useState } from "react";
import { Link, NavLink } from "react-router";
import { useUserContext } from '../../contexts/UserContext';

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useUserContext();

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
                        <NavLink to="/" end>
                            Home
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/catalog">
                            Catalog
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/about">
                            About
                        </NavLink>
                    </li>

                    {user ? (
                        <>
                            <li>
                                <NavLink to="/graphics/create">
                                    Create
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/logout">
                                    Logout
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/login">
                                    Login
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/register">
                                    Register
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>

            </div>
        </header>
    );
}

export default Header;