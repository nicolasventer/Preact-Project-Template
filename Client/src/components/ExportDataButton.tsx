import { ActionIcon } from "@mantine/core";
import { Save } from "lucide-react";
import { globalState } from "../context/GlobalState";
import { saveAs } from "../utils/commonUtils";
import { signalToValue } from "../utils/signalUtils";

const exportData = () =>
	saveAs(new Blob([JSON.stringify(signalToValue(globalState))], { type: "application/json" }), "applydoc.json");

export const ExportDataButton = () => (
	<ActionIcon variant="transparent" onClick={exportData}>
		<Save />
	</ActionIcon>
);
