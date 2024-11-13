import { globalState, loadGlobalState, LOCAL_STORAGE_KEY } from "../context/GlobalState";

/**
 * Handles the import of global state data from a JSON file.
 *
 * @param file - The file to be imported.
 */
export const onImportData = (file: File | null) => {
	if (!file) return;
	const reader = new FileReader();
	reader.onload = () => {
		try {
			const data = JSON.parse(reader.result as string);
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
			const newGlobalState = loadGlobalState();
			Object.assign(globalState, newGlobalState);
			console.info("Data imported successfully, refreshing page...", "🔄");
			setTimeout(() => window.location.reload(), 2000);
		} catch (error) {
			console.error(error);
		}
	};
	reader.readAsText(file);
};

/**
 * A button component that allows users to import global state data from a JSON file.
 *
 * @returns A JSX element representing the import data button.
 */
export const ImportDataButton = () => (
	<input type="file" onChange={(e) => onImportData((e.target as { files?: File[] })?.files?.[0] ?? null)} />
);
