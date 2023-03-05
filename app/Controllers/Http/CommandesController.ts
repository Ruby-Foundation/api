import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Commande from 'App/Models/Commande'
import { StoreValidator, UpdateValidator } from 'App/Validators/CommandeValidator'

export default class CommandesController {
  public async index ({ bouncer }: HttpContextContract): Promise<Commande[]> {
    await bouncer.with('CommandePolicy').authorize('view')
    return Commande.query()
      .preload('client')
      .preload('contributors')
  }

  public async show ({ bouncer, params }: HttpContextContract): Promise<Commande | null> {
    await bouncer.with('CommandePolicy').authorize('view')
    return Commande.query()
      .where('id', params.id)
      .preload('client')
      .preload('contributors')
      .first()
  }

  public async user ({ bouncer, params }: HttpContextContract): Promise<Commande[]> {
    await bouncer.with('CommandePolicy').authorize('view')

    return Commande.query()
      .whereHas('contributors', (query) => {
        query.where('user_id', params.id)
      })
      .preload('client')
  }

  public async store ({ bouncer, request }: HttpContextContract): Promise<Commande> {
    await bouncer.with('CommandePolicy').authorize('store')
    const data = await request.validate(StoreValidator)
    const commande = await Commande.create(data)
    await commande.related('contributors').sync(data.contributors)

    await commande.load('contributors')
    await commande.load('client')

    return commande
  }
  public async update ({ bouncer, request, params }: HttpContextContract): Promise<Commande> {
    await bouncer.with('CommandePolicy').authorize('update')
    const commande = await Commande.findOrFail(params.id)
    const data = await request.validate(UpdateValidator)

    if (data.contributors) {
      await commande.related('contributors').sync(data.contributors)
    }
    return commande.merge(data).save()
  }

  public async destroy ({ bouncer, params }: HttpContextContract): Promise<void> {
    await bouncer.with('CommandePolicy').authorize('destroy')
    const commande = await Commande.findOrFail(params.id)

    return commande.delete()
  }
}
