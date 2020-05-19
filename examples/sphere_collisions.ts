import { System } from "../models/system"
import { Entity, SphereEntity, BoxEntity } from "../models/entity"
import { Vector3 } from "../models/vector3";
import { GravityForce } from "../models/force"
import { Sphere } from "three";

export function CollidingSpheres(): System {
    let system = new System()

    let masses = [
        [5, 5],
        [5, 5],
        [1, 15],
        [5, 15],
        [10, 5],
        [15, 5],
    ]

    let velocities = [
        [5, -5],
        [5, -15],
        [5, -5],
        [5, -5],
        [15, -5],
        [10, 5]
    ]

    for (let i = 0; i < masses.length; i++) {
        let ball1 = new SphereEntity()
        ball1.mass = masses[i][0]
        ball1.radius = masses[i][0] / 5
        ball1.position = new Vector3(-10, 25 - (10 * i), 0)
        ball1.velocity = new Vector3(velocities[i][0], 0, 0)
        system.addEntity(ball1)

        let ball2 = new SphereEntity()
        ball2.mass = masses[i][1]
        ball2.radius = masses[i][1] / 5
        ball2.position = new Vector3(10, 25 - (10 * i), 0)
        ball2.velocity = new Vector3(velocities[i][1], 0, 0)
        system.addEntity(ball2)
    }

    return system
}