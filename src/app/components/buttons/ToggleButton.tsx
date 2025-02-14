"use client";

import {
  ToggleButton as AriaToggleButton,
  ToggleButtonProps as AriaToggleButtonProps,
} from "react-aria-components";
import { motion } from "motion/react";

import styles from "./ToggleButton.module.css";
import clsx from "clsx";

interface ToggleButtonProps extends AriaToggleButtonProps {
  variant: "default" | "tab";
}

export default function ToggleButton({
  variant,
  children,
  ...rest
}: ToggleButtonProps) {
  const isTabVariant = variant === "tab";

  return (
    <AriaToggleButton
      {...rest}
      className={clsx(styles.button, styles[variant])}
    >
      {({ isSelected }) => (
        <>
          {isSelected && isTabVariant && (
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
