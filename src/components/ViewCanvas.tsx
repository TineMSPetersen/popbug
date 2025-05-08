"use client";

import { View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import dynamic from "next/dynamic";

const Loader = dynamic(() => import("@react-three/drei").then((mod) => mod.Loader), {ssr: false})

type Props = {};

function ViewCanvas({}: Props) {
  return (
    <>
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
        dpr={[1, 1]}
        camera={{
          fov: 30,
        }}
        gl={{ alpha: true }}
      >
        <Suspense fallback={null}>
          <View.Port />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
}

export default ViewCanvas;
