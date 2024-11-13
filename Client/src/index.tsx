import { B_PROD } from "./_bProd";

// @ts-expect-error (preact/debug is not in the types)
if (!B_PROD) await import("preact/debug");

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./style.css";

// define the startViewTransition function if it does not exist (for Firefox)
if (!document.startViewTransition)
	document.startViewTransition = (fn: () => void) => {
		const ready = new Promise<undefined>((resolve) => resolve(undefined));
		const finished = new Promise<undefined>((resolve) => (fn(), resolve(undefined)));
		const updateCallbackDone = new Promise<undefined>((resolve) => resolve(undefined));
		const skipTransition = () => {};
		return { ready, finished, updateCallbackDone, skipTransition };
	};

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
