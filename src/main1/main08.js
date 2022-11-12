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
controls.enableDamping = true

const axesHelper = new THREE.AxesHelper(5)

scene.add(axesHelper)

const clock = new THREE.Clock()

let animate1 = gsap.to(cube.position, {
  x: 5,
  duration: 3,
  ease: 'power2.inout',
  yoyo: true,
  // delay: 2,
  onComplete: () => {
    console.log('动画完成')
  },
  onStart: () => {
    console.log('动画开始')
  },
  repeat: -1,
})
gsap.to(cube.rotation, {
  x: 2 * Math.PI,
  duration: 3,
  ease: 'power2.inout',
  yoyo: true,
  repeat: -1,
})

window.addEventListener('dblclick', () => {
  if (animate1.isActive()) {
    animate1.pause()
  } else {
    animate1.resume()
  }
})

function render() {
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

render()

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
})
