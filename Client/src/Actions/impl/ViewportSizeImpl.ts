import type { IViewportSize } from "@/Actions/actions.interface";
import { state } from "@/Actions/actions.state";
import type { ViewportSize } from "@/Actions/actions.types";

export class ViewportSizeImpl implements IViewportSize {
	update = (viewportSize: ViewportSize) => (state.viewportSize.value = viewportSize);
}
