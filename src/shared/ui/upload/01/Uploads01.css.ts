import { style } from "@vanilla-extract/css";

export const UploadImage = style({
  width: "78px",
  height: "78px",
  marginRight: "24px",
  cursor: "pointer",
  objectFit: "cover", 
});

export const UploadButton = style({
  width: "78px",
  height: "78px",
  backgroundColor: "#bdbdbd",
  marginRight: "24px",
  outline: "none",
  border: "none",
  cursor: "pointer",
});

export const UploadFileHidden = style({
  display: "none",
});

export const DeleteButton = style({
  position: "absolute",
  top: "4px",
  right: "28px",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  color: "#fff",
  border: "none",
  borderRadius: "50%",
  width: "20px",
  height: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "bold",
  lineHeight: "1",
  selectors: {
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
  },
});
