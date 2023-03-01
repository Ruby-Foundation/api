import {ApiClient, ApiResponse} from "@japa/api-client";

export async function login (client: ApiClient): Promise<ApiResponse> {
  return client
    .post('/api/v1/auth/login')
    .form({
      email: 'test@gmail.com',
      password: 'testtest'
    })

}
