/* eslint-disable @next/next/no-img-element */
"use client";

import { Planet } from "../types";
import data from "../data.json";
import { redirect, usePathname } from "next/navigation";
import ToggleButtonGroup from "../components/buttons/ToggleButtonGroup";
import { useState } from "react";
import { Key, Link } from "react-aria-components";
import ToggleButton from "../components/buttons/ToggleButton";
import SourceIcon from "@/public/assets/icon-source.svg";

import styles from "./page.module.css";
import StatsArticle from "./components/StatsArticle";

const sections = [
  { key: "overview", value: "overview" },
  { key: "structure", value: "structure" },
  { key: "geology", value: "surface" },
];

export default function PlanetPage() {
  const pathname = usePathname();
  const planet = data.find((p: Planet) => pathname.includes(p.name));

  if (!planet) {
    redirect("/earth");
  }

  const [selected, setSelected] = useState(new Set<Key>([sections[0].key]));

  const selectedSection = [...selected].join(", ").toLowerCase() as keyof Pick<
    Planet,
    "overview" | "structure" | "geology"
  >;

  const mainImage = () => {
    if (selectedSection === "structure") {
      return planet.images.structure;
    }
    return planet.images.overview;
  };

  return (
    <main className={styles.main}>
      <ToggleButtonGroup
        disallowEmptySelection
        className={styles.tabs}
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        {sections.map((section) => (
          <ToggleButton variant="tab" key={section.key} id={section.key}>
            {section.value}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <section className={styles.section}>
        <div className={styles.imageContainer}>
          <img src={mainImage()} alt="" />
          {selectedSection === "geology" && (
            <img
              className={styles.surfaceImage}
              src={planet.images.geology}
              alt=""
            />
          )}
        </div>

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
      </section>

      <div className={styles.stats}>
        <StatsArticle heading="rotation time" text={planet.rotation} />
        <StatsArticle heading="revolution time" text={planet.revolution} />
        <StatsArticle heading="radius" text={planet.radius} />
        <StatsArticle heading="average temp" text={planet.temperature} />
      </div>
    </main>
  );
}
