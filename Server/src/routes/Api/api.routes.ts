import Elysia from "elysia";
import { v1App } from "./V1/v1.routes";

export const apiApp = new Elysia({ prefix: "/api" })
	// get status
	.get("/", () => "api is running")
	// use v1App
	.use(v1App);
