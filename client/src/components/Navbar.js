import "../scss/navbar.scss";
import { Link } from "react-router-dom";
import user_icon from "../assets/icons/user.svg";
import cart_icon from "../assets/icons/cart.png";
import triangle_down from "../assets/icons/triangle.svg";
import { useState } from "react";

function Navbar() {
  const [componentsIsOpen, setComponentsIsOpen] = useState(false);
  const [triangleColor, setTriangleColor] = useState({
    filter:
      "invert(0%) sepia(9%) saturate(7464%) hue-rotate(255deg) brightness(96%) contrast(94%)",
  });

  return (
    <main className="navbar">
      <Link className="logo" to="/">
        <div className="logo__accent">{`<`}</div>
        <div>LOGO</div>
        <div className="logo__accent">{`>`}</div>
      </Link>
      <section className="options">
        <Link to="/builds">Featured Builds</Link>
        <div
          className="options__components"
          onMouseOver={() => {
            setComponentsIsOpen(true);
            setTriangleColor({
              filter:
                "invert(65%) sepia(11%) saturate(3206%) hue-rotate(176deg) brightness(99%) contrast(89%)",
            });
          }}
          onMouseLeave={() => {
            setComponentsIsOpen(false);
            setTriangleColor({
              filter:
                "invert(0%) sepia(9%) saturate(7464%) hue-rotate(255deg) brightness(96%) contrast(94%)",
            });
          }}
        >
          <div className="components">
            <Link to="/components">Components</Link>
            {componentsIsOpen && (
              <ul className="components__menu">
                <li className="components__menu-item">
                  <Link to="/components/cpus">CPUs</Link>
                </li>
                <li className="components__menu-item">
                  <Link to="/components/coolers">CPU Coolers</Link>
                </li>
                <li className="components__menu-item">
                  <Link to="/components/motherboards">Motherboards</Link>
                </li>
                <li className="components__menu-item">
                  <Link to="/components/memory">Memory</Link>
                </li>
                <li className="components__menu-item">
                  <Link to="/components/storage">Storage</Link>
                </li>
                <li className="components__menu-item">
                  <Link to="/components/videocards">Video Cards</Link>
                </li>
                <li className="components__menu-item">
                  <Link to="/components/power">Power Supplies</Link>
                </li>
                <li className="components__menu-item">
                  <Link to="/components/cases">Cases</Link>
                </li>
              </ul>
            )}
          </div>
          <img
            src={triangle_down}
            style={triangleColor}
            className="triangle"
            alt="triangle"
          />
        </div>

        <Link to="/other">Other</Link>
        <img src={user_icon} className="options__icon" alt="user icon" />
        <img src={cart_icon} className="options__icon" alt="cart icon" />
      </section>
    </main>
  );
}

export default Navbar;
