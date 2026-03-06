import { style } from "@vanilla-extract/css";

export const LN = {
  Wrapper: style({
    boxSizing: "border-box", 
    maxWidth: "100%",
    height: "64px",
    backgroundColor: "#5729ff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px",
    color: "white",
  }),

  MenuItem: style({
    margin: "0px 60px",
    cursor: "pointer",
    selectors: {
      "&:hover": {
        color: "orange",
      },
    },
  }),
};
