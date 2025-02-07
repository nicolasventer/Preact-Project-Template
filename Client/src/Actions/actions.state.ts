import type { ViewportSize } from "@/Actions/actions.types";
import { globalState } from "@/globalState";
import { signalArray } from "@/libs/StrongBox/signalUtils";
import type { Log } from "@/Shared/SharedModel";
import { computed, signal } from "@preact/signals";

export const state = {
	colorScheme: globalState.colorScheme,
	language: globalState.language,
	isLanguageLoading: signal(false),
	isConsoleDisplayed: globalState.isConsoleDisplayed,
	consoleHeight: globalState.consoleHeight,
	isConsoleResizing: signal(false),
	logList: signalArray<Log>([]),
	isLogWrapped: signal(false),
	logToSeeCount: signal(0),
	isWakeLock: signal(false),
	viewportSize: signal<ViewportSize>({ height: 0, width: 0 }),
};

export const computedState = {
	closeHeight: computed(() => state.viewportSize.value.height * 0.05),
	openHeight: computed(() => state.viewportSize.value.height * 0.15),
	maxConsoleHeight: computed(() => state.viewportSize.value.height * 0.5),
};
