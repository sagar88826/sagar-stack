import httpServer from "./app.js";
import { env } from "./configs/env.js";

const port = env.PORT;

httpServer.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
