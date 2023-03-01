import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import HelperPolicy from 'App/Policies/HelperPolicy'

export default class UserPolicy extends BasePolicy {
  public async before (user: User) {
    const permissions: string[] = await HelperPolicy.getPermissions(user)
    if (permissions.includes('admin')) return true
  }

  public async view (user: User) {
    const permissions: string[] = await HelperPolicy.getPermissions(user)
    return permissions.includes('view:user')
      || permissions.includes('store:user')
      || permissions.includes('update:user')
      || permissions.includes('destroy:user')
  }

  public async store (user: User) {
    const permissions: string[] = await HelperPolicy.getPermissions(user)
    return permissions.includes('store:user')
  }

  public async update (user: User) {
    const permissions: string[] = await HelperPolicy.getPermissions(user)
    return permissions.includes('update:user')
  }

  public async destroy (user: User) {
    const permissions: string[] = await HelperPolicy.getPermissions(user)
    return permissions.includes('destroy:user')
  }
}
