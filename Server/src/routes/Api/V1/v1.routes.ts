import Elysia from "elysia";
import { dynDictApp } from "./DynDict/dynDict.routes";
import { userApp } from "./ExampleUser/exampleUser.routes";

export const v1App = new Elysia({ prefix: "/v1" })
	// get status
	.get("/", () => "v1 is running")
	// use dynDictApp
	.use(dynDictApp)
	// use userApp
	.use(userApp);
