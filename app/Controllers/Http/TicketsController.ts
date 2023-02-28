import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ticket from "App/Models/Ticket";
import {StoreValidator, UpdateValidator} from "App/Validators/TicketValidator";

export default class TicketsController {
  public async index (): Promise<Ticket[]> {
    return Ticket.query()
      .preload('user')
  }

  public async show ({ params }: HttpContextContract): Promise<Ticket | null> {
    return Ticket.query()
      .where('id', params.id)
      .preload('user')
      .first()
  }

  public async user ({ params }: HttpContextContract): Promise<Ticket[]> {
    return Ticket.query()
      .where('user_id', params.id)
  }

  public async store ({ request }: HttpContextContract): Promise<Ticket> {
    const data = await request.validate(StoreValidator)

    return Ticket.create(data)
  }

  public async update ({ request, params }: HttpContextContract): Promise<Ticket> {
    const data = await request.validate(UpdateValidator)
    const ticket = await Ticket.findOrFail(params.id)

    return ticket.merge(data).save()
  }

  public async delete ({ params }: HttpContextContract): Promise<void> {
    const ticket = await Ticket.findOrFail(params.id)

    return ticket.delete()
  }
}
