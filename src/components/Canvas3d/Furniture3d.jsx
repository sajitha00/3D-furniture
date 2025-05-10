// src/components/Canvas3d/Furniture3d.jsx
import React, { Suspense, useMemo } from "react"
import { useGLTF }            from "@react-three/drei"
import * as THREE             from "three"

export default function Furniture3D({
  type,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  w,
  h,
  pxPerUnit,
  rawScale = 1,
  scaleFix = 1,
}) {
  const { scene } = useGLTF(`/models/${type}.glb`)

  const { size, center, min } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    return {
      size:   box.getSize(new THREE.Vector3()),
      center: box.getCenter(new THREE.Vector3()),
      min:    box.min.clone(),
    }
  }, [scene])

  const scaleX      = (w * pxPerUnit) / size.x
  const scaleZ      = (h * pxPerUnit) / size.z
  const uniformScale = Math.min(scaleX, scaleZ) * rawScale * (scaleFix || 1);


  const yOffset = -min.y * uniformScale

  return (
    <Suspense fallback={null}>
      <group position={position} rotation={rotation}>
        <primitive
          object={useMemo(() => scene.clone(true), [scene])}
          position={[
            -center.x * uniformScale,
            yOffset,
            -center.z * uniformScale,
          ]}
          scale={[uniformScale, uniformScale, uniformScale]}
        />
      </group>
    </Suspense>
  )
}
