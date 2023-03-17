import "../scss/navbar.scss";
import { Link } from "react-router-dom";
import user_icon from "../assets/icons/user.svg";
import cart_icon from "../assets/icons/cart.png";

function Navbar() {
  return (
    <main className="navbar">
      <Link className="logo" to="/">
        {`<LOGO>`}
      </Link>
      <section className="options">
        <Link to="/builds">Featured Builds</Link>
        <Link to="/components">Components</Link>
        <Link to="/other">Other</Link>
        <img src={user_icon} className="options__icon" alt="user icon" />
        <img src={cart_icon} className="options__icon" alt="cart icon" />
      </section>
    </main>
  );
}

export default Navbar;
