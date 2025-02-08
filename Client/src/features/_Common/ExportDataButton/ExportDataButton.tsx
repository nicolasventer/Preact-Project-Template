import { actions } from "@/Actions/actions.impl";
import { ActionIcon } from "@mantine/core";
import { Save } from "lucide-react";

/**
 * A button component that triggers the export of global state data when clicked.
 *
 * @returns The rendered button component.
 */
export const ExportDataButton = () => (
	<ActionIcon variant="transparent" onClick={actions.data.export}>
		<Save />
	</ActionIcon>
);
