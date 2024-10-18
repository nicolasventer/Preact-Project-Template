import { computed, effect, signal, Signal } from "@preact/signals";
import type { ColorSchemeType, DynDict, LanguageType, TranslationCategoryType } from "../Common/CommonModel";
import type { Tr } from "../tr/en";
import { SignalToValue } from "../utils/signalUtils";

/** The type of the global state of the application. */
export type GlobalState = {
	/** the color scheme of the application */
	colorScheme: Signal<ColorSchemeType>;
	/** the language of the application */
	language: Signal<LanguageType>;
	/** the translation object */
	tr: Signal<Tr>;
	/** the dynamic translation object */
	trDynDict: Signal<DynDict>;
	/** if the screen is wake locked */
	isWakeLock: Signal<boolean>;
	/** if the screen is above md */
	isAboveMd: Signal<boolean>;
	/** if the screen is below xxs */
	isBelowXxs: Signal<boolean>;
	/** the size of the viewport */
	viewportSize: Signal<{
		/** the height of the viewport */
		height: number;
		/** the width of the viewport */
		width: number;
	}>;
	/** if the document is visible */
	isDocumentVisible: Signal<boolean>;
};

type LocalStorageState = SignalToValue<Pick<GlobalState, "colorScheme" | "language">>;

const loadGlobalState = (): GlobalState => {
	const storedGlobalState = JSON.parse(localStorage.getItem("globalState") ?? "{}") as Partial<SignalToValue<LocalStorageState>>;

	return {
		colorScheme: signal(storedGlobalState.colorScheme ?? "dark"),
		language: signal(storedGlobalState.language ?? "en"),
		tr: signal({} as Tr), // temporary value
		trDynDict: signal({ mission_type: {} }),
		isWakeLock: signal(false),
		isAboveMd: signal(false),
		isBelowXxs: signal(false),
		viewportSize: signal({ height: 0, width: 0 }),
		isDocumentVisible: signal(true),
	};
};

/** The global state of the application. */
export const globalState: GlobalState = loadGlobalState();

/** The translation object. */
export const tr = {
	get v() {
		return globalState.tr.value;
	},
};

export const trFn = (word: keyof Tr) => globalState.tr.value[word] ?? word;

// TODO: these dictionaries should be loaded from the server (here simulated by getDynDict)
const _enDynDict: DynDict = {};
const _frDynDict: DynDict = {};
const getDynDict = async (language: LanguageType): Promise<DynDict> => (language === "en" ? _enDynDict : _frDynDict);

export const trDynFn = (category: TranslationCategoryType) => (word: string) =>
	globalState.trDynDict.value[category][word] ?? word;

/** If the language is loading. */
export const _isLanguageLoading = signal(false);

/** Load the translation file based on the language. */
effect(
	() => (
		(_isLanguageLoading.value = true),
		void Promise.all([
			import(/* @vite-ignore */ `../tr/${globalState.language.value}`),
			getDynDict(globalState.language.value),
		]).then(
			([{ default: tr }, dynDict]) => (
				(globalState.tr.value = tr), (globalState.trDynDict.value = dynDict), (_isLanguageLoading.value = false)
			)
		)
	)
);

const localStorageState = computed(
	(): LocalStorageState => ({
		colorScheme: globalState.colorScheme.value,
		language: globalState.language.value,
	})
);

/** "md" if the screen is above md, "sm" otherwise. */
export const smMd = computed(() => (globalState.isAboveMd.value ? "md" : "sm"));
/** "sm" if the screen is above md, "xs" otherwise. */
export const xsSm = computed(() => (globalState.isAboveMd.value ? "sm" : "xs"));
/** "compact-md" if the screen is above md, "compact-sm" otherwise. */
export const compactXsSm = computed(() => `compact-${xsSm.value}`);

effect(() => localStorage.setItem("globalState", JSON.stringify(localStorageState.value)));

effect(() => void document.body.classList.toggle("dark", globalState.colorScheme.value === "dark"));
