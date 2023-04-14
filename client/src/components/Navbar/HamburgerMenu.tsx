import { NavLink } from "react-router-dom";
import triangle_down from "../../assets/icons/triangle.svg";
import { useState } from "react";

const svgBlack: object = {
  filter:
    "invert(0%) sepia(9%) saturate(7464%) hue-rotate(255deg) brightness(96%) contrast(94%)",
};

const svgAccentColor: object = {
  filter:
    "invert(65%) sepia(11%) saturate(3206%) hue-rotate(176deg) brightness(99%) contrast(89%)",
};

type props = {
  setHamburgerComponentsIsOpen: Function;
  hamburgerComponentsIsOpen: boolean;
  setHamburgerMenuIsOpen: Function;
  setHamburgerProfileIsOpen: Function;
  hamburgerProfileIsOpen: boolean;
  userIsActive: boolean;
  email: string;
  handleSignoutButton: any;
  setTriangleColor: Function;
  triangleColor: object;
};

function HamburgerMenu(props: props) {
  const {
    setHamburgerComponentsIsOpen,
    hamburgerComponentsIsOpen,
    setHamburgerMenuIsOpen,
    setHamburgerProfileIsOpen,
    hamburgerProfileIsOpen,
    userIsActive,
    email,
    handleSignoutButton,
    setTriangleColor,
    triangleColor,
  } = props;

  const [miniTriangleColor, setMiniTriangleColor] = useState(svgBlack);
  const [miniTriangleColor2, setMiniTriangleColor2] = useState(svgBlack);

  return (
    <div className="hamburger-menu">
      <NavLink to="/builds" className="hamburger-menu__item">
        Featured Builds
      </NavLink>
      <div>
        <div className="hamburger-components">
          <div className="hamburger-components__flex">
            <NavLink to="/components" className="hamburger-menu__item">
              Components
            </NavLink>
            {!hamburgerComponentsIsOpen && (
              <img
                src={triangle_down}
                className="hamburger-components__triangle"
                style={miniTriangleColor}
                alt="down triangle"
                onClick={() => {
                  setHamburgerComponentsIsOpen(!hamburgerComponentsIsOpen);
                }}
                onMouseOver={() => {
                  setMiniTriangleColor(svgAccentColor);
                }}
                onMouseLeave={() => {
                  setMiniTriangleColor(svgBlack);
                }}
              />
            )}
            {hamburgerComponentsIsOpen && (
              <img
                src={triangle_down}
                className="hamburger-components__triangle hamburger-components__triangle-up"
                style={miniTriangleColor}
                alt="down triangle"
                onClick={() => {
                  setHamburgerComponentsIsOpen(!hamburgerComponentsIsOpen);
                }}
                onMouseOver={() => {
                  setMiniTriangleColor(svgAccentColor);
                }}
                onMouseLeave={() => {
                  setMiniTriangleColor(svgBlack);
                }}
              />
            )}
          </div>
          {hamburgerComponentsIsOpen && (
            <ul className="hamburger-components__menu">
              <li>
                <NavLink
                  to="/components/cpus"
                  className="hamburger-components__menu-item"
                >
                  CPUs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/components/coolers"
                  className="hamburger-components__menu-item"
                >
                  CPU Coolers
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/components/motherboards"
                  className="hamburger-components__menu-item"
                >
                  Motherboards
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/components/memory"
                  className="hamburger-components__menu-item"
                >
                  Memory
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/components/storage"
                  className="hamburger-components__menu-item"
                >
                  Storage
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/components/videocards"
                  className="hamburger-components__menu-item"
                >
                  Video Cards
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/components/power"
                  className="hamburger-components__menu-item"
                >
                  Power Supplies
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/components/cases"
                  className="hamburger-components__menu-item"
                >
                  Cases
                </NavLink>
              </li>
              <li>
                <img
                  src={triangle_down}
                  className="hamburger-components__triangle hamburger-components__triangle-up"
                  style={miniTriangleColor}
                  alt="down triangle"
                  onClick={() => {
                    setHamburgerComponentsIsOpen(!hamburgerComponentsIsOpen);
                    setMiniTriangleColor(svgBlack);
                  }}
                  onMouseOver={() => {
                    setMiniTriangleColor(svgAccentColor);
                  }}
                  onMouseLeave={() => {
                    setMiniTriangleColor(svgBlack);
                  }}
                />
              </li>
            </ul>
          )}
        </div>
      </div>
      <NavLink to="/other" className="hamburger-menu__item">
        Other
      </NavLink>
      <div>
        {/* to conditionally render user email and options */}
        {!userIsActive ? (
          <NavLink
            to="/login"
            className="options__navLink"
            onClick={() => {
              setHamburgerMenuIsOpen(false);
              setHamburgerComponentsIsOpen(false);
              setHamburgerProfileIsOpen(false);
              setTriangleColor(svgBlack);
            }}
          >
            Login
          </NavLink>
        ) : (
          <div className="hamburger-components">
            <div className="hamburger-components__flex">
              <div className="hamburger-menu__item email">{email}</div>
              {!hamburgerProfileIsOpen && (
                <img
                  src={triangle_down}
                  className="hamburger-components__triangle"
                  style={miniTriangleColor2}
                  alt="down triangle"
                  onClick={() => {
                    setHamburgerProfileIsOpen(!hamburgerProfileIsOpen);
                  }}
                  onMouseOver={() => {
                    setMiniTriangleColor2(svgAccentColor);
                  }}
                  onMouseLeave={() => {
                    setMiniTriangleColor2(svgBlack);
                  }}
                />
              )}
              {hamburgerProfileIsOpen && (
                <img
                  src={triangle_down}
                  className="hamburger-components__triangle hamburger-components__triangle-up"
                  style={miniTriangleColor2}
                  alt="down triangle"
                  onClick={() => {
                    setHamburgerProfileIsOpen(!hamburgerProfileIsOpen);
                  }}
                  onMouseOver={() => {
                    setMiniTriangleColor2(svgAccentColor);
                  }}
                  onMouseLeave={() => {
                    setMiniTriangleColor2(svgBlack);
                  }}
                />
              )}
            </div>
            {hamburgerProfileIsOpen && (
              <ul className="hamburger-components__menu">
                <li>
                  <NavLink
                    to="/accountDetails"
                    className="hamburger-components__menu-item"
                  >
                    Account Details
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/addBalance"
                    className="hamburger-components__menu-item"
                  >
                    Add Balance
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/orderHistory"
                    className="hamburger-components__menu-item"
                  >
                    Order History
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/"
                    className="hamburger-components__menu-item"
                    onClick={async () => {
                      setHamburgerMenuIsOpen(false);
                      setHamburgerComponentsIsOpen(false);
                      setHamburgerProfileIsOpen(false);
                      setTriangleColor(svgBlack);
                      handleSignoutButton();
                    }}
                  >
                    Sign Out
                  </NavLink>
                </li>

                <li>
                  <img
                    src={triangle_down}
                    className="hamburger-components__triangle hamburger-components__triangle-up"
                    style={miniTriangleColor2}
                    alt="down triangle"
                    onClick={() => {
                      setHamburgerProfileIsOpen(!hamburgerProfileIsOpen);
                      setMiniTriangleColor2(svgBlack);
                    }}
                    onMouseOver={() => {
                      setMiniTriangleColor2(svgAccentColor);
                    }}
                    onMouseLeave={() => {
                      setMiniTriangleColor2(svgBlack);
                    }}
                  />
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
      <img
        src={triangle_down}
        className="hamburger-menu__close"
        onClick={() => {
          setHamburgerMenuIsOpen(false);
          setHamburgerComponentsIsOpen(false);
          setHamburgerProfileIsOpen(false);
          setTriangleColor(svgBlack);
        }}
        style={triangleColor}
        onMouseOver={() => {
          setTriangleColor(svgAccentColor);
        }}
        onMouseLeave={() => {
          setTriangleColor(svgBlack);
        }}
        alt="up triangle"
      />
    </div>
  );
}

export default HamburgerMenu;
