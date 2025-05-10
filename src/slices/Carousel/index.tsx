"use client";

import { FC, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { SodaCanProps } from "@/components/SodaCan";
import { Center, Environment, View } from "@react-three/drei";
import FloatingCan from "@/components/FloatingCan";
import { ArrowIcon } from "./ArrowIcon";
import clsx from "clsx";


const FLAVORS: {
  flavor: SodaCanProps["flavor"];
  color: string;
  name: string;
}[] = [
  { flavor: "blackCherry", color: "#710523", name: "Black Cherry" },
  { flavor: "grape", color: "#572981", name: "Grape Goodness" },
  { flavor: "lemonLime", color: "#164405", name: "Lemon Lime" },
  {
    flavor: "strawberryLemonade",
    color: "#690B3D",
    name: "Strawberry Lemonade",
  },
  { flavor: "watermelon", color: "#4B7002", name: "Watermelon Crush" },
];

/**
 * Props for `Carousel`.
 */
export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

/**
 * Component for "Carousel" Slices.
 */
const Carousel: FC<CarouselProps> = ({ slice }) => {
 const [ currentFlavorIndex, setCurrentFlavorIndex ] = useState(0);

 function changeFlavor(index: number) {
  const nextIndex = (index + FLAVORS.length) % FLAVORS.length; // Making sure we only get as many indexes as there are flavors

  setCurrentFlavorIndex(nextIndex)
 }


  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="carousel relative grid h-screen grid-rows-[auto_4f_auto] justify-center overflow-hidden bg-white py-12 text-white"
    >
      <div className="background pointer-events-none absolute inset-0 bg-[#710523] opacity-50" />
      <h2 className="relative text-5xl font-bold text-center">
      <PrismicText field={slice.primary.heading} />
      </h2>
      <div className="grid grid-cols-[auto_auto_auto] items-center">
        { /* Left */ }
        <ArrowButton onclick={() => changeFlavor(currentFlavorIndex + 1)} direction="left" label="Previous flavor" />
        { /* Can */ }
        <View className="aspect-square h-[70vmin] min-h-40">
          <Center position={[0, 0, 1.5]}>
            <FloatingCan floatIntensity={.3} rotationIntensity={1} flavor={FLAVORS[currentFlavorIndex].flavor} />
          </Center>
          <Environment files="/hdr/lobby.hdr" backgroundIntensity={.6} environmentRotation={[0, 3, 0]} />
          <directionalLight intensity={6} position={[0, 1, 1]} />
        </View>

        { /* Right */ }
        <ArrowButton onclick={() => changeFlavor(currentFlavorIndex - 1)} direction="right" label="Next flavor" />
      </div>

      <div className="relative mx-auto text-center text-area">
         <div className="text-4xl font-medium text-wrapper">
          <p>{FLAVORS[currentFlavorIndex].name}</p>
         </div>
         <div className="mt-2 text-2xl font-normal opacity-90">
          <PrismicRichText field={slice.primary.price_copy} />
         </div>
         
      </div>
     
    </section>
  );
};

export default Carousel;

type ArrowButtonProps = {
  direction?: "left" | "right";
  label: string;
  onclick: () => void;
}

function ArrowButton({label, onclick, direction}: ArrowButtonProps) {
  return (
    <button onClick={onclick} className="p-3 border-2 border-white rounded-full size-12 bg-white/10 opacity-85 ring-white focus:outline-none focus-visible:opacity-100 focus-visible:ring-4 md:size-16 lg:size-20">
      <ArrowIcon className={clsx( direction === "right" && "-scale-x-100")} />
          <span className="sr-only">{label}</span>
        </button>
  );
}
