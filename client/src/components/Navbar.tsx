import React from "react";
import "../scss/navbar.scss";
import { Link } from "react-router-dom";
import user_icon from "../assets/icons/user.svg";
import cart_icon from "../assets/icons/cart.png";
import triangle_down from "../assets/icons/triangle.svg";
import { useState } from "react";

type navProps = {
  isBuildNav: boolean;
  isComponentNav: boolean;
  isOtherNav: boolean;
};

function Navbar(props: navProps) {
  const { isBuildNav, isComponentNav, isOtherNav } = props;
  const [componentsIsOpen, setComponentsIsOpen] = useState(false);
  const [hamburgerMenuIsOpen, setHamburgerMenuIsOpen] = useState(false);
  const [triangleColor, setTriangleColor] = useState({
    filter:
      "invert(0%) sepia(9%) saturate(7464%) hue-rotate(255deg) brightness(96%) contrast(94%)",
  });
  const accent_color = "#54aeef";

  return (
    <main className="navbar">
      <Link className="logo" to="/">
        <div className="logo__accent-left">{`<`}</div>
        <div>LOGO</div>
        <div className="logo__accent-right">{`>`}</div>
      </Link>
      <section className="options">
        <button
          className="hamburger"
          onClick={() => {
            setHamburgerMenuIsOpen(!hamburgerMenuIsOpen);
          }}
        >
          <div className="bar"></div>
        </button>
        {isBuildNav && (
          <Link
            to="/builds"
            className="options__builds"
            style={{ color: accent_color }}
          >
            Featured Builds
          </Link>
        )}
        {!isBuildNav && (
          <Link to="/builds" className="options__builds">
            Featured Builds
          </Link>
        )}

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
            {isComponentNav && (
              <Link
                to="/components"
                className="components__link"
                style={{ color: accent_color }}
              >
                Components
              </Link>
            )}
            {!isComponentNav && (
              <Link to="/components" className="components__link">
                Components
              </Link>
            )}

            {componentsIsOpen && (
              <ul className="components__menu">
                <li>
                  <Link to="/components/cpus" className="components__menu-item">
                    CPUs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/components/coolers"
                    className="components__menu-item"
                  >
                    CPU Coolers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/components/motherboards"
                    className="components__menu-item"
                  >
                    Motherboards
                  </Link>
                </li>
                <li>
                  <Link
                    to="/components/memory"
                    className="components__menu-item"
                  >
                    Memory
                  </Link>
                </li>
                <li>
                  <Link
                    to="/components/storage"
                    className="components__menu-item"
                  >
                    Storage
                  </Link>
                </li>
                <li>
                  <Link
                    to="/components/videocards"
                    className="components__menu-item"
                  >
                    Video Cards
                  </Link>
                </li>
                <li>
                  <Link
                    to="/components/power"
                    className="components__menu-item"
                  >
                    Power Supplies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/components/cases"
                    className="components__menu-item"
                  >
                    Cases
                  </Link>
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

        {isOtherNav && (
          <Link
            to="/other"
            className="options__other"
            style={{ color: accent_color }}
          >
            Other
          </Link>
        )}
        {!isOtherNav && (
          <Link to="/other" className="options__other">
            Other
          </Link>
        )}
        <img src={user_icon} className="options__icon" alt="user icon" />
        <img src={cart_icon} className="options__icon" alt="cart icon" />
      </section>
      {hamburgerMenuIsOpen && (
        <div className="hamburger-menu">
          <Link to="/builds" className="hamburger-menu__item">
            Featured Builds
          </Link>
          <Link to="/components" className="hamburger-menu__item">
            Components
          </Link>
          <Link to="/other" className="hamburger-menu__item">
            Other
          </Link>
          <img
            src={triangle_down}
            className="hamburger-menu__close"
            onClick={() => {
              setHamburgerMenuIsOpen(false);
              setTriangleColor({
                filter:
                  "invert(0%) sepia(9%) saturate(7464%) hue-rotate(255deg) brightness(96%) contrast(94%)",
              });
            }}
            style={triangleColor}
            onMouseOver={() => {
              setTriangleColor({
                filter:
                  "invert(65%) sepia(11%) saturate(3206%) hue-rotate(176deg) brightness(99%) contrast(89%)",
              });
            }}
            onMouseLeave={() => {
              setTriangleColor({
                filter:
                  "invert(0%) sepia(9%) saturate(7464%) hue-rotate(255deg) brightness(96%) contrast(94%)",
              });
            }}
            alt="up triangle"
          />
        </div>
      )}
    </main>
  );
}

export default Navbar;
