import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import * as dat from 'dat.gui'

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

const gui = new dat.GUI()
gui.add(cube.position, 'x').min(0).max(5).step(0.1).name('移动x轴')
// .onChange((value) => {
//   console.log('修改' + value)
// })
// .onFinishChange((value) => {
//   console.log('完全停下来' + value)
// })

const params = {
  color: '#ffff00',
  fn: () => {
    gsap.to(cube.position, { x: 5, duration: 2, yoyo: true, repeat: -1 })
  },
}

gui.addColor(params, 'color').onChange((value) => {
  cube.material.color.set(value)
})

gui.add(cube, 'visible').name('是否显示')

let folder = gui.addFolder('设置立方体')
folder.add(cube.material, 'wireframe')
folder.add(params, 'fn').name('点击开始运动')

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
