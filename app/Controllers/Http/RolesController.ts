import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from '../../Models/Role'
import { StoreValidator, UpdateValidator } from '../../Validators/RoleValidator'

export default class RolesController {
  public async index ({ bouncer }: HttpContextContract): Promise<Role[]> {
    await bouncer.with('RolePolicy').authorize('view')
    return Role.query()
  }

  public async show ({ params, bouncer }: HttpContextContract): Promise<Role | null> {
    await bouncer.with('RolePolicy').authorize('view')
    return Role.query()
      .where('id', params.id)
      .preload('permissions')
      .first()
  }

  public async store ({ request, bouncer }: HttpContextContract): Promise<Role> {
    await bouncer.with('RolePolicy').authorize('store')
    const data = await request.validate(StoreValidator)

    return Role.create(data)
  }

  public async update ({ params, request, bouncer }: HttpContextContract): Promise<Role> {
    await bouncer.with('RolePolicy').authorize('update')
    const data = await request.validate(UpdateValidator)
    const role = await Role.findOrFail(params.id)

    return role.merge(data).save()
  }

  public async delete ({ params, bouncer }: HttpContextContract): Promise<void> {
    await bouncer.with('RolePolicy').authorize('destroy')
    const role = await Role.findOrFail(params.id)

    return role.delete()
  }
}
