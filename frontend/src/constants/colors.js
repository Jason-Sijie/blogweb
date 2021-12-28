import {hashCode} from "../utils/object";

export const badgeColors = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "dark"
];

export const randomBadgeColor = () => {
  const idx = Math.floor(Math.random() * badgeColors.length);
  return badgeColors[idx];
}

export const getBadgeColor = (str) => {
  const idx = hashCode(str) % badgeColors.length;
  return badgeColors[idx];
}
