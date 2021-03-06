const backendUrl = 'http://localhost:4000/api/v1'

const getNewSeal = async () => {
    return await (await fetch(`${backendUrl}/seals`, { method: 'POST' })).json();
}

const getSealStatus = async (sealId) => {
    let seal = await (await fetch(`${backendUrl}/seals/${sealId}`)).json()
    return seal.status;
}

const unsealInfo = async (sealId) => {
    return await (await fetch(`${backendUrl}/seals/${sealId}?action=unseal`)).json()
}

export {
    getNewSeal,
    getSealStatus,
    unsealInfo
}
  