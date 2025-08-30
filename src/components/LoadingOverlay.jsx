import { Canvas, useThree, extend, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2.js";
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry.js";
import { useEffect, useRef } from "react";

extend({ LineMaterial, LineSegments2, LineSegmentsGeometry });

const SpinningCube = () => {
  const ref = useRef();
  const { size } = useThree();

  useEffect(() => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const edges = new THREE.EdgesGeometry(geometry);

    const lineGeom = new LineSegmentsGeometry().fromEdgesGeometry(edges);
    const lineMat = new LineMaterial({
      color: 0xd97706,
      linewidth: 0.05,
      worldUnits: true,
    });
    lineMat.resolution.set(size.width, size.height);

    const line = new LineSegments2(lineGeom, lineMat);
    ref.current.add(line);
  }, [size]);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.02;
      ref.current.rotation.y += 0.02;
    }
  });

  return <group ref={ref} />;
};

const LoadingOverlay = ({ show = false }) => {
  if (!show) return null;

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="w-72 h-72">
        <Canvas camera={{ position: [2, 2, 2] }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 3, 3]} intensity={1} />
          <SpinningCube />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={5} />
        </Canvas>
      </div>
    </div>
  );
};

export default LoadingOverlay;
