import { Button } from "@mantine/core";
import { signal } from "@preact/signals";
import { DarkModeButton } from "../components/DarkModeButton";
import { LanguageButton } from "../components/LanguageButton";
import { WakeLockButton } from "../components/WakeLockButton";
import { tr } from "../context/GlobalState";
import { FullViewport } from "../utils/ComponentToolbox";

const useTransition = signal(true);
const toggleUseTransition = () => (useTransition.value = !useTransition.value);

/**
 * Home page
 * @returns the home page
 */
export const HomePage = () => (
	<FullViewport>
		{tr.v.Home}
		<Button onClick={toggleUseTransition}>{`${useTransition.value ? "Disable" : "Enable"} transition`}</Button>
		<DarkModeButton useTransition={useTransition.value} />
		<WakeLockButton />
		<LanguageButton useTransition={useTransition.value} />
	</FullViewport>
);
