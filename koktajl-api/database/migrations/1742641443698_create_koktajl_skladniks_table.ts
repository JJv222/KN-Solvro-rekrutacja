import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'koktajl_skladniks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('koktajl_id')
        .unsigned()
        .references('id')
        .inTable('koktajls')
        .onDelete('CASCADE')

      table
        .integer('skladnik_id')
        .unsigned()
        .references('id')
        .inTable('skladniks')
        .onDelete('CASCADE')

      table
        .integer('jednostka_id')
        .unsigned()
        .references('id')
        .inTable('jednostkas') // lub 'jednostki' – zależnie od twojej nazwy
        .onDelete('SET NULL')

      table.float('ilosc').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
