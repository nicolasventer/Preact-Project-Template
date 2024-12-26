import { effect } from "@preact/signals";
import { useState } from "react";
import { useMount } from "./useMount";

/**
 * Hook to force a re-render when the signal changes.
 * @param signal the signal to watch
 */
export const useReact = <T>(signal: { readonly value: T }) => {
	const [_, setSignal] = useState(signal.value);
	useMount(() => effect(() => setSignal(signal.value)));
};
