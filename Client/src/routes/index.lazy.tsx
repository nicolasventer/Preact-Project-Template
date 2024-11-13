import { globalState } from "../context/GlobalState";
import { useReact } from "../hooks/useReact";
import { RouterRender } from "../routerInstance.gen";
import { FullViewport, WriteToolboxClasses } from "../utils/ComponentToolbox";

/**
 * Renders the {@link RouterRender | `router`}.
 * @returns The rendered application.
 */
// @routeExport
export const MainLayout = () => {
	useReact(globalState.colorScheme);
	return (
		<FullViewport>
			<WriteToolboxClasses />
			<RouterRender subPath="/" />
		</FullViewport>
	);
};
