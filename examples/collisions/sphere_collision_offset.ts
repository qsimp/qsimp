import { System } from "../../models/system"
import { Entity, SphereEntity, BoxEntity } from "../../models/entity"
import { Vector3 } from "../../models/vector3";
import { GravityForce } from "../../models/force"
import { Sphere } from "three";

export function CollidingSpheresOffset(): System {
    let system = new System()


    let ball1 = new SphereEntity()
    ball1.mass = 5
    ball1.radius = 3
    ball1.position = new Vector3(-10, 1.5, 0)
    ball1.velocity = new Vector3(5, 0, 0)
    system.addEntity(ball1)

    let ball2 = new SphereEntity()
    ball2.mass = 5
    ball2.radius = 3
    ball2.position = new Vector3(10, -1.5, 0)
    ball2.velocity = new Vector3(-5, 0, 0)
    system.addEntity(ball2)

    return system
}