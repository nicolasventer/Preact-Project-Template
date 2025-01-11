import { actions } from "@/actions/actions.impl";

export const ExportDataButton = () => <button onClick={actions.data.export}>Export Data</button>;
