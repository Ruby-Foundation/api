import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'discord'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('user_id').unique()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table.string('profil_id').unique()
      table.integer('exp').defaultTo(0)
      table.integer('level').defaultTo(1)

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
