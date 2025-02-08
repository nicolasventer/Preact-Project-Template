import { actions, st } from "@/Actions/actions.impl";
import { CustomConsole } from "@/features/_Common/CustomConsole/CustomConsole";
import { FullViewport, WriteToolboxClasses } from "@/libs/StrongBox/ComponentToolbox";
import { RouterRender } from "@/routerInstance.gen";
import { createTheme, MantineProvider } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

const theme = createTheme({});

actions.console.type.update("both");

/**
 * Renders the {@link RouterRender | `router`}. \
 * It also updates the {@link globalState | `global states`} `isAboveMd` and `isBelowXxs` based on the screen size.
 * @returns The rendered application.
 */
// @routeExport
export const MainLayout = () => {
	const { height, width } = useViewportSize();
	useEffect(() => actions.viewportSize.update({ height, width }), [height, width]);

	return (
		<FullViewport>
			<WriteToolboxClasses />
			<MantineProvider theme={theme} forceColorScheme={st.colorScheme.current.value}>
				<CustomConsole />
				<Toaster position="bottom-center" toastOptions={{ duration: 2000 }} />
				<RouterRender subPath="/" />
			</MantineProvider>
		</FullViewport>
	);
};
