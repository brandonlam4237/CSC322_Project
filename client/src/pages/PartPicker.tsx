import { useState, useEffect } from "react";
import { useAuthContext } from "src/contexts/AuthContext";
import "../scss/partpicker.scss";
import "../scss/checkbox.scss";
import PartsTable from "src/components/PartsTable";
import Button from "src/components/Button";
import { usePartsListContext } from "src/contexts/PartsListContext";
import apiClient from "src/services/apiClient";
import PartPickerBanner from "src/components/PartPickerBanner";
import BasicRating from "src/components/BasicRating";
export default function MyBuild() {
  // Set compatibility before loading up the page
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [isCompatible, setIsCompatible] = useState(true);
  const [compatibilityIssues, setCompatibilityIssues] = useState([]);
  // if a customer wishes to suggest a build as they buy
  const [isChecked, setIsChecked] = useState(false);
  // to pass down to rating component in order to rate build
  const [rating, setRating] = useState<number | null>(0);
  // auth context variables
  const authValues = useAuthContext();
  const user = authValues.userData;
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

  function handleCheckBox() {
    if (isChecked) {
      setBuildForm({
        ...buildForm,
        build_name: "place holder name",
        build_description: "place holder description",
      });
    } else {
      setBuildForm({
        ...buildForm,
        build_name: "",
        build_description: "",
      });
    }
    setIsChecked(!isChecked);
  }

  async function handleSuggestBuild() {
    let buildIdObject = await apiClient.createBuild(buildForm);
    // if the user happens to be also customer then buy the build
    if (user.user_type == "Customer")
      await apiClient.checkoutBuild(buildIdObject.build_id);

    if (rating != 0 && typeof rating === "number")
      await apiClient.rateBuild(buildIdObject.build_id, rating);

    await apiClient.setBuildVisible(buildIdObject.build_id);
  }

  async function hanldeBuyBuild() {
    let buildIdObject = await apiClient.createBuild(buildForm);
    console.log(buildIdObject)
    if (rating != 0 && typeof rating === "number")
      await apiClient.rateBuild(buildIdObject.build_id, rating);

    await apiClient.checkoutBuild(buildIdObject.build_id);
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

            {user.user_type == "Customer" && (
              <div className="customer-options">
                <BasicRating
                  name="read-only"
                  ratingCaption="You're Honest Rating :)"
                  defaultRatingValue={rating}
                  setRating={setRating}
                />
                <label htmlFor="checkbox1">
                  <input
                    id="checkbox1"
                    name="checkbox"
                    type="checkbox"
                    checked={isChecked}
                    onClick={handleCheckBox}
                  />
                  Check this box if you'd like to share your build!
                </label>
              </div>
            )}

            {user.user_type == ("Owner" || "Employee") ||
              (isChecked && (
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
              ))}
            <div className="buttons-container">
              <div className="buttons-container__save-options">
                <Button className="blue-primary">Validate Build</Button>
                <Button className="red-secondary" onClick={discardBuild}>
                  Discard Build
                </Button>
              </div>
              {user.user_type == ("Owner" || "Employee") || isChecked ? (
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
