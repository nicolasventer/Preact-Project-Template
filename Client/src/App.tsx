import { clientEnv } from "./clientEnv";
import { HomePage } from "./pages/exports_";
import type { HomePage as _HomePage } from "./pages/Home";
import { WriteToolboxClasses } from "./utils/ComponentToolbox";

/**
 * Renders all pages of the application based on the URL. All pages are lazy loaded. \
 * Renders the {@link _HomePage | `HomePage`} if the URL is `/` or `/coord`.
 * @returns The rendered application.
 */
export const App = () => {
	const url = new URL(window.location.href);

	return (
		<>
			<WriteToolboxClasses />
			{url.pathname === `${clientEnv.BASE_URL}/` && <HomePage />}
		</>
	);
};
