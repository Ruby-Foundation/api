import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { randomUUID } from 'crypto'
import Discord from 'App/Models/Discord'

export default class Ticket extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public type: string

  @column()
  public userId: string

  @column()
  public channelId: string

  @belongsTo(() => Discord)
  public user: BelongsTo<typeof Discord>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateUuid (ticket: Ticket) {
    ticket.id = randomUUID()
  }
}
