import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { randomUUID } from 'crypto'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'
import {beforeCreate} from "@adonisjs/lucid/build/src/Orm/Decorators";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeCreate()
  public static async generateUuid (user: User) {
    user.id = randomUUID()
  }
}
