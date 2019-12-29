'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImovelSchema extends Schema {
  up () {
    this.create('imovels', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.string('title').notNullable()
      table.string('address').notNullable()
      table.decimal('price').notNullable()
      table.decimal('latitude', 9,6).notNullable()
      table.decimal('longitude, 9,6').notNullable()

      table.timestamps()
    })
  }

  down () {
    this.drop('imovels')
  }
}

module.exports = ImovelSchema
