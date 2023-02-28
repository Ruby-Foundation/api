import {BaseCommand} from "@adonisjs/ace";

export default class MakeUser extends BaseCommand {
  public static commandName = 'make:user'
  public static description = 'Create a new user'

  public static settings = {
    loadApp: true,
    stayAlive: false,
  }

  public async run () {
    const { default: User } = await import('App/Models/User')
    const { default: Role } = await import('App/Models/Role')

    const username = await this.prompt.ask('Enter user username')
    const email = await this.prompt.ask('Choose email')
    const password = await this.prompt.secure('Choose account password')
    const passwordConfirmation = await this.prompt.secure('Confirm account password')

    if (password !== passwordConfirmation) {
      this.logger.fatal('Passwords are not identical')
      return
    }

    const admin = await Role.findBy('key', 'admin')

    if (!admin) {
      this.logger.fatal('Role admin was not created')
      return
    }

    const user = await User.create({
      username: username,
      email: email,
      password: password
    })

    await user.related('roles').attach([admin.id])

    this.logger.success('User was create')
  }
}
