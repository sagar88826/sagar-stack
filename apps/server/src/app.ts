import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { createServer } from "http";
import morgan from "morgan";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import notFoundHandler from "./middlewares/express/not-found.js";
import errorHandler from "./middlewares/express/error-handler.js";
import { env } from "./configs/env.js";
import { initiateExpressRoutesInExpressMiddleware, initiateTRPCRoutesInExpressMiddlware } from "./shared/lib/helper.js";
import app from "./shared/express/init.js";

const clientUrl = env.CLIENT_URL || "";
// Middleware
app.use(cookieParser());
app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https://*.amazonaws.com", "https://*.unsplash.com", "https://images.unsplash.com"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://us-assets.i.posthog.com"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        connectSrc: [
          "'self'",
          "https://us.i.posthog.com",
          "https://tichat.online",
          "https://www.tichat.online",
          "wss://tichat.online",
          "ws://www.tichat.online",
        ],
        frameSrc: ["'self'", "https://*.amazonaws.com"],
      },
    },
  })
);
app.use(morgan("dev"));
app.use(
  cors({
    origin: function (origin, callback) {
      console.log("Request origin:", origin);

      const allowedOrigins = clientUrl.split(",");

      if (!origin || allowedOrigins.includes(origin)) {
        console.log("Origin allowed:", origin);
        callback(null, true);
      } else {
        console.log("Origin blocked:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 200, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Initiating features
initiateTRPCRoutesInExpressMiddlware(app);
app.use(express.json({ limit: "1000mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
initiateExpressRoutesInExpressMiddleware(app);
const httpServer = createServer(app);

// Serve static files in production
if (env.NODE_ENV === "production") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const frontendBuild = join(__dirname, "../../client/dist");
  app.use(express.static(frontendBuild));
  app.get("*", (_req, res) => {
    res.sendFile(join(frontendBuild, "index.html"));
  });
}

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default httpServer;
