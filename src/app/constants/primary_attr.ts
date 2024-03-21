import { type } from "os";

export enum PrimaryAttr {
  str = "str",
  agi = "agi",
  int = "int",
  all = "all",
}

export function mapPrimaryAttrToString(primaryAttr: string) {
  switch (primaryAttr) {
    case PrimaryAttr.str:
      return "Strength";
    case PrimaryAttr.agi:
      return "Agility";
    case PrimaryAttr.int:
      return "Intelligence";
    case PrimaryAttr.all:
      return "Universal";
    default:
      return "Unknown";
  }
}
