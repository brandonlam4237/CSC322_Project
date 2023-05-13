import Box from "./Box";
interface PartPickerBannerProps {
  compatibilityIssues: string[];
  isCompatible: boolean;
  partsListIds: any;
}

export default function PartPickerBanner({
  compatibilityIssues,
  isCompatible,
  partsListIds,
}: PartPickerBannerProps) {
  function getIncompatiblePartsString() {
    let incompatibleParts = "";
    if (compatibilityIssues.length == 1)
      incompatibleParts += compatibilityIssues[0];
    else if (compatibilityIssues.length == 2)
      incompatibleParts +=
        compatibilityIssues[0] + " and " + compatibilityIssues[1];
    else {
      let size = compatibilityIssues.length;
      for (let i = 0; i < size - 1; i++) {
        incompatibleParts += compatibilityIssues[i] + ", ";
      }
      incompatibleParts += "and " + compatibilityIssues[size - 1];
    }
    return incompatibleParts;
  }
  return (
    <>
      {Object.keys(partsListIds).length == 0 ? (
        <Box color="blue" isBold={true} isRound={true}>
          Start by adding parts to your build!
        </Box>
      ) : isCompatible ? (
        <Box color={"green"} isBold={true} isRound={true}>
          There are no compatibility issues with your build!
        </Box>
      ) : (
        <Box color="red" isBold={true} isRound={true}>
          There are compatibility issues with your build! Please check:{" "}
          {getIncompatiblePartsString()}
        </Box>
      )}
    </>
  );
}
