<template>
  <div>
    <div class="header-box">
      <span>改变车身颜色：</span>
      <el-color-picker v-model="cheshenColor" @change="changeCheShenColor" />
    </div>
    <div class="container" ref="container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { TextureLoader } from 'three'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  100
)
camera.position.set(-2.8, 1.5, 2.8)

const renderer = new THREE.WebGL1Renderer()
renderer.setSize(window.innerWidth, window.innerHeight)
const container = ref()
const cheshenColor = ref()
const allTexture: any = {}
let smart_cheshen: any

const render = () => {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

const loadAllTexture = (cb: any) => {
  let loadIndex = 0
  const textures = [
    'skymap2',
    'skymap',
    'shache_occ',
    'shache_nor',
    'shache_col',
    'neishi_occ',
    'neishi_nor',
    'mennei_col',
    'luntai_nor',
    'luntai_col',
    'lungu_occ',
    'lungu_nor',
    'lungu_col',
    'linjian_occ',
    'linjian_nor',
    'linjian_col',
    'floor',
    'deng_occ',
    'deng_nor',
    'deng_col',
    'cheshen_occ',
    'cheshen_nor',
    'chejia_occ',
    'chejia_nor',
    'chedengzhao_nor'
  ]
  const loadNextTexture = () => {
    const textureName = textures[loadIndex]
    loadTexture(
      `./imgs/car/images/textures/${textureName}.jpg`,
      (texture: string) => {
        allTexture[textureName] = { texture: texture }
        if (loadIndex < textures.length - 1) {
          loadIndex++
          loadNextTexture()
        } else {
          if (cb) cb()
        }
      }
    )
  }
  loadNextTexture()
}

const loadTexture = (filepath: string, cb: any) => {
  const textureLoader = new TextureLoader()
  textureLoader.load(filepath, cb)
}

const loadCarModel = () => {
  const loader = new GLTFLoader()
  // 导入模型
  loader.load('./imgs/car/images/model.gltf', (gltf) => {
    scene.add(gltf.scene)
    // 添加贴图
    for (let i = 0; i < gltf.scene.children[0].children.length; i++) {
      const child: any = gltf.scene.children[0].children[i]

      if (
        child.name == 'smart_lungu0' ||
        child.name == 'smart_lungu1' ||
        child.name == 'smart_lungu2' ||
        child.name == 'smart_lungu3'
      ) {
        child.material = new THREE.MeshStandardMaterial()
        child.material.map = allTexture['lungu_col'].texture
        child.material.normalMap = allTexture['lungu_nor'].texture
        child.material.aoMap = allTexture['lungu_occ'].texture
      } else if (
        child.name == 'smart_chelun0' ||
        child.name == 'smart_chelun1' ||
        child.name == 'smart_chelun2' ||
        child.name == 'smart_chelun3'
      ) {
        child.material = new THREE.MeshStandardMaterial()
        child.material.map = allTexture['luntai_col'].texture
        child.material.normalMap = allTexture['luntai_nor'].texture
      } else if (child.name == 'smart_cheshen') {
        smart_cheshen = child
        child.material = new THREE.MeshStandardMaterial()

        child.material.color = new THREE.Color(0x70631b)
        child.material.metalness = 0.44
        child.material.roughness = 0

        child.material.normalMap = allTexture['cheshen_nor'].texture
        child.material.aoMap = allTexture['cheshen_occ'].texture

        child.material.envMap = allTexture['skymap2'].texture
        child.material.envMap.mapping = THREE.EquirectangularReflectionMapping
        child.material.envMapIntensity = 1
      } else if (child.name == 'smart_chejia') {
        child.material = new THREE.MeshStandardMaterial()
        child.material.color = new THREE.Color(0x252929)
        child.material.metalness = 0.44
        child.material.roughness = 0.4
        child.material.normalMap = allTexture['chejia_nor'].texture
        child.material.aoMap = allTexture['chejia_occ'].texture
      } else if (child.name == 'smart_boli') {
        child.material = new THREE.MeshPhongMaterial()
        child.material.color = new THREE.Color(0x333333)
        child.material.transparent = true
        child.material.opacity = 0.2

        child.material.envMap = allTexture['skymap2'].texture
        child.material.envMap.mapping = THREE.EquirectangularReflectionMapping
        child.material.envMapIntensity = 1
      } else if (child.name == 'smart_tianchuang') {
        child.material = new THREE.MeshPhongMaterial()
        child.material.color = new THREE.Color(0x000000)
        child.material.transparent = true
        child.material.opacity = 0.5

        child.material.envMap = allTexture['skymap2'].texture
        child.material.envMap.mapping = THREE.EquirectangularReflectionMapping
        child.material.envMapIntensity = 1
      } else if (child.name == 'smart_shachepan') {
        child.material = new THREE.MeshStandardMaterial()
        child.material.color = new THREE.Color(0xf2f2f2)
        child.material.emissive = new THREE.Color(0x000000)
        child.material.metalness = 0.5
        child.material.roughness = 0.62
        child.material.map = allTexture['shache_col'].texture
        child.material.normalMap = allTexture['shache_nor'].texture
        child.material.aoMap = allTexture['shache_occ'].texture
      } else if (
        child.name == 'smart_neishi' ||
        child.name == 'smart_neishi2'
      ) {
        //
        child.material = new THREE.MeshPhongMaterial()
        child.material.color = new THREE.Color(0x333333)
        child.material.emissive = new THREE.Color(0x000000)
        child.material.normalMap = allTexture['neishi_nor'].texture
        child.material.aoMap = allTexture['neishi_occ'].texture
      } else if (child.name == 'smart_neibao') {
        child.material = new THREE.MeshPhongMaterial()
        child.material.color = new THREE.Color(0x2e2e2e)
        child.material.map = allTexture['mennei_col'].texture
      } else if (child.name == 'smart_linjian') {
        child.material = new THREE.MeshStandardMaterial()
        child.material.color = new THREE.Color(0x2e2e2e)
        child.material.metalness = 0.5
        child.material.roughness = 0.62
        child.material.map = allTexture['linjian_col'].texture
        child.material.normalMap = allTexture['linjian_nor'].texture
        child.material.aoMap = allTexture['linjian_occ'].texture
      } else if (child.name == 'smart_daochejing') {
        child.material = new THREE.MeshPhongMaterial()
        child.material.color = new THREE.Color(0xffffff)
      } else if (child.name == 'smart_bolinei') {
        child.material = new THREE.MeshPhongMaterial()
        child.material.color = new THREE.Color(0x333333)
      } else if (
        child.name == 'smart_chedeng' ||
        child.name == 'smart_shachedeng' ||
        child.name == 'smart_wudeng'
      ) {
        child.material = new THREE.MeshStandardMaterial()
        child.material.color = new THREE.Color(0xffffff)
        child.material.emissive = new THREE.Color(0x333333)
        child.material.metalness = 1.0
        child.material.roughness = 0.4

        child.material.normalMap = allTexture['deng_nor'].texture
      } else if (child.name == 'smart_chedengzhao') {
        child.material = new THREE.MeshPhongMaterial()
        child.material.color = new THREE.Color(0xffffff)
        child.material.emissive = new THREE.Color(0x000000)
        child.material.transparent = true
        child.material.opacity = 0.3

        child.material.normalMap = allTexture['chedengzhao_nor'].texture

        child.material.envMap = allTexture['skymap2'].texture
        child.material.envMap.mapping = THREE.EquirectangularReflectionMapping
        child.material.envMapIntensity = 1
      } else if (child.name == 'smart_shachedengzhao') {
        child.material = new THREE.MeshPhongMaterial()
        child.material.color = new THREE.Color(0xca0816)
        child.material.transparent = true
        child.material.opacity = 0.4

        child.material.normalMap = allTexture['chedengzhao_nor'].texture
      } else if (child.name == 'smart_shangeshang') {
        child.material = new THREE.MeshStandardMaterial()
        child.material.color = new THREE.Color(0xf0f0f)
        child.material.emissive = new THREE.Color(0x000000)
        child.material.metalness = 1
        child.material.roughness = 0
      } else if (child.name == 'smart_shangexia') {
        child.material = new THREE.MeshPhongMaterial()
        child.material.color = new THREE.Color(0)
        child.material.metalness = 1
        child.material.roughness = 0
      } else if (
        child.name == 'smart_LOGO' ||
        child.name == 'smart_paiqiguan'
      ) {
        child.material = new THREE.MeshStandardMaterial()
        child.material.color = new THREE.Color(0x6c6c6c)
        child.material.emissive = new THREE.Color(0x444444)
        child.material.metalness = 1
        child.material.roughness = 0.32
      }
    }
  })
}

// 添加灯光
const addLight = () => {
  const ambientLight = new THREE.AmbientLight(0xd5d5d5) // 环境光会均匀的照亮场景中的所有物体。
  ambientLight.intensity = 1.2 // 光照的强度。缺省值为 1
  scene.add(ambientLight)

  const bottomRightDirLight = new THREE.DirectionalLight() // 平行光
  bottomRightDirLight.position.x = 5
  bottomRightDirLight.position.y = 3
  bottomRightDirLight.position.z = -5
  bottomRightDirLight.intensity = 0.8

  // var helper=new THREE.DirectionalLightHelper(bottomRightDirLight,1);
  // scene.add( helper );
  scene.add(bottomRightDirLight)

  const frontDirLight = new THREE.DirectionalLight(0xffffff)

  frontDirLight.position.x = -5
  frontDirLight.position.y = 3
  frontDirLight.position.z = 5
  frontDirLight.intensity = 0.8
  //directionalLight.castShadow=true;

  // var helper=new THREE.DirectionalLightHelper(frontDirLight,1);
  // scene.add( helper );
  scene.add(frontDirLight)
  // 车子正前上方斜45度的灯结束
}

const changeCheShenColor = (color: string) => {
  smart_cheshen.material.color = new THREE.Color(color)
}

onMounted(() => {
  const controls = new OrbitControls(camera, container.value)
  controls.enableDamping = true
  container.value.appendChild(renderer.domElement)
  loadAllTexture(loadCarModel)
  addLight()
  render()
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.header-box {
  position: absolute;
  z-index: 2;
  color: #fff;
  display: flex;
}
.container {
  height: 100vh;
  width: 100vw;
  background-color: #f0f0f0;
}
</style>