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

camera.position.set(0, 0, 40)
scene.add(camera)

function createPoints(url, size = 0.5) {
  const particlesGeometry = new THREE.BufferGeometry()
  const count = 10000

  // 设置缓冲区数组
  const positions = new Float32Array(count * 3)
  // 设置粒子顶点颜色
  const colors = new Float32Array(count * 3)
  // 设置顶点
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 100
    colors[i] = Math.random()
  }
  particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
  )
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  // 设置点材质
  const pointsMaterial = new THREE.PointsMaterial()
  pointsMaterial.size = size
  pointsMaterial.color.set(0xfff000)
  // 相机深度而衰减
  pointsMaterial.sizeAttenuation = true

  // 载入纹理
  const textureLoader = new THREE.TextureLoader()
  const texture = textureLoader.load(`./textures/particles/${url}.png`)
  // 设置点材质纹理
  pointsMaterial.map = texture
  pointsMaterial.alphaMap = texture
  pointsMaterial.transparent = true
  pointsMaterial.depthWrite = false
  pointsMaterial.blending = THREE.AdditiveBlending
  // 设置启动顶点颜色
  pointsMaterial.vertexColors = true

  const points = new THREE.Points(particlesGeometry, pointsMaterial)

  scene.add(points)
  return points
}

const points = createPoints('1', 0.5)
const points2 = createPoints('zs', 0.5)
const points3 = createPoints('zs2', 0.5)

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
  points.rotation.x = time * 0.3
  points2.rotation.x = time * 0.5
  points2.rotation.y = time * 0.4
  points3.rotation.x = time * 0.2
  points3.rotation.y = time * 0.2
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
