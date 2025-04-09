import { B_PROD } from "@/Shared/bProd.gen";

export type ClientEnv = {
	BASE_URL: string;
};

export const clientEnv: ClientEnv = B_PROD
	? {
			BASE_URL: "/Preact-Project-Template/preact_light",
	  }
	: {
			BASE_URL: "",
	  };
