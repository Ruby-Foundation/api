import { test } from '@japa/runner'
import Database from "@ioc:Adonis/Lucid/Database";
import Env from "@ioc:Adonis/Core/Env";

test.group('Auth me', ({ each }) => {
  each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('No authenticated', async ({ client }) => {
    const response = await client
      .get('/api/v1/auth/me')

    response.assertStatus(401)
  })

  test('Was connected', async ({ client }) => {
    const response = await client
      .get('/api/v1/auth/me')
      .bearerToken(Env.get('ACCOUNT_TOKEN'))


    response.assertStatus(200)
  })
})
