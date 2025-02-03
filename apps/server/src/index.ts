import httpServer from "./app.js";

const port = process.env.PORT || 8173;

httpServer.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
