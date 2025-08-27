import { Center, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { Info } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Layer, Stage } from "react-konva";
import { Link } from "react-router-dom";
import dataModel from "../../../assets/data/dataModel.json";
import { tutorialSteps } from "../../../tutorial/tutorialSteps";
import BackgroundImage from "./components/BackgroundImage";
import CropModal from "./components/CropModal";
import ModelModal from "./components/ModelModal";
import MotifModal from "./components/MotifModal";
import ShirtObj from "./components/ShirtObj";
import SideToolbar from "./components/SideToolbar";
import URLImage from "./components/URLImage";

export default function Home() {
  const stageRef = useRef();
  const [images, setImages] = useState([]);
  const [selectedId, selectShape] = useState(null);
  const [stageTexture, setStageTexture] = useState(null);
  const [openModel, setOpenModel] = useState(false);
  const [openMotif, setOpenMotif] = useState(false);
  const [openCrop, setOpenCrop] = useState(false);
  const [cropImageData, setCropImageData] = useState(null);

  const [selectedModel, setSelectedModel] = useState({
    model: "/model/uv-kemeja-upgrade.obj",
    layout: "/layouts/kemeja-panjang.png",
  });

  const createImageObject = (src, position = null) => {
    const pos = position || { x: 616 / 2 - 100, y: 610 / 2 - 100 };
    
    return {
      id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      x: pos.x,
      y: pos.y,
      src: src,
      width: 200,
      height: 200,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      draggable: true,
    };
  };

  const checkDeselect = (e) => {
    if (e.target === e.target.getStage()) {
      selectShape(null);
    }
  };

  useEffect(() => {
    const tutorialDone = localStorage.getItem("tutorialDone");
    if (!tutorialDone) {
      const driverObj = driver({
        showProgress: true,
        allowClose: false,
        steps: tutorialSteps,
        theme: "dark",
      });
      driverObj.drive();
      localStorage.setItem("tutorialDone", "true");
    }
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
    };
    
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  const applyTexture = () => {
    if (!stageRef.current) return;
    const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
    setStageTexture(uri);
  };

  const selectModel = (model, layout) => {
    setOpenModel(false);
    setSelectedModel({ model, layout });
  };

  const handleImageDoubleClick = (imageData) => {
    setCropImageData(imageData);
    setOpenCrop(true);
  };

  const handleCropComplete = (croppedImageData) => {
    setImages((prev) =>
      prev.map((img) => {
        if (img.id === croppedImageData.id) {
          return {
            ...img,
            ...croppedImageData,
          };
        }
        return img;
      })
    );
    setOpenCrop(false);
    setCropImageData(null);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === "Backspace" || e.key === "Delete") && selectedId) {
        setImages((prev) => prev.filter((img) => img.id !== selectedId));
        selectShape(null);
      }
      if (e.key.toLowerCase() === "c" && selectedId) {
        const selectedImage = images.find((img) => img.id === selectedId);
        if (selectedImage) {
          handleImageDoubleClick(selectedImage);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId, images]);

  const imagesUrl = [
    "/batik/batik-1.jpg",
    "/batik/batik-2.jpg",
    "/batik/batik-3.jpg",
    "/batik/batik-4.jpg",
  ];

  return (
    <>
      <div className="w-max-[100vw] h-screen overflow-hidden flex justify-center items-center bg-black p-5 lg:hidden">
        <div className="border-white border-dashed border h-1/2 rounded-xl justify-center items-center flex p-10">
          <h1 className="text-center text-4xl font-bold text-white">
            Tampilan hanya berlaku di desktop
          </h1>
        </div>
      </div>

      <div className="flex-row h-full w-max-[100vw] overflow-x-hidden relative bg-black hidden lg:flex">
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
                <p className="text-white">
                  Pilih Design batik yang anda suka
                  {selectedId && (
                    <span className="block text-sm text-gray-400 mt-1">
                      Double-click gambar atau tekan 'C' untuk crop
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div
              className="mt-5"
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = () => {
                  const imageSrc = reader.result;
                  stageRef.current.setPointersPositions(e);
                  const pos = stageRef.current.getPointerPosition();

                  const newImage = createImageObject(imageSrc, pos);
                  setImages((prev) => [...prev, newImage]);
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
                className="stage-editor"
              >
                <Layer>
                  <BackgroundImage
                    src={selectedModel.layout}
                    width={616}
                    height={610}
                  />
                  {images.map((image, i) => (
                    <URLImage
                      key={image.id}
                      image={image}
                      shapeProps={image}
                      isSelected={image.id === selectedId}
                      onSelect={() => selectShape(image.id)}
                      onDoubleClick={handleImageDoubleClick}
                      onChange={(newAttrs) => {
                        const imgs = images.slice();
                        imgs[i] = newAttrs;
                        setImages(imgs);
                      }}
                    />
                  ))}
                </Layer>
              </Stage>
            </div>
          </div>

          <SideToolbar
            applyTexture={applyTexture}
            setOpenModel={setOpenModel}
            setOpenMotif={setOpenMotif}
          />

          <div className="absolute z-50 left-5 bottom-5">
            <Link
              to={"/tutorial"}
              title="Tutorials"
              className="btn-info mt-5 p-3 bg-amber-700 hover:bg-amber-800 text-white rounded-lg block"
            >
              <Info />
            </Link>
          </div>
        </div>

        {openModel && (
          <ModelModal
            setOpenModel={setOpenModel}
            selectModel={selectModel}
            dataModel={dataModel}
          />
        )}

        {openMotif && (
          <MotifModal
            setOpenMotif={setOpenMotif}
            imagesUrl={imagesUrl}
            setImages={setImages}
            createImageObject={createImageObject}
          />
        )}

        {openCrop && cropImageData && (
          <CropModal
            isOpen={openCrop}
            onClose={() => {
              setOpenCrop(false);
              setCropImageData(null);
            }}
            imageData={cropImageData}
            onCropComplete={handleCropComplete}
          />
        )}
      </div>
    </>
  );
}