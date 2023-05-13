import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

interface RatingProps {
  name?: string;
  ratingCaption?: string;
  defaultRatingValue?: number | null;
  disabled?: boolean;
  readOnly?: boolean;
  setRating?: (value: number | null) => void;
}

export default function BasicRating(props: RatingProps) {
  const {
    name,
    disabled = false,
    readOnly = false,
    ratingCaption = "",
    defaultRatingValue = null,
    setRating = (value) => {
      /*do nothing*/
    },
  } = props;

  const [value, setValue] = React.useState<number | null>(defaultRatingValue);
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Typography component="legend"> {ratingCaption} </Typography>
      <Rating
        name={name}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          setRating(newValue);
        }}
        disabled={disabled}
        readOnly={readOnly}
      />
    </Box>
  );
}
