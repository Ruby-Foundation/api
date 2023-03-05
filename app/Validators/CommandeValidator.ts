import {schema, CustomMessages, rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    state: schema.enum.optional(
      ['finish', 'progress', 'todo'] as const
    ),
    description: schema.string({ trim: true }),
    price: schema.number(),
    type: schema.enum(['bot', 'web'] as const),
    ressource: schema.string({ trim: true }),
    client_id: schema.string({ trim: true }, [
      rules.exists({
        table: 'users',
        column: 'id'
      })
    ]),
    contributors: schema.array().members(schema.string({ trim: true }, [
      rules.exists({
        table: 'users', column: 'id'
      })
    ]))
  })

  public messages: CustomMessages = {}
}

export class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    state: schema.enum.optional(
      ['finish', 'progress', 'todo'] as const
    ),
    description: schema.string.optional({ trim: true }),
    price: schema.number.optional(),
    type: schema.enum.optional(['bot', 'web'] as const),
    ressource: schema.string.optional({ trim: true }),
    client_id: schema.string.optional({ trim: true }, [
      rules.exists({
        table: 'users',
        column: 'id'
      })
    ]),
    contributors: schema.array.optional().members(schema.string({ trim: true }, [
      rules.exists({
        table: 'users', column: 'id'
      })
    ]))
  })

  public messages: CustomMessages = {}
}
