import * as math from 'mathjs'

export function length(inStr: string): number {
    return math.unit(inStr).toNumber('m')
}

export function convert(inValue: number, inUnits: string, outUnits: string): number {
    return math.unit(inValue, inUnits).toNumber(outUnits)
}