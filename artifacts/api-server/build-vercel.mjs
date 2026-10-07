import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build as esbuild } from "esbuild";
import esbuildPluginPino from "esbuild-plugin-pino";
import { cp, mkdir, rm, writeFile } from "node:fs/promises";

// Emits a Vercel Build Output API v3 bundle at <repo>/.vercel/output:
// the website as static files and the Express app as a single /api function.
// The website must already be built (artifacts/3stones-website/dist/public).

globalThis.require = createRequire(import.meta.url);

const artifactDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(artifactDir, "..", "..");
const outputDir = path.resolve(repoRoot, ".vercel/output");
const staticDir = path.resolve(outputDir, "static");
const funcDir = path.resolve(outputDir, "functions/api.func");
const websiteDist = path.resolve(repoRoot, "artifacts/3stones-website/dist/public");

async function buildAll() {
  await rm(outputDir, { recursive: true, force: true });
  await mkdir(funcDir, { recursive: true });

  await cp(websiteDist, staticDir, { recursive: true });

  await esbuild({
    entryPoints: { index: path.resolve(artifactDir, "src/app.ts") },
    platform: "node",
    target: "node24",
    bundle: true,
    format: "esm",
    outdir: funcDir,
    outExtension: { ".js": ".mjs" },
    logLevel: "info",
    external: ["*.node", "pg-native"],
    plugins: [esbuildPluginPino({ transports: ["pino-pretty"] })],
    banner: {
      js: `import { createRequire as __bannerCrReq } from 'node:module';
import __bannerPath from 'node:path';
import __bannerUrl from 'node:url';

globalThis.require = __bannerCrReq(import.meta.url);
globalThis.__filename = __bannerUrl.fileURLToPath(import.meta.url);
globalThis.__dirname = __bannerPath.dirname(globalThis.__filename);
    `,
    },
  });

  await writeFile(
    path.resolve(funcDir, ".vc-config.json"),
    JSON.stringify(
      {
        runtime: "nodejs24.x",
        handler: "index.mjs",
        launcherType: "Nodejs",
        shouldAddHelpers: false,
      },
      null,
      2,
    ),
  );

  await writeFile(
    path.resolve(outputDir, "config.json"),
    JSON.stringify(
      {
        version: 3,
        routes: [
          { src: "^/api(/.*)?$", dest: "/api" },
          { handle: "filesystem" },
          { src: "/(.*)", dest: "/index.html" },
        ],
      },
      null,
      2,
    ),
  );
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
