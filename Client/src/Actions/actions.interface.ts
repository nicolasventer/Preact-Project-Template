import type { ConsoleType, ViewportSize } from "@/Actions/actions.types";
import type { LanguageType } from "@/Shared/SharedModel";
import type { MouseEventHandler, TouchEventHandler } from "react";

export type IActions = {
	colorScheme: { toggle: () => void };
	language: { updateFn: (language: LanguageType, useTransition: boolean) => () => void };
	console: {
		type: { update: (type: ConsoleType) => void };
		display: { toggle: () => void };
		height: { startUpdating: MouseEventHandler<HTMLElement> & TouchEventHandler<HTMLElement> };
		log: {
			clear: () => void;
			markAsReadFn: (index: number) => () => void;
			wrap: { toggle: () => void };
		};
	};
	wakeLock: { toggle: () => void };
	viewportSize: { update: (viewportSize: ViewportSize) => void };
};

export type IColorScheme = IActions["colorScheme"];
export type ILanguage = IActions["language"];
export type IConsole = IActions["console"];
export type IWakeLock = IActions["wakeLock"];
export type IViewportSize = IActions["viewportSize"];
