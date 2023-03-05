import { test } from '@japa/runner'
import Database from "@ioc:Adonis/Lucid/Database";
import Env from "@ioc:Adonis/Core/Env";
import {ApiResponse} from "@japa/api-client";
import {login} from "../../login";

test.group('Commandes list', ({ each }) => {
  each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('index commandes', async ({ client }) => {
    const response = await client
      .get('/api/v1/commandes')
      .bearerToken(Env.get('ACCOUNT_TOKEN'))

    response.assertStatus(200)
  })

  test('without token', async ({ client }) => {
    const response = await client
      .get('/api/v1/commandes')

    response.assertStatus(401)
  })

  test('without permission', async ({ client }) => {
    const loginResponse: ApiResponse = await login(client)

    const response = await client
      .get('/api/v1/commandes')
      .bearerToken(loginResponse.response.body.token)


    response.assertStatus(403)
  })
})
