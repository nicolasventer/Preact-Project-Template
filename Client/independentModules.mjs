// @ts-check

import { createIndependentModules } from "eslint-plugin-project-structure";

export const independentModulesConfig = createIndependentModules({
	// debugMode: true,
	modules: [
		{
			name: "Root",
			pattern: ["src/*", "src/api/*", "src/tr/*", "*"],
			allowImportsFrom: ["{root}", "src/routes/**", "src/Shared/**", "{misc}", "{externalLibs}"],
			errorMessage: "🔥 The Root module should access to Root, Routes and Shared modules. 🔥",
		},

		{
			name: "Utils",
			pattern: "src/utils/**",
			allowImportsFrom: ["src/utils/**", "{externalLibs}"],
			errorMessage: "🔥 The Utils module should access to Utils modules only. 🔥",
		},

		{
			name: "Shared",
			pattern: "src/Shared/**",
			allowImportsFrom: ["src/Shared/**", "{externalLibs}"],
			errorMessage: "🔥 The Shared module should access to Shared modules only. 🔥",
		},

		{
			name: "Routes",
			pattern: "src/routes/**",
			allowImportsFrom: ["src/routes/**", "src/components/**", "src/*.gen.ts", "src/clientEnv.ts", "{readOnlyGlobalState}"],
			errorMessage: "🔥 The Routes module should access to Routes and Components modules and readOnlyGlobalState imports. 🔥",
		},

		{
			name: "Actions",
			pattern: "src/actions/**",
			allowImportsFrom: ["src/actions/**", "{readWriteGlobalState}"],
			errorMessage: "🔥 The Actions module should access to Actions module and readWriteGlobalState imports. 🔥",
		},

		{
			name: "Components",
			pattern: "src/components/**",
			allowImportsFrom: ["src/components/_*/**", "{dirname}/**", "{readOnlyGlobalState}"],
			errorMessage:
				"🔥 The Components module should access to its subfolders, all common components and readOnlyGlobalState imports. 🔥",
		},

		{
			name: "Tests",
			pattern: "tests/**",
			allowImportsFrom: ["**"],
		},

		// All files not specified in the rules are not allowed to import anything.
		// Ignore all non-nested files in the `src` folder.
		{
			name: "Unknown files",
			pattern: [["**", "!src/*"]],
			allowImportsFrom: [],
			allowExternalImports: false,
			errorMessage: "🔥 This file is not specified as an independent module in `independentModules.mjs`. 🔥",
		},
	],
	reusableImportPatterns: {
		misc: ["src/assets/**"],
		root: ["src/*", "src/api/*", "src/utils/**", "src/tr/*", "*"],
		readOnlyGlobalState: [
			"src/gs.ts",
			"src/actions/actions.impl.ts",
			"src/actions/actions.types.ts",
			"src/utils/**",
			"src/Shared/**",
			"{misc}",
			"{externalLibs}",
		],
		readWriteGlobalState: ["src/globalState.ts", "{readOnlyGlobalState}"],
		externalLibs: ["**/preact/**", "**/signals-react/**"],
	},
});
