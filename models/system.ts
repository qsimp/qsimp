import { Entity, SphereEntity } from './entity'
import { ForceFunc } from './force'
import { Vector3 } from './vector3'

export class System {
    entities: Entity[]
    forces: ForceFunc[]

    constructor() {
        this.entities = []
        this.forces = []
    }

    addForce(f: ForceFunc) {
        this.forces.push(f)
    }

    addEntity(e: Entity) {
        this.entities.push(e)
    }

    addEarth() {
        let earth = new SphereEntity()
        earth.mass = 5.9722e24
        earth.radius = 1
        earth.fixed = true

        // move it down
        earth.position = new Vector3(0, 6371000, 0)
        this.addEntity(earth)
    }

    tick(delta: number) {
        let forceMap = new Map<string, Vector3>()

        for (let entity of this.entities) {
            if (entity.fixed) {
                continue
            }

            let totalForce = new Vector3(0, 0, 0)
            for (let forceFunc of this.forces) {
                for (let entity2 of this.entities) {
                    if (entity.id == entity2.id) {
                        continue
                    }

                    totalForce = totalForce.add(forceFunc(entity, entity2))
                }
            }
            forceMap[entity.id] = totalForce
        }

        // calculate new positions
        for (let entity of this.entities) {
            if (entity.fixed) {
                continue
            }

            let acceleration = forceMap[entity.id].scalar(1 / entity.mass)

            entity.velocity = entity.velocity.add(acceleration.scalar(delta / 1000))
            entity.position = entity.position.add(entity.velocity.scalar(delta / 1000))

            // console.log(entity.shape, entity.id, acceleration, entity.velocity, entity.position)

        }
    }
}
