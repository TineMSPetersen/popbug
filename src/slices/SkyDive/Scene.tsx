"use client";

import FloatingCan from "@/components/FloatingCan";
import { useMediaQuery } from "@/Hooks/useMediaQuery";
import { Content } from "@prismicio/client";
import { Cloud, Clouds, Environment, Text, Text3D } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

type SkyDiveProps = {
  sentence: string | null;
  flavor: Content.SkyDiveSliceDefaultPrimary["flavor"];
};

const Scene = ({sentence, flavor}: SkyDiveProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const canRef = useRef<THREE.Group>(null);
  const cloud1Ref = useRef<THREE.Group>(null);
  const cloud2Ref = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Group>(null);
  const wordsRef = useRef<THREE.Group>(null);

  const ANGLE = 75 * (Math.PI / 180);

  const getXPosition = (distance: number) => {
    distance * Math.cos(ANGLE);
  }

  const getYPosition = (distance: number) => {
    distance * Math.sin(ANGLE);
  }

  const getXYPositions = (distance: number) => ({
    x: getXPosition(distance),
    y: getYPosition(-1 * distance)
  })

  return (
    <group ref={groupRef}>

      { /* Can */}
      <group rotation={[0, 0, 0.5]}>
        <FloatingCan ref={canRef} flavor={flavor}></FloatingCan>
      </group>

      { /* Text */}
      <group ref={wordsRef}>
        { sentence && 
          <ThreeText sentence={sentence} color="#F97315" /> }
      </group>

      { /* Clouds */}
      <Clouds ref={cloudsRef}>
        <Cloud ref={cloud1Ref} bounds={[10, 10, 2]} />
        <Cloud ref={cloud2Ref} bounds={[10, 10, 2]} />
      </Clouds>

      <ambientLight intensity={3} color="#9DDEFA" />
      <Environment files={["/hdr/field.hdr"]} backgroundIntensity={1.5} />
    </group>
  );
};

function ThreeText({ sentence, color="white"}: { 
  sentence: string;
  color?: string;
}) {
  const words = sentence.toUpperCase().split(" ");
  const material = new THREE.MeshLambertMaterial();
  const isDesktop = useMediaQuery("(min-width: 960px)", true)

  return words.map((word: string, index: number) => (
    <Text key={`${index}-${word}`}
    scale={isDesktop ? 1 : 0.5}
    material={material}
    font="/fonts/Alpino-Variable.woff"
    fontWeight={900}
    color={color}
    anchorX="center"
    anchorY="middle"
    characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!,.?&-"
    >
    {word}
  </Text>
  ))
}

export default Scene;
