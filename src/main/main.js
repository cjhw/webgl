import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import * as dat from 'dat.gui'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { BufferAttribute, SphereGeometry } from 'three'

const gui = new dat.GUI()

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  40
)

const textureLoader = new THREE.TextureLoader()
const particlesTexture = textureLoader.load('./textures/particles/1.png')

camera.position.set(0, 0, 40)
scene.add(camera)

const params = {
  count: 100000,
  size: 0.1,
  radius: 5,
  branch: 12,
  color: '#ff6030',
  rotateScale: 0.3,
  endColor: '#1d3984',
}

let geometry = null
let material = null
let points = null
const centerColor = new THREE.Color(params.color)
const endColor = new THREE.Color(params.endColor)
const generateGalaxy = () => {
  geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(params.count * 3)
  const colors = new Float32Array(params.count * 3)
  for (let i = 0; i < params.count; i++) {
    const branchAngel = (i % params.branch) * ((2 * Math.PI) / params.branch)
    const distance = Math.random() * params.radius * Math.pow(Math.random(), 3)
    const current = i * 3

    const randomX =
      (Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance)) / 5
    const randomY =
      (Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance)) / 5
    const randomZ =
      (Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance)) / 5

    positions[current] =
      Math.cos(branchAngel + distance * params.rotateScale) * distance + randomX
    positions[current + 1] = 0 + randomY
    positions[current + 2] =
      Math.sin(branchAngel + distance * params.rotateScale) * distance + randomZ

    // 混合颜色，形成渐变色
    const mixColor = centerColor.clone()
    mixColor.lerp(endColor, distance / params.radius)
    colors[current] = mixColor.r
    colors[current + 1] = mixColor.g
    colors[current + 2] = mixColor.b
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  material = new THREE.PointsMaterial({
    // color: new THREE.Color(params.color),
    size: params.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    map: particlesTexture,
    alphaMap: particlesTexture,
    transparent: true,
    vertexColors: true,
  })

  points = new THREE.Points(geometry, material)
  scene.add(points)
}

generateGalaxy()

const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)
// 开启场景中的阴影贴图
renderer.shadowMap.enabled = true
renderer.physicallyCorrectLights = true

document.body.appendChild(renderer.domElement)

// renderer.render(scene, camera)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const axesHelper = new THREE.AxesHelper(5)

scene.add(axesHelper)

const clock = new THREE.Clock()

function render() {
  let time = clock.getElapsedTime()
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
