import * as ts from "typescript";

export function tsToJs(tsCode: string): string | undefined {
	const options: ts.TranspileOptions = {
		compilerOptions: {
			// Target ESNext for modern JavaScript features
			target: ts.ScriptTarget.ESNext,
			// Module commonjs for Node.js environments
			module: ts.ModuleKind.CommonJS,
			// Emit only JavaScript, no declaration files
			noEmitOnError: false, // Don't throw if there are errors during compilation
			// You can add more compiler options as needed, e.g., strict: true
		},
	};

	// Transpile the TypeScript code string
	const result = ts.transpileModule(tsCode, options);

	if (result.diagnostics && result.diagnostics.length > 0) {
		console.error("TypeScript compilation errors:");
		result.diagnostics.forEach((diagnostic) => {
			const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
			if (diagnostic.file) {
				const { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start!);
				console.error(`  Error ${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
			} else {
				console.error(`  Error: ${message}`);
			}
		});
		return undefined; // Indicate failure
	}

	return result.outputText;
}
