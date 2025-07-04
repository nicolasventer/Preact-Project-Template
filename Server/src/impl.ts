import { ApiImpl } from "@/routes/Api/api.impl";
import { DynDictImpl } from "@/routes/Api/V1/DynDict/dynDict.impl";
import { UserImpl } from "@/routes/Api/V1/ExampleUser/exampleUser.impl";

export const impl = {
	dynDict: new DynDictImpl(),
	user: new UserImpl(),
	api: new ApiImpl(),
};
