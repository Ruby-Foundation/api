import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from '../../Models/Role'
import { StoreValidator, UpdateValidator } from '../../Validators/RoleValidator'

export default class RolesController {
  public async index (): Promise<Role[]> {
    return Role.query()
  }

  public async show ({ params }: HttpContextContract): Promise<Role | null> {
    return Role.query()
      .where('id', params.id)
      .preload('permissions')
      .first()
  }

  public async store ({ request }: HttpContextContract): Promise<Role> {
    const data = await request.validate(StoreValidator)

    return Role.create(data)
  }

  public async update ({ params, request }: HttpContextContract): Promise<Role> {
    const data = await request.validate(UpdateValidator)
    const role = await Role.findOrFail(params.id)

    return role.merge(data).save()
  }

  public async delete ({ params }: HttpContextContract): Promise<void> {
    const role = await Role.findOrFail(params.id)

    return role.delete()
  }
}
