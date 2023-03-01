import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Discord from "App/Models/Discord";
import {StoreValidator, UpdateValidator} from "App/Validators/DiscordValidator";

export default class DiscordsController {
  public async index (): Promise<Discord[]> {
    return Discord.query()
  }

  public async show ({ params, response }: HttpContextContract): Promise<Discord | null | void> {
    const user = await Discord.query()
      .where('id', params.id)
      .preload('tickets')
      .preload('user')
      .first()
    return user ? user : response.badRequest({
      message: 'Ressource non existente'
    }, true)

  }

  public async store ({ request }: HttpContextContract): Promise<Discord> {
    const data = await request.validate(StoreValidator)

    return Discord.create(data)
  }

  public async update ({ request, params }: HttpContextContract): Promise<Discord> {
    const data = await request.validate(UpdateValidator)
    const user = await Discord.findOrFail(params.id)

    return user.merge(data).save()
  }

  public async delete ({ params }: HttpContextContract): Promise<void> {
    const user = await Discord.findOrFail(params.id)

    return user.delete()
  }
}
