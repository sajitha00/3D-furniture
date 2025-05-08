// src/components/Canvas3d/Canvas3d.jsx
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import Furniture3D from './Furniture3d'

// if some models need a base orientation fix, add them here:
const MODEL_ORIENTATION_FIX = {
  chair: 0,
  couch: -Math.PI / 2,
  // add more types if needed
}

// optional per-type raw scale overrides (if one model is way too big out of the box)
const MODEL_RAW_SCALE = {
  chair: 1,  // no change
  couch: 0.8, 
  // e.g. couch models were authored at 1.25× real size
}

export default function Canvas3d({
  width,
  length,
  unit,
  wallHeight,
  furnitures,
}) {
  // 1 “room-unit” in 3D = 1m (or 0.3 if user chose feet)
  const pxPerUnit = unit === 'm' ? 1 : 0.3

  // room extents in three.js units
  const roomW  = width  * pxPerUnit
  const roomL  = length * pxPerUnit
  const halfW  = roomW  / 2
  const halfL  = roomL  / 2

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        shadows
        camera={{ position: [0, wallHeight * 1.5, roomL + 2], fov: 50 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
        <OrbitControls enablePan enableZoom enableRotate />

        {/** Floor **/}
        <mesh rotation={[-Math.PI/2, 0, 0]} receiveShadow>
          <planeGeometry args={[roomW, roomL]} />
          <meshStandardMaterial color="#eeeeee" side={THREE.DoubleSide} />
        </mesh>

        {/** Back Wall **/}
        <mesh position={[0, wallHeight/2, -halfL]}>
          <planeGeometry args={[roomW, wallHeight]} />
          <meshStandardMaterial color="#dddddd" side={THREE.DoubleSide} />
        </mesh>

        {/** Right Wall **/}
        <mesh rotation={[0, -Math.PI/2, 0]} position={[halfW, wallHeight/2, 0]}>
          <planeGeometry args={[roomL, wallHeight]} />
          <meshStandardMaterial color="#cccccc" side={THREE.DoubleSide} />
        </mesh>

        {/** Furniture Instances **/}
        {furnitures.map(f => {
          // 2D→3D conversion: your 2D origin (0,0) is top-left, Three’s is center
          // we also add half the furniture footprint so it’s centered on its 2D box
          const worldX = -halfW + f.x * pxPerUnit + (f.w * pxPerUnit)/2
          const worldZ = -halfL + f.y * pxPerUnit + (f.h * pxPerUnit)/2

          // combine any authoring fix + the user’s rot
          const baseRot = MODEL_ORIENTATION_FIX[f.type] || 0
          const userRot = f.rot || 0

          // optional raw scale override
          const rawScale = MODEL_RAW_SCALE[f.type] || 1

          return (
            <Furniture3D
              key={f.id}
              type={f.type}
              position={[worldX, 0, worldZ]}
              rotation={[0, baseRot + userRot, 0]}
              w={f.w}
              h={f.h}
              pxPerUnit={pxPerUnit}
              rawScale={rawScale}
            />
          )
        })}
      </Canvas>
    </div>
  )
}
