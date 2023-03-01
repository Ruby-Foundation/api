import {schema, CustomMessages, rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    profil_id: schema.string({ trim: true }, [
      rules.unique({
        table: 'discords', column: 'profil_id'
      })
    ]),
    user_id: schema.string.optional({ trim: true }, [
      rules.exists({
        table: 'users',
        column: 'id'
      })
    ]),
    exp: schema.number.optional(),
    level: schema.number.optional(),
  })

  public messages: CustomMessages = {}
}

export class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    user_id: schema.string.optional({ trim: true }, [
      rules.exists({
        table: 'users',
        column: 'id'
      })
    ]),
    exp: schema.number.optional(),
    level: schema.number.optional(),
  })

  public messages: CustomMessages = {}
}
