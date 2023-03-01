import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {AuthenticationException} from "@adonisjs/auth/build/standalone";

export default class Guest {
  protected async guest (auth: HttpContextContract['auth']) {
    if (auth.isGuest) {
      return true
    }

    throw new AuthenticationException(
      'Access for visitors only',
      'E_VISITOR_ACCESS'
    )
  }

  public async handle({ auth }: HttpContextContract, next: () => Promise<void>) {
    await this.guest(auth)
    await next()
  }
}
