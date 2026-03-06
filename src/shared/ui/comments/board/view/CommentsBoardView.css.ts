import { style } from "@vanilla-extract/css";

export const CBV = {
  ItemWrapper: style({
    width: "1200px",
    margin: "0px 100px",
    paddingTop: "20px",
    height: "128px",
    borderBottom: "1px solid lightgray",
  }),

  FlexWrapper: style({
    display: "flex",
    flexDirection: "row",
  }),

  Avatar: style({
    width: "48px",
    height: "48px",
  }),

  MainWrapper: style({
    width: "100%",
    paddingLeft: "10px",
  }),

  WriterWrapper: style({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  }),

  Writer: style({
    fontSize: "20px",
    fontWeight: "bold",
  }),

  Contents: style({}),

  OptionWrapper: style({
    display: "flex",
    flexDirection: "row",
  }),

  UpdateIcon: style({
    width: "24px",
    height: "24px",
    cursor: "pointer",
  }),

  DeleteIcon: style({
    width: "24px",
    height: "24px",
    cursor: "pointer",
  }),

  DateString: style({
    color: "lightgray",
    paddingTop: "15px",
    paddingLeft: "60px",
  }),

  Star: style({
    paddingLeft: "20px",
  }),

  PasswordModal: style({}),

  PasswordInput: style({
    width: "100%",
    marginTop: "10px",
  }),
};
