import { Seal, IStatus } from '../types/seal'
import { v4 } from 'uuid'
import crypto from 'crypto'

/** Generates a new seal */
const generateSeal = (): Seal => {
  return {
    id: v4(),
    status: IStatus.SEALED,
    secret: crypto.pseudoRandomBytes(32).toString('hex'),
    salt: crypto.pseudoRandomBytes(32).toString('hex'),
  }
}

export { generateSeal }
