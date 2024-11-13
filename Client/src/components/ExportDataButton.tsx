import { globalState } from "../context/GlobalState";
import { saveAs } from "../utils/commonUtils";
import { signalToValue } from "../utils/signalUtils";

const exportData = () =>
	saveAs(new Blob([JSON.stringify(signalToValue(globalState))], { type: "application/json" }), "export.json");

export const ExportDataButton = () => <button onClick={exportData}>Export Data</button>;
