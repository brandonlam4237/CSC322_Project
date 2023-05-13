import { useState, useEffect } from "react";
import { useAuthContext } from "src/contexts/AuthContext";
import "../scss/partpicker.scss";
import PartsTable from "src/components/PartsTable";
import Button from "src/components/Button";
import { usePartsListContext } from "src/contexts/PartsListContext";
import apiClient from "src/services/apiClient";
import PartPickerBanner from "src/components/PartPickerBanner";
export default function MyBuild() {
  const [isCompatible, setIsCompatible] = useState(true);
  const authValues = useAuthContext();
  const user = authValues.userData;
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [compatibilityIssues, setCompatibilityIssues] = useState([]);

  // partsList context vairables
  const partsListVariables = usePartsListContext();
  const setBuildForm = partsListVariables.setBuildForm;
  const buildForm = partsListVariables.buildForm;
  const partsListIds = partsListVariables.partsListIds;
  const discardBuild = partsListVariables.discardBuild;

  function handleOnTextAreaChange(
    event:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) {
    setBuildForm({
      ...buildForm,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSuggestBuild() {
    let buildId = await apiClient.createBuild(buildForm);
    await apiClient.setBuildVisible(buildId);
  }

  async function hanldeBuyBuild() {
    let buildId = await apiClient.createBuild(buildForm);
    await apiClient.checkoutBuild(buildId);
  }

  useEffect(() => {
    async function validateBuild() {
      const responseData = await apiClient.validateBuild(partsListIds);
      let incompatibilityArr = responseData.incompatibilities;
      setIsCompatible(incompatibilityArr.length == 0 ? true : false);
      setCompatibilityIssues(responseData.incompatibilities);
      setisLoading(false);
    }
    validateBuild();
  }, [partsListIds]);


  return (
    <div className="fullscreen-bg">
      {isLoading ? (
        ""
      ) : (
        <main className="mybuild__component">
          <h1 className="mybuild__component__header">
            <div className="logo__accent-left">{`<`}</div> My Custom Build{" "}
            <div className="logo__accent-right">{`>`}</div>
          </h1>
          <div className="mybuild__component__content">
            <PartPickerBanner
              compatibilityIssues={compatibilityIssues}
              isCompatible={isCompatible}
              partsListIds={partsListIds}
            />
            <PartsTable />
            {user.user_type == ("Owner" || "Employee") ? (
              <div className="build-description-container">
                <form>
                  <h3>
                    <label htmlFor="suggested-build-name">Build Name</label>
                  </h3>
                  <input
                    id="suggested-build-name"
                    className="input-field"
                    placeholder="build name"
                    name="build_name"
                    value={buildForm.build_name}
                    onChange={handleOnTextAreaChange}
                  ></input>
                  <h3>
                    <label htmlFor="suggested-build-form">
                      Build Description
                    </label>
                  </h3>
                  <textarea
                    id="suggested-build-form"
                    className="input-field"
                    placeholder="description..."
                    name="build_description"
                    value={buildForm.build_description}
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
                <Button className="red-secondary" onClick={discardBuild}>
                  Discard Build
                </Button>
              </div>
              {user.user_type == ("Owner" || "Employee") ? (
                <Button
                  className="buttons-container__submit-build black-primary"
                  onClick={handleSuggestBuild}
                >
                  Add to Featured Builds
                </Button>
              ) : (
                <Button
                  className="buttons-container__submit-build black-primary"
                  onClick={hanldeBuyBuild}
                >
                  Buy Build
                </Button>
              )}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
