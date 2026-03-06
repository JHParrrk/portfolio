//pagination01.css.ts
import { style } from "@vanilla-extract/css";

export const PAG = {
  PagesWrapper: style({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "490px",
    gap: "10px", 
  }),
  Column: style({
    margin: "0px 50px",
  }),
  Page: style({
    width: "40px",
    height: "40px",
    textAlign: "center",
    fontSize: "1.2rem",
    lineHeight: "40px",
    background: "transparent",
    border: "none",
    borderRadius: "6px",
    selectors: {
      "&:hover:not(:disabled)": {
        background: "rgba(0, 0, 0, 0.05)",
      },
      "&:focus-visible": {
        outline: "2px solid #3b82f6", 
        outlineOffset: "2px",
      },
      "&:disabled": {
        opacity: 0.4,
      },
    },
  }),
};
