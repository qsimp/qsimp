import { Entity } from "./models/entity";
import { System } from "./models/system"
import { Display } from "./display/display";
import { CollidingSpheresOffset } from "./examples/sphere_collision_offset"
import { handleCollisions } from "./engine/collisions"

let system = CollidingSpheresOffset()
// system.addEntity(entity)
// system.addEntity(entity2)


let fps = 30
let speedup = 1.1

let d = new Display()
let lastTick = new Date()
let timer = setInterval(() => {
    let delta = new Date().getTime() - lastTick.getTime()
    lastTick = new Date()

    system.tick(speedup * 1000 / fps)
    handleCollisions(system)

    d.render(system)

    // clearInterval(timer)

}, 1000 / fps)
