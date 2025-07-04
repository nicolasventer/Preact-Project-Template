import { impl } from "@/impl";
import { GetDynDictSchema } from "@/Shared/SharedModel";
import { Elysia } from "elysia";

export const dynDictApp = new Elysia({ prefix: "/dyn-dict" })
	// get dynamic dictionary
	.get("/:language", (req) => impl.dynDict.get(req, req.params), { params: GetDynDictSchema });
