"use client";

import { FC } from "react";
import { asText, Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Bounded } from "@/components/Bounded";
import Button from "@/components/Button";
import { TextSplitter } from "@/components/TextSplitter";
import { View } from "@react-three/drei";
import Scene from "./Scene";
import { Bubbles } from "./Bubbles";
import { useStore } from "@/Hooks/UseStore";
import { useMediaQuery } from "@/Hooks/useMediaQuery";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {

  const ready = useStore((state) => state.ready);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);

  useGSAP(() => {
    if (!ready && isDesktop) return;

    const introTl = gsap.timeline();
    
    introTl
    .set(".hero", {opacity: 1})
    .from(".hero-header-word", {
      scale: 3,
      opacity: 0,
      ease: "power3.in",
      delay: .5,
      stagger: .5,
    })
    .from(".hero-subheading", {
      opacity: 0,
      y: 30,
    }, "+=.5")
    .from(".hero-body", {
      opacity: 0,
      y: 10,
    })
    .from(".hero-button", {
      opacity: 0,
      y: 10,
      duration: .6
    })

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    scrollTl.fromTo("body", {
      backgroundColor: "#FDE047",
    }, {
      backgroundColor: "#D9F99D",
      overwrite: "auto",
    }, .5)
    .from(".text-side-heading .split-char", {
      scale: 1.3,
      y: 14,
      rotate: -25,
      opacity: 0,
      stagger: .1,
      ease: "back.out(3)",
      duration: .5,
    });
  }, {dependencies: [ready, isDesktop]});

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="opacity-0 hero"
    >
      { isDesktop && (
        <View className="hero-scene pointer-events-none sticky top-0 z-50 -mt-[100vh] hidden h-screen w-screen md:block">
        <Scene />
        <Bubbles count={300} speed={0.5} repeat={true} />
      </View>
      )}
      
      <div className="grid">
        <div className="grid h-screen place-items-center">
          <div className="grid text-center auto-rows-min place-items-center">
            <h1 className="hero-header lg:text-[13rem] text-7xl font-black uppercase leading-[.8] text-orange-500 md:text-[9rem]">
              <TextSplitter text={asText(slice.primary.heading)} wordDisplayStyle="block" className="hero-header-word" />
            </h1>
            <div className="mt-12 text-5xl font-semibold hero-subheading text-sky-950 lg:text-6xl">
              <PrismicRichText field={slice.primary.subheading} />
            </div>
            <div className="text-2xl font-normal hero-body text-sky-950">
              <PrismicRichText field={slice.primary.body} />
            </div>
            <Button
              buttonLink={slice.primary.button_link}
              buttonText={slice.primary.button_text}
              className="mt-12 hero-button"
            />
          </div>
        </div>
        <div className="grid text-side relative z-[80] h-screen items-center gap-4 md:grid-cols-2">
          <PrismicNextImage
            className="w-full md:hidden"
            field={slice.primary.cans_image}
          />
          <div>
            <h2 className="text-6xl font-black uppercase text-side-heading text-balance text-sky-950 lg:text-8xl">
              <TextSplitter text={asText(slice.primary.second_heading)} wordDisplayStyle="inline-block" />
            </h2>
            <div className="max-w-xl mt-4 text-xl font-normal text-side-body text-balance text-sky-950">
              <PrismicRichText field={slice.primary.second_body} />
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
