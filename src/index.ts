import { Hono } from "hono";
import { createRouteHandler } from "uploadthing/server";
import { uploadRouter } from "./uploadthing.ts";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

type Bindings = {
  UPLOADTHING_TOKEN: string 
  ENVIRONMENT: string
}

const app = new Hono<{Bindings: Bindings}>();
app.use("*", cors());
app.use("*", logger());

// Request from Expo Frontend 
app.all("/api/uploadthing", async (c) => {
  // Create a route handler with our file router
  // To "expose (file router) to the world"

  // [DEPLOYED VERSION] with wrangler and cloudflare worker 
  const handlers = createRouteHandler({
    router: uploadRouter,
    config: {
      // Reads the env variables 
      token: c.env.UPLOADTHING_TOKEN,
      isDev: c.env.ENVIRONMENT === "development",

      // Workers doesn't support cache option
      // So we need to remove it from request init
      fetch: (url, init) => {
        if (init && "cache" in init) delete init.cache;
        return fetch(url, init);
      },

      // UploadThing dev server leaves some promises hanging around
      // We need to wait for them, to prevent worker from exiting prematurely
      handleDaemonPromise: (promise) => c.executionCtx.waitUntil(promise),
    },
  });

  const method = c.req.method;
  if (method !== "GET" && method !== "POST") {
    return c.text("Method not allowed", 405);
  }

  const response = await handlers(c.req.raw)
  return response;
});


export default app;