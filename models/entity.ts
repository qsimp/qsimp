import { Vector3 } from "./vector3"
import { v4 as uuidv4 } from 'uuid';

export enum Shape {
    Sphere,
    Box,
}

export class Entity {
    id: string

    mass: number
    fixed: boolean

    position: Vector3
    velocity: Vector3

    shape: Shape

    constructor() {
        this.id = uuidv4()
        this.mass = 0
        this.position = new Vector3(0, 0, 0)
        this.velocity = new Vector3(0, 0, 0)
    }

    momentum(): Vector3 {
        return this.velocity.scalar(this.mass)
    }
}


export class SphereEntity extends Entity {
    radius: number

    constructor() {
        super()
        this.shape = Shape.Sphere
    }
}

export class BoxEntity extends Entity {
    dimensions: Vector3

    constructor() {
        super()
        this.shape = Shape.Box
    }
}