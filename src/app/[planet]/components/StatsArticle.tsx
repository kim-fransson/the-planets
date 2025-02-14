import { JSX } from "react";
import styles from "./StatsArticle.module.css";

interface StatsProps {
  heading: string;
  text: string;
  renderHeadingAs?: keyof JSX.IntrinsicElements; // Allow any valid HTML tag
}

export default function StatsArticle({
  heading,
  text,
  renderHeadingAs: HeadingTag = "h2",
}: StatsProps) {
  return (
    <article className={styles.article}>
      <HeadingTag className={styles.heading}>{heading}</HeadingTag>
      <p className={styles.text}>{text}</p>
    </article>
  );
}
