import { useParams } from "react-router-dom";

function Prodcuts() {
  const { id } = useParams();
  return <div>{id}</div>;
}

export default Prodcuts;
