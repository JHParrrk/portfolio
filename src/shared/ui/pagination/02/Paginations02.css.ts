import { style } from "@vanilla-extract/css";

export const P02S = {
  Wrapper: style({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    margin: "40px 0",
  }),

  ArrowButton: style({
    padding: "8px 12px",
    border: "1px solid #e0e0e0",
    borderRadius: "4px",
    backgroundColor: "white",
    fontSize: "14px",
    cursor: "pointer",
    transition: "background-color 0.2s",
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: "#fafafa",
      },
      "&:disabled": {
        color: "#bdbdbd",
        cursor: "not-allowed",
        backgroundColor: "#f5f5f5",
      },
    },
  }),

  PageNumber: style({
    width: "40px",
    height: "40px",
    border: "none",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.2s, color 0.2s",
    selectors: {
      "&:disabled": {
        cursor: "default",
      },
    },
  }),
};
