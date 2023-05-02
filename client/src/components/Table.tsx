import "../scss/table.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
export default function Table() {
  return (
    <>
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
          <tr>
            <th>Motherboard</th>
            <td>Asus ROG B550</td>
            <td>$169.99</td>
            <td className="remove-icon">
              <FontAwesomeIcon icon={faXmark} size="xl" />
            </td>
          </tr>
          <tr>
            <th>CPU</th>
            <td>AMD Ryzen 5600x</td>
            <td>$349.99</td>
            <td className="remove-icon">
              <FontAwesomeIcon icon={faXmark} size="xl" />
            </td>
          </tr>
          <tr>
            <th>GPU</th>
            <td>MSI Ventus 3x 3070</td>
            <td>$699.99</td>
            <td className="remove-icon">
              <FontAwesomeIcon icon={faXmark} size="xl" />
            </td>
          </tr>
          <tr>
            <th>Case</th>
            <td>NZXT H510 Elite</td>
            <td>$149.99</td>
            <td className="remove-icon">
              <FontAwesomeIcon icon={faXmark} size="xl" />
            </td>
          </tr>
          <tr>
            <th>Memory</th>
            <td>component_name</td>
            <td>price</td>
            <td className="remove-icon">
              <FontAwesomeIcon icon={faXmark} size="xl" />
            </td>
          </tr>
          <tr>
            <th>CPU Cooler</th>
            <td>component_name</td>
            <td>price</td>
            <td className="remove-icon">
              <FontAwesomeIcon icon={faXmark} size="xl" />
            </td>
          </tr>
          <tr>
            <th>Storage</th>
            <td>component_name</td>
            <td>price</td>
            <td className="remove-icon">
              <FontAwesomeIcon icon={faXmark} size="xl" />
            </td>
          </tr>
          <tr>
            <th>Power Supply Unit</th>
            <td>component_name</td>
            <td>price</td>
            <td className="remove-icon">
              <FontAwesomeIcon icon={faXmark} size="xl" />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
