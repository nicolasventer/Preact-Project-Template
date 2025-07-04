import { impl } from "@/impl";
import { v1App } from "@/routes/Api/V1/v1.routes";
import { ExecuteSchema } from "@/Shared/SharedModel";
import Elysia from "elysia";

export const apiApp = new Elysia({ prefix: "/api" })
	// get status
	.get("", () => "api is running")
	.post("/compile", (req) => impl.api.compile(req, req.body as string), {
		detail: { requestBody: { content: { "text/plain": {} } } },
	})
	.post("/execute", (req) => impl.api.execute(req, req.body), { body: ExecuteSchema })
	// use v1App
	.use(v1App);
