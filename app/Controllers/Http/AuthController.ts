import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { LoginValidator, RegisterValidator } from 'App/Validators/AuthValidator'
import User from 'App/Models/User'

export default class AuthController {
  public async login ({ auth, request, response }: HttpContextContract) {
    const data = await request.validate(LoginValidator)

    try {
      const token = await auth.use('api').attempt(data.email, data.password)
      response.send({
        message: "Vous vous êtes bien connecté",
        user: auth.user,
        token: `${token.token}`
      })
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  public async logout ({ auth }: HttpContextContract) {
    await auth.use('api').revoke()

    return {
      revoked: true
    }
  }

  public async register ({ request }: HttpContextContract) {
    const data = await request.validate(RegisterValidator)

    return User.create(data)
  }

  public async me ({ auth }: HttpContextContract) {
    const user = auth.user!

    await user.load('permissions')
    await user.load('roles', (query) => {
      query.preload('permissions')
    })

    return user
  }
}
