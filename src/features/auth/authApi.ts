import { baseApi } from "@/app/baseApi";
import type { ApiResponse, User } from "@/lib/types/models";

type LoginPayload = { email: string; password: string };
type LoginResult = { accessToken: string; user: User };
type RegisterPayload = { name: string; email: string; password: string; phone?: string };
type ChangePasswordPayload = { oldPassword: string; newPassword: string };

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST /api/auth/login
    login: builder.mutation<ApiResponse<LoginResult>, LoginPayload>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // POST /api/auth/register
    register: builder.mutation<ApiResponse<User>, RegisterPayload>({
      query: (payload) => ({
        url: "/auth/register",
        method: "POST",
        body: payload,
      }),
    }),

    // GET /api/auth/me
    getMe: builder.query<ApiResponse<User>, void>({
      query: () => "/auth/me",
      providesTags: ["Auth"],
    }),

    // PATCH /api/auth/change-password
    changePassword: builder.mutation<ApiResponse<null>, ChangePasswordPayload>({
      query: (payload) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: payload,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useChangePasswordMutation,
} = authApi;
