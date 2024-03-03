import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import Navigation from '../Navigation/Navigation';
import TopBar from '../TopBar/TopBar';
import {text} from 'stream/consumers';
import './MeetingRoom.css';
import {TodoPriorityEnum} from "../../util/types";

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

const createMicrophoneIcon = (onLoaded) => {
    const loader = new GLTFLoader();
    loader.load('/assets/3d/mic.glb', (gltf) => {
        const mic = gltf.scene;
        mic.scale.set(0.175, 0.175, 0.175); // Adjusted scale to a more reasonable size for an icon
        mic.position.set(0, 1, 0);
        if (onLoaded) {
            onLoaded(mic); // Call the callback function with the loaded mic
        }
    });
};

const MeetingRoom: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        let intervalId;

        // SCENE
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#F9F8FC');

        // LIGHTING
        const skylight = new THREE.HemisphereLight(0xffffff, 1);
        skylight.position.set(5, 5, 5);
        scene.add(skylight);

        // RENDERER
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(800, 300);
        mountRef.current?.appendChild(renderer.domElement);

        // CAMERA
        const aspect = window.innerWidth / window.innerHeight;
        const camera = new THREE.PerspectiveCamera(45, aspect, 1, 1000);
        camera.position.set(5, 5, 5)
        camera.lookAt(new THREE.Vector3(0, 0, 0))
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.1;

        // FRECKLE
        const textureLoader = new THREE.TextureLoader();
        const freckleTexture = textureLoader.load('/assets/images/freckle.png');
        const geometry = new THREE.CylinderGeometry(1, 1, 0.25, 32);
        const material = new THREE.MeshBasicMaterial({map: freckleTexture});
        const cylinder = new THREE.Mesh(geometry, material);
        cylinder.rotateX(Math.PI / 2);
        cylinder.position.set(0, 2, 3);
        scene.add(cylinder);

        // FLOOR
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
                createMicrophoneIcon((mic) => {
                    model.add(mic);
                    mic.name = `mic${index}`;
                });
                const intervalId = setInterval(() => {
                    loadedModels.forEach((model, index) => {
                        const mic = model.getObjectByName(`mic${index}`);
                        if (mic) {
                            mic.visible = Math.random() < 0.5; // Randomly toggle visibility
                        }
                    });
                }, 1000);
                const hue = index / loadedModels.length; // Divide the hue range based on the number of models
                model.traverse((child) => {
                    if (child.isMesh) {
                        const color = new THREE.Color();
                        color.setHSL(hue, 1, 0.5);
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
                switch (event.key) {
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

                setInterval(() => {
                    loadedModels.forEach((model, index) => {
                        const micIcon = model.getObjectByName(`mic${index}`);
                        if (micIcon) {
                            micIcon.visible = Math.random() < 0.5; // Randomly toggle visibility
                        }
                    });
                }, 1000);

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
            clearInterval(intervalId); // Clear the interval
        };
    }, []);

    return (
        <div className="meeting_room_page">
            <h1 className="meetingroom_title">Meeting Room</h1>
            <div className='meetingroom_container'>
                <div
                    className="bg-white border-2 border-gray-300 rounded-xl flex flex-col content-start p-2 w-full px-5 cursor-grab">
                    <div className="bg-#F9F8FC border border-gray-300 m-1 p-2 rounded-lg flex text-sm text-black">
                        <span>Currently in room:</span>
                        <span className="bg-green-300 ml-2 px-2 py-1 rounded-full">Elijah</span>
                        <span className="bg-yellow-300 ml-2 px-2 py-1 rounded-full">Justin</span>
                        <span className="bg-red-300 ml-2 px-2 py-1 rounded-full">Alex</span>
                    </div>
                </div>
                <div ref={mountRef} className='threejs-container'/>
            </div>
        </div>
    );
};

export default MeetingRoom;