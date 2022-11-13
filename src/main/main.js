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

const sphereGeometry = new THREE.SphereGeometry(3, 30, 30)
// const material = new THREE.MeshBasicMaterial({
//   color: 0xff0000,
//   wireframe: true,
// })
// const mesh = new THREE.Mesh(sphereGeometry, material)
// scene.add(mesh)

const pointsMaterial = new THREE.PointsMaterial()
pointsMaterial.size = 0.1
pointsMaterial.color.set(0xfff000)
pointsMaterial.sizeAttenuation = true

const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('./textures/particles/2.png')

pointsMaterial.map = texture
pointsMaterial.alphaMap = texture
pointsMaterial.transparent = true
pointsMaterial.depthWrite = false
pointsMaterial.blending = THREE.AdditiveBlending

const points = new THREE.Points(sphereGeometry, pointsMaterial)
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
