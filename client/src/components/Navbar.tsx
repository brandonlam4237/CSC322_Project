import "../scss/navbar.scss";
import { Link, NavLink } from "react-router-dom";
import user_icon from "../assets/icons/user.svg";
import cart_icon from "../assets/icons/cart.png";
import triangle_down from "../assets/icons/triangle.svg";
import { useState } from "react";
import { useAuthContext } from "src/contexts/AuthContext";

function Navbar() {
  const [componentsIsOpen, setComponentsIsOpen] = useState(false);
  const [profileIsOpen, setProfileIsOpen] = useState(false);
  const [hamburgerMenuIsOpen, setHamburgerMenuIsOpen] = useState(false);
  const [hamburgerComponentsIsOpen, setHamburgerComponentsIsOpen] =
    useState(false);
  const [hamburgerProfileIsOpen, setHamburgerProfileIsOpen] = useState(false);
  const [triangleColor, setTriangleColor] = useState({
    filter:
      "invert(0%) sepia(9%) saturate(7464%) hue-rotate(255deg) brightness(96%) contrast(94%)",
  });
  const [miniTriangleColor, setMiniTriangleColor] = useState({
    filter:
      "invert(0%) sepia(9%) saturate(7464%) hue-rotate(255deg) brightness(96%) contrast(94%)",
  });
  const [miniTriangleColor2, setMiniTriangleColor2] = useState({
    filter:
      "invert(0%) sepia(9%) saturate(7464%) hue-rotate(255deg) brightness(96%) contrast(94%)",
  });
  const [profileColor, setProfileColor] = useState({
    filter:
      "invert(0%) sepia(9%) saturate(7464%) hue-rotate(255deg) brightness(96%) contrast(94%)",
  });

  // logout User async function
  const authValues = useAuthContext();
  const logoutUser = authValues.logoutUser;
  const user = authValues.userData;
  
  async function handleSignoutButton() {
    await logoutUser();
    setProfileIsOpen(false);
    setProfileColor({
      filter:
        "invert(0%) sepia(9%) saturate(7464%) hue-rotate(255deg) brightness(96%) contrast(94%)",
    });
  }

  return (
    <main className="navbar">
      <Link className="logo" to="/">
        <div className="logo__accent-left">{`<`}</div>
        <div>DP</div>
        <div className="logo__accent-right">{`>`}</div>
      </Link>
      <section className="options">
        <button
          className="hamburger"
          onClick={() => {
            setHamburgerMenuIsOpen(!hamburgerMenuIsOpen);
            setHamburgerComponentsIsOpen(false);
          }}
        >
          <div className="bar"></div>
        </button>
        <NavLink to="/builds" className="options__builds">
          Featured Builds
        </NavLink>

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
            <NavLink to="/components" className="components__link">
              Components
            </NavLink>

            {componentsIsOpen && (
              <ul className="components__menu">
                <li>
                  <NavLink
                    to="/components/cpus"
                    className="components__menu-item"
                  >
                    CPUs
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/components/coolers"
                    className="components__menu-item"
                  >
                    CPU Coolers
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/components/motherboards"
                    className="components__menu-item"
                  >
                    Motherboards
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/components/memory"
                    className="components__menu-item"
                  >
                    Memory
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/components/storage"
                    className="components__menu-item"
                  >
                    Storage
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/components/videocards"
                    className="components__menu-item"
                  >
                    Video Cards
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/components/power"
                    className="components__menu-item"
                  >
                    Power Supplies
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/components/cases"
                    className="components__menu-item"
                  >
                    Cases
                  </NavLink>
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

        <NavLink to="/other" className="options__other">
          Other
        </NavLink>
        {!user.is_active ? (
          <NavLink to="/login" className="options__navLink">
            Login
          </NavLink>
        ) : (
          <div
            className="options__profile-container"
            onMouseEnter={() => {
              setProfileIsOpen(true);
              setProfileColor({
                filter:
                  "invert(65%) sepia(11%) saturate(3206%) hue-rotate(176deg) brightness(99%) contrast(89%)",
              });
            }}
            onMouseLeave={() => {
              setProfileIsOpen(false);
              setProfileColor({
                filter:
                  "invert(0%) sepia(9%) saturate(7464%) hue-rotate(255deg) brightness(96%) contrast(94%)",
              });
            }}
          >
            <img
              src={user_icon}
              className="options__icon"
              alt="user icon"
              style={profileColor}
            />
            {profileIsOpen && (
              <ul className="options__profile-menu">
                <li>{user.email}</li>
                <li className="line"></li>
                <li>
                  <NavLink to="/accountDetails" className="options__navLink">
                    Account Details
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/addBalance" className="options__navLink">
                    Add Balance
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/orderHistory" className="options__navLink">
                    Order History
                  </NavLink>
                </li>

                <li className="line"></li>
                <li>
                  <Link
                    to="/"
                    className="options__navLink"
                    onClick={handleSignoutButton}
                  >
                    Sign Out
                  </Link>
                </li>
              </ul>
            )}
          </div>
        )}
        <img src={cart_icon} className="options__icon" alt="cart icon" />
      </section>

      {hamburgerMenuIsOpen && (
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
                      setMiniTriangleColor({
                        filter:
                          "invert(65%) sepia(11%) saturate(3206%) hue-rotate(176deg) brightness(99%) contrast(89%)",
                      });
                    }}
                    onMouseLeave={() => {
                      setMiniTriangleColor({
                        filter:
                          "invert(0%) sepia(9%) saturate(7464%) hue-rotate(255deg) brightness(96%) contrast(94%)",
                      });
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
                      setMiniTriangleColor({
                        filter:
                          "invert(65%) sepia(11%) saturate(3206%) hue-rotate(176deg) brightness(99%) contrast(89%)",
                      });
                    }}
                    onMouseLeave={() => {
                      setMiniTriangleColor({
                        filter:
                          "invert(0%) sepia(9%) saturate(7464%) hue-rotate(255deg) brightness(96%) contrast(94%)",
                      });
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
                        setHamburgerComponentsIsOpen(
                          !hamburgerComponentsIsOpen
                        );
                        setMiniTriangleColor({
                          filter:
                            "invert(0%) sepia(9%) saturate(7464%) hue-rotate(255deg) brightness(96%) contrast(94%)",
                        });
                      }}
                      onMouseOver={() => {
                        setMiniTriangleColor({
                          filter:
                            "invert(65%) sepia(11%) saturate(3206%) hue-rotate(176deg) brightness(99%) contrast(89%)",
                        });
                      }}
                      onMouseLeave={() => {
                        setMiniTriangleColor({
                          filter:
                            "invert(0%) sepia(9%) saturate(7464%) hue-rotate(255deg) brightness(96%) contrast(94%)",
                        });
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
            {!user.is_active ? (
              <NavLink
                to="/login"
                className="options__navLink"
                onClick={() => {
                  setHamburgerMenuIsOpen(false);
                  setHamburgerComponentsIsOpen(false);
                  setHamburgerProfileIsOpen(false);
                  setTriangleColor({
                    filter:
                      "invert(0%) sepia(9%) saturate(7464%) hue-rotate(255deg) brightness(96%) contrast(94%)",
                  });
                }}
              >
                Login
              </NavLink>
            ) : (
              <div className="hamburger-components">
                <div className="hamburger-components__flex">
                  <div className="hamburger-menu__item email">{user.email}</div>
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
                        setMiniTriangleColor2({
                          filter:
                            "invert(65%) sepia(11%) saturate(3206%) hue-rotate(176deg) brightness(99%) contrast(89%)",
                        });
                      }}
                      onMouseLeave={() => {
                        setMiniTriangleColor2({
                          filter:
                            "invert(0%) sepia(9%) saturate(7464%) hue-rotate(255deg) brightness(96%) contrast(94%)",
                        });
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
                        setMiniTriangleColor2({
                          filter:
                            "invert(65%) sepia(11%) saturate(3206%) hue-rotate(176deg) brightness(99%) contrast(89%)",
                        });
                      }}
                      onMouseLeave={() => {
                        setMiniTriangleColor2({
                          filter:
                            "invert(0%) sepia(9%) saturate(7464%) hue-rotate(255deg) brightness(96%) contrast(94%)",
                        });
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
                          setTriangleColor({
                            filter:
                              "invert(0%) sepia(9%) saturate(7464%) hue-rotate(255deg) brightness(96%) contrast(94%)",
                          });

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
                          setMiniTriangleColor2({
                            filter:
                              "invert(0%) sepia(9%) saturate(7464%) hue-rotate(255deg) brightness(96%) contrast(94%)",
                          });
                        }}
                        onMouseOver={() => {
                          setMiniTriangleColor2({
                            filter:
                              "invert(65%) sepia(11%) saturate(3206%) hue-rotate(176deg) brightness(99%) contrast(89%)",
                          });
                        }}
                        onMouseLeave={() => {
                          setMiniTriangleColor2({
                            filter:
                              "invert(0%) sepia(9%) saturate(7464%) hue-rotate(255deg) brightness(96%) contrast(94%)",
                          });
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
