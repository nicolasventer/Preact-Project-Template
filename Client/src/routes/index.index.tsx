import { DarkModeButton } from "@/components/_app/DarkModeButton";
import { LanguageButton } from "@/components/_app/LanguageButton";
import { WakeLockButton } from "@/components/_app/WakeLockButton";
import { tr, trDynFn } from "@/gs";
import { effect, signal } from "@preact/signals";

const useTransition = signal(true);
const toggleUseTransition = () => (useTransition.value = !useTransition.value);

effect(() => console.info("useTransition:", useTransition.value));

export const HomePage = () => (
	<>
		<div>{tr.v.Home}</div>
		<div>{trDynFn("test")("dynamic_english")}</div>
		<button onClick={toggleUseTransition}>{`${useTransition.value ? "Disable" : "Enable"} transition`}</button>
		<DarkModeButton useTransition={useTransition.value} />
		<WakeLockButton />
		<LanguageButton useTransition={useTransition.value} />
	</>
);
