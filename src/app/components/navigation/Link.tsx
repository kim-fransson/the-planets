"use client";

import clsx from "clsx";
import styles from "./Link.module.css";
import { motion } from "motion/react";

import {
  LinkProps as AriaLinkProps,
  Link as AriaLink,
} from "react-aria-components";

interface LinkProps extends AriaLinkProps {
  variant?: "default" | "planet";
  className?: string;
}

export default function Link({
  children,
  variant = "default",
  className,
  href,
  ...rest
}: LinkProps) {
  return (
    <AriaLink
      {...rest}
      href={href}
      className={clsx(styles.link, styles[variant], className)}
    >
      {({ isHovered }) => (
        <>
          {isHovered && (
            <motion.div
              className={styles.hoverLine}
              layoutId="hoverLine"
              key="hoverLine"
            />
          )}
          {variant === "planet" && <span className={styles.miniPlanet} />}
          {children}
        </>
      )}
    </AriaLink>
  );
}
