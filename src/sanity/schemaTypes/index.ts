import { type SchemaTypeDefinition } from "sanity";
import { categoryType } from "./category";
import { dishType } from "./dish";
import { settingsType } from "./settings";
import { dealType } from "./deal";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [dishType, categoryType, settingsType, dealType],
};
