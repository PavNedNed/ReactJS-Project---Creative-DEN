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
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "nav-cta" : ""
                            }
                        >
                            Home
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/catalog"
                            className={({ isActive }) =>
                                isActive ? "nav-cta" : ""
                            }
                        >
                            Catalog
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive ? "nav-cta" : ""
                            }
                        >
                            About
                        </NavLink>
                    </li>

                    {user ? (
                        <>
                            <li>
                                <NavLink
                                    to="/graphics/create"
                                    className={({ isActive }) =>
                                        isActive ? "nav-cta" : ""
                                    }
                                >
                                    Create
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/logout"
                                    className={({ isActive }) =>
                                        isActive ? "nav-cta" : ""
                                    }
                                >
                                    Logout
                                </NavLink>
                            </li>
                            <li>
                                <p>
                                    {user.user.email}
                                </p>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) =>
                                        isActive ? "nav-cta" : ""
                                    }
                                >
                                    Login
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/register"
                                    className={({ isActive }) =>
                                        isActive ? "nav-cta" : ""
                                    }
                                >
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