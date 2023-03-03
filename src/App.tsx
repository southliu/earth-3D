import './App.css';
import earthImg from './assets/earth.jpg'
import cloudImg from './assets/cloud.png'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  SphereGeometry,
  MeshPhongMaterial,
  Mesh,
  TextureLoader,
  AmbientLight,
  Color
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function App() {
  // 创建场景对象Scene
  const scene = new Scene()
  scene.background = new Color(0, 0, 0)

  /**
   * 创建网络模型
   */
  // 创建球体几何对象
  const geometry = new SphereGeometry(200, 100, 100)
  // 创建一个纹理加载器对象
  const textureLoader = new TextureLoader()
  // 素材对象
  const material = new MeshPhongMaterial({
    map: textureLoader.load(earthImg)
  })
  // 网络模型对象
  const mesh = new Mesh(geometry, material)
  // 将网络模型添加至场景中
  scene.add(mesh)

  /**
   * 云层
   */
  // 创建球体cloudImg
  const coludGeometry = new SphereGeometry(201, 100, 100)
  // 云层材质
  const cloudsMater = new MeshPhongMaterial({
    alphaMap: new TextureLoader().load(cloudImg),
    transparent: true,
    opacity: 0.2
  })
  const cloudsMesh = new Mesh(coludGeometry, cloudsMater)
  scene.add(cloudsMesh)

  /**
   * 环境光
   */
  const ambient = new AmbientLight(0xFFFFFF)
  ambient.position.set(100, 100, 200);
  scene.add(ambient)

  /**
   * 相机设置
   */
  const width = window.innerWidth // 窗口宽度
  const height = window.innerHeight // 窗口高度
  // 创建相机对象
  const camera = new PerspectiveCamera(45, width / height, 1, 1000)
  camera.position.set(0, 500, -500) // 设置相机位置
  camera.lookAt(scene.position) // 设置相机方向(指场景对象)

  /**
   * 创建渲染器对象
   */
  const renderer = new WebGLRenderer()
  renderer.setSize(width, height) // 设置渲染区域尺寸
  document.body.appendChild(renderer.domElement) // body元素中插入canvas对象
  // 执行渲染操作 指定场景、相机为参数
  renderer.render(scene, camera)

  // 创建控件对象
  const controls = new OrbitControls(camera,renderer.domElement)
  controls.addEventListener('change', render) // 监听鼠标、键盘事件

  // 自转动画
  function animate() {
    controls.update();
    // 地球自转
    mesh.rotation.y -= 0.002;
    // 漂浮的云层
    cloudsMesh.rotation.y -= 0.001;
    cloudsMesh.rotation.z += 0.001;
    renderer.render(scene, camera);
    requestAnimationFrame(animate) // 请求再次执行渲染函数animate
  }
  animate()

  // 渲染函数
  function render() {
    renderer.render(scene,camera) // 执行渲染操作
    requestAnimationFrame(render) // 请求再次执行渲染函数render
  }
  render()

  return (
    <div className="App">
    </div>
  );
}

export default App;
