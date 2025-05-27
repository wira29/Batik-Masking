import { Center, OrbitControls } from '@react-three/drei';
import { Canvas, useLoader } from "@react-three/fiber";
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

export default function Home()
{

    const images = [
        '/batik/batik-1.jpg',
        '/batik/batik-2.jpg',
        '/batik/batik-3.jpg',
    ];
    
    const [textureUrl, setTextureUrl] = useState(images[0]);

    return (
        <div className="flex flex-row h-[100vh] w-full">
            <div className="flex-7">
                <Canvas camera={{ position: [0, 1, 3] }}>
                    <ambientLight intensity={Math.PI / 2} />
                    <directionalLight position={[2, 2, 5]} />
                    <OrbitControls />
                    <Center disableY={false}>
                        <ShirtObj textureUrl={textureUrl} />
                    </Center>
                </Canvas>
            </div>
            <div className="flex-2 h-full bg-transparent p-2">
                <div className="bg-white rounded-lg p-10 shadow-lg h-full">
                    <h6>Pilihan motif Batik</h6>

                    <div className="flex flex-col mt-8 gap-5">
                        {images.map(url => {
                            return <div onClick={() => setTextureUrl(url)} className="h-30 w-full bg-red-300 rounded-lg" style={{ backgroundImage: `url(${url})`, backgroundSize: 'cover' }}></div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ShirtObj({ textureUrl})
{
    const obj = useLoader(OBJLoader, '/model/new-shirt.obj');
    const texture = useLoader(THREE.TextureLoader, textureUrl);

    useEffect(() => {
        obj.traverse(child => {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({ map: texture, color: 0xffffff, });
                child.material.needsUpdate = true;
            }
        });
    }, [obj, texture])
    
    const ref = useRef()

    return <primitive object={obj} ref={ref} scale={[5,5,5]} />

}