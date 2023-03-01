import { test } from '@japa/runner'
import Database from "@ioc:Adonis/Lucid/Database";

test.group('Users', ({ each }) => {
  each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('can get users', async ({ client }) => {
    const response = await client.get('/api/v1/account/users')

    response.assertStatus(401)
  })
})
