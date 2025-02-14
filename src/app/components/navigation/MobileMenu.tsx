"use client";

import data from "@/app/data.json";

import { Button, Dialog, Modal } from "react-aria-components";

import HamburgerIcon from "@/public/assets/icon-hamburger.svg";
import ChevronIcon from "@/public/assets/icon-chevron.svg";

import styles from "./MobileMenu.module.css";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "./Link";
import { usePathname } from "next/navigation";
import { Planet } from "@/app/types";

const MotionButton = motion.create(Button);
const MotionModal = motion.create(Modal);
const MotionDialog = motion.create(Dialog);

export default function MobileMenu() {
  const [isOpen, setOpen] = useState(false);

  const closeModal = () => setOpen(false);
  const toggleModal = () => setOpen((prev) => !prev);

  const pathname = usePathname();

  useEffect(() => {
    closeModal();
  }, [pathname]);

  const handleLinkPress = (planet: Planet) => {
    if (pathname.includes(planet.name)) {
      closeModal();
    }
  };

  return (
    <>
      <MotionButton
        onPress={toggleModal}
        className={styles.button}
        aria-label="menu"
        animate={{ opacity: isOpen ? 0.25 : 1 }}
      >
        <HamburgerIcon />
      </MotionButton>
      <AnimatePresence>
        {isOpen && (
          <MotionModal
            isOpen
            onOpenChange={setOpen}
            className={styles.modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MotionDialog aria-label="planet links" className={styles.dialog}>
              {data.map((planet) => (
                <Link
                  onPress={() => handleLinkPress(planet)}
                  variant="planet"
                  key={planet.name}
                  href={`/${planet.name}`}
                >
                  {planet.name}
                  <ChevronIcon />
                </Link>
              ))}
            </MotionDialog>
          </MotionModal>
        )}
      </AnimatePresence>
    </>
  );
}
