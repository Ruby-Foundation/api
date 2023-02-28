import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeCreate,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany
} from '@ioc:Adonis/Lucid/Orm'
import {randomUUID} from "crypto";
import Ticket from "App/Models/Ticket";
import User from "App/Models/User";

export default class Discord extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public userId: string

  @column()
  public profilId: string

  @column()
  public exp: number

  @column()
  public level: number
  
  @hasMany(() => Ticket)
  public tickets: HasMany<typeof Ticket>
  
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateUuid (discord: Discord) {
    discord.id = randomUUID()
  }
}
