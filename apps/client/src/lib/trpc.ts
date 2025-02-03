import { createTRPCReact, TRPCLink } from "@trpc/react-query";
import type { AppRouter } from "../../../server/src/module/tRPC/routes";
import { observable } from "@trpc/server/observable";
import { AnyTRPCRouter } from "@trpc/server";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

export const trpc = createTRPCReact<AppRouter>();
export const responseInterceptorLink = <TRouter extends AnyTRPCRouter>(): TRPCLink<TRouter> => {
  return () => {
    return ({ op, next }) => {
      return observable((observer) => {
        return next(op).subscribe({
          next(result) {
            // For now, we're not modifying the successful response
            observer.next(result);
            observer.complete();
          },
          error(error) {
            // Handle errors
            if (error.data) {
              switch (error.data.httpStatus) {
                case 401:
                  // Handle unauthorized error
                  console.log("unauthorized");
                  break;
                case 403:
                  // Handle forbidden error

                  console.log("forbidden");
                  break;
                case 404:
                  // Handle not found error
                  console.log("not found");
                  break;
                case 500:
                  // Handle internal server error
                  console.log("internal server error");
                  break;
                default:
                  break;
              }
            }
            observer.error(error);
          },
        });
      });
    };
  };
};
