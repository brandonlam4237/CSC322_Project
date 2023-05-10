import { NavLink } from "react-router-dom";
import triangle_down from "../../assets/icons/triangle.svg";
import { useState } from "react";
import { svgBlack, svgAccentColor } from "./svgColors";

type props = {
  setTriangleColor: Function;
  triangleColor: object;
};

function NavOptComponents(props: props) {
  const [componentsIsOpen, setComponentsIsOpen] = useState(false);
  const { setTriangleColor, triangleColor } = props;
  return (
    <div
      className="options__components"
      onMouseOver={() => {
        setComponentsIsOpen(true);
        setTriangleColor(svgAccentColor);
      }}
      onMouseLeave={() => {
        setComponentsIsOpen(false);
        setTriangleColor(svgBlack);
      }}
    >
      <div className="components">
        <NavLink to="/components" className="components__link">
          Products
        </NavLink>

        {componentsIsOpen && (
          <ul className="components__menu">
            <li>
              <NavLink to="/products/CPU" className="components__menu-item">
                CPU
              </NavLink>
            </li>
            <li>
              <NavLink to="/products/Cooling" className="components__menu-item">
                Cooling
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products/Motherboard"
                className="components__menu-item"
              >
                Motherboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/products/RAM" className="components__menu-item">
                RAM
              </NavLink>
            </li>
            <li>
              <NavLink to="/products/Storage" className="components__menu-item">
                Storage
              </NavLink>
            </li>
            <li>
              <NavLink to="/products/GPU" className="components__menu-item">
                GPU
              </NavLink>
            </li>
            <li>
              <NavLink to="/products/PSU" className="components__menu-item">
                PSU
              </NavLink>
            </li>
            <li>
              <NavLink to="/products/Case" className="components__menu-item">
                Case
              </NavLink>
            </li>
            <li>
              <NavLink to="/products/Desktop" className="components__menu-item">
                Desktop
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
  );
}

export default NavOptComponents;
