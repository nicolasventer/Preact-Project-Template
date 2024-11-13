import { signal } from "@preact/signals";
import { gs } from "../context/GlobalState";
import { setColorSchemeFn } from "../context/userActions";
import { useReact } from "../hooks/useReact";

const isColorSchemeLoading = signal(false);

/**
 * A button that toggles between light and dark mode
 * @param params
 * @param params.useTransition If the color scheme should change using a transition
 * @returns a button that toggles between light and dark mode
 */
export const DarkModeButton = ({ useTransition }: { useTransition: boolean }) => {
	useReact(isColorSchemeLoading);
	useReact(gs.colorScheme);

	return (
		<button
			id={`${gs.colorScheme.value === "dark" ? "light" : "dark"}-mode-button`}
			onClick={setColorSchemeFn(gs.colorScheme.value === "dark" ? "light" : "dark", useTransition, isColorSchemeLoading)}
			disabled={isColorSchemeLoading.value}
			style={{ cursor: "pointer" }}
		>
			{gs.colorScheme.value === "dark" ? "Light" : "Dark"} Mode
		</button>
	);
};
