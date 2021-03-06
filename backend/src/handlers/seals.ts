import { v4 } from 'uuid'
import crypto from 'crypto'
import knex from 'knex'
import config from '../db/config/knexfile'
import { Seal, IStatus } from '../types/seal'

const database = knex(config)

module.exports = {
  getSeals: async (req, res, next) => {
    const seals: Seal[] = await database('seals').select()
    res.json(seals)
  },

  getSeal: async (req, res, next) => {
    const unseal: boolean = req.query.action === 'unseal' ? true : false
    const { id } = req.params
    if (unseal) {
      const seal = await database('seals')
        .where({ id })
        .update({ status: IStatus.UNSEALED })
        .returning('*')
      if (!seal) {
        res.status(404).json({ error: 'Not found' })
      }
      res.json(seal[0])
    } else {
      const seal: Seal = await database('seals').where({ id }).first()
      if (!seal) {
        res.status(404).json({ error: 'Not found' })
      }
      res.json(seal)
    }
  },

  createSeal: async (req, res) => {
    const seal: Seal = {
      id: v4(),
      status: IStatus.SEALED,
      secret: v4(),
      salt: crypto.pseudoRandomBytes(32).toString('hex'),
    }
    await database('seals').insert(seal)
    res.status(201).json(seal)
  },
}
