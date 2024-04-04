export const isPriceSelected = (
  paramentroUrl1: number,
  paramentroUrl2: number,
  min: number,
  max: number
) => (paramentroUrl1 == min && paramentroUrl2 == max ? "checked" : "");
