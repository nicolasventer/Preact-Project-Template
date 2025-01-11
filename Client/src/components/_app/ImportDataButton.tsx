import { actions } from "@/actions/actions.impl";

export const ImportDataButton = () => <input type="file" onChange={(e) => actions.data.import(e.target.files?.[0] ?? null)} />;
