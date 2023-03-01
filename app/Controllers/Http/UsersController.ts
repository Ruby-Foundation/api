import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'
import { StoreValidator, UpdateValidator } from 'App/Validators/UserValidator'

export default class UsersController {
  public async index ({ bouncer }: HttpContextContract): Promise<User[]> {
    await bouncer.with('UserPolicy').authorize('view')
    return User.query()
  }

  public async show ({ params, bouncer }: HttpContextContract): Promise<User | null> {
    await bouncer.with('UserPolicy').authorize('view')

    return User.query()
      .where('id', params.id)
      .preload('roles', (query) => {
        query.preload('permissions')
      })
      .preload('permissions')
      .first()
  }

  public async store ({ request, bouncer }: HttpContextContract): Promise<User> {
    await bouncer.with('UserPolicy').authorize('store')

    const data = await request.validate(StoreValidator)
    return User.create(data)
  }

  public async update ({ params, request, bouncer }: HttpContextContract): Promise<User> {
    await bouncer.with('UserPolicy').authorize('update')

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

  public async delete ({ params, bouncer }: HttpContextContract): Promise<void> {
    await bouncer.with('UserPolicy').authorize('destroy')

    const user = await User.findOrFail(params.id)
    return user.delete()
  }
}
