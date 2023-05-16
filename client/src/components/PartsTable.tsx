import "../scss/table.scss";
import { IPart, usePartsListContext } from "src/contexts/PartsListContext";
import PartsTableRow from "./PartsTableRow";
import { useAuthContext } from "src/contexts/AuthContext";

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
  const partsListIds = partsListVariables.partsListIds;
  const removePart = partsListVariables.removePart;
  // auth context
  const user = useAuthContext().userData;
  // Compute total price of all the parts so far
  let totalPrice: number = 0;
  partsCategoryArray.forEach((categoryName: string) => {
    totalPrice += Number(partsList[categoryName].price);
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
      {Object.keys(partsListIds).length > 0 && (
        <tfoot>
          <tr  >
            <th >
              <p>Total Price</p>
            </th>
            <td></td>
            <th >
              {user.has_discount ? (
                <>
                  <p className="original-price">
                    ${Number(totalPrice).toFixed(2)}
                  </p>
                  <p className="discount">${Number(totalPrice*0.9).toFixed(2)}</p>
                </>
              ) : (
                <p>{Number(totalPrice).toFixed(2)}</p>
              )}
            </th>
            <td></td>
          </tr>
        </tfoot>
      )}
    </table>
  );
}
