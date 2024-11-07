import { ActionIcon } from "@mantine/core";
import { signal } from "@preact/signals";
import { Moon, Sun } from "lucide-react";
import { flushSync } from "preact/compat";
import type { ColorSchemeType } from "../Common/CommonModel";
import { globalState } from "../context/GlobalState";
import { useReact } from "../hooks/useReact";
import { widthSizeObj } from "../utils/clientUtils";

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

	useReact(isColorSchemeLoading);
	useReact(globalState.colorScheme);

	return (
		<ActionIcon loading={isColorSchemeLoading.value}>
			{globalState.colorScheme.value === "dark" && (
				<Sun width={widthSizeObj(3.5, 6)} id={"light-mode-button"} onClick={setModeFn("light")} style={{ marginBottom: 1 }} />
			)}
			{globalState.colorScheme.value === "light" && (
				<Moon width={widthSizeObj(3.5, 6)} id={"dark-mode-button"} onClick={setModeFn("dark")} style={{ marginBottom: 1 }} />
			)}
		</ActionIcon>
	);
};
