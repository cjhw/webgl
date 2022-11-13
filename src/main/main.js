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

const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
const doorAplhaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAoTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')

// doorColorTexture.offset.set(0.5, 0.5)
// doorColorTexture.center.set(0.5, 0.5)
// doorColorTexture.rotation = Math.PI / 4
// doorColorTexture.repeat.set(2, 3)
// doorColorTexture.wrapS = THREE.RepeatWrapping
// doorColorTexture.wrapT = THREE.RepeatWrapping

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshStandardMaterial({
  color: '#ffff00',
  map: doorColorTexture,
  alphaMap: doorAplhaTexture,
  transparent: true,
  side: THREE.DoubleSide,
  aoMap: doorAoTexture,
})

const cube = new THREE.Mesh(cubeGeometry, material)

scene.add(cube)

console.log(cubeGeometry)
cubeGeometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2)
)

const planeGeometry = new THREE.PlaneGeometry(1, 1)
const plane = new THREE.Mesh(planeGeometry, material)

plane.position.set(3, 0, 0)
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
