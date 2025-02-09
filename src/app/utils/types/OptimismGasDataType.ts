// Adding interfaces to represent complex types
export default interface OptimismGasDataType {
    chainInformation: {
        jsonrpc: string,
        id: number,
        result: string
    }
    gasPrice: string
}