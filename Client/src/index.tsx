import { render } from "preact";
import { StrictMode } from "preact/compat";
import { App } from "./App";
import "./style.css";

// define the startViewTransition function if it does not exist (for Firefox)
if (!document.startViewTransition)
	document.startViewTransition = (fn: () => void) => {
		const ready = new Promise<void>((resolve) => resolve());
		const finished = new Promise<void>((resolve) => (fn(), resolve()));
		const updateCallbackDone = new Promise<void>((resolve) => resolve());
		const skipTransition = () => {};
		return { ready, finished, updateCallbackDone, skipTransition };
	};

render(
	<StrictMode>
		<App />
	</StrictMode>,
	document.getElementById("root")!
);
