import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from "App/Models/Role";

export default class extends BaseSeeder {
  public async run () {
    await Role.firstOrCreate({
      key: 'admin'
    }, {
      key: 'admin',
      label: 'Administrateur',
      power: 100
    })
  }
}
