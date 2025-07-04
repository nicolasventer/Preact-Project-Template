import { impl } from "@/impl";
import { ExampleUserSchema, FindUserSchema } from "@/Shared/SharedModel";
import { Elysia } from "elysia";

export const userApp = new Elysia({ prefix: "/users" })
	// get all users
	.get("", (req) => impl.user.find(req))
	// get a user by email
	.get("/:email", (req) => impl.user.get(req, req.params))
	// get users by query
	.post("/find", (req) => impl.user.find(req, req.body), { body: FindUserSchema })
	// create a user
	.post("", (req) => impl.user.create(req, req.body), { body: ExampleUserSchema })
	// update a user
	.put("", (req) => impl.user.update(req, req.body, req.body), { body: ExampleUserSchema })
	// delete a user by email
	.delete("/:email", (req) => impl.user.delete(req, req.params));
