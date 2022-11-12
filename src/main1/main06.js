import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'

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

// cube.position.set(5, 0, 0)
// cube.position.x = 3

// cube.scale.set(3, 1, 1)

// cube.rotation.set(Math.PI / 4, 0, 0)

scene.add(cube)

const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

// renderer.render(scene, camera)

const controls = new OrbitControls(camera, renderer.domElement)

const axesHelper = new THREE.AxesHelper(5)

scene.add(axesHelper)

const clock = new THREE.Clock()

gsap.to(cube.position, { x: 5, duration: 3, ease: 'power2.inout' })
gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 3, ease: 'power2.inout' })

function render() {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

render()
