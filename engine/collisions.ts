import { System } from "../models/system";
import { Shape, SphereEntity, BoxEntity } from "../models/entity";
import { Vector3 } from "../models/vector3";

function mod3(i: number): number {
    return i % 3
}

export function handleCollisions(system: System) {
    for (let e1 of system.entities) {
        for (let e2 of system.entities) {
            if (e1.id == e2.id) {
                continue
            }

            // Sphere - Box =
            if (e1.shape == Shape.Sphere && e2.shape == Shape.Box) {
                let radius = (e1 as SphereEntity).radius
                let dimensions = (e2 as BoxEntity).dimensions

                let boxMax = new Vector3(0, 0, 0)
                let boxMin = new Vector3(0, 0, 0)
                let sphereMin = new Vector3(0, 0, 0)
                var sphereMax = new Vector3(0, 0, 0)
                var inBounds = new Vector3(0, 0, 0)
                for (let i = 0; i < 3; i++) {
                    boxMax.set(i, e2.position.at(i) + dimensions.at(i))
                    boxMin.set(i, e2.position.at(i) - dimensions.at(i))

                    sphereMax.set(i, e1.position.at(i) + radius)
                    sphereMin.set(i, e1.position.at(i) - radius)

                    if (boxMin.at(i) < e1.position.at(i) && e1.position.at(i) < boxMax.at(i)) {
                        inBounds.set(i, 1)
                    }
                }

                for (let i = 0; i < 3; i++) {
                    if (inBounds.at((i + 1) % 3) == 1 && inBounds.at((i + 2) % 3) == 1) {
                        if (sphereMin.at(i) > boxMin.at(i) && sphereMin.at(i) < boxMax.at(i)) {
                            if (!e1.fixed) {
                                e1.position.set(i, boxMax.at(i) + radius)
                                e1.velocity.set(i, -e1.velocity.at(i))
                            }

                            if (!e2.fixed) {
                                e2.velocity.set(i, -e2.velocity.at(i))
                            }
                        }

                        if (sphereMax.at(i) < boxMax.at(i) && sphereMax.at(i) > boxMin.at(i)) {
                            if (!e1.fixed) {
                                e1.position.set(i, boxMin.at(i) - radius)
                                e1.velocity.set(i, -e1.velocity.at(i))
                            }

                            if (!e2.fixed) {
                                e2.velocity.set(i, -e2.velocity.at(i))
                            }
                        }

                    }
                }
            }

            if (e1.shape == Shape.Sphere && e2.shape == Shape.Sphere) {
                let s1 = e1 as SphereEntity
                let s2 = e2 as SphereEntity

                if (s1.position.distance(s2.position) < (s1.radius + s2.radius)) {

                    // m1v1 + m2v2
                    let momentum = s1.velocity.scalar(s1.mass).add(s2.velocity.scalar(s2.mass))

                    // 1/2 m v**2 
                    let kinetic = (s1.velocity.multiply(s1.velocity).scalar(.5 * s1.mass)).add(s2.velocity.multiply(s2.velocity).scalar(.5 * s2.mass))


                    let a = (s2.mass * s1.mass * s1.mass) + (s2.mass * s2.mass * s1.mass)
                    let b = momentum.scalar(-2 * s1.mass * s2.mass / a)
                    let c = (momentum.multiply(momentum).scalar(s2.mass).sub(kinetic.scalar(s2.mass * s2.mass * 2))).scalar(1 / a)
                    a = 1

                    // let quadratic1 = (-b + Math.sqrt(b.dot(b) - 4 * a * c)) / (2 * a)
                    // let v2_1 = (momentum - s1.mass * quadratic1) / m2
                    // console.log(momentum, kinetic, a, b, c)

                    let v1_f = (b.scalar(-1).add((b.multiply(b).sub(c.scalar(4 * a)).sqrt()))).scalar(1 / (2 * a))
                    let v2_f = (momentum.sub(v1_f.scalar(s1.mass))).scalar(1 / s2.mass)

                    e1.velocity = v1_f
                    e2.velocity = v2_f

                    // console.log(v1_f)
                    // console.log(quadratic2)
                }
            }
        }
    }
}

