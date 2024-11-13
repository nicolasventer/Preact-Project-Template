import { clientEnv } from "./clientEnv";
import { globalState } from "./context/GlobalState";
import { useReact } from "./hooks/useReact";
import { HomePage, NotFoundPage } from "./pages/exports_";
import type { HomePage as _HomePage } from "./pages/Home";
import type { NotFoundPage as _NotFoundPage } from "./pages/NotFound";
import { WriteToolboxClasses } from "./utils/ComponentToolbox";
import { Switch } from "./utils/MultiIf";

/**
 * Renders all pages of the application based on the URL. All pages are lazy loaded. \
 * Renders the {@link _HomePage | `HomePage`} if the URL is `/`.
 * Renders the {@link _NotFoundPage | `NotFoundPage`} if the URL is not found.
 * @returns The rendered application.
 */
export const App = () => {
	const url = new URL(window.location.href);

	useReact(globalState.colorScheme);

	return (
		<>
			<WriteToolboxClasses />
			<Switch
				value={url.pathname}
				branches={[{ case: `${clientEnv.BASE_URL}/`, then: <HomePage /> }]}
				default={<NotFoundPage />}
			/>
		</>
	);
};
