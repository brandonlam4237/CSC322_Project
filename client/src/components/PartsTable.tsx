import "../scss/table.scss";
import {
  usePartsListContext,
} from "src/contexts/PartsListContext";
import PartsTableRow from "./PartsTableRow";

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

interface IRowHeaders {
  [key: string]: string;
}
const rowHeaders: IRowHeaders = {
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
        {partsCategoryArray.map((categoryName: string, index: number) => {
          return (
            <PartsTableRow
              rowHeader={rowHeaders[categoryName]}
              part={partsList[categoryName]}
              removePart={removePart}
              key={index}
              categoryName={categoryName}
            />
          );
        })}
      </tbody>
    </table>
  );
}
