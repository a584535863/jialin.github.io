import { Storage } from "./storage";

export const root = "https://m9l6.github.io/";

let isLight = Storage.get("isLight");
if (isLight === null) {
  isLight = true;
} else {
  isLight = isLight === "open";
}

export const config = {
  isLight: isLight,
  lightColor: "#fff",
  darkColor: "#000",
};
