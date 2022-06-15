<template>
  <div class="container" ref="container"></div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { ref, onMounted } from 'vue'
// 初始化场景
const scene = new THREE.Scene()
// 初始化透视相机
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
)
camera.position.z = 0.1
//初始化渲染器
const renderer = new THREE.WebGL1Renderer()
renderer.setSize(window.innerWidth, window.innerHeight)

const container = ref()

const render = () => {
  renderer.render(scene, camera)
  // window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行
  requestAnimationFrame(render)
}

// 添加立方体
// const geometry = new THREE.BoxGeometry(10, 10, 10);
// // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// // const cube = new THREE.Mesh(geometry, material);
// // scene.add(cube);

// // 4_b,
// var arr = ["4_l", "4_r", "4_u", "4_d", "4_b", "4_f"];
// var boxMaterials = [];

// arr.forEach((item) => {
//   // 纹理加载
//   let texture = new THREE.TextureLoader().load(`./imgs/living/${item}.jpg`);
//   // 创建材质
//   if (item === "4_u" || item === "4_d") {
//     texture.rotation = Math.PI;
//     texture.center = new THREE.Vector2(0.5, 0.5);
//     boxMaterials.push(new THREE.MeshBasicMaterial({ map: texture }));
//   } else {
//     boxMaterials.push(new THREE.MeshBasicMaterial({ map: texture }));
//   }
// });
// const cube = new THREE.Mesh(geometry, boxMaterials);
// cube.geometry.scale(1, 1, -1);
// scene.add(cube);

// 添加球
const geometry = new THREE.SphereGeometry(5, 32, 32)
const loader = new RGBELoader()
loader.load('./imgs/hdr/10xiangxi-1.hdr', (texture) => {
  const material = new THREE.MeshBasicMaterial({ map: texture }) // 材质  map: texture 颜色贴图
  const sphere = new THREE.Mesh(geometry, material) // Mesh(geometry(几何体): Geometry, material(材质): Material ) 网格、构造器
  sphere.geometry.scale(1, 1, -1)
  scene.add(sphere)
})

onMounted(() => {
  // 添加控制器
  const controls = new OrbitControls(camera, container.value)
  controls.enableDamping = true
  container.value.appendChild(renderer.domElement)
  render()
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.container {
  height: 100vh;
  width: 100vw;
  background-color: #f0f0f0;
}
</style>