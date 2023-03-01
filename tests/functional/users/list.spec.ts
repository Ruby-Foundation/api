import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import Env from '@ioc:Adonis/Core/Env'
import {login} from "../../login";
import {ApiResponse} from "@japa/api-client";

test.group('Users list', ({ each }) => {
  each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('index user', async ({ client }) => {
    const response = await client
      .get('/api/v1/account/users')
      .bearerToken(Env.get('ACCOUNT_TOKEN'))

    response.assertStatus(200)
  })

  test('without token', async ({ client }) => {
    const response = await client
      .get('/api/v1/account/users')

    response.assertStatus(401)
  })

  test('without permission', async ({ client }) => {
    const loginResponse: ApiResponse = await login(client)

    const response = await client
      .get('/api/v1/account/users')
      .bearerToken(loginResponse.response.body.token)


    response.assertStatus(403)
  })

  test('show user', async ({ client }) => {
    const response = await client
      .get('/api/v1/account/users/4555c554-f680-4b3e-be47-7ad5aa1b3ac2')
      .bearerToken(Env.get('ACCOUNT_TOKEN'))

    response.assertStatus(200)
  })

  test('show user with bad id', async ({ client }) => {
    const response = await client
      .get('/api/v1/account/users/dazdazdada')
      .bearerToken(Env.get('ACCOUNT_TOKEN'))

    response.assertStatus(204)
  })
})
