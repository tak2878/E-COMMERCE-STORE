import {
  fetchBaseQuery,
  type BaseQueryApi,
  type FetchArgs,
} from "@reduxjs/toolkit/query";
import { startLoading, stopLoading } from "../layout/uiSlice";
import { toast } from "react-toastify";
import { router } from "../routes/Routes";

const customBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5001/api",
});

type ErrorResponse = string | { title: string } | { errors: string[] };

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

export const baseQueryWithErrorHandling = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  api.dispatch(startLoading());
  await sleep();

  const result = await customBaseQuery(args, api, extraOptions);
  // stop loading
  api.dispatch(stopLoading());

  if (result.error) {
    const { status, data } = result.error;
    console.log({ status, data });
    const responseData = result.error.data as ErrorResponse;
    let title: string = "";
    if (typeof responseData === "object" && "title" in responseData) {
      if ("errors" in responseData) {
        throw Object.values(responseData.errors).flat().join(", ");
      } else {
        title = responseData.title;
      }
    } else {
      title = responseData as string;
    }
    console.log(responseData,"responseDatae")
    switch (status) {
      case 400:
        toast.error(title);
        break;
      case 401:
      case 404:
        router.navigate("/not-found");
        break;
      case 500:
        router.navigate("/server-error", { state: { error: responseData } });
        break;
      default:
        break;
    }
  }
  return result;
};
