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

camera.position.set(0, 0, 40)
scene.add(camera)

const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
  wireframe: true,
})
const redMaterial = new THREE.MeshBasicMaterial({
  color: '#ff0000',
})

// 1000立方体
let cubeArr = []
for (let i = -5; i < 5; i++) {
  for (let j = -5; j < 5; j++) {
    for (let z = -5; z < 5; z++) {
      const cube = new THREE.Mesh(cubeGeometry, material)
      cube.position.set(i, j, z)
      scene.add(cube)
      cubeArr.push(cube)
    }
  }
}

const raycaster = new THREE.Raycaster()

const mouse = new THREE.Vector2()

// window.addEventListener('mousemove', (event) => {
//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1
//   mouse.y = -((event.clientY / window.innerHeight) * 2 - 1)
//   raycaster.setFromCamera(mouse, camera)
//   let result = raycaster.intersectObjects(cubeArr)
//   // result[0].object.material = redMaterial
//   result.forEach((item) => {
//     item.object.material = redMaterial
//   })
// })

window.addEventListener('click', (event) => {
  //   console.log(event);
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -((event.clientY / window.innerHeight) * 2 - 1)
  raycaster.setFromCamera(mouse, camera)
  let result = raycaster.intersectObjects(cubeArr)
  //   console.log(result);
  //   result[0].object.material = redMaterial;
  result.forEach((item) => {
    item.object.material = redMaterial
  })
})

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
