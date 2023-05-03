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
  component_selection: string;
  img_url: string;
  price: number;
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

export default function Table() {
  const [partsList, setPartsList] = useState<any>({
    "CPU Cooler": {
      component_name: "CPU Cooler",
      component_selection: "Corsair RGB Pro Cooler",
      img_url: "url",
      price: 159,
    },
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
        if (partsList[`${componentName}`]) {
          return (
            <tr>
              <th>{componentName}</th>
              <td>AMD Ryzen 5600x</td>
              <td>$349.99</td>
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