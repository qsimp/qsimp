import { System } from "../models/system"
import { Entity, SphereEntity, BoxEntity } from "../models/entity"
import { Vector3 } from "../models/vector3";
import { GravityForce } from "../models/force"

export function BuildBouncySystem(): System {
    let system = new System()

    for (let i = 0; i < 10; i++) {
        let ball = new SphereEntity()
        ball.mass = 1
        ball.radius = 1
        let x = (Math.random() * 5) - 2.5
        let z = (Math.random() * 5) - 2.5
        let y = (Math.random() * 10)
        ball.position = new Vector3(x, y, z)
        ball.velocity = new Vector3(x, y, z)

        system.addEntity(ball)
    }

    let floor = new BoxEntity()
    floor.mass = 100
    floor.dimensions = new Vector3(100, 1, 100)
    floor.position = new Vector3(0, -1, 0)
    floor.fixed = true

    let wall1 = new BoxEntity()
    wall1.mass = 100
    wall1.dimensions = new Vector3(1, 10, 20)
    wall1.position = new Vector3(12, 5, 0)
    wall1.fixed = true

    let wall2 = new BoxEntity()
    wall2.mass = 100
    wall2.dimensions = new Vector3(1, 10, 20)
    wall2.position = new Vector3(-12, 5, 0)
    wall2.fixed = true

    let wall3 = new BoxEntity()
    wall3.mass = 100
    wall3.dimensions = new Vector3(20, 10, 1)
    wall3.position = new Vector3(0, 5, -12)
    wall3.fixed = true
    system.addEntity(wall3)

    let wall4 = new BoxEntity()
    wall4.mass = 100
    wall4.dimensions = new Vector3(20, 10, 1)
    wall4.position = new Vector3(0, 5, 12)
    wall4.fixed = true
    system.addEntity(wall4)

    system.addEntity(floor)
    system.addEntity(wall1)
    system.addEntity(wall2)
    system.addEarth()
    system.addForce(GravityForce)
    return system
}