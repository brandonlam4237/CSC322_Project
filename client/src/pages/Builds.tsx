import Navbar from "../components/Navbar";

function Builds() {
  return (
    <div>
      <Navbar isBuildNav={true} isComponentNav={false} isOtherNav={false} />{" "}
      Featured Builds
    </div>
  );
}

export default Builds;
