import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="site-header">
            <div className="container nav">
                <Link className="brand" to="/">
                    <img src="/logo.png" />
                </Link>
                <button className="nav-toggle" type="button" aria-label="Toggle navigation" aria-expanded="false">
                    <span></span><span></span><span></span>
                </button>
                {/* <!-- Guest nav example. Swap with user nav when authenticated. --> */}
                <ul className="nav-links">
                    <li><Link className="active" to="/">Home</Link></li>
                    <li><Link to="/catalog">Catalog</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link className="nav-cta" to="/register">Register</Link></li>
                    {/* <!-- User nav:
                    <li><Link to="/create">Sell asset</Link></li>
                    <li><Link to="/logout">Logout</Link></li>
                    --> */}
                </ul>
            </div>
        </header>
    );
}

export default Header;