"use client";

import data from "@/app/data.json";

import { Button, Dialog, Modal } from "react-aria-components";

import HamburgerIcon from "@/public/assets/icon-hamburger.svg";
import ChevronIcon from "@/public/assets/icon-chevron.svg";

import styles from "./MobileMenu.module.css";
import { useState } from "react";
import { motion } from "motion/react";
import Link from "./Link";

const MotionButton = motion.create(Button);

export default function MobileMenu() {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <MotionButton
        onPress={() => setOpen((v) => !v)}
        className={styles.button}
        aria-label="menu"
        animate={{ opacity: isOpen ? 0.25 : 1 }}
      >
        <HamburgerIcon />
      </MotionButton>
      <Modal isOpen={isOpen} onOpenChange={setOpen} className={styles.modal}>
        <Dialog aria-label="planet links" className={styles.dialog}>
          {data.map((planet) => (
            <Link variant="planet" key={planet.name} href={`/${planet.name}`}>
              {planet.name}
              <ChevronIcon />
            </Link>
          ))}
        </Dialog>
      </Modal>
    </>
  );
}
