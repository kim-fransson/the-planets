"use client";

import { PlanetNames } from "@/app/types";
import Image from "next/image";
import { useEffect, useState } from "react";

import styles from "./PlanetImage.module.css";
import { AnimatePresence, motion } from "motion/react";

type ScreenSize = "small" | "tablet" | "desktop";

const baseSizes: Record<PlanetNames, number> = {
  mercury: 111,
  venus: 154,
  earth: 173,
  mars: 129,
  jupiter: 224,
  saturn: 256,
  uranus: 176,
  neptune: 173,
};

const screenMultipliers: Record<ScreenSize, number> = {
  small: 1,
  tablet: 184 / 111, // Ratio based on mercury's size
  desktop: 290 / 111, // Ratio based on mercury's size
};

function getPlanetWidth(planet: PlanetNames, screenWidth: number): number {
  let screenSize: ScreenSize;

  if (screenWidth >= 1440) {
    screenSize = "desktop";
  } else if (screenWidth >= 768) {
    screenSize = "tablet";
  } else {
    screenSize = "small";
  }

  return Math.round(baseSizes[planet] * screenMultipliers[screenSize]);
}

const MotionImage = motion.create(Image);

export default function PlanetImage({
  name,
  src,
  alt,
  showSurface,
  surfaceSrc,
}: {
  name: PlanetNames;
  src: string;
  alt: string;
  showSurface: boolean;
  surfaceSrc: string;
}) {
  const [size, setSize] = useState(0);

  useEffect(() => {
    setSize(getPlanetWidth(name, window.innerWidth));
  }, [name]);

  return (
    <div className={styles.imageContainer}>
      <AnimatePresence>
        <MotionImage
          className={styles.planetImage}
          width={size}
          height={size}
          src={src}
          alt={alt}
          priority
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        {showSurface && (
          <MotionImage
            className={styles.surfaceImage}
            src={surfaceSrc}
            alt={`Surface of planet ${name}`}
            width={0}
            height={0}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
