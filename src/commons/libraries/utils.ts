export const getDate = (date: any) => {
  const _date = new Date(date);
  const yyyy = _date.getFullYear();
  const mm = _date.getMonth() + 1;
  const dd = _date.getDate();
  return `${yyyy}-${mm}-${dd}`;
};

export const dataURLtoFile = (
  dataurl: string,
  filename = "image.png"
): File => {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] ?? "";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};
