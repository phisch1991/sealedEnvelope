import { getNewSeal, getSealStatus } from './serverAdapter'
import { sealStore, inboxStore } from './db'
import { encrypt } from './crypto'


const getNewlyUnsealedEnvelopes = async () => {
    const labels = []
    const sealIds = await sealStore.keys()
    for (let sealId of sealIds) {
        let item = await sealStore.getItem(sealId)
        if (!item.acknowledged) {
            if (await getSealStatus(sealId) != 'sealed') {
                labels.push({
                    label: item.label,
                    id: item.id
                })
            }
        }
    }
    return labels
}

const deleteEnvelope = async (key) => {
    await inboxStore.removeItem(key)
}

const sealEnvelope = async (payload, label) => {
    const seal = await getNewSeal()
    await sealStore.setItem(seal.id, { id: seal.id, label, acknowledged: false })
    return {
        id: seal.id,
        payload: encrypt(payload, seal.secret, seal.salt),
        label
    }
}

const getAllEnvelopes = async () => {
    const envelopes = []
    for (let key of (await inboxStore.keys())) {
        const item = await inboxStore.getItem(key)
        envelopes.push(JSON.parse(item))
    }
    return envelopes
}

const getEnvelopeById = async (id) => {
    return JSON.parse(await inboxStore.getItem(id))
}

const saveEnvelope = async (envelope) => {
    await inboxStore.setItem(JSON.parse(envelope).id, envelope)
}

export {
    getNewlyUnsealedEnvelopes,
    sealEnvelope,
    deleteEnvelope,
    getAllEnvelopes,
    getEnvelopeById,
    saveEnvelope
}