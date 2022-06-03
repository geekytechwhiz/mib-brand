import borders from "assets/theme/base/borders";
import colors from "assets/theme/base/colors";
import linearGradient from "assets/theme/functions/linearGradient";

const { borderColor } = borders;
const { info } = colors;

const checkbox = {
  styleOverrides: {
    root: {
      borderRadius: 5,
      width: 16,
      height: 16,
      boxShadow:
        "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
      backgroundColor: "#f5f8fa",
      backgroundImage:
        "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
      ".Mui-focusVisible &": {
        outline: "2px auto rgba(19,124,189,.6)",
        outlineOffset: 2,
      },
      "input:hover ~ &": {
        backgroundColor: "#ebf1f5",
      },
      "input:disabled ~ &": {
        boxShadow: "none",
        background: "rgba(206,217,224,.5)",
      },
    },

    colorPrimary: {
      color: borderColor,

      "&.Mui-checked": {
        color: info.main,

        "& .MuiSvgIcon-root": {
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 -1 22 22"%3e%3cpath fill="none" stroke="%23fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 10l3 3l6-6"/%3e%3c/svg%3e"), ${linearGradient(
            info.main,
            info.main
          )}`,
          borderColor: info.main,
        },
      },
    },

    colorSecondary: {
      color: borderColor,

      "& .MuiSvgIcon-root": {
        color: info.main,
        "&.Mui-checked": {
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 -1 22 22"%3e%3cpath fill="none" stroke="%23fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 10l3 3l6-6"/%3e%3c/svg%3e"), ${linearGradient(
            info.main,
            info.main
          )}`,
          borderColor: info.main,
        },
      },
    },
  },
};

export default checkbox;
