import { createLogger, format, transports } from 'winston'
const { combine, timestamp, json } = format

export default createLogger({
  level: process.env['LOG_LEVEL'] || 'info',
  format: combine(timestamp(), json()),
  defaultMeta: { service: 'sealedEnvelope backend' },
  transports: [new transports.Console()],
})
