"use client";

import FloatingCan from "@/components/FloatingCan";
import { useMediaQuery } from "@/Hooks/useMediaQuery";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Content } from "@prismicio/client";
import { Cloud, Clouds, Environment, Text } from "@react-three/drei";
import gsap from "gsap";
import { useRef } from "react";
import * as THREE from "three";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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
    return distance * Math.cos(ANGLE);
  }

  const getYPosition = (distance: number) => {
    return distance * Math.sin(ANGLE);
  }

  const getXYPositions = (distance: number) => ({
    x: getXPosition(distance),
    y: getYPosition(-1 * distance)
  })

  useGSAP(() => {
    if(
      !cloudsRef.current ||
      !canRef.current || 
      !groupRef.current || 
      !wordsRef.current ||
      !cloud1Ref.current ||
      !cloud2Ref.current
    ) return;

    gsap.set(cloudsRef.current.position, { z: 10 });
    gsap.set(canRef.current.position, { ...getXYPositions(-4) });

    gsap.set(wordsRef.current.children.map((word) => word.position), {...getXYPositions(7), z: 2});
    
    gsap.to(canRef.current.rotation, {
      y: Math.PI * 2,
      duration: 1.7,
      repeat: -1,
      ease: "none",
    })

    const DISTANCE = 15;
    const DURATION = 6;

    gsap.set([cloud2Ref.current.position, cloud1Ref.current.position], { ...getXYPositions(DISTANCE) });

    gsap.to(cloud1Ref.current.position, {
      y: `+=${getYPosition(DISTANCE * 2)}`,
      x: `+=${getXPosition(DISTANCE * -2)}`,
      ease: "none",
      duration: DURATION,
      repeat: -1,
  });

  gsap.to(cloud2Ref.current.position, {
      y: `+=${getYPosition(DISTANCE * 2)}`,
      x: `+=${getXPosition(DISTANCE * -2)}`,
      ease: "none",
      delay: DURATION / 2,
      duration: DURATION,
      repeat: -1,
  });

  const scrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".skydive",
      pin: true,
      start: "top top",
      end: "+=1500",
      scrub: 1.5,
    }
  })

  scrollTl.to('body', {
    backgroundColor: '#C0F0F5',
    overwrite: "auto",
    duration: .1,
  })
  .to(cloudsRef.current.position, { z: 0, duration: .3}, 0)
  .to(canRef.current.position, { x: 0, y: 0, duration: .3, ease: "back.out(1.7)"}, 0)
  .to(wordsRef.current.children.map((word) => word.position), {
    keyframes: [
      { x: 0, y: 0, z: -1},
      { ...getXYPositions(-7), z: -7}
    ],
    stagger: 0.3,
  }, 0)
  .to(canRef.current.position, {
    ...getXYPositions(4),
    duration: 1.5,
    ease: "back.in(1.7)",
  })
  .to(cloudsRef.current.position, {
    z: 7, duration: .5
  })

})
  

  return (
    <group ref={groupRef}>

      { /* Can */}
      <group rotation={[0, 0, 0.5]}>
        <FloatingCan ref={canRef} flavor={flavor} rotationIntensity={0} floatIntensity={3} floatSpeed={3} >
          <pointLight intensity={100} color="#8C0413" decay={.1}/>
        </FloatingCan>
      </group>

      { /* Text */}
      <group ref={wordsRef}>
        { sentence && 
          <ThreeText sentence={sentence} color="#ff9e3e" /> }
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
