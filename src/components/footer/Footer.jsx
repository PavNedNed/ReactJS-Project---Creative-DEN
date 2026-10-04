import { Link } from "react-router";

function Footer() {
    return (
        <footer className="site-footer">
            <div className="container footer-inner">
                <Link className="brand" to="/">
                    <img src="./logo_white.png" />
                </Link>
                <p>ReactJS project by Pavel Nedelchev.</p>
            </div>
        </footer>
    );
}

export default Footer;