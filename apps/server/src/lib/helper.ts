import * as trpcExpress from "@trpc/server/adapters/express";
import { Express } from "express-serve-static-core";
import { appRouter } from "../module/tRPC/routes/index.js";
import { createContext } from "../module/tRPC/context.js";
import expressRouter from "../module/express/routes/index.js";

export const initiateTRPCRoutesInExpressMiddlware = (app: Express) => {
  app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
      onError({ error }) {
        console.error(error);
      },
      batching: {
        enabled: true,
      },
      responseMeta: () => ({
        headers: {
          "Access-Control-Allow-Credentials": "true",
        },
      }),
    })
  );
};

export const initiateExpressRoutesInExpressMiddleware = (app: Express) => {
  app.use("/initialise", (_req, res) => {
    res.send("Hello from Express d");
  });
  app.use("/api/v1", expressRouter);
};
