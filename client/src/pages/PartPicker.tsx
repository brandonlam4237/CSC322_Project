import { useState, useEffect } from "react";
import { useAuthContext } from "src/contexts/AuthContext";
import "../scss/partpicker.scss";
import PartsTable from "src/components/PartsTable";
import Button from "src/components/Button";
import { usePartsListContext } from "src/contexts/PartsListContext";
import apiClient from "src/services/apiClient";

export default function MyBuild() {
  const [isCompatible, setIsCompatible] = useState(true);
  const authValues = useAuthContext();
  const user = authValues.userData;
  const [isLoading, setisLoading] = useState<boolean>(true);

  const partsListVariables = usePartsListContext();
  const buildDescription = partsListVariables.buildDescription;
  const setBuildDescription = partsListVariables.setBuildDescription;
  const buildForm = partsListVariables.buildForm
  const discardBuild = partsListVariables.discardBuild;
  const [compatibilityIssues, setCompatibilityIssues] = useState([]);
  function handleOnTextAreaChange(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setBuildDescription(event.target.value);
  }

  useEffect(() => {
    async function validateBuild() {
      const responseData = await apiClient.validateBuild(
        partsListVariables.buildForm
      );
      let incompatibilityArr = responseData.incompatibilities
      setIsCompatible(incompatibilityArr.length == 0 ? true : false)
      setCompatibilityIssues(responseData.incompatibilities);
      setisLoading(false)
    }

    validateBuild();
  }, [buildForm]);

  // TODO: make this look cleaner :face_vomiting: 
  let incompatibleParts = "";
  if (compatibilityIssues.length == 2) incompatibleParts += compatibilityIssues[0] + " and " + compatibilityIssues[1]
  else {
    let size = compatibilityIssues.length
    for (let i = 0; i < size - 1; i++ ){
      incompatibleParts += compatibilityIssues[i] + ", "
    }
    incompatibleParts += "and " + compatibilityIssues[size - 1]
  }
  
  return (
    <div className="fullscreen-bg">
      
      {isLoading ? "" : 
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
              There are compatibility issues with your build! Please check: {incompatibleParts}
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
              <Button className="blue-primary">Validate Build</Button>
              <Button className="blue-secondary" onClick={discardBuild}>
                Discard Build
              </Button>
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
      </main>}
    </div>
  );
}
