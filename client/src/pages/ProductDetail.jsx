import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../scss/productDetails.scss";

const fields = {
  Case: ["Case Type", "Color", "Max Motherboard Size"],
  Cooling: [
    "Compatible Intel Sockets",
    "Compatible AMD Sockets",
    "Power Consumption",
    "Radiator Size",
    "Radiator Material",
    "LED Color",
    "Fan Size",
    "Fan System",
    "Fan Bearing",
    "Fan Speed",
  ],
  GPU: [
    "Form Factor",
    "GPU Manufacturer",
    "Number of GPUs",
    "GPU Chipset",
    "Overclocked",
    "Core Clock Speed",
    "CUDA Processors",
  ],
  Motherboard: ["Chipset", "AMD CPU Support", "Socket Type", "Form Factor"],
  PSU: ["Wattage", "Form Factor", "Color", "Modular"],
};

function ProductDetail() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [specKeys, setSpecKeys] = useState([]);
  const [specVals, setSpecVals] = useState([]);

  useEffect(() => {
    fetchDetails();
  }, []);

  async function fetchDetails() {
    const details = await fetch("/items/" + id);
    const detailsJSON = await details.json();
    const specsArr = fields[detailsJSON.products.category];

    let specObj = {};
    specsArr.forEach((spec) => {
      specObj[spec] = detailsJSON.products.specs[spec];
    });

    const specKeysArr = [];
    const specValsArr = [];

    for (const key in specObj) {
      specKeysArr.push(key);
      specValsArr.push(specObj[key]);
    }

    console.log(specKeysArr);
    console.log(specValsArr);

    setSpecKeys(specKeysArr);
    setSpecVals(specValsArr);
    setProductDetails(detailsJSON.products);
    setLoading(false);
  }

  return (
    <main className="productDetails">
      {!loading && (
        <div>
          <div>{productDetails.price}</div>
          <div>{productDetails.product_name}</div>
          <div>{productDetails.brand}</div>
          <img
            className="productDetails__img"
            src="https://90a1c75758623581b3f8-5c119c3de181c9857fcb2784776b17ef.ssl.cf2.rackcdn.com/660700_520452_01_front_zoom.jpg"
          />
          {specKeys.map((specKey, idx) => {
            return <div key={idx}>{`${specKey} : ${specVals[idx]}`}</div>;
          })}
        </div>
      )}
    </main>
  );
}

export default ProductDetail;
