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

var div = document.createElement('div')
div.style.width = '200px'
div.style.height = '200px'
div.style.position = 'fixed'
div.style.right = 0
div.style.top = 0
div.style.color = '#fff'
document.body.appendChild(div)

let event = {}
// 单张纹理图的加载
event.onLoad = function () {
  console.log('图片加载完成')
}
event.onProgress = function (url, num, total) {
  console.log('图片加载完成:', url)
  console.log('图片加载进度:', num)
  console.log('图片总数:', total)
  let value = ((num / total) * 100).toFixed(2) + '%'
  console.log('加载进度的百分比：', value)
  div.innerHTML = value
}
event.onError = function (e) {
  console.log('图片加载出现错误')
  console.log(e)
}

const loadingManager = new THREE.LoadingManager(
  event.onLoad,
  event.onProgress,
  event.onError
)

const textureLoader = new THREE.TextureLoader(loadingManager)
const doorColorTexture = textureLoader.load(
  './textures/door/color.jpg'
  // event.onLoad,
  // event.onProgress,
  // event.onError
)
const doorAplhaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAoTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const roughnessTexture = textureLoader.load('./textures/door/roughness.jpg')
const metalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const normalTexture = textureLoader.load('./textures/door/normal.jpg')
// doorColorTexture.offset.set(0.5, 0.5)
// doorColorTexture.center.set(0.5, 0.5)
// doorColorTexture.rotation = Math.PI / 4
// doorColorTexture.repeat.set(2, 3)
// doorColorTexture.wrapS = THREE.RepeatWrapping
// doorColorTexture.wrapT = THREE.RepeatWrapping

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 100, 100, 100)
const material = new THREE.MeshStandardMaterial({
  color: '#ffff00',
  map: doorColorTexture,
  alphaMap: doorAplhaTexture,
  transparent: true,
  side: THREE.DoubleSide,
  aoMap: doorAoTexture,
  displacementMap: doorHeightTexture,
  displacementScale: 0.1,
  roughness: 1,
  roughnessMap: roughnessTexture,
  metalness: 1,
  metalnessMap: metalnessTexture,
  normalMap: normalTexture,
})

const cube = new THREE.Mesh(cubeGeometry, material)

scene.add(cube)

console.log(cubeGeometry)
cubeGeometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2)
)

const planeGeometry = new THREE.PlaneGeometry(1, 1, 200, 200)
const plane = new THREE.Mesh(planeGeometry, material)

plane.position.set(2, 0, 0)
scene.add(plane)

planeGeometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2)
)

const light = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(light)
const directionLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionLight.position.set(10, 10, 10)
scene.add(directionLight)

const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

// renderer.render(scene, camera)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const axesHelper = new THREE.AxesHelper(5)

scene.add(axesHelper)

const clock = new THREE.Clock()

window.addEventListener('dblclick', () => {
  const fullscreenElement = document.fullscreenElement
  if (!fullscreenElement) {
    renderer.domElement.requestFullscreen()
  } else {
    document.exitFullscreen()
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
