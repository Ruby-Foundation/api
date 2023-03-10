import { test } from '@japa/runner'
import Database from "@ioc:Adonis/Lucid/Database";
import Env from "@ioc:Adonis/Core/Env";

test.group('Auth login', ({ each }) => {
  each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('invalide form', async ({ client }) => {
    const response = await client
      .post('/api/v1/auth/login')
      .form({
        lorem: 'hello'
      })

    response.assertStatus(422)
  })

  test('invalid credentials', async ({ client }) => {
    const response = await client
      .post('/api/v1/auth/login')
      .form({
        email: 'test',
        password: 'test'
      })

    response.assertStatus(400)
  })

  test('connected', async ({ client }) => {
    const response = await client
      .post('/api/v1/auth/login')
      .form({
        email: 'nathael@gmail.com',
        password: 'nathael'
      })

    response.assertStatus(200)
  })

  test('already connected', async ({ client }) => {
    const response = await client
      .post('/api/v1/auth/login')
      .form({
        email: 'nathael@gmail.com',
        password: 'nathael'
      })
      .bearerToken(Env.get('ACCOUNT_TOKEN'))

    response.assertStatus(401)
  })
})
