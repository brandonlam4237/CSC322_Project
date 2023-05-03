import "../../scss/navbar.scss";
import { Link, NavLink } from "react-router-dom";
import cart_icon from "../../assets/icons/cart.png";
import { useState } from "react";
import { useAuthContext } from "src/contexts/AuthContext";
import NavOptComponents from "./NavOptComponents";
import NavOptProfileMenu from "./NavOptProfileMenu";
import HamburgerMenu from "./HamburgerMenu";
import { svgBlack } from "./svgColors";

function Navbar() {
  const [profileIsOpen, setProfileIsOpen] = useState(false);
  const [profileColor, setProfileColor] = useState(svgBlack);
  const [triangleColor, setTriangleColor] = useState(svgBlack);
  const [hamburgerMenuIsOpen, setHamburgerMenuIsOpen] = useState(false);
  const [hamburgerComponentsIsOpen, setHamburgerComponentsIsOpen] =
    useState(false);
  const [hamburgerProfileIsOpen, setHamburgerProfileIsOpen] = useState(false);

  // logout User async function
  const authValues = useAuthContext();
  const logoutUser = authValues.logoutUser;
  const user = authValues.userData;

  async function handleSignoutButton() {
    await logoutUser();
    setProfileIsOpen(false);
    setProfileColor(svgBlack);
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
            setHamburgerProfileIsOpen(false);
          }}
        >
          <div className="bar"></div>
        </button>
        <NavOptComponents
          setTriangleColor={setTriangleColor}
          triangleColor={triangleColor}
        />
        <NavLink to="/builds" className="options__builds">
          Featured Builds
        </NavLink>

        {user.is_active ? (
          <NavLink to="/mybuild" className="options__other">
            My Build
          </NavLink>
        ) : (
          ""
        )}
        {!user.is_active ? (
          <NavLink to="/login" className="options__navLink">
            Login
          </NavLink>
        ) : (
          <NavOptProfileMenu
            setProfileIsOpen={setProfileIsOpen}
            profileIsOpen={profileIsOpen}
            setProfileColor={setProfileColor}
            profileColor={profileColor}
            email={user.email}
            handleSignoutButton={handleSignoutButton}
            userType={user.user_type}
          />
        )}
        <img src={cart_icon} className="options__icon" alt="cart icon" />
      </section>

      {hamburgerMenuIsOpen && (
        <HamburgerMenu
          setHamburgerComponentsIsOpen={setHamburgerComponentsIsOpen}
          hamburgerComponentsIsOpen={hamburgerComponentsIsOpen}
          setHamburgerMenuIsOpen={setHamburgerMenuIsOpen}
          setHamburgerProfileIsOpen={setHamburgerProfileIsOpen}
          hamburgerProfileIsOpen={hamburgerProfileIsOpen}
          userIsActive={user.is_active}
          email={user.email}
          handleSignoutButton={handleSignoutButton}
          setTriangleColor={setTriangleColor}
          triangleColor={triangleColor}
        />
      )}
    </main>
  );
}

export default Navbar;
