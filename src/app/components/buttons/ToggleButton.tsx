"use client";

import {
  ToggleButton as AriaToggleButton,
  ToggleButtonProps as AriaToggleButtonProps,
} from "react-aria-components";
import { motion } from "motion/react";

import styles from "./ToggleButton.module.css";

export default function ToggleButton({
  children,
  ...rest
}: AriaToggleButtonProps) {
  return (
    <AriaToggleButton {...rest} className={styles.button}>
      {({ isSelected }) => (
        <>
          {isSelected && (
            <motion.div
              className={styles.underline}
              layoutId="underline"
              key="underline"
            />
          )}
          {children}
        </>
      )}
    </AriaToggleButton>
  );
}
