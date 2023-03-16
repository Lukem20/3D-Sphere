import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import gsap from 'gsap';
import './style.css'

  const scene = new THREE.Scene();
  const geometry = new THREE.SphereGeometry(3, 64, 64);
  const material = new THREE.MeshStandardMaterial({
    color: '#119h83',
    roughness: 0.2,
  })
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);



  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspect: window.innerWidth / window.innerHeight
  }

  const light = new THREE.PointLight(0xfffff, 1, 100);
  light.position.set(10, 10, 10);
  light.intensity = 1.3
  scene.add(light);

  const camera = new THREE.PerspectiveCamera(45, sizes.aspect, 0.1, 100);
  camera.position.z = 20;
  scene.add(camera);


//Renderer
  const canvas = document.querySelector('.webgl');
  const renderer = new THREE.WebGL1Renderer({ canvas });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(2);
  renderer.render(scene, camera);

  
//Controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 4;


// Window Resize
  window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    //Update Camera
    camera.updateProjectionMatrix();
    camera.aspect = sizes.aspect;
    renderer.setSize(sizes.width, sizes.height);
  });


//Render Loop
  const loop = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
  }
  loop();

//Timeline
  const t1 = gsap.timeline({ defaults: { duration: 1 } });
  t1.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y:1});
  t1.fromTo('h2', { y: '-130%' }, { y: '0%' });
  t1.fromTo('h3', { opacity: 0 }, { opacity: 1 });


//Color Animation
  let mouseDown = false;
  let rgb = [];
  window.addEventListener("mousedown", () => { mouseDown = true });
  window.addEventListener("mouseup", () => { mouseDown = false });

  window.addEventListener("mousemove", (e) => {
    if (mouseDown) {
      rgb = [
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255)
      ]
      // Animate random colors
      let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
      // the above line of code will essentially do this: new THREE.color(`rgb(0,100,150))
      gsap.to(mesh.material.color, {r: newColor.r, g: newColor.g, b: newColor.b})
    }
  })