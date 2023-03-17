// Adding type to handle complex gas/price data
export interface PriceHistoricalInformationType {
    prices: Array<Array<number>>,
    time: string[]
}