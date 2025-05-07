"use client"

import { Environment, Float } from '@react-three/drei'
import { SodaCan, SodaCanProps } from './SodaCan'
import { forwardRef } from 'react'
import { Group } from 'three'

type floatingCanProps = {
  flavor?: SodaCanProps["flavor"];
  floatSpeed?: number;
  floatIntensity?: number;
  rotationIntensity?: number;
  floatingRange?: [number, number];
  children?: React.ReactNode;
}

const FloatingCan = forwardRef<Group, floatingCanProps>(({
  flavor = "blackCherry", 
  floatSpeed = 1,
  floatIntensity = 1,
  rotationIntensity = 1,
  floatingRange = [-0.1, 0.1],
  children,
...props}, ref) => {
  return (
    <group ref={ref} {...props}>
      <Float
        speed={floatSpeed}
        rotationIntensity={rotationIntensity}
        floatIntensity={floatIntensity}
        floatingRange={floatingRange}
        >
    <SodaCan flavor={flavor} />
    </Float>
    </group>
  )
})

FloatingCan.displayName = 'FloatingCan'

export default FloatingCan