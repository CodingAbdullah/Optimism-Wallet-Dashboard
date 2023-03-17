// Adding type to handle complex gas data
export interface GasPriceType {
    chainInformation: {
        jsonrpc: string,
        id: number,
        result: string
    },
    gasPrice: string
}