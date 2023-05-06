import "../scss/table.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import { useState } from "react";
import { Link } from "react-router-dom";

const PartsPathArray: string[] = [
  "CPU",
  "Cooling",
  "Motherboard",
  "RAM",
  "Storage",
  "GPU",
  "PSU",
  "Case",
];

const componentNames: string[] = [
  "CPU",
  "CPU Cooler",
  "Motherboard",
  "Memory",
  "Storage",
  "Video Card",
  "Power Supply",
  "Case",
];

interface IPart {
  component_name: string;
  product_name: string;
  image_url: string;
  price: number;
  isAdded: Boolean;
}

interface IPartsList {
  /* enclosing CPU and denoting its type as string prevents implicit type
  any on keys error when using a string to access as a key to access the object */
  [CPU: string]: IPart;
  "CPU Cooler": IPart;
  Motherboard: IPart;
  Memory: IPart;
  Storage: IPart;
  "Video Card": IPart;
  "Power Supply": IPart;
  Case: IPart;
}

const partTemplate: IPart = {
  component_name: "",
  product_name: "",
  image_url: "",
  price: -1,
  isAdded: false,
};

export default function PartsTable() {
  const [partsList, setPartsList] = useState<IPartsList>({
    CPU: partTemplate,
    "CPU Cooler": {
      component_name: "CPU Cooler",
      product_name:
        "iCUE H100i ELITE CAPELLIX XT 240mm All in One Liquid CPU Cooling Kit",
      image_url:
        "https://www.microcenter.com/endeca/zoomFullScreen.aspx?src=662683_537092_01_package_comping-jpg",
      price: 159.99,
      isAdded: true,
    },
    Motherboard: partTemplate,
    Memory: partTemplate,
    Storage: partTemplate,
    "Video Card": {
      component_name: "Video Card",
      product_name:
        "NVIDIA GeForce RTX 4080 AERO Overclocked Triple Fan 16GB GDDR6X PCIe 4.0 Graphics Card",
      image_url:
        "https://90a1c75758623581b3f8-5c119c3de181c9857fcb2784776b17ef.ssl.cf2.rackcdn.com/660700_520452_01_front_zoom.jpg",
      price: 1199.99,
      isAdded: true,
    },
    "Power Supply": partTemplate,
    Case: partTemplate,
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Part</th>
          <th>Selection</th>
          <th>Price</th>
          <th></th>
        </tr>
      </thead>
      <br />
      <tbody>
        <TableBody partsList={partsList} setPartsList={setPartsList} />
      </tbody>
    </table>
  );
}

interface TableBodyProps {
  partsList: IPartsList;
  setPartsList: (part: IPartsList) => void;
}
function TableBody({ partsList, setPartsList }: TableBodyProps) {
  function removePart(part: IPart) {
    const componentToRemove: string = part.component_name;
    setPartsList({
      ...partsList,
      [componentToRemove]: partTemplate,
    });
  }

  function addPart(part: IPart) {
    const componentToAdd: string = part.component_name;
    setPartsList({
      ...partsList,
      [componentToAdd]: part,
    });
  }

  return (
    <>
      {componentNames.map((componentName, index) => {
        const part: any = partsList[`${componentName}`];
        if (part.isAdded) {
          return (
            <tr>
              <th className="row-header">{componentName}</th>
              <td>{part.product_name}</td>
              <td>${part.price}</td>
              <td className="remove-icon">
                <FontAwesomeIcon
                  icon={faXmark}
                  size="xl"
                  onClick={() => removePart(part)}
                />
              </td>
            </tr>
          );
        } else {
          return (
            <tr>
              <th className="row-header">{componentName}</th>
              <td>
                <Link to={`/products/${PartsPathArray[index]}`}>
                  <Button className="blue-primary">
                    <FontAwesomeIcon icon={faPlus} size="lg" /> Choose a{" "}
                    {componentName}
                  </Button>
                </Link>
              </td>
              <td></td>
              <td></td>
            </tr>
          );
        }
      })}
    </>
  );
}
