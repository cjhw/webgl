import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import * as dat from 'dat.gui'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { SphereGeometry } from 'three'

const gui = new dat.GUI()

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  30
)

camera.position.set(0, 0, 10)
scene.add(camera)

const particlesGeometry = new THREE.BufferGeometry()
const count = 5000

const positions = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 100
  colors[i] = Math.random()
}

particlesGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(positions, 3)
)

particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
console.log(particlesGeometry)

const pointsMaterial = new THREE.PointsMaterial()
pointsMaterial.size = 0.5
pointsMaterial.color.set(0xfff000)
pointsMaterial.sizeAttenuation = true

const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('./textures/particles/1.png')

pointsMaterial.map = texture
pointsMaterial.alphaMap = texture
pointsMaterial.transparent = true
pointsMaterial.depthWrite = false
pointsMaterial.blending = THREE.AdditiveBlending
pointsMaterial.vertexColors = true

const points = new THREE.Points(particlesGeometry, pointsMaterial)
scene.add(points)

const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)
// 开启场景中的阴影贴图
renderer.shadowMap.enabled = true
renderer.physicallyCorrectLights = true

document.body.appendChild(renderer.domElement)

// renderer.render(scene, camera)

const controls = new OrbitControls(camera, renderer.domElement)
// controls.enableDamping = true

const axesHelper = new THREE.AxesHelper(5)

scene.add(axesHelper)

const clock = new THREE.Clock()

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
