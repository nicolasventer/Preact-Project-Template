import { api } from "@/api/api";

export const isServerRunning = () =>
	api.status
		.get()
		.then(() => true)
		.catch(() => false);
