import { Center, OrbitControls } from "@react-three/drei";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

import { ArrowLeft, Check, Palette, Shirt, X } from "lucide-react";
import React from "react";
import { Image as KonvaImage, Layer, Stage, Transformer } from "react-konva";
import { Link } from "react-router";
import useImage from "use-image";
import dataModel from "../../assets/data/dataModel.json";
import LoadingScreen from "../../components/LoadingScreen";

const URLImage = ({ image, shapeProps, isSelected, onSelect, onChange }) => {
  const [img] = useImage(image.src);
  const shapeRef = React.useRef();
  const trRef = React.useRef();
  const [stageTexture, setStageTexture] = useState(null);

  React.useEffect(() => {
    if (isSelected) {
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
      {isSelected && (
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
      )}
    </React.Fragment>
  );
};

export default function Home() {
  const dragUrl = React.useRef();
  const stageRef = React.useRef();
  const [images, setImages] = React.useState([]);
  const [selectedId, selectShape] = React.useState(null);
  const [stageTexture, setStageTexture] = useState(null);
  const [openModel, setOpenModel] = useState(false);
  const [openMotif, setOpenMotif] = useState(false);
  const [selectedModel, setSelectedModel] = useState({
    model: "/model/uv-kemeja-upgrade.obj",
    layout: "/layouts/kemeja-panjang.png",
  });

  const checkDeselect = (e) => {
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

  const selectModel = (model, layout) => {
    setOpenModel(false);

    setSelectedModel({
      model: model,
      layout: layout,
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === "Backspace" || e.key === "Delete") && selectedId) {
        setImages((prev) => prev.filter((img) => img.id !== selectedId));
        selectShape(null); // reset pilihan
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedId]);

  const imagesUrl = [
    "/batik/batik-1.jpg",
    "/batik/batik-2.jpg",
    "/batik/batik-3.jpg",
    "/batik/batik-4.jpg",
  ];

  return (
    <div className="flex flex-row h-full w-max-[100vw] overflow-x-hidden relative bg-black">
      <LoadingScreen duration={5000} />
      <div className="flex-4">
        <Canvas camera={{ position: [0, 1, 3] }}>
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <OrbitControls />
          <Center disableY={false}>
            <ShirtObj
              textureUrl={stageTexture}
              pathModel={selectedModel.model}
            />
          </Center>
        </Canvas>
      </div>
      <div className="flex-3 h-screen bg-black border-l border-white/[0.5] overflow-hidden">
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl text-white font-semibold">
                Terapkan motif Batik
              </h1>
              <p className="text-white">Pilih Design batik yang anda suka</p>
            </div>
            {/* <button
              onClick={applyTexture}
              className="mt-5 p-3 bg-amber-900 text-white rounded-lg"
            >
              Apply to 3D
            </button> */}
          </div>
          <div>
            <div
              className="mt-5"
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
                width={616}
                height={610}
                style={{
                  border: "1px solid grey",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
                ref={stageRef}
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}
              >
                <Layer>
                  <BackgroundImage
                    src={selectedModel.layout}
                    width={616}
                    height={610}
                  />
                  {images.map((image, i) => {
                    return (
                      <URLImage
                        image={image}
                        key={i}
                        shapeProps={image}
                        isSelected={image.id === selectedId}
                        onSelect={() => {
                          selectShape(image.id);
                        }}
                        onChange={(newAttrs) => {
                          const imgs = images.slice();
                          imgs[i] = newAttrs;
                          setImages(images);
                        }}
                      />
                    );
                  })}
                </Layer>
              </Stage>
            </div>
          </div>
        </div>
        <div className="absolute z-50 left-5 top-7">
          <div className="grid grid-cols-1 gap-2">
            <Link
              to={"/"}
              className="mt-5 p-3 bg-amber-700 text-white rounded-lg"
            >
              <ArrowLeft />
            </Link>
            <button
              onClick={() => setOpenModel(true)}
              className="mt-5 p-3 bg-amber-700 text-white rounded-lg"
            >
              <Shirt />
            </button>
            <button
              onClick={() => setOpenMotif(true)}
              className="mt-5 p-3 bg-amber-700 text-white rounded-lg"
            >
              <Palette />
            </button>
            <button
              onClick={applyTexture}
              className="mt-5 p-3 bg-amber-700 text-white rounded-lg"
            >
              <Check />
            </button>
          </div>
        </div>
      </div>

      {openModel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#242526] rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-500/[0.5]">
              <div className="space-y-2 text-white">
                <h1 className="text-3xl font-semibold">Pilih Model</h1>
                <p>Pilih Model untuk menerapkan batik yang anda pilih</p>
              </div>
              <button
                onClick={() => setOpenModel(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-8 h-8 text-gray-500 cursor-pointer" />
              </button>
            </div>
            <div className="grid grid-cols-5 gap-5 p-5 overflow-hidden">
              {dataModel.map((data, index) => (
                <div
                  key={index + 1}
                  onClick={() => selectModel(data.model, data.layout)}
                  className="bg-black border border-slate-200/[0.5] hover:scale-105 cursor-pointer transition-all duration-200 ease-in-out rounded-lg w-44 h-44 overflow-hidden"
                >
                  <img
                    src={data.img}
                    alt={`Model | ${data.layout}lkjhgfdsa`}
                    className="h-full w-full"

                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {openMotif && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#242526] rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-500/[0.5]">
              <div className="space-y-2 text-white">
                <h1 className="text-3xl font-semibold">Pilih Motif</h1>
                <p>Pilih Motif untuk di terapkan ke dalam model</p>
              </div>
              <button
                onClick={() => setOpenMotif(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-8 h-8 text-gray-500 cursor-pointer" />
              </button>
            </div>
            <div className="grid grid-cols-5 gap-5 p-5 overflow-hidden">
              {imagesUrl.map((img) => {
                return (
                  <div className="bg-black border border-slate-200/[0.5] hover:scale-105 cursor-pointer transition-all duration-200 ease-in-out rounded-lg w-44 h-44 overflow-hidden">
                    <img
                      src={img}
                      alt=""
                      className="h-full w-full"
                      onClick={() => {
                        setOpenMotif(false);
                        // tentukan posisi default (misalnya tengah canvas)
                        const pos = {
                          x: 616 / 2 - 50, // geser biar gambar muncul agak ke tengah
                          y: 610 / 2 - 50,
                        };

                        // tambahkan ke state images
                        setImages((prev) => [
                          ...prev,
                          {
                            id: Date.now(), // kasih id unik
                            ...pos,
                            src: img,
                            // width: 200,  // set width default
                            // height: 200,
                          },
                        ]);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ShirtObj({ textureUrl, pathModel }) {
  const [texture, setTexture] = useState(null);
  const { gl } = useThree();

  useEffect(() => {
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.0;
  }, [gl]);

  const obj = useLoader(OBJLoader, pathModel);

  useEffect(() => {
    if (!textureUrl) return;

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = textureUrl;
    img.onload = () => {
      const tex = new THREE.Texture(img);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.needsUpdate = true;
      setTexture(tex);
    };
  }, [textureUrl]);

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

  return <primitive key={pathModel} object={obj} scale={[5, 5, 5]} />;
}
