"use client"

import FloatingCan from "@/components/FloatingCan"
import { Environment } from "@react-three/drei"

type Props = {}

const Scene = (props: Props) => {
  return (
    <group>¨
      <FloatingCan flavor="lemonLime" />
      <Environment files="/hdr/lobby.hdr" backgroundIntensity={1.5} />
    </group>
  )
}

export default Scene