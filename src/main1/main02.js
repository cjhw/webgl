import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

camera.position.set(0, 0, 10)
scene.add(camera)

const cubeCeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 })

const cube = new THREE.Mesh(cubeCeometry, cubeMaterial)

scene.add(cube)

const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

// renderer.render(scene, camera)

const controls = new OrbitControls(camera, renderer.domElement)

const axesHelper = new THREE.AxesHelper(5)

scene.add(axesHelper)

function render() {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

render()
