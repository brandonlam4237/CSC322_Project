import "../scss/home.scss";
import pcCase from "../assets/images/pc.png";
import comp from "../assets/images/3090.png";
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <main className="home">
      <section className="container">
        <div className="container__area-1">
          <NavLink to="/builds" className="container__link-1">
            Featured Builds
          </NavLink>
          <img src={pcCase} className="container__img-1" alt="pc" />
        </div>
        <div className="container__area-2">
          <NavLink to="/components" className="container__link-2">
            Browse Components
          </NavLink>
          <img src={comp} className="container__img-2" alt="3090" />
        </div>
      </section>
    </main>
  );
}

export default Home;
