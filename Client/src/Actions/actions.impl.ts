import type { IActions, IColorScheme, IConsole, IData, ILanguage, IViewportSize, IWakeLock } from "@/Actions/actions.interface";
import { state } from "@/Actions/actions.state";
import { ColorSchemeImpl } from "@/Actions/impl/ColorSchemeImpl";
import { ConsoleImpl } from "@/Actions/impl/ConsoleImpl";
import { DataImpl } from "@/Actions/impl/DataImpl";
import { LanguageImpl } from "@/Actions/impl/LanguageImpl";
import { ViewportSizeImpl } from "@/Actions/impl/ViewportSizeImpl";
import { WakeLockImpl } from "@/Actions/impl/WakeLockImpl";
import type { RecursiveReadOnlySignal } from "@/libs/StrongBox/signalUtils";
import { computed } from "@preact/signals";

export const st = state as RecursiveReadOnlySignal<typeof state>;

export const computedSt = {
	isAboveMd: computed(() => st.viewportSize.value.width >= 992),
	isBelowXxs: computed(() => st.viewportSize.value.width <= 400),
	isWakeLockAvailable: "wakeLock" in navigator || "keepAwake" in screen,
};

export const computedSt2 = {
	smMd: computed(() => (computedSt.isAboveMd.value ? "md" : "sm")),
	xsSm: computed(() => (computedSt.isAboveMd.value ? "sm" : "xs")),
};

export const computedSt3 = {
	compactXsSm: computed(() => `compact-${computedSt2.xsSm.value}`),
};

class Actions implements IActions {
	constructor(
		public colorScheme: IColorScheme,
		public language: ILanguage,
		public console: IConsole,
		public wakeLock: IWakeLock,
		public viewportSize: IViewportSize,
		public data: IData
	) {}
}

export const actions: IActions = new Actions(
	new ColorSchemeImpl(),
	new LanguageImpl(),
	new ConsoleImpl(),
	new WakeLockImpl(),
	new ViewportSizeImpl(),
	new DataImpl()
);
