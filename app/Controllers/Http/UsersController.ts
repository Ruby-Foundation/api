import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'
import { StoreValidator, UpdateValidator } from 'App/Validators/UserValidator'

export default class UsersController {
  public async index (): Promise<User[]> {
    return User.query()
  }

  public async show ({ params }: HttpContextContract): Promise<User | null> {
    return User.query()
      .where('id', params.id)
      .preload('roles', (query) => {
        query.preload('permissions')
      })
      .preload('permissions')
      .first()
  }

  public async store ({ request }: HttpContextContract): Promise<User> {
    const data = await request.validate(StoreValidator)
    return User.create(data)
  }

  public async update ({ params, request }: HttpContextContract): Promise<User> {
    const data = await request.validate(UpdateValidator)
    const user = await User.findOrFail(params.id)

    await user.load('permissions')
    await user.load('roles')

    if (data.permissions) {
      await user.related('permissions').sync(data.permissions)
    }

    if (data.roles) {
      await user.related('roles').sync(data.roles)
    }

    return user.merge(data).save()
  }

  public async delete ({ params }: HttpContextContract): Promise<void> {
    const user = await User.findOrFail(params.id)
    return user.delete()
  }
}
