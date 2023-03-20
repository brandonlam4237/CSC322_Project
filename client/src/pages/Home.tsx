import Navbar from "../components/Navbar";
import "../scss/home.scss";
import pcCase from "../assets/images/pc.png";
import comp from "../assets/images/3090.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home">
      <Navbar isBuildNav={false} isComponentNav={false} isOtherNav={false} />
      <section className="container">
        <div className="container__area-1">
          <Link to="/builds" className="container__link-1">
            Featured Builds
          </Link>
          <img src={pcCase} className="container__img-1" alt="pc" />
        </div>
        <div className="container__area-2">
          <Link to="/components" className="container__link-2">
            Browse Components
          </Link>
          <img src={comp} className="container__img-2" alt="3090" />
        </div>
      </section>
    </main>
  );
}

export default Home;
