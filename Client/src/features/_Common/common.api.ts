import { api } from "@/api/api";

export const isServerRunning = () =>
	api
		.get()
		.then(() => true)
		.catch(() => false);
