import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import Furniture3D from './Furniture3d';

const MODEL_ORIENTATION_FIX = {
  chair: 0,
  couch: -Math.PI / 2,
  beddouble: 0,
};

const MODEL_RAW_SCALE = {
  chair: 1,
  couch: 0.8,
  beddouble: 1,
};

export default function Canvas3d({
  width,
  length,
  unit,
  wallHeight,
  furnitures,
  wallColor,
  floorColor,
}) {
  const [isPanning, setIsPanning] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') setIsPanning(true);
    };
    const handleKeyUp = (e) => {
      if (e.code === 'Space') setIsPanning(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const pxPerUnit = 30;

  const roomW = width * pxPerUnit;
  const roomL = length * pxPerUnit;
  const halfW = roomW / 2;
  const halfL = roomL / 2;

  const offsetX = -halfW;
  const offsetZ = -halfL;

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        shadows
        camera={{
          position: [0, wallHeight * pxPerUnit * 0.75, roomL + 200],
          fov: 50,
        }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
        <OrbitControls
          enablePan={isPanning}
          enableZoom
          enableRotate
        />

        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[roomW, roomL]} />
          <meshStandardMaterial color={floorColor} side={THREE.DoubleSide} />
        </mesh>

        {/* Back Wall */}
        <mesh position={[0, (wallHeight * pxPerUnit) / 2, -halfL]}>
          <planeGeometry args={[roomW, wallHeight * pxPerUnit]} />
          <meshStandardMaterial color={wallColor} side={THREE.DoubleSide} />
        </mesh>

        {/* Right Wall */}
        <mesh
          rotation={[0, -Math.PI / 2, 0]}
          position={[halfW, (wallHeight * pxPerUnit) / 2, 0]}
        >
          <planeGeometry args={[roomL, wallHeight * pxPerUnit]} />
          <meshStandardMaterial color={wallColor} side={THREE.DoubleSide} />
        </mesh>

        {/* Furniture */}
        {furnitures.map((f) => {
          const baseRot = MODEL_ORIENTATION_FIX[f.type] || 0;
          const userRotY = THREE.MathUtils.degToRad(f.rotY || 0);
          const rotX = THREE.MathUtils.degToRad(f.rotX || 0);
          const rotZ = THREE.MathUtils.degToRad(f.rotZ || 0);
          const rawScale = f.rawScale || MODEL_RAW_SCALE[f.type] || 1;

          const worldX = (f.x + f.w / 2) * pxPerUnit + offsetX;
          const worldZ = (f.y + f.h / 2) * pxPerUnit + offsetZ;

          return (
            <Furniture3D
              key={f.id}
              type={f.type}
              position={[worldX, 0, worldZ]}
              rotation={[rotX, baseRot + userRotY, rotZ]}
              w={f.w}
              h={f.h}
              rawScale={rawScale}
              scaleFix={f.scaleFix || 1}
              pxPerUnit={pxPerUnit}
            />
          );
        })}
      </Canvas>
    </div>
  );
}
