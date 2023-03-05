import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { randomUUID } from 'crypto'
import {
  column,
  beforeSave,
  beforeCreate,
  BaseModel,
  manyToMany,
  ManyToMany,
  hasOne, HasOne
} from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'
import Permission from './Permission'
import Discord from 'App/Models/Discord'
import Commande from "App/Models/Commande";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public email: string

  @column()
  public username: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @manyToMany(() => Role)
  public roles: ManyToMany<typeof Role>

  @manyToMany(() => Permission)
  public permissions: ManyToMany<typeof Permission>

  @manyToMany(() => Commande, {
    pivotTable: 'workings'
  })
  public commandes: ManyToMany<typeof Commande>

  @hasOne(() => Discord)
  public discord: HasOne<typeof Discord>

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
