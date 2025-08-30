import React, { useEffect, useState } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

export default function ShirtObj({ textureUrl, pathModel, onLoaded }) {
  const [texture, setTexture] = useState(null);
  const { gl } = useThree();
  const obj = useLoader(OBJLoader, pathModel);

  useEffect(() => {
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.0;
  }, [gl]);

  // load texture
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

  // apply texture ke obj
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
      }
    });

    // ✅ Kalau sudah ada obj + texture → panggil callback
    if (onLoaded) {
      onLoaded();
    }
  }, [obj, texture, onLoaded]);

  return <primitive key={pathModel} object={obj} scale={[5, 5, 5]} />;
}
