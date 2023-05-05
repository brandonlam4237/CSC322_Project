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
      <section className="content">
        <div className="grid">
          <div className="grid__block">
            <div className="grid__cell-even">
              <Link to="/products/CPU" className="grid__link">
                CPUs
              </Link>
              <img src={cpu} alt="cpu" className="grid__cell-img" />
            </div>
            <div className="grid__cell-odd">
              <Link to="/products/Cooling" className="grid__link">
                CPU Coolers
              </Link>
              <img src={cooler} alt="cpu cooler" className="grid__cell-img" />
            </div>
            <div className="grid__cell-even">
              <Link to="/products/Motherboard" className="grid__link">
                Motherboards
              </Link>
              <img
                src={motherboard}
                alt="motherboard"
                className="grid__cell-img"
              />
            </div>
            <div className="grid__cell-odd">
              <Link to="/products/RAM" className="grid__link">
                Memory
              </Link>
              <img src={memory} alt="memory" className="grid__cell-img" />
            </div>
          </div>
          <div className="grid__block">
            <div className="grid__cell-odd">
              <Link to="/products/Storage" className="grid__link">
                Storage
              </Link>
              <img src={storage} alt="storage" className="grid__cell-img" />
            </div>
            <div className="grid__cell-even">
              <Link to="/products/GPU" className="grid__link">
                Video Cards
              </Link>
              <img
                src={graphics_card}
                alt="graphics card"
                className="grid__cell-img"
              />
            </div>
            <div className="grid__cell-odd">
              <Link to="/products/PSU" className="grid__link">
                Power Supplies
              </Link>
              <img
                src={power}
                alt="power supplies"
                className="grid__cell-img"
              />
            </div>
            <div className="grid__cell-even">
              <Link to="/products/Case" className="grid__link">
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
