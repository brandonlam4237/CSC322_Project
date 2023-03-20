import Navbar from "../components/Navbar";

function Other() {
  return (
    <div>
      <Navbar isBuildNav={false} isComponentNav={false} isOtherNav={true} />{" "}
      Other
    </div>
  );
}

export default Other;
