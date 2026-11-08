import readline from "node:readline/promises";
import { loadModel, translate, unloadModel, BERGAMOT_EN_FR } from "@qvac/sdk";

// Load the English -> French model (downloads once, then runs from the local cache)
console.log("Loading English → French model...");
let modelId;
try {
    modelId = await loadModel({
        modelSrc: BERGAMOT_EN_FR,
        modelType: "nmt", // neural machine translation
        modelConfig: { engine: "Bergamot", from: "en", to: "fr", beamsize: 1, temperature: 0.2 },
    });
} catch (err) {
    console.error("Could not load the model:", err.message);
    console.error("If this is the first run, check your internet connection (the model downloads once).");
    process.exit(1);
}
console.log("Model ready.\n");

async function toFrench(text) {
    const start = Date.now();
    const result = translate({ modelId, text, modelType: "nmt", stream: false });
    const french = await result.text;
    return { french, ms: Date.now() - start };
}

// One-shot mode:  npm run translate -- "Good morning"
if (process.argv[2]) {
    const { french, ms } = await toFrench(process.argv.slice(2).join(" "));
    console.log(`${french}  (${ms} ms)`);
} else {
    // Interactive mode
    console.log('Type English text and press Enter. Type "exit" to quit.\n');
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    while (true) {
        const text = (await rl.question("EN> ")).trim();
        if (!text) continue;
        if (["exit", "quit"].includes(text.toLowerCase())) break;
        try {
            const { french, ms } = await toFrench(text);
            console.log(`FR> ${french}  (${ms} ms)\n`);
        } catch (err) {
            console.error("Translation failed:", err.message, "\n");
        }
    }
    rl.close();
}

await unloadModel({ modelId });