export class Vector3 {
    x: number
    y: number
    z: number

    constructor(x, y, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    at(i: number): number {
        if (i == 0) {
            return this.x
        }

        if (i == 1) {
            return this.y
        }

        if (i == 2) {
            return this.z
        }

        throw "invalid index" + i
    }

    set(i: number, v: number) {
        if (i == 0) {
            this.x = v
            return
        }

        if (i == 1) {
            this.y = v
            return
        }

        if (i == 2) {
            this.z = v
            return
        }

        throw "invalid index" + i
    }


    distance(v2: Vector3): number {
        let sum = 0;
        sum += Math.pow(this.x - v2.x, 2)
        sum += Math.pow(this.y - v2.y, 2)
        sum += Math.pow(this.z - v2.z, 2)
        return Math.sqrt(sum)
    }

    magnitude(): number {
        let sum = 0;
        sum += Math.pow(this.x, 2)
        sum += Math.pow(this.y, 2)
        sum += Math.pow(this.z, 2)
        return Math.sqrt(sum)
    }

    add(v2: Vector3): Vector3 {
        return new Vector3(this.x + v2.x, this.y + v2.y, this.z + v2.z)
    }

    addScalar(a: number): Vector3 {
        return new Vector3(this.x + a, this.y + a, this.z + a)
    }

    sub(v2: Vector3): Vector3 {
        return new Vector3(this.x - v2.x, this.y - v2.y, this.z - v2.z)
    }

    scalar(s: number): Vector3 {
        return new Vector3(this.x * s, this.y * s, this.z * s)
    }

    unit(): Vector3 {
        let magnitude = this.magnitude()
        if (magnitude == 0) {
            return new Vector3(0, 0, 0)
        }

        return this.scalar(1 / magnitude)
    }

    dot(v2: Vector3): number {
        return (this.x * v2.x) + (this.y * v2.y) + (this.z + v2.z)
    }

    multiply(v2: Vector3): Vector3 {
        return new Vector3(this.x * v2.x, this.y * v2.y, this.z * v2.z)
    }

    sqrt(): Vector3 {
        return new Vector3(Math.sqrt(this.x), Math.sqrt(this.y), Math.sqrt(this.z))
    }
}
