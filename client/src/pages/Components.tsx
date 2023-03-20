import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import "../scss/components.scss";
import cpu from "../assets/images/cpu.png";
import cooler from "../assets/images/cooler.png";
import graphics_card from "../assets/images/graphicscard.png";
import memory from "../assets/images/memory.png";
import motherboard from "../assets/images/motherboard.png";
import power from "../assets/images/power.png";
import storage from "../assets/images/storage.png";
import cases from "../assets/images/cases.png";

function Components() {
  return (
    <main className="components">
      <Navbar isComponentNav={true} />
      <section className="content">
        <div className="grid">
          <div className="grid__block">
            <div className="grid__cell-even">
              <Link to="/components/cpus" className="grid__link">
                CPUs
              </Link>
              <img src={cpu} alt="cpu" className="grid__cell-img" />
            </div>
            <div className="grid__cell-odd">
              <Link to="/components/coolers" className="grid__link">
                CPU Coolers
              </Link>
              <img src={cooler} alt="cpu cooler" className="grid__cell-img" />
            </div>
            <div className="grid__cell-even">
              <Link to="/components/motherboards" className="grid__link">
                Motherboards
              </Link>
              <img
                src={motherboard}
                alt="motherboard"
                className="grid__cell-img"
              />
            </div>
            <div className="grid__cell-odd">
              <Link to="/components/memory" className="grid__link">
                Memory
              </Link>
              <img src={memory} alt="memory" className="grid__cell-img" />
            </div>
          </div>
          <div className="grid__block">
            <div className="grid__cell-odd">
              <Link to="/components/storage" className="grid__link">
                Storage
              </Link>
              <img src={storage} alt="storage" className="grid__cell-img" />
            </div>
            <div className="grid__cell-even">
              <Link to="/components/videoscards" className="grid__link">
                Video Cards
              </Link>
              <img
                src={graphics_card}
                alt="graphics card"
                className="grid__cell-img"
              />
            </div>
            <div className="grid__cell-odd">
              <Link to="/components/power" className="grid__link">
                Power Supplies
              </Link>
              <img
                src={power}
                alt="power supplies"
                className="grid__cell-img"
              />
            </div>
            <div className="grid__cell-even">
              <Link to="/components/cases" className="grid__link">
                Cases
              </Link>
              <img src={cases} alt="cases" className="grid__cell-img" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Components;
