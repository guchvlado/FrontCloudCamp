import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IFormRequest } from "../types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.sbercloud.ru/" }),
  endpoints: (builder) => ({
    sendFormData: builder.mutation<any, IFormRequest>({
      query: (payload: IFormRequest) => ({
        url: "content/v1/bootcamp/frontend",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useSendFormDataMutation } = apiSlice;
