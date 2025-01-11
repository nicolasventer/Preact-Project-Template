import { actions } from "@/actions/actions.impl";
import { CustomConsole } from "@/components/_app/CustomConsole";
import { RouterRender } from "@/routerInstance.gen";
import { FullViewport, WriteToolboxClasses } from "@/utils/ComponentToolbox";

actions.console.type.update("both");

/**
 * The main layout of the application. \
 * It renders:
 * - {@link FullViewport},
 * - {@link WriteToolboxClasses},
 * - `MantineProvider` with the theme and `st.colorScheme.current.value`,
 * - `Toaster` with the position "bottom-center" and the toast options duration 2000,
 * - {@link CustomConsole},
 * - {@link RouterRender} with the subPath "/", which renders the current route.
 * It also updates `actions.viewportSize` when the viewport size changes.
 * @returns the main layout of the application
 */
// @routeExport
export const MainLayout = () => (
	<FullViewport>
		<WriteToolboxClasses />
		<CustomConsole />
		<RouterRender subPath="/" useReact />
	</FullViewport>
);
