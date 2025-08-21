import { Center, OrbitControls } from '@react-three/drei';
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';


import React from 'react';
import { Image as KonvaImage, Layer, Stage, Transformer } from 'react-konva';
import useImage from 'use-image';

const URLImage = ({ image, shapeProps, isSelected, onSelect, onChange }) => {
    const [img] = useImage(image.src);
    const shapeRef = React.useRef();
    const trRef = React.useRef();
    const [stageTexture, setStageTexture] = useState(null);


    React.useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            trRef.current.nodes([shapeRef.current]);
        }
    }, [isSelected]);

    return (
        <React.Fragment>
            <KonvaImage
                onClick={onSelect}
                onTap={onSelect}
                ref={shapeRef}
                {...shapeProps}
                image={img}
                x={image.x}
                y={image.y}
                // I will use offset to set origin to the center of the image
                offsetX={img ? img.width / 2 : 0}
                offsetY={img ? img.height / 2 : 0}
                draggable
                onDragEnd={(e) => {
                    onChange({
                        ...shapeProps,
                        x: e.target.x(),
                        y: e.target.y(),
                    });
                }}
                onTransformEnd={(e) => {
                    // transformer is changing scale of the node
                    // and NOT its width or height
                    // but in the store we have only width and height
                    // to match the data better we will reset scale on transform end
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    // we will reset it back
                    // node.scaleX(1);
                    // node.scaleY(1);
                    onChange({
                        ...shapeProps,
                        x: node.x(),
                        y: node.y(),
                        // set minimal value
                        width: Math.max(5, node.width() * scaleX),
                        height: Math.max(node.height() * scaleY),
                    });
                }}
            />
            {
                isSelected && (
                    <Transformer
                        ref={trRef}
                        flipEnabled={false}
                        boundBoxFunc={(oldBox, newBox) => {
                            // limit resize
                            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
                                return oldBox;
                            }
                            return newBox;
                        }}
                    />
                )
            }
        </React.Fragment>
    );
};

export default function Home() {

    const dragUrl = React.useRef();
    const stageRef = React.useRef();
    const [images, setImages] = React.useState([]);
    const [selectedId, selectShape] = React.useState(null);
    const [stageTexture, setStageTexture] = useState(null);

    const checkDeselect = (e) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            selectShape(null);
        }
    };

    const applyTexture = () => {
        if (!stageRef.current) return;
        const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
        setStageTexture(uri);
    };

    function BackgroundImage({ src, width, height }) {
        const [image] = useImage(src);
        return <KonvaImage image={image} width={width} height={height} />;
    }

    const imagesUrl = [
        '/batik/batik-1.jpg',
        '/batik/batik-2.jpg',
        '/batik/batik-3.jpg',
    ];

    return (
        <div className="flex flex-row h-full w-max-[100vw] overflow-x-hidden">
            <div className="flex-2">
                <Canvas camera={{ position: [0, 1, 3] }}>
                    <ambientLight intensity={1} />
                    <directionalLight position={[5, 5, 5]} intensity={1.5} />
                    <OrbitControls />
                    <Center disableY={false}>
                        <ShirtObj textureUrl={stageTexture} />
                    </Center>
                </Canvas>
            </div>
            <div className="flex-2 h-full bg-transparent p-2">
                <div className="bg-white rounded-lg p-10 shadow-lg h-full">
                    <h6>Pilihan motif Batik</h6>

                    <div>
                        <button onClick={applyTexture} className='mt-5 p-3 bg-blue-500 text-white rounded-lg'>
                            Apply to 3D
                        </button>
                        Try to drag and drop the image into the stage:
                        <br />
                        <div
                            className='mt-5'
                            onDrop={(e) => {
                                e.preventDefault();

                                const file = e.dataTransfer.files[0];
                                if (!file) return;

                                const reader = new FileReader();
                                reader.onload = () => {
                                    const imageSrc = reader.result; // Data URL hasil baca file

                                    // Dapatkan posisi drop di canvas
                                    stageRef.current.setPointersPositions(e);
                                    const pos = stageRef.current.getPointerPosition();

                                    // Tambahkan ke state images
                                    setImages((prev) => [
                                        ...prev,
                                        {
                                            ...pos,
                                            src: imageSrc,
                                        },
                                    ]);
                                };
                                reader.readAsDataURL(file);
                            }}
                            onDragOver={(e) => e.preventDefault()}
                        >
                            <Stage
                                width={512} // fixed width
                                height={700} // fixed height
                                style={{ border: '1px solid grey' }}
                                ref={stageRef}
                                onMouseDown={checkDeselect}
                                onTouchStart={checkDeselect}
                            >

                                <Layer>
                                    <BackgroundImage
                                        src={"/layouts/kemeja-panjang.png"}// path ke gambar
                                        width={512}
                                        height={700}
                                    />
                                    {images.map((image, i) => {
                                        return <URLImage image={image} key={i}
                                            shapeProps={image}
                                            isSelected={image.id === selectedId}
                                            onSelect={() => {
                                                selectShape(image.id);
                                            }}
                                            onChange={(newAttrs) => {
                                                const imgs = images.slice();
                                                imgs[i] = newAttrs;
                                                setImages(images);
                                            }} />;
                                    })}
                                </Layer>
                            </Stage>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ShirtObj({ textureUrl }) {
    const obj = useLoader(OBJLoader, "/model/uv-kemeja-upgrade.obj");
    const [texture, setTexture] = useState(null);
    const { gl } = useThree();

    // Atur renderer supaya support sRGB (versi baru)
    useEffect(() => {
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.0;
    }, [gl]);

    // Convert base64 / URL jadi THREE.Texture
    useEffect(() => {
        if (!textureUrl) return;

        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = textureUrl;
        img.onload = () => {
            const tex = new THREE.Texture(img);
            tex.colorSpace = THREE.SRGBColorSpace; // versi baru
            tex.needsUpdate = true;
            setTexture(tex);
        };
    }, [textureUrl]);

    // Apply texture ke semua mesh
    useEffect(() => {
        if (!obj || !texture) return;

        obj.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({
                    map: texture,
                    color: 0xffffff,
                    metalness: 0.0,
                    roughness: 1.0,
                });
                child.material.needsUpdate = true;
            }
        });
    }, [obj, texture]);

    return <primitive object={obj} scale={[5, 5, 5]} />;
}