import { style } from "@vanilla-extract/css";

export const Searchbar = style({
  width: "776px",
  height: "52px",
  borderRadius: "15px",
  backgroundColor: "#f5f2fc",
  padding: "0px 20px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

export const FireFilledIcon = style({
  color: "#5729ff",
  fontSize: "30px",
  cursor: "pointer",
  selectors: {
    "&:hover": {
      color: "red",
    },
  },
});

export const SearchbarInput = style({
  width: "100%",
  height: "100%",
  border: "none",
  outline: "none",
  background: "none",
  margin: "0px 20px",
});
