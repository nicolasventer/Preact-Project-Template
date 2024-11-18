import { FileInput } from "@mantine/core";
import { FileJson } from "lucide-react";
import toast from "react-hot-toast";
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
			toast.success("Data imported successfully,\nrefreshing page...");
			setTimeout(() => window.location.reload(), 2000);
		} catch (error) {
			console.error(error);
		}
	};
	reader.readAsText(file);
};

export const ImportDataButton = () => (
	<FileInput
		label="Import data"
		accept="application/json"
		placeholder="Click to import data or drag and drop file"
		rightSection={<FileJson />}
		onChange={onImportData}
		value={null}
	/>
);
