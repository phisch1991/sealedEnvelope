export interface Seal {
  id: string
  status: IStatus
  secret?: string
  salt?: string
}

export enum IStatus {
  SEALED = 'sealed',
  UNSEALED = 'unsealed',
}
