import { Type as t, type TSchema } from "@sinclair/typebox";
import { checkEnumObj } from "./CommonUtils";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Nullable = <T extends TSchema>(type: T) => t.Union([type, t.Null()]);

/** Color scheme values */
export const COLOR_SCHEMES = ["light", "dark"] as const;
/**
 * Color scheme object
 * @enum
 */
export const COLOR_SCHEMES_OBJ = {
	/** Light color scheme */
	light: "light",
	/** Dark color scheme */
	dark: "dark",
} as const;
/** Color scheme type */
export type ColorSchemeType = (typeof COLOR_SCHEMES)[number];
checkEnumObj<ColorSchemeType>(COLOR_SCHEMES_OBJ);

/** Language values */
export const LANGUAGES = ["en", "fr"] as const;
/**
 * Language object
 * @enum
 */
export const LANGUAGES_OBJ = {
	/** English language */
	en: "en",
	/** French language */
	fr: "fr",
} as const;
/** Language type */
export type LanguageType = (typeof LANGUAGES)[number];
checkEnumObj<LanguageType>(LANGUAGES_OBJ);

/** Translation categories */
export const TRANSLATION_CATEGORIES = [] as const;
/**
 * Translation category object
 * @enum
 */
export const TRANSLATION_CATEGORIES_OBJ = {} as const;
/** Translation category type */
export type TranslationCategoryType = (typeof TRANSLATION_CATEGORIES)[number];
checkEnumObj<TranslationCategoryType>(TRANSLATION_CATEGORIES_OBJ);

/** Dynamic translation dictionary */
export type DynDict = Record<TranslationCategoryType, Record<string, string>>;
