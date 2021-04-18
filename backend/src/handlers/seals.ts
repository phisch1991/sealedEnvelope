import { v4 } from 'uuid'
import crypto from 'crypto'
import { Seal, IStatus } from '../types/seal'
import {
  getAllSeals,
  getSealById,
  unsealSealById,
  saveSeal,
} from '../adapters/seals'
import { generateSeal } from '../lib/seals'
import logger from '../lib/logger'

module.exports = {
  getSeals: async (req, res, next) => {
    try {
      res.json(await getAllSeals())
    } catch (e) {
      next(e)
    }
  },

  getSeal: async (req, res, next) => {
    const unseal: boolean = req.query.action === 'unseal' ? true : false
    const { id } = req.params
    let seal: Seal
    try {
      seal = unseal ? await unsealSealById(id) : await getSealById(id)
    } catch (e) {
      next(e)
    }
    if (!seal) {
      res.status(404).json({ message: 'Not found' })
    }
    res.json(seal)
  },

  createSeal: async (req, res, next) => {
    const seal: Seal = generateSeal()
    try {
      await saveSeal(seal)
    } catch (e) {
      next(e)
    }
    res.status(201).json(seal)
  },
}
