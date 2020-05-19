import { Entity } from "./entity";
import { Vector3 } from "./vector3";
import { GravitationalConstant } from "../reference/constants";

export interface ForceFunc {
    (entity1: Entity, entity2: Entity): Vector3;
}

export let GravityForce = (e1: Entity, e2: Entity): Vector3 => {
    let radius = e1.position.distance(e2.position)

    let direction = e1.position.sub(e2.position)
    let magnitude = GravitationalConstant * e1.mass * e2.mass / (radius * radius)

    return direction.unit().scalar(magnitude)
}