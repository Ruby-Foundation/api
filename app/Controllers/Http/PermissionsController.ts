import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/Permission'

export default class PermissionsController {
  public async index ({}): Promise<Permission[]> {
    return Permission.query()
  }

  public async show ({ params }: HttpContextContract): Promise<Permission | null> {
    return Permission.query()
      .where('id', params.id)
      .first()
  }

  public async user ({ params }: HttpContextContract) {
    return Permission.query()
      .whereHas('users', (query) => {
        query.where('user_id', params.id)
      })
  }
}
