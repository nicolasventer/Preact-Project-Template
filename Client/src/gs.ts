import { globalState, type GlobalState } from "@/globalState";
import type { RecursiveReadOnlySignal } from "@/libs/StrongBox/signalUtils";

export { loadGlobalState, LOCAL_STORAGE_KEY, tr, trDynFn, trFn, type GlobalState } from "@/globalState";

/** The readonly global state of the application. */
export const gs = globalState as RecursiveReadOnlySignal<GlobalState>;
