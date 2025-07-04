import { impl } from "@/impl";
import type { Execute } from "@/Shared/SharedModel";
import { tsToJs } from "@/utils/ts-to-js";
import type { Context, MaybePromise } from "elysia";
import { Elysia } from "elysia";

export class ApiImpl {
	#_() {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		impl;
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		Elysia;
	}

	compile(_: Context, code: string) {
		const jsCode = tsToJs(code);
		if (jsCode) eval(jsCode);
		return jsCode;
	}

	execute(_: Context, __: Execute): MaybePromise<Response> {
		return new Response("nothing");
	}
}
