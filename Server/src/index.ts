import { PORT, SRV_URL } from "@/Shared/SharedConfig";
import { apiApp } from "@/routes/Api/api.routes";
import cors from "@elysiajs/cors";
import type { treaty } from "@elysiajs/eden";
import swagger from "@elysiajs/swagger";
import type { BunRequest } from "bun";
import Elysia from "elysia";

export const app = new Elysia()
	.use(cors())
	.use(swagger())
	.on("request", ((ctx: { request: BunRequest }) => console.log(`${ctx.request.method} ${ctx.request.url}`)) as any)
	.on("error", ((ctx: { request: BunRequest; error: Error }) =>
		console.error(`${ctx.request.method} ${ctx.request.url} ${ctx.error}\n${ctx.error.stack}`)) as any)
	.get("/", () => "Server is running")
	// use apiApp
	.use(apiApp)
	.listen(PORT);

export type App = typeof app;

export type Api = ReturnType<typeof treaty<App>>["api"];

console.log(`Server started on ${SRV_URL}`);
console.log(`Swagger available on ${SRV_URL}/swagger`);
