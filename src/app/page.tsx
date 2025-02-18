"use client";

import {
  HeroHighlightText,
  HighlightText,
} from "@/components/molecules/HeroHighlightText/HeroHighlightText";
import { NavigationMenuBar } from "@/components/molecules/NavigationMenuBar/NavigationMenuBar";
import { ThreeDCardDemo } from "@/components/molecules/ThreeDCardDemo/ThreeDCardDemo";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="p-2 font-[family-name:var(--font-geist-sans)]">
      {/* <TabsDemo /> */}
      <NavigationMenuBar />
      <HeroHighlightText>
        <div className="flex">
          <div className="flex flex-col items-center justify-center">
            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: [20, -5, 0],
              }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0.0, 0.2, 1],
              }}
              className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto"
            >
              Book meals from any cloud kitchen{" "}
              <HighlightText className="text-black dark:text-white">
                At one stop
              </HighlightText>{" "}
            </motion.h1>
            <div className="h-[50px]" />
            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: [20, -5, 0],
              }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0.0, 0.2, 1],
              }}
              className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto"
            >
              Delicious meals from any{" "}
              <HighlightText className="text-black dark:text-white">
                Home Cloud kitchen
              </HighlightText>{" "}
              to your doorstep
            </motion.h1>
          </div>
          <div className="flex flex-col items-center justify-center">
            <ThreeDCardDemo />
          </div>
        </div>
      </HeroHighlightText>
    </div>
  );
}
