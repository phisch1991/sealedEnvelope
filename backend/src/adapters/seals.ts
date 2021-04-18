import knex from 'knex'
import config from '../db/config/knexfile'
import { Seal, IStatus } from '../types/seal'

const db = knex(config)

/** Returns all seals from the database */
const getAllSeals = async (): Promise<Seal[]> => {
  return db('seals').select('id', 'status')
}

/** Returns a seal by id */
const getSealById = async (id: string): Promise<Seal> => {
  return db('seals').select('id', 'status').where({ id }).first()
}

/** Sets a seal's status to unsealed and returns updated seal */
const unsealSealById = async (id: string): Promise<Seal> => {
  return (
    await db('seals')
      .where({ id })
      .update({ status: IStatus.UNSEALED })
      .returning('*')
  )[0]
}

/** Persists a seal to the database */
const saveSeal = async (seal: Seal): Promise<void> => {
  await db('seals').insert(seal)
}

export { getAllSeals, getSealById, unsealSealById, saveSeal }
