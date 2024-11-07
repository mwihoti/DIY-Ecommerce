import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
	BlogCreateRequest,
	BlogDeleteRequest,
	BlogModel,
	BlogResponse,
	BlogUpdateRequest,
} from "./types";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import type { ErrorResponse } from "../error-types";


export const blogApi = createApi({
    reducerPath: "blogApi",

    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:4040/api/",
        prepareHeaders: (headers, { getState, endpoint}) => {
            const token = (getState() as RootState).auth.token;

            if ( token && 
                endpoint !== "posts/all" &&
                !endpoint.startsWith("posts/user")
            ) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
        Credentials: "include",
    }),
    refetchOnFocus: true,
    refetchOnReconnect: true,
    tagTypes: ["BlogModel"],
    endpoints: (builder) => {
        return {
            getAllBlogPosts: builder.query<BlogModel[], void>({
                query: () => ({
                    url: "posts/all",
                }),
                transformResponse: (response: { posts: BlogModel[] }, _meta, _arg) => 
                    response.posts,
                transformErrorResponse: (response, _meta, _arg) => {
                    return response.data as ErrorResponse;
                },
                providesTags: ["BlogModel"],
            }),
            getBlogPostsByUsername: builder.query<BlogModel[], string>({
                query: (user) => `posts/user/${user}`,
                transformResponse: (response: {posts: BlogModel[] }, _meta, _arg) => 
                    response.posts,
                transformErrorResponse(response, _meta, _arg) {
                    return response.data as ErrorResponse;
                },
                providesTags: ["BlogModel"],
            }),
            createPost: builder.mutation<BlogResponse, BlogCreateRequest>({
                query: (body) => ({
                    url: "posts/post/create",
                    method: "POST",
                    credentials: "include",
                    body: body,
                    validateStatus(response) {
                        console.log(response);
                        return response.ok === true;
                    },
                }),
                invalidatesTags: ["BlogModel"],
                transformErrorResponse(response, _meta, _arg) {
                    return response.data as ErrorResponse;
                },
            }),
            deletePost: builder.mutation<BlogResponse, BlogDeleteRequest>({
                query: (body) => ({
                    url: "posts/post/delete",
                    method: "DELETE",
                    credentials: "include",
                    body: {id: body.id, title: body.title },
                }),
                invalidatesTags: ["BlogModel"],
                transformErrorResponse(response, _meta, _arg) {
                    return response.data as ErrorResponse;
                },
            }),

            updatePost: builder.mutation<BlogResponse, BlogUpdateRequest>({
                query: (body) => ({
                    url: "posts/post/update",
                    method: "PUT",
                    credentials: "include",
                    body: body,
                }),
                invalidatesTags: ["BlogModel"],
                transformErrorResponse(response, _meta, _arg) {
                    return response.data as ErrorResponse;
                },
            }),

        };
    },
});

// Exporting the generated methods from createApi
export const {
	useLazyGetAllBlogPostsQuery,
	useLazyGetBlogPostsByUsernameQuery,
	useGetBlogPostsByUsernameQuery,
	useGetAllBlogPostsQuery,
	useCreatePostMutation,
	useUpdatePostMutation,
	useDeletePostMutation,
} = blogApi;