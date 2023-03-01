import { test } from '@japa/runner'
import Database from "@ioc:Adonis/Lucid/Database";
import Env from "@ioc:Adonis/Core/Env";

test.group('Auth register', ({ each }) => {
  each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Invalid form', async ({ client }) => {
    const response = await client
      .post('/api/v1/auth/register')
      .form({
        lorem: 'test'
      })

    response.assertStatus(422)
  })

  test('Already connected', async ({ client }) => {
    const response = await client
      .post('/api/v1/auth/register')
      .form({
        email: 'test@gmail.com',
        username: 'test',
        password: 'test'
      })
      .bearerToken(Env.get('ACCOUNT_TOKEN'))

    response.assertStatus(401)
  })

  test('register user', async ({ client }) => {
    const response = await client
      .post('/api/v1/auth/register')
      .form({
        email: 'test@gmail.com',
        username: 'test',
        password: 'test'
      })

    response.assertStatus(200)
  })
})
