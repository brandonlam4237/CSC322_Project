import { useState } from "react";
import { useAuthContext } from "src/contexts/AuthContext";
import "../scss/partpicker.scss";
import PartsTable from "src/components/PartsTable";
import Button from "src/components/Button";
import { usePartsListContext } from "src/contexts/PartsListContext";

export default function MyBuild() {
  const [isCompatible, setIsCompatible] = useState(true);
  const authValues = useAuthContext();
  const user = authValues.userData;
  const [isLoading, setisLoading] = useState<boolean>(true);

  const partsListVariables = usePartsListContext()
  const buildDescription = partsListVariables.buildDescription
  const setBuildDescription = partsListVariables.setBuildDescription

  function handleOnTextAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>){
    setBuildDescription(event.target.value)
  }
  return (
    <div className="fullscreen-bg">
      <main className="mybuild__component">
        <h1 className="mybuild__component__header">
          <div className="logo__accent-left">{`<`}</div> My Custom Build{" "}
          <div className="logo__accent-right">{`>`}</div>
        </h1>
        <div className="mybuild__component__content">
          {isCompatible ? (
            <p className="compatibility-banner compatible">
              There are no compatibility issues with your build!
            </p>
          ) : (
            <p className="compatibility-banner incompatible">
              There are compatibility issues with your build! Please check: CPU,
              Motherboard
            </p>
          )}
          <PartsTable />
          {user.user_type == ("Owner" || "Employee") ? (
            <div className="build-description-container">
              <form>
                <h3>
                  <label htmlFor="suggested-build-form">
                    Build Description
                  </label>
                </h3>
                <textarea
                  id="suggested-build-form"
                  className="input-field"
                  placeholder="description..."
                  value={buildDescription}
                  onChange={handleOnTextAreaChange}
                ></textarea>
              </form>
            </div>
          ) : (
            ""
          )}
          <div className="buttons-container">
            <div className="buttons-container__save-options">
              <Button className="blue-primary">Save Build</Button>
              <Button className="blue-secondary">Discard</Button>
            </div>
            {user.user_type == ("Owner" || "Employee") ? (
              <Button className="buttons-container__submit-build black-primary">
                Add to Featured Builds
              </Button>
            ) : (
              <Button className="buttons-container__submit-build black-primary">
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
