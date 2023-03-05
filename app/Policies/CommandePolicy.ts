import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from "App/Models/User";
import HelperPolicy from "App/Policies/HelperPolicy";

export default class CommandePolicy extends BasePolicy {
  public async before (user: User) {
    const permissions: string[] = await HelperPolicy.getPermissions(user)
    if (permissions.includes('admin')) return true
  }

  public async view (user: User) {
    const permissions: string[] = await HelperPolicy.getPermissions(user)
    return permissions.includes('view:commande')
      || permissions.includes('store:commande')
      || permissions.includes('update:commande')
      || permissions.includes('destroy:commande')
  }

  public async store (user: User) {
    const permissions: string[] = await HelperPolicy.getPermissions(user)
    return permissions.includes('store:commmande')
  }

  public async update (user: User) {
    const permissions: string[] = await HelperPolicy.getPermissions(user)
    return permissions.includes('update:commande')
  }

  public async destroy (user: User) {
    const permissions: string[] = await HelperPolicy.getPermissions(user)
    return permissions.includes('destroy:commande')
  }
}
