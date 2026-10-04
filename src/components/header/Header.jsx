function Header() {
    return (
        <header className="site-header">
            <div className="container nav">
                <a className="brand" href="index.html">
                    <img src="/logo.png" />
                </a>
                <button className="nav-toggle" type="button" aria-label="Toggle navigation" aria-expanded="false">
                    <span></span><span></span><span></span>
                </button>
                {/* <!-- Guest nav example. Swap with user nav when authenticated. --> */}
                <ul className="nav-links">
                    <li><a className="active" href="index.html">Home</a></li>
                    <li><a href="catalog.html">Catalog</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="login.html">Login</a></li>
                    <li><a className="nav-cta" href="register.html">Register</a></li>
                    {/* <!-- User nav:
                    <li><a href="create.html">Sell asset</a></li>
                    <li><a href="#">Logout</a></li>
                    --> */}
                </ul>
            </div>
        </header>
    );
}

export default Header;