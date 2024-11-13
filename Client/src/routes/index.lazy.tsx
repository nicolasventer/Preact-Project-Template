import { RouterRender } from "../routerInstance.gen";
import { FullViewport, WriteToolboxClasses } from "../utils/ComponentToolbox";

/**
 * Renders the {@link RouterRender | `router`}.
 * @returns The rendered application.
 */
// @routeExport
export const MainLayout = () => (
	<FullViewport>
		<WriteToolboxClasses />
		<RouterRender subPath="/" />
	</FullViewport>
);
