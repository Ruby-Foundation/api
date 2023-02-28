import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permission from "App/Models/Permission";

export default class extends BaseSeeder {
  public async run () {
    await Permission.createMany([
      { key: 'admin', label: 'Administrateur'},

      { key: 'store:user', label: 'Créer un utilisateur' },
      { key: 'update:user', label: 'Mettre à jour un utilisateur' },
      { key: 'destroy:user', label: 'Supprimer un utilisateur' },

      { key: 'store:role', label: 'Créer un role' },
      { key: 'update:role', label: 'Mettre à jour un role' },
      { key: 'destroy:role', label: 'Supprimer un role' },
    ])
  }
}
