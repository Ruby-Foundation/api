import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import HelperPolicy from 'App/Policies/HelperPolicy'

export default class TicketPolicy extends BasePolicy {
  public async before (user: User) {
    const permissions: string[] = await HelperPolicy.getPermissions(user)
    if (permissions.includes('admin')) return true
  }

  public async view (user: User) {
    const permissions: string[] = await HelperPolicy.getPermissions(user)
    return permissions.includes('view:ticket')
      || permissions.includes('store:ticket')
      || permissions.includes('update:ticket')
      || permissions.includes('destroy:ticket')
  }

  public async store (user: User) {
    const permissions: string[] = await HelperPolicy.getPermissions(user)
    return permissions.includes('store:ticket')
  }

  public async update (user: User) {
    const permissions: string[] = await HelperPolicy.getPermissions(user)
    return permissions.includes('update:ticket')
  }

  public async destroy (user: User) {
    const permissions: string[] = await HelperPolicy.getPermissions(user)
    return permissions.includes('destroy:ticket')
  }
}
