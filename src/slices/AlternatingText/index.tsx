"use client";

import { FC } from "react";
import { asText, Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import Scene from "./Scene";
import { View } from "@react-three/drei";

/**
 * Props for `AlternatingText`.
 */
export type AlternatingTextProps =
  SliceComponentProps<Content.AlternatingTextSlice>;

/**
 * Component for "AlternatingText" Slices.
 */
const AlternatingText: FC<AlternatingTextProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative alternating-text-container text-sky-950"
    >
      <div>
        <div className="relative grid">
          <View className="absolute top-0 left-0 w-full h-screen alternating-text-view">
            <Scene />
          </View>
          
          
          {slice.primary.text_group.map((item, index) => (
            <div
              key={asText(item.heading)}
              className="grid h-screen alternating-section placeitems-center gap-x-12 md:grid-cols-2"
            >
              <div className={index % 2 === 0 ? "col-start-1" : "col-start-2"}>
                <h2 className="text-6xl font-bold text-balance">
                  {asText(item.heading)}
                </h2>
                <div className="mt-4 text-xl">
                  <PrismicRichText field={item.body} />
                </div>
                
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default AlternatingText;
