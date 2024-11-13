import { signal } from "@preact/signals";
import { flushSync } from "preact/compat";
import type { ColorSchemeType } from "../Common/CommonModel";
import { globalState } from "../context/GlobalState";

const isColorSchemeLoading = signal(false);

/**
 * A button that toggles between light and dark mode
 * @returns a button that toggles between light and dark mode
 */
export const DarkModeButton = ({
	useTransition,
	onClick,
}: {
	useTransition: boolean;
	onClick?: (mode: ColorSchemeType) => void;
}) => {
	const setModeFn = (mode: ColorSchemeType) => () => {
		if (useTransition) {
			document.startViewTransition(() => flushSync(() => void ((globalState.colorScheme.value = mode), onClick?.(mode))));
		} else {
			isColorSchemeLoading.value = true;
			setTimeout(
				() => void (((globalState.colorScheme.value = mode), onClick?.(mode)), (isColorSchemeLoading.value = false)),
				100
			);
		}
	};

	return (
		<button
			onClick={setModeFn(globalState.colorScheme.value === "dark" ? "light" : "dark")}
			disabled={isColorSchemeLoading.value}
			style={{ cursor: "pointer" }}
		>
			{globalState.colorScheme.value === "dark" ? "Light" : "Dark"} Mode
		</button>
	);
};
