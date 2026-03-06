import { style } from "@vanilla-extract/css";

export const CBW = {
  Wrapper: style({
    width: "1200px",
    margin: "0px 100px",
  }),

  PencilIcon: style({}),

  InputWrapper: style({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "40px",
    marginBottom: "20px",
  }),

  ContentsWrapper: style({
    border: "1px solid lightgray",
  }),

  Input: style({
    width: "180px",
    height: "52px",
    paddingLeft: "20px",
    border: "1px solid lightgray",
    marginRight: "20px",
  }),

  Contents: style({
    width: "100%",
    minHeight: "108px",
    padding: "20px",
    border: "none",
    borderBottom: "1px solid lightgray",
  }),

  BottomWrapper: style({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  }),

  ContentsLength: style({
    width: "100%",
    height: "51px",
    lineHeight: "51px",
    paddingLeft: "20px",
    color: "gray",
  }),

  Button: style({
    width: "91px",
    height: "51px",
    backgroundColor: "black",
    color: "white",
    cursor: "pointer",
  }),

  CancelIcon: style({
    width: "24px",
    height: "24px",
    marginLeft: "340px",
    cursor: "pointer",
  }),

  Star: style({
    fontSize: "24px", 
    color: "#ffd700", 
    marginLeft: "15px",
  }),
};
