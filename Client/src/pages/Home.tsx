import { Button } from "@mantine/core";
import { effect, signal } from "@preact/signals";
import { CustomConsole, setConsoleType } from "../components/CustomConsole";
import { DarkModeButton } from "../components/DarkModeButton";
import { LanguageButton } from "../components/LanguageButton";
import { WakeLockButton } from "../components/WakeLockButton";
import { tr } from "../context/GlobalState";
import { useReact } from "../hooks/useReact";
import { FullViewport } from "../utils/ComponentToolbox";

const useTransition = signal(true);
const toggleUseTransition = () => (useTransition.value = !useTransition.value);

setConsoleType("custom");

effect(() => console.info("useTransition:", useTransition.value));

/**
 * Home page
 * @returns the home page
 */
export const HomePage = () => {
	useReact({
		get value() {
			return tr.v;
		},
	}); // could be simplified to useReact(globalState.tr);
	useReact(useTransition);

	return (
		<FullViewport>
			{tr.v.Home}
			<Button onClick={toggleUseTransition}>{`${useTransition.value ? "Disable" : "Enable"} transition`}</Button>
			<DarkModeButton useTransition={useTransition.value} />
			<WakeLockButton />
			<LanguageButton useTransition={useTransition.value} />
			<CustomConsole resizable />
		</FullViewport>
	);
};
