export default interface Seal {
    id: string,
    status: string,
    secret?: string,
    salt?: string
}