import type { IConsole } from "@/Actions/actions.interface";
import { computedState, state } from "@/Actions/actions.state";
import type { ConsoleType } from "@/Actions/actions.types";
import type { LogType } from "@/Shared/SharedModel";
import type { MouseEventHandler, TouchEventHandler } from "react";

export class ConsoleImpl implements IConsole {
	private oldConsoleLog = console.log;
	private oldConsoleInfo = console.info;
	private oldConsoleWarn = console.warn;
	private oldConsoleError = console.error;

	private mousePos = { x: 0, y: 0 };
	private startConsoleHeight = 0;

	private newConsoleLogFn =
		(type: LogType) =>
		(...args: unknown[]) =>
			this.log_add(
				type,
				args
					.map((arg) =>
						typeof arg === "string" ? arg : arg instanceof Error ? `${arg.message}\n${arg.stack}` : JSON.stringify(arg)
					)
					.join(" ")
			);

	private log_add = (type: LogType, message: string) => {
		state.logList.value = [
			...state.logList.peek(),
			{
				type,
				message,
				time: new Date().toISOString().split("T")[1],
			},
		];
		state.logToSeeCount.value = state.logToSeeCount.peek() + 1;
	};

	private height_updating = (ev: MouseEvent | TouchEvent) => {
		ev.stopPropagation();
		if (!state.isConsoleResizing.value) return;
		const clientY = ev instanceof MouseEvent ? ev.clientY : ev.touches[0].clientY;
		const newHeight = this.startConsoleHeight + this.mousePos.y - clientY;
		ConsoleImpl.HEIGHT_UPDATE(newHeight, this.startConsoleHeight);
	};

	private height_stopUpdating = (ev: MouseEvent | TouchEvent) => {
		ev.stopPropagation();
		state.isConsoleResizing.value = false;
		document.body.removeEventListener("mousemove", this.height_updating);
		document.body.removeEventListener("mouseup", this.height_stopUpdating);
		document.body.removeEventListener("touchmove", this.height_updating);
		document.body.removeEventListener("touchend", this.height_stopUpdating);
	};

	private static HEIGHT_UPDATE = (newHeight: number, startConsoleHeight: number) => {
		state.consoleHeight.value = Math.max(
			computedState.openHeight.value,
			Math.min(computedState.maxConsoleHeight.value, newHeight)
		);
		if (newHeight <= computedState.closeHeight.value) {
			state.isConsoleDisplayed.value = false;
			state.consoleHeight.value = startConsoleHeight;
		} else if (newHeight >= computedState.openHeight.value) {
			state.isConsoleDisplayed.value = true;
			state.logToSeeCount.value = 0;
		}
	};

	type = {
		update: (type: ConsoleType) => {
			if (type === "normal") {
				console.log = this.oldConsoleLog;
				console.info = this.oldConsoleInfo;
				console.warn = this.oldConsoleWarn;
				console.error = this.oldConsoleError;
			} else if (type === "custom") {
				console.log = this.newConsoleLogFn("log");
				console.info = this.newConsoleLogFn("info");
				console.warn = this.newConsoleLogFn("warn");
				console.error = this.newConsoleLogFn("error");
			} else {
				console.log = (...args: unknown[]) => (this.oldConsoleLog(...args), this.newConsoleLogFn("log")(...args));
				console.info = (...args: unknown[]) => (this.oldConsoleInfo(...args), this.newConsoleLogFn("info")(...args));
				console.warn = (...args: unknown[]) => (this.oldConsoleWarn(...args), this.newConsoleLogFn("warn")(...args));
				console.error = (...args: unknown[]) => (this.oldConsoleError(...args), this.newConsoleLogFn("error")(...args));
			}
		},
	};
	display = {
		toggle: () => (state.isConsoleDisplayed.value = !state.isConsoleDisplayed.value),
	};
	height = {
		startUpdating: ((ev) => {
			ev.stopPropagation();
			this.mousePos = "clientX" in ev ? { x: ev.clientX, y: ev.clientY } : { x: ev.touches[0].clientX, y: ev.touches[0].clientY };
			this.startConsoleHeight = state.consoleHeight.value;
			state.isConsoleResizing.value = true;
			document.body.addEventListener("mousemove", this.height_updating);
			document.body.addEventListener("mouseup", this.height_stopUpdating);
			document.body.addEventListener("touchmove", this.height_updating);
			document.body.addEventListener("touchend", this.height_stopUpdating);
		}) satisfies MouseEventHandler<HTMLElement> & TouchEventHandler<HTMLElement>,
	};
	log = {
		clear: () => (state.logList.value = []),
		markAsReadFn: (index: number) => () => (state.logToSeeCount.value = state.logList.value.length - index - 1),
		wrap: {
			toggle: () => (state.isLogWrapped.value = !state.isLogWrapped.value),
		},
	};
}
