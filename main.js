import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

let scene, camera, renderer, pointLight, controls

window.addEventListener("load", init)

function init() {
  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(0, 0, 500)

  renderer = new THREE.WebGLRenderer({ alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  document.body.appendChild(renderer.domElement)

  let textures = new THREE.TextureLoader().load("/earth.jpg")

  let ballGeometry = new THREE.SphereGeometry(100, 64, 32)
  let ballMaterial = new THREE.MeshPhysicalMaterial({ map: textures })
  let ballMesh = new THREE.Mesh(ballGeometry, ballMaterial)
  scene.add(ballMesh)

  let directionalLight = new THREE.DirectionalLight(0xffffff, 2)
  directionalLight.position.set(1, 1, 1)
  scene.add(directionalLight)

  pointLight = new THREE.PointLight(0xffffff, 1)
  pointLight.position.set(-100, -100, -100)
  scene.add(pointLight)

  let pointLightHelper = new THREE.PointLightHelper(pointLight, 10)
  scene.add(pointLightHelper)

  controls = new OrbitControls(camera, renderer.domElement)

  window.addEventListener("resize", onWindowResize)

  animate()
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
  pointLight.position.set(
    200 * Math.sin(Date.now() / 500),
    200 * Math.sin(Date.now() / 1000),
    200 * Math.cos(Date.now() / 500)
  )

  requestAnimationFrame(animate)

  renderer.render(scene, camera)
}
