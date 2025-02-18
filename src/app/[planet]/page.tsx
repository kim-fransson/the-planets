"use client";

import { Planet, PlanetNames } from "../types";
import data from "../data.json";
import { redirect, usePathname } from "next/navigation";
import ToggleButtonGroup from "../components/buttons/ToggleButtonGroup";
import { useEffect, useState } from "react";
import { Key, Link } from "react-aria-components";
import ToggleButton from "../components/buttons/ToggleButton";
import SourceIcon from "@/public/assets/icon-source.svg";
import StatsArticle from "./components/StatsArticle";
import PlanetImage from "./components/PlanetImage";

import styles from "./page.module.css";

const sections = [
  { key: "overview", value: "overview" },
  { key: "structure", value: "structure" },
  { key: "geology", value: "surface" },
];

export default function PlanetPage() {
  const pathname = usePathname();
  const planet = data.find((p: Planet) => pathname.includes(p.name));

  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTablet(window.innerWidth >= 768);
    }
  }, []);

  if (!planet) {
    redirect("/earth");
  }

  const [selected, setSelected] = useState(new Set<Key>([sections[0].key]));

  const selectedSection = [...selected].join(", ").toLowerCase() as keyof Pick<
    Planet,
    "overview" | "structure" | "geology"
  >;

  const planetImage =
    selectedSection === "structure"
      ? planet.images.structure
      : planet.images.overview;

  return (
    <main className={styles.main}>
      <ToggleButtonGroup
        disallowEmptySelection
        className={styles.tabs}
        selectedKeys={selected}
        onSelectionChange={setSelected}
        orientation="vertical"
      >
        <ToggleButton id="overview">overview</ToggleButton>
        <ToggleButton id="structure">
          {isTablet ? "internal structure" : "structure"}
        </ToggleButton>
        <ToggleButton id="geology">
          {isTablet ? "surface geology" : "surface"}
        </ToggleButton>
      </ToggleButtonGroup>

      <PlanetImage
        name={planet.name as PlanetNames}
        src={planetImage}
        alt={`Planet ${planet.name}`}
        showSurface={selectedSection === "geology"}
        surfaceSrc={planet.images.geology}
      />

      <article className={styles.information}>
        <h1 className={styles.heading}>{planet.name}</h1>
        <p className={styles.text}>{planet[selectedSection].content}</p>
        <span className={styles.source}>
          Source:{" "}
          <Link
            target="_blank"
            href={planet[selectedSection].source}
            className={styles.link}
          >
            Wikipedia
            <SourceIcon />
          </Link>
        </span>
      </article>

      <div className={styles.stats}>
        <StatsArticle heading="rotation time" text={planet.rotation} />
        <StatsArticle heading="revolution time" text={planet.revolution} />
        <StatsArticle heading="radius" text={planet.radius} />
        <StatsArticle heading="average temp" text={planet.temperature} />
      </div>
    </main>
  );
}
