import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;
const templateRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the personal website", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Andrew Chin \| Personal Website<\/title>/i);
  assert.match(html, /Design-minded builder for useful web things\./);
  assert.match(html, /Recent work/);
  assert.match(html, /Study Hall/);
  assert.match(html, /Have an idea worth putting on the board\?/);
  assert.doesNotMatch(html, developmentPreviewMeta);
  assert.doesNotMatch(html, /react-loading-skeleton|Your site is taking shape/);
});

test("removes the disposable starter preview", async () => {
  const appFiles = await readdir(new URL("../app", import.meta.url), {
    recursive: true,
  });

  assert.deepEqual(
    appFiles.filter((file) => file.toString().includes("_sites-preview")),
    [],
  );

  await assert.rejects(readdir(new URL("app/_sites-preview", templateRoot)));
});
