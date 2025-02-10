import { Elysia } from "elysia";
import { GetDynDictSchema } from "../../../../Shared/SharedModel";
import { DynDictImpl } from "./dynDict.impl";

const dynDictImpl = new DynDictImpl();

export const dynDictApp = new Elysia({ prefix: "/dyn-dict" })
	// get dynamic dictionary
	.get("/:language", (req) => dynDictImpl.get(req, req.params), {
		params: GetDynDictSchema,
	});
