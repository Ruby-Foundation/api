import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.unique({
        table: 'users',
        column: 'email'
      })
    ]),
    username: schema.string({ trim: true }),
    password: schema.string({ trim: true }, [
      rules.minLength(7)
    ]),
    password_confirmation: schema.string({ trim: true }, [
      rules.equalTo('password')
    ]),
    roles: schema.array.optional().members(schema.string({ trim: true }, [
      rules.exists({
        table: 'roles', column: 'id'
      })
    ])),
    permissions: schema.array.optional().members(schema.string({ trim: true }, [
      rules.exists({
        table: 'permissions', column: 'id'
      })
    ]))
  })

  public messages: CustomMessages = {}
}

export class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string.optional({ trim: true }, [
      rules.unique({
        table: 'users',
        column: 'email'
      })
    ]),
    username: schema.string.optional({ trim: true }),
    password: schema.string.optional({ trim: true }, [
      rules.minLength(7)
    ]),
    password_confirmation: schema.string.optional({ trim: true }, [
      rules.equalTo('password')
    ]),
    roles: schema.array.optional().members(schema.string({ trim: true }, [
      rules.exists({
        table: 'roles', column: 'id'
      })
    ])),
    permissions: schema.array.optional().members(schema.string({ trim: true }, [
      rules.exists({
        table: 'permissions', column: 'id'
      })
    ]))
  })

  public messages: CustomMessages = {}
}
