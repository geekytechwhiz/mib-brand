import { styled } from "@mui/material/styles";
import { Select } from "@mui/material";

export default styled(Select)(({ theme, ownerState }) => {
  const { palette, functions } = theme;
  const { error, success, disabled } = ownerState;

  const {
    grey,
    transparent,
    error: colorError,
    success: colorSuccess,
  } = palette;
  const { pxToRem } = functions;

  // styles for the input with error={true}
  const errorStyles = () => ({
    backgroundRepeat: "no-repeat",
    backgroundPosition: `right ${pxToRem(12)} center`,
    backgroundSize: `${pxToRem(16)} ${pxToRem(16)}`,

    "& .Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline, &:after": {
        borderColor: colorError.main,
      },
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: colorError.main,
    },
  });

  // styles for the input with success={true}
  const successStyles = () => ({
    backgroundRepeat: "no-repeat",
    backgroundPosition: `right ${pxToRem(12)} center`,
    backgroundSize: `${pxToRem(16)} ${pxToRem(16)}`,

    "& .Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline, &:after": {
        borderColor: colorSuccess.main,
      },
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: colorSuccess.main,
    },
  });

  return {
    backgroundColor: disabled ? `${grey[200]} !important` : transparent.main,
    pointerEvents: disabled ? "none" : "auto",
    ...(error && errorStyles()),
    ...(success && successStyles()),
  };
});
