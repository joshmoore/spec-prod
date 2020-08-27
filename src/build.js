// @ts-check
const { env, exit, setOutput, sh } = require("./utils.js");

const type = env("INPUTS_TYPE");
const source = env("INPUTS_SOURCE");

// Please do not rely on this value. If you would like this to be available as
// an action output, file an issue.
const outputFile = source + ".built.html";

(async () => {
	switch (type) {
		case "respec":
			console.log(`Converting ReSpec document '${source}' to HTML...`);
			return await sh(`respec -s "${source}" -o "${outputFile}"`, "stream");
		case "bikeshed":
			console.log(`Converting Bikeshed document '${source}' to HTML...`);
			return await sh(`bikeshed spec "${source}" "${outputFile}"`, "stream");
		default:
			throw new Error(`Unknown "type": "${type}"`);
	}
})()
	.then(() => setOutput("output", outputFile))
	.catch(err => exit(err.message || "Failed", err.code));
