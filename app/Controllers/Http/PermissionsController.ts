import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/Permission'

export default class PermissionsController {
  public async index ({ bouncer }: HttpContextContract): Promise<Permission[]> {
    await bouncer.with('PermissionPolicy').authorize('view')
    return Permission.query()
  }

  public async show ({ params, bouncer }: HttpContextContract): Promise<Permission | null> {
    await bouncer.with('PermissionPolicy').authorize('view')
    return Permission.query()
      .where('id', params.id)
      .first()
  }

  public async user ({ params, bouncer }: HttpContextContract) {
    await bouncer.with('PermissionPolicy').authorize('view')
    return Permission.query()
      .whereHas('users', (query) => {
        query.where('user_id', params.id)
      })
  }
}
