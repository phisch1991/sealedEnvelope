import * as Knex from 'knex'

export async function up(knex): Promise<void> {
  return knex.schema.createTable('seals', (t) => {
    t.string('id').primary()
    t.string('status')
    t.string('secret')
    t.string('salt')
  })
}

export async function down(knex): Promise<void> {
  return knex.schema.dropTableIfExists('seals')
}
