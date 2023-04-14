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
          Components
        </NavLink>

        {componentsIsOpen && (
          <ul className="components__menu">
            <li>
              <NavLink to="/components/cpus" className="components__menu-item">
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
              <NavLink to="/components/power" className="components__menu-item">
                Power Supplies
              </NavLink>
            </li>
            <li>
              <NavLink to="/components/cases" className="components__menu-item">
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
  );
}

export default NavOptComponents;
