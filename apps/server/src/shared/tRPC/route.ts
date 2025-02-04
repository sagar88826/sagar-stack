import { t } from "./init.js";

export const appRouter = t.router({
  welcome: t.procedure.query(() => {
    return {
      message: "Welcome to Sagar Stack! 🚀",
      timestamp: new Date().toISOString(),
    };
  }),
});

export type AppRouter = typeof appRouter;
