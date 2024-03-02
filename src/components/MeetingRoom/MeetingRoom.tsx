import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
  
const NUM_USERS = 7; 

const modelPaths = [
    '/assets/3d/lolly-1.glb',
    '/assets/3d/lolly-2.glb',
    '/assets/3d/lolly-3.glb',
    '/assets/3d/lolly-4.glb',
    '/assets/3d/lolly-5.glb',
    '/assets/3d/lolly-6.glb',
    '/assets/3d/lolly-7.glb',
];

const OfficeSpace: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // SCENE 
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#f0f0f0');

    // LIGHTING
    const skylight = new THREE.HemisphereLight(0xffffff, 1);
    skylight.position.set(5, 5, 5);
    scene.add(skylight);

    // RENDERER
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight/2);
    mountRef.current?.appendChild(renderer.domElement);

    // CAMERA
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.PerspectiveCamera(45, aspect, 1, 1000);
    camera.position.set(10, 10, 10) 
    camera.lookAt(new THREE.Vector3(0, 0, 0))     
    const controls = new OrbitControls(camera, renderer.domElement);
    //controls.autoRotate = true;
    //controls.autoRotateSpeed = 0.1;

    // FLOOR 
    const floorGeometry = new THREE.PlaneGeometry(10, 10);
    floorGeometry.rotateX(Math.PI/2)
    const floorMaterial = new THREE.MeshBasicMaterial({ color: '#f7c3a8', side: THREE.DoubleSide });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    scene.add(floor);

    // TABLE
    const loader = new GLTFLoader();
    loader.load('/assets/3d/table.glb', (gltf) => {
        const table = gltf.scene;
        table.rotation.y = 90 * (Math.PI / 180); 
        table.scale.set(1.5, 1.5, 1.5);
        scene.add(table);
    });
    
    const speed = 0.1;

    // LOAD THE LOLLIES 
    const loadModels = (NUM_USERS, paths, onLoadComplete) => {
        const loader = new GLTFLoader();
        const models: THREE.Object3D[] = [];
        const maxModels = 8;
      
        paths.slice(0, maxModels).forEach((path, index) => {
            console.log('Just loaded a 3d object');
          loader.load(path, (gltf) => {
            models.push(gltf.scene);
      
            if (models.length === NUM_USERS) {
              onLoadComplete(models); // Call the callback function with the loaded models
            }
          }, undefined, (error) => {
            console.error('An error happened while loading a model:', error);
          });
        });
      };

      loadModels(NUM_USERS, modelPaths, (loadedModels) => {
        const positions = [[-2, -2], [-2, -1], [-2, 0], [-2, 1], [2, -2], [2, -1], [2, 0], [2, 1]];
        loadedModels.forEach((model, index) => {
            const hue = index / loadedModels.length; // Divide the hue range based on the number of models
            model.traverse((child) => {
                if (child.isMesh) {
                    const color = new THREE.Color();
                    color.setHSL(hue, 1, 0.5); // Set color using the calculated hue
                    child.material.color = color;
                    child.name = `user${index}`;
                }
            });
            scene.add(model);
            
            // Ensure the index is within the bounds of the positions array
            if (index < positions.length) {
                model.position.set(positions[index][0], 0.5, positions[index][1]);
            }
        });
        const userCylinder = loadedModels[0];
        document.addEventListener('keydown', (event) => {
        const speed = 0.1; 
        switch(event.key) {
            case 'w': 
            userCylinder.position.z -= speed;
            break;
            case 's': 
            userCylinder.position.z += speed;
            break;
            case 'a': 
            userCylinder.position.x -= speed;
            break;
            case 'd':
            userCylinder.position.x += speed;
            break;
        }
        });

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        document.addEventListener('contextmenu', (event) => {
        event.preventDefault();

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(scene.children);

        for (let i = 0; i < intersects.length; i++) {
            if (intersects[i].object.name.startsWith('user')) {
                // Found a user cylinder
                const clickedUser = intersects[i].object;
                console.log(`Right-clicked on ${clickedUser.name}`);
                // Display user information here
                break;
                }
            }
        });
    }); 

    // START RENDER LOOP 
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Clean up on unmount
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default OfficeSpace;
