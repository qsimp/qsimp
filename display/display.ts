import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { System } from '../models/system';
import { Entity, Shape, SphereEntity, BoxEntity } from '../models/entity';


export class Display {

    renderer: THREE.WebGLRenderer
    cube: THREE.Mesh

    scene: THREE.Scene
    camera: THREE.Camera

    controls: OrbitControls

    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = -50
        this.camera.position.y = 0

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        // this.controls.autoRotateSpeed = 1
        // this.controls.autoRotate = true

        this.controls.update()

        // this.camera.position.z = 5;
    }

    render(system: System) {
        this.controls.update()
        // document.getElementById("stats").innerHTML = ""

        for (let entity of system.entities) {
            let object = this.scene.getObjectByName(entity.id)

            if (object == undefined) {
                console.log("Creating new entity", entity)
                let mesh = createMesh(entity)
                this.scene.add(mesh);
            }

            if (object != undefined) {
                object.position.x = entity.position.x
                object.position.y = entity.position.y
                object.position.z = entity.position.z
            }

            // let text = Shape[entity.shape] + " " + entity.position.x.toFixed(2) + ", " + entity.position.y.toFixed(2) + ", " + entity.position.z.toFixed(2)
            // let stats = document.createElement("p").appendChild(document.createTextNode(text));
            // let br = document.createElement("br")
            // document.getElementById("stats").appendChild(stats)
            // document.getElementById("stats").appendChild(br)
        }

        this.renderer.render(this.scene, this.camera);
    };
}

function createMesh(entity: Entity): THREE.Mesh {
    let out: THREE.Mesh = null

    if (entity.shape == Shape.Sphere) {
        let sphere = entity as SphereEntity
        let geometry = new THREE.SphereGeometry(sphere.radius);
        let material = new THREE.MeshBasicMaterial({ wireframe: true });
        out = new THREE.Mesh(geometry, material);
    }
    if (entity.shape == Shape.Box) {
        let box = entity as BoxEntity
        let geometry = new THREE.BoxGeometry(box.dimensions.x, box.dimensions.y, box.dimensions.z);
        let material = new THREE.MeshBasicMaterial({ wireframe: true });
        out = new THREE.Mesh(geometry, material);
    }

    out.name = entity.id
    return out
}

