import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ticket from "App/Models/Ticket";
import {StoreValidator, UpdateValidator} from "App/Validators/TicketValidator";

export default class TicketsController {
  public async index ({ bouncer }: HttpContextContract): Promise<Ticket[]> {
    await bouncer.with('TicketPolicy').authorize('view')
    return Ticket.query()
      .preload('user')
  }

  public async show ({ params, bouncer }: HttpContextContract): Promise<Ticket | null> {
    await bouncer.with('TicketPolicy').authorize('view')
    return Ticket.query()
      .where('id', params.id)
      .preload('user')
      .first()
  }

  public async user ({ params, bouncer }: HttpContextContract): Promise<Ticket[]> {
    await bouncer.with('TicketPolicy').authorize('view')
    return Ticket.query()
      .where('user_id', params.id)
  }

  public async store ({ request, bouncer }: HttpContextContract): Promise<Ticket> {
    await bouncer.with('TicketPolicy').authorize('store')

    const data = await request.validate(StoreValidator)

    return Ticket.create(data)
  }

  public async update ({ request, params, bouncer }: HttpContextContract): Promise<Ticket> {
    await bouncer.with('TicketPolicy').authorize('update')

    const data = await request.validate(UpdateValidator)
    const ticket = await Ticket.findOrFail(params.id)

    return ticket.merge(data).save()
  }

  public async delete ({ params, bouncer }: HttpContextContract): Promise<void> {
    await bouncer.with('TicketPolicy').authorize('destroy')

    const ticket = await Ticket.findOrFail(params.id)

    return ticket.delete()
  }
}
