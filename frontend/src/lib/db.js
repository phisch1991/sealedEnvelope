import localforage from 'localforage';

const inboxStore = localforage.createInstance({
    name: 'sealedEnvelope',
    storeName: 'inbox'
})

const sealStore = localforage.createInstance({
    name: 'sealedEnvelope',
    storeName: 'seals'
})

export {
    inboxStore,
    sealStore
}