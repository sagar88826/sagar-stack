import { Express } from "express";
import expressRouter from "../express/routes/init.js";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "../tRPC/route.js";
import { createContext } from "../tRPC/context.js";

export const initiateExpressRoutesInExpressMiddleware = (app: Express) => {
  app.use("/initialise", (_req, res) => {
    res.send("Hello from Express d");
  });
  app.use("/api/v1", expressRouter);
};

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
