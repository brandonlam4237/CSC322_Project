import "../scss/table.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import { Link } from "react-router-dom";
import {
  usePartsListContext,
  IPartsList,
  IPart,
} from "src/contexts/PartsListContext";

const partsCategoryArray: string[] = [
  "CPU",
  "Cooling",
  "Motherboard",
  "RAM",
  "Storage",
  "GPU",
  "PSU",
  "Case",
];

interface IRowHeader {
  [key: string]: string;
}
const rowHeader: IRowHeader = {
  CPU: "CPU",
  Cooling: "CPU Cooler",
  Motherboard: "Motherboard",
  RAM: "Memory",
  Storage: "Storage",
  GPU: "Video Card",
  PSU: "Power Supply",
  Case: "Case",
};

export default function PartsTable() {
  const partsListVariables = usePartsListContext();
  const partsList = partsListVariables.partsList;
  const setPartsList = partsListVariables.setPartsList;
  const removePart = partsListVariables.removePart;
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
        <TableBody
          partsList={partsList}
          setPartsList={setPartsList}
          removePart={removePart}
        />
      </tbody>
    </table>
  );
}

interface TableBodyProps {
  partsList: IPartsList;
  setPartsList: (value: IPartsList) => void;
  removePart: (value: IPart) => void;
}

function TableBody({ partsList, setPartsList, removePart }: TableBodyProps) {
  return (
    <>
      {partsCategoryArray.map((categoryName, index) => {
        const part: IPart = partsList[categoryName];
        if (part.isAdded) {
          return (
            <tr>
              <th className="row-header">{rowHeader[categoryName]}</th>
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
              <th className="row-header">{rowHeader[categoryName]}</th>
              <td>
                <Link to={`/products/${partsCategoryArray[index]}`}>
                  <Button className="blue-primary">
                    <FontAwesomeIcon icon={faPlus} size="lg" /> Choose a{" "}
                    {categoryName}
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
