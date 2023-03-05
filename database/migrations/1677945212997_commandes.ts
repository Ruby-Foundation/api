import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'commandes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('type').notNullable()
      table.string('description').notNullable()
      table.double('price').notNullable()
      table.string('state').defaultTo('todo')
      table.string('ressource')
      table.string('client_id')
        .references('id').inTable('users')
        .onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
