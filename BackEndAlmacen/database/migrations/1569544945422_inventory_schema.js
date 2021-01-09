'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InventorySchema extends Schema {
  up () {
    this.create('inventories', (table) => {
      table.increments()
      table.integer('quantity').notNullable()
      table.float('price').notNullable()
      table.float('tax').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('product_id').unsigned().references('id').inTable('products')
      table.timestamps()
    })
  }

  down () {
    this.drop('inventories')
  }
}

module.exports = InventorySchema
