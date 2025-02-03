import { QueryClient } from "@tanstack/react-query";
import { httpBatchLink, httpLink, isNonJsonSerializable, splitLink } from "@trpc/react-query";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import { responseInterceptorLink, trpc } from "./lib/trpc.ts";

// 1. Create a new `QueryClient`
const queryClient = new QueryClient();
// 2. Create a new `trpc` client
const trpcClient = trpc.createClient({
  links: [
    responseInterceptorLink(), // Some advanced stuff for response handling in both success and error cases
    splitLink({
      condition: (op) => isNonJsonSerializable(op.input),
      true: httpLink({
        url: `${import.meta.env.VITE_API_URL ?? ""}/trpc`,
        fetch(url, options) {
          return fetch(url, {
            ...options,
            credentials: "include",
          });
        },
      }),
      false: httpBatchLink({
        url: `${import.meta.env.VITE_API_URL ?? ""}/trpc`,
        fetch(url, options) {
          return fetch(url, {
            ...options,
            credentials: "include",
          });
        },
      }),
    }), // splitLink should come before httpBatchLink
  ],
});

createRoot(document.getElementById("root")!).render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </trpc.Provider>
);
