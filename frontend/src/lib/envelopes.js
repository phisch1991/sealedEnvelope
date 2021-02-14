import { getNewSeal, getSealStatus } from './serverAdapter'
import { sealStore, inboxStore } from './db'
import { encrypt } from './crypto'


const getLabelsOfUnsealedEnvelopes = async () => {
    const labels = []
    const sealIds = await sealStore.keys()
    for (let sealId of sealIds) {
        if (await getSealStatus(sealId) != 'sealed') {
            let item = await sealStore.getItem(sealId)
            labels.push(item.label)
        }
    }
    return labels
}

const deleteEnvelope = async (key) => {
    await inboxStore.removeItem(key)
}

const sealEnvelope = async (payload, label) => {
    const seal = await getNewSeal()
    await sealStore.setItem(seal.id, { label })
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
    getLabelsOfUnsealedEnvelopes,
    sealEnvelope,
    deleteEnvelope,
    getAllEnvelopes,
    getEnvelopeById,
    saveEnvelope
}