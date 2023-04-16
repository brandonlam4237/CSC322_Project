import { NavLink, Link } from "react-router-dom";
import user_icon from "../../assets/icons/user.svg";
import { svgBlack, svgAccentColor } from "./svgColors";
import { UserCredentials } from '../../contexts/AuthContext';

type props = {
  setProfileIsOpen: Function;
  profileIsOpen: boolean;
  setProfileColor: Function;
  profileColor: object;
  email: string;
  handleSignoutButton: () => void;
  user: UserCredentials;
};

function NavOptProfileMenu(props: props) {
  const {
    setProfileIsOpen,
    profileIsOpen,
    setProfileColor,
    profileColor,
    email,
    handleSignoutButton,
    user,
  } = props;

  return (
    <div
      className="options__profile-container"
      onMouseEnter={() => {
        setProfileIsOpen(true);
        setProfileColor(svgAccentColor);
      }}
      onMouseLeave={() => {
        setProfileIsOpen(false);
        setProfileColor(svgBlack);
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
          <li>{email}</li>
          <li className="line"></li>
          <li>
            <NavLink to="/accountDetails" className="options__navLink">
              Account Details
            </NavLink>
          </li>
          <li>
            {user.is_customer ? (
              <NavLink to="/addBalance" className="options__navLink">
                Add Balance
              </NavLink>
            ) : (
              <NavLink to="/approve" className="options__navLink">
                Account Requests
              </NavLink>
            )}
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
              onClick={() => {
                handleSignoutButton();
              }}
            >
              Sign Out
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default NavOptProfileMenu;
