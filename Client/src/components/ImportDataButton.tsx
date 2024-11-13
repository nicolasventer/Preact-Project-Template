import { globalState, loadGlobalState, LOCAL_STORAGE_KEY } from "../context/GlobalState";

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

export const ImportDataButton = () => <input type="file" onChange={(e) => onImportData(e.target.files?.[0] ?? null)} />;
