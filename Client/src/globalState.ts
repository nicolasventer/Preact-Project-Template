import { api } from "@/api/api";
import type { RecursiveReadOnlySignal, SignalToValue } from "@/libs/StrongBox/signalUtils";
import type { ColorSchemeType, DynDict, LanguageType, TranslationCategoryType } from "@/Shared/SharedModel";
import type { Tr } from "@/tr/en";
import { computed, effect, signal, Signal } from "@preact/signals";

/** the key of the local storage */
export const LOCAL_STORAGE_KEY = "template_globalState" as const;

/** The type of the global state of the application. */
export type GlobalState = {
	/** the color scheme of the application */
	colorScheme: Signal<ColorSchemeType>;
	/** the language of the application */
	language: Signal<LanguageType>;
	/** if the console is displayed */
	isConsoleDisplayed: Signal<boolean>;
	/** the height of the console */
	consoleHeight: Signal<number>;
	/** @ignore */
	tr: Signal<Tr>;
	/** the dynamic translation object */
	trDynDict: Signal<DynDict<string>>;
};

type LocalStorageState = SignalToValue<Pick<GlobalState, "colorScheme" | "language" | "isConsoleDisplayed" | "consoleHeight">>;

const defaultDynDict: DynDict<string> = { en: { test: {} }, fr: { test: {} } };

/**
 * Load the global state from the local storage. Can be called to fully set the global state.
 * @returns The new global state. Still needs to be assigned to the global state.
 * @example
 * localStorage.setItem("globalState", JSON.stringify({ colorScheme: "light" }));
 * const newGlobalState = loadGlobalState();
 * Object.assign(globalState, newGlobalState);
 * setTimeout(() => window.location.reload(), 2000); // refresh the page
 */
export const loadGlobalState = (): GlobalState => {
	const storedGlobalState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? "{}") as Partial<
		SignalToValue<LocalStorageState>
	>;

	return {
		colorScheme: signal(storedGlobalState.colorScheme ?? "dark"),
		language: signal(storedGlobalState.language ?? "en"),
		isConsoleDisplayed: signal(storedGlobalState.isConsoleDisplayed ?? false),
		consoleHeight: signal(storedGlobalState.consoleHeight ?? 300),
		tr: signal({} as Tr), // temporary value
		trDynDict: signal(defaultDynDict),
	};
};

/** The global state of the application. */
export const globalState: GlobalState = loadGlobalState();

/** The readonly global state of the application. */
export const gs = globalState as RecursiveReadOnlySignal<GlobalState>;

/** @ignore */
export const tr = {
	get v() {
		return gs.tr.value;
	},
};

/**
 * Translate a word.
 * @param word The word to translate.
 * @returns The translated word or the original word if it is not found.
 */
export const trFn = (word: keyof Tr) => gs.tr.value[word] ?? word;

/**
 * Get a function that translate a word from a dynamic dictionary.
 * @param category The category of the word.
 * @returns The translation function.
 */
export const trDynFn = (category: TranslationCategoryType) => (word: string) =>
	gs.trDynDict.value[gs.language.value]?.[category]?.[word] ?? word;

/** If the language is loading. */
export const isLanguageLoading = signal(false);

/** Load the translation file based on the language. */
effect(
	() => (
		(isLanguageLoading.value = true),
		void Promise.all([
			import(`./tr/${gs.language.value}.js`),
			api["dyn-dict"]({ language: gs.language.value })
				.get()
				.catch(() => ({ data: defaultDynDict.en })),
		]).then(([{ default: tr }, dynDict]) => {
			globalState.tr.value = tr;
			globalState.trDynDict.value = { ...globalState.trDynDict.value, [gs.language.value]: dynDict.data };
			isLanguageLoading.value = false;
		})
	)
);

const localStorageState = computed(
	(): LocalStorageState => ({
		colorScheme: gs.colorScheme.value,
		language: gs.language.value,
		isConsoleDisplayed: gs.isConsoleDisplayed.value,
		consoleHeight: gs.consoleHeight.value,
	})
);

effect(() => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localStorageState.value)));

effect(() => void document.body.classList.toggle("dark", gs.colorScheme.value === "dark"));
