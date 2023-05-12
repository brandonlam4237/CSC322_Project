import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../scss/productDetails.scss";
import Button from "src/components/Button";
import comment from "../assets/icons/comment.png";
import apiClient from "src/services/apiClient";
import { usePartsListContext } from "src/contexts/PartsListContext";
import CommentsModal from "src/components/CommentsModal";
import { useAuthContext } from "src/contexts/AuthContext";

const fields = {
  Case: ["Case Type", "Color", "Max Motherboard Size", "Height", "Width"],
  Cooling: [
    "Compatible Intel Sockets",
    "Compatible AMD Sockets",
    "Power Consumption",
    "Radiator Size",
    "Radiator Material",
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
  Motherboard: [
    "Chipset",
    "AMD CPU Support",
    "Socket Type",
    "Form Factor",
    "Width",
  ],
  PSU: ["Wattage", "Form Factor", "Color", "Modular", "Height", "Width"],
  CPU: ["VR Ready", "Processor Type", "Cores", "CPU Core", "Memory Type"],
  RAM: [
    "Memory Type",
    "Memory Speed",
    "Memory Speed (MHz)",
    "Memory Capacity",
    "Memory Channels",
    "Memory Profiles",
    "Number of Modules",
    "Voltage",
    "Memory Heatsink",
  ],

  Storage: [
    "Capacity",
    "Read Speed",
    "Write Speed",
    "Interface",
    "Form Factor",
  ],
  Desktop: [
    "CPU Summary",
    "Cores",
    "Chipset",
    "Total Memory",
    "GPU Type",
    "Heatsink",
    "SSD Capacity",
    "HD Capacity",
    "Turbo Boost Speed",
    "Power Supply",
  ],
};

function ProductDetail() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [specKeys, setSpecKeys] = useState([]);
  const [specVals, setSpecVals] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);

  const user = useAuthContext().userData;

  useEffect(() => {
    fetchDetails();
  }, []);

  async function fetchDetails() {
    const details = await fetch("/items/" + id);
    const detailsJSON = await details.json();
    const specsArr = fields[detailsJSON.product.category];

    let specObj = {};
    specsArr.forEach((spec) => {
      specObj[spec] = detailsJSON.product.specs[spec];
    });

    const specKeysArr = [];
    const specValsArr = [];

    for (const key in specObj) {
      if (specObj[key]) {
        specValsArr.push(specObj[key]);
      } else {
        specValsArr.push("");
      }
      specKeysArr.push(key);
    }

    setSpecKeys(specKeysArr);
    setSpecVals(specValsArr);
    setProductDetails(detailsJSON.product);
    setLoading(false);
  }

  async function handleAddCart() {
    await apiClient.addToCart(productDetails.id);
  }

  const partsListVariables = usePartsListContext();
  const addPartToBuild = partsListVariables.addPart;

  function handleAddBuild() {
    const part = {
      id: productDetails.id,
      product_name: productDetails.product_name,
      price: Number(productDetails.price),
      image_url: productDetails.image_url,
      component_name: productDetails.category,
      isAdded: true,
    };
    addPartToBuild(part);
  }
  return (
    <main className="productDetails">
      {!loading && (
        <div className="productDetails__container">
          <div className="productDetails__card-front">
            <img
              className="productDetails__img"
              src={productDetails.image_url}
            />
          </div>
          <div className="productDetails__card-back">
            <div>
              <div className="productDetails__name">
                {productDetails.product_name}
              </div>
              <div className="productDetails__brand">
                {productDetails.brand}
              </div>
              <div className="productDetails__price">
                {"$" + productDetails.price}
              </div>
            </div>

            <div className="productDetails__specs">
              {specKeys.map((specKey, idx) => {
                return specVals[idx] ? (
                  <div key={idx}>{`${specKey}: ${specVals[idx]}`}</div>
                ) : (
                  <></>
                );
              })}
            </div>
            {user.is_active && user.user_type !== "Visitor" && (
              <div className="productDetails__btns">
                <Button className="blue-primary" onClick={handleAddCart}>
                  Add to cart
                </Button>
                {productDetails.category != "Desktop" ? (
                  <Link to="/mybuild">
                    <Button className="black-primary" onClick={handleAddBuild}>
                      Add to build
                    </Button>
                  </Link>
                ) : (
                  <></>
                )}
              </div>
            )}
            <div
              className="productDetails__comment"
              onClick={() => {
                setCommentsOpen(true);
              }}
            >
              <img className="productDetails__comment-icon" src={comment} />
              <div>Leave a comment</div>
            </div>
          </div>
          {commentsOpen && (
            <CommentsModal
              closeModal={() => {
                setCommentsOpen(false);
              }}
              productId={id}
            />
          )}
        </div>
      )}
    </main>
  );
}

export default ProductDetail;
