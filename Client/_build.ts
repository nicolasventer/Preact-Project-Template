import Bun from "bun";
import fs from "fs";

fs.rmSync("./dist", { recursive: true, force: true });
console.log("dist folder removed");

const result = await Bun.build({
	entrypoints: ["./src/index.tsx"],
	outdir: "./dist",
	splitting: true,
	sourcemap: "linked",
	minify: true,
	naming: {
		entry: "[dir]/[name].[ext]",
		chunk: "[dir]/[name].chunk-[hash].[ext]",
		asset: "asset/[name].[ext]",
	},
});

if (!result.success) {
	console.error("Build failed");
	for (const message of result.logs) console.error(message);
	process.exit(1);
}

console.log("build done");
fs.copyFileSync("./bun_index.html", "./dist/index.html");
console.log("bun_index.html copied");
