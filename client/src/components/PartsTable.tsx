import "../scss/table.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import { useState } from "react";
import { Link } from "react-router-dom";

const PartsPathArray: string[] = [
  "cpus",
  "coolers",
  "motherboards",
  "memory",
  "storage",
  "videocards",
  "power",
  "cases",
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

interface Part {
  component_name: string;
  product_name: string;
  image_url: string;
  price: number;
  isAdded:Boolean
}

interface PartsList {
  CPU: Part;
  "CPU Cooler": Part;
  Motherboard: Part;
  Memory: Part;
  Storage: Part;
  "Video Card": Part;
  "Power Supply": Part;
  Case: Part;
}

const partTemplate : Part = {
  component_name: "",
  product_name: "",
  image_url: "",
  price: -1,
  isAdded:false,
}

export default function PartsTable() {
  const [partsList, setPartsList] = useState<PartsList>({
    CPU: partTemplate,
    "CPU Cooler": {
      component_name: "CPU Cooler",
      product_name: "iCUE H100i ELITE CAPELLIX XT 240mm All in One Liquid CPU Cooling Kit",
      image_url: "url",
      price: 159.99,
      isAdded:true,
    },
    Motherboard:partTemplate,
    Memory:partTemplate,
    Storage:partTemplate,    
    "Video Card": {
      component_name: "Video Card",
      product_name:
        "NVIDIA GeForce RTX 4080 AERO Overclocked Triple Fan 16GB GDDR6X PCIe 4.0 Graphics Card",
      image_url:
        "https://90a1c75758623581b3f8-5c119c3de181c9857fcb2784776b17ef.ssl.cf2.rackcdn.com/660700_520452_01_front_zoom.jpg",
      price: 1199.99,
      isAdded:true,
    },
    "Power Supply":partTemplate,
    Case:partTemplate
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
        <TableBody partsList={partsList} />
      </tbody>
    </table>
  );
}

function TableBody({ partsList }: any) {
  return (
    <>
      {componentNames.map((componentName, index) => {
        if (partsList[`${componentName}`].isAdded) {
          return (
            <tr>
              <th>{componentName}</th>
              <td>{partsList[`${componentName}`].product_name}</td>
              <td>${partsList[`${componentName}`].price}</td>
              <td className="remove-icon">
                <FontAwesomeIcon icon={faXmark} size="xl" />
              </td>
            </tr>
          );
        } else {
          return (
            <tr>
              <th>{componentName}</th>
              <td>
                <Link to={`/components/${PartsPathArray[index]}`}>
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
