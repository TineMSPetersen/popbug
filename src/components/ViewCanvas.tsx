"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, Float } from "@react-three/drei"
import FloatingCan from "@/components/FloatingCan"

type Props = {}

function ViewCanvas({}: Props) {
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 30,
      }}
      shadows
      dpr={[1, 1.]}
      camera={{
        fov: 30,
      }}
      gl={{ alpha: true }}
      >
        <FloatingCan flavor="lemonLime" />
      <Environment files="/hdr/lobby.hdr" backgroundIntensity={1.5} />
    </Canvas>
  )
}

export default ViewCanvas