import { HBar, ElectronMass, ElectronRadius } from '../../reference/constants'
import { length } from '../../reference/units'
import * as math from 'mathjs'


export class InfiniteSquareWell {

    a: number
    m: number

    constructor(a = length("10nm"), m = ElectronMass) {
        this.a = a
        this.m = m
    }

    potential(x: number) {
        if (0 <= x && x <= this.a) {
            return 0
        }

        return Infinity
    }

    E(n: number) {
        let scope = {
            n: n,
            a: this.a,
            m: this.m,
            hbar: HBar,
            pi: math.pi
        }
        return math.evaluate("n^2 pi^2 hbar^2 / (2 m a^2)", scope)
    }

    WaveFunctionSolution(n: number, x: number, t: number) {
        if (x < 0 || x > this.a) {
            return 0
        }
        let scope = {
            n: n,
            a: this.a,
            m: this.m,
            hbar: HBar,
            pi: math.pi,
            x: x,
            t: t,
        }

        return math.evaluate("sqrt( 2/a ) * sin(n pi x / a) * e^(-i t n^2 pi^2 hbar / (2 m a^2) )", scope)
    }
}