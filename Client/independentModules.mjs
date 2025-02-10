// @ts-check

import { createIndependentModules } from "eslint-plugin-project-structure";

export const independentModulesConfig = createIndependentModules({
	// debugMode: true,
	modules: [
		{
			name: "Root",
			pattern: ["src/*", "src/api/*", "src/hooks/**", "src/libs/**", "src/tr/*", "*"],
			allowImportsFrom: ["{root}", "src/routes/**", "src/Shared/**", "{misc}", "{externalLibs}"],
			errorMessage: "🔥 The Root module should access to Root, Routes and Shared modules. 🔥",
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
			allowImportsFrom: ["src/routes/**", "src/features/**", "src/*.gen.ts", "src/clientEnv.ts", "{readOnlyGlobalState}"],
			errorMessage: "🔥 The Routes module should access to Routes and Features modules and readOnlyGlobalState imports. 🔥",
		},

		{
			name: "Actions",
			pattern: "src/Actions/**",
			allowImportsFrom: ["src/Actions/**", "{readWriteGlobalState}"],
			errorMessage: "🔥 The Actions module should access to Actions module and readWriteGlobalState imports. 🔥",
		},

		{
			name: "Features Getters",
			pattern: "src/features/**/*.getters.ts",
			allowImportsFrom: ["{dirname}/**", "{readOnlyGlobalState}"],
			errorMessage: "🔥 The Features Getters module should access to Feature folder and readOnlyGlobalState imports. 🔥",
		},

		{
			name: "Features API",
			pattern: "src/features/**/*.api.ts",
			allowImportsFrom: ["{dirname}/*/**", "{dirname}/*.getters.ts", "src/api/api.ts", "{readOnlyGlobalState}"],
			errorMessage: "🔥 The Features API module should access to Feature folder, api and readOnlyGlobalState imports. 🔥",
		},

		{
			name: "Features Setters",
			pattern: "src/features/**/*.setters.ts",
			allowImportsFrom: ["{dirname}/**", "{readWriteGlobalState}"],
			errorMessage: "🔥 The Features Setters module should access to Feature folder and readWriteGlobalState imports. 🔥",
		},

		{
			name: "Features Imports",
			pattern: "src/features/**/*.imports.ts",
			allowImportsFrom: ["src/features/**"],
			errorMessage: "🔥 The Features Imports module should access to all Features. 🔥",
		},

		{
			name: "Common Features",
			pattern: "src/features/_*/**",
			allowImportsFrom: ["{readOnlyGlobalState}"],
			errorMessage: "🔥 The Common Features module should access to readOnlyGlobalState imports. 🔥",
		},

		{
			name: "Features",
			pattern: "src/features/*/**",
			allowImportsFrom: ["{family}/**", "{readOnlyGlobalState}"],
			errorMessage: "🔥 The Features module should access to its family and readOnlyGlobalState imports. 🔥",
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
		root: ["src/*", "src/api/*", "src/hooks/**", "src/libs/**", "src/tr/*", "*"],
		readOnlyGlobalState: [
			"src/gs.ts",
			"src/Actions/actions.impl.ts",
			"src/Actions/actions.types.ts",
			"src/features/_*/**",
			"src/hooks/**",
			"src/libs/**",
			"src/Shared/**",
			"{misc}",
			"{externalLibs}",
		],
		readWriteGlobalState: ["src/globalState.ts", "{readOnlyGlobalState}"],
		externalLibs: ["**/preact/**", "**/signals-react/**"],
	},
});
