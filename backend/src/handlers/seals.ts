import { v4 } from 'uuid'
import crypto from 'crypto'

import { Seal, IStatus } from '../types/seal'

const seals: Seal[] = []

module.exports = {
  getSeals: (req, res, next) => {
    res.json(seals)
  },

  getSeal: (req, res, next) => {
    const unseal: boolean = req.query.action === 'unseal' ? true : false
    const sealIndex: number = seals.findIndex(
      (seal) => seal.id === req.params.id
    )
    if (sealIndex < 0) {
      res.status(404).json({ error: 'Not found' })
    }
    if (unseal) {
      seals[sealIndex].status = IStatus.UNSEALED
      res.json(seals[sealIndex])
    } else {
      res.json({ id: seals[sealIndex].id, status: seals[sealIndex].status })
    }
  },

  createSeal: (req, res) => {
    const seal: Seal = {
      id: v4(),
      status: IStatus.SEALED,
      secret: v4(),
      salt: crypto.pseudoRandomBytes(32).toString('hex'),
    }
    seals.push(seal)
    res.status(201).json(seal)
  },
}
