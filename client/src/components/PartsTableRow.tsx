import "../scss/table.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import { Link } from "react-router-dom";
import { IPart } from "src/contexts/PartsListContext";

interface TableRowProps {
  rowHeader: string;
  part: IPart;
  categoryName: string;
  removePart: (value: IPart) => void;
}
export default function PartsTableRow({
  rowHeader,
  part,
  categoryName,
  removePart,
}: TableRowProps) {
  return (
    <>
      {part.isAdded ? (
        <tr>
          <th className="row-header">{rowHeader}</th>
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
      ) : (
        <tr>
          <th className="row-header">{rowHeader}</th>
          <td>
            <Link to={`/products/${categoryName}`}>
              <Button className="blue-primary">
                <FontAwesomeIcon icon={faPlus} size="lg" /> Choose a {rowHeader}
              </Button>
            </Link>
          </td>
          <td></td>
          <td></td>
        </tr>
      )}
    </>
  );
}
