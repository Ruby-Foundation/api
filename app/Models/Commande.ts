import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeCreate,
  BelongsTo,
  belongsTo,
  column, ManyToMany,
  manyToMany
} from '@ioc:Adonis/Lucid/Orm'
import {randomUUID} from "crypto";
import User from "App/Models/User";

export default class Commande extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public type: 'bot' | 'web'

  @column()
  public description: string

  @column()
  public price: number

  @column()
  public state: 'finish' | 'progress' | 'todo'

  @column()
  public ressource: string

  @column()
  public clientId: string

  @belongsTo(() => User)
  public client: BelongsTo<typeof User>

  @manyToMany(() => User)
  public contributors: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateUuid (commande: Commande) {
    commande.id = randomUUID()
  }
}
