import { actions } from "@/actions/actions.impl";
import { CustomConsole } from "@/components/_app/CustomConsole";
import { RouterRender, useRoutes } from "@/routerInstance.gen";
import { FullViewport, WriteToolboxClasses } from "@/utils/ComponentToolbox";

actions.console.type.update("both");

// @routeExport
export const MainLayout = () => (
	<FullViewport>
		{useRoutes()}
		<WriteToolboxClasses />
		<CustomConsole />
		<RouterRender subPath="/" />
	</FullViewport>
);
