import type { IColorScheme } from "@/Actions/actions.interface";
import { state } from "@/Actions/actions.state";

export class ColorSchemeImpl implements IColorScheme {
	toggle = () => (state.colorScheme.value = state.colorScheme.value === "light" ? "dark" : "light");
}
