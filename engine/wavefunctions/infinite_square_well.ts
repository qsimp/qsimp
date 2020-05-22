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

    ExpectationX(n: number): number {
        return this.a / 2
    }

    ExpectationXSquared(n: number) {
        return this.a * this.a * ((1 / 3) - (1 / (2 * n * n * Math.PI * Math.PI)))
    }

    ExpectationP(n: number): number {
        return 0
    }

    ExpectationPSquared(n: number): number {
        return n * n * Math.PI * Math.PI * HBar * HBar / (this.a * this.a)
    }

    SigmaXSquared(n: number) {
        return this.ExpectationXSquared(n) - (this.ExpectationX(n) * this.ExpectationX(n))
    }

    SigmaPSquared(n: number) {
        return this.ExpectationPSquared(n) - (this.ExpectationP(n) * this.ExpectationP(n))
    }

    Uncertainty(n: number): number {
        return Math.sqrt(this.SigmaXSquared(n) * this.SigmaPSquared(n))
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