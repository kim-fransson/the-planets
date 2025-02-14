"use client";

import { Planet } from "../types";
import data from "../data.json";
import { redirect, usePathname } from "next/navigation";
import ToggleButtonGroup from "../components/buttons/ToggleButtonGroup";
import { useState } from "react";
import { Key } from "react-aria-components";
import ToggleButton from "../components/buttons/ToggleButton";

import styles from "./page.module.css";

const sections = ["overview", "structure", "surface"];

export default function PlanetPage() {
  const pathname = usePathname();
  const planet = data.find((p: Planet) => pathname.includes(p.name));

  if (!planet) {
    redirect("/earth");
  }

  const [selected, setSelected] = useState(new Set<Key>([sections[0]]));

  // const selectedSection = [...selected].join(", ");

  return (
    <main>
      <ToggleButtonGroup
        disallowEmptySelection
        className={styles.tabs}
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        {sections.map((section) => (
          <ToggleButton variant="tab" key={section} id={section}>
            {section}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </main>
  );
}
