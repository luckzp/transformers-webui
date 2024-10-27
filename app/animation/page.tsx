"use client";

import { useEffect } from "react";
import styles from "@/styles/Home.module.css";

export default function Home() {
  useEffect(() => {
    const text = document.getElementById("animated-text");
    if (text) {
      const lines = text.innerHTML
        .split("<br>")
        .map((line) => line.trim())
        .filter((line) => line);

      text.innerHTML = lines
        .map((line) => `<span class="${styles.char}">${line}</span>`)
        .join("");

      const chars = text.querySelectorAll(`.${styles.char}`);
      chars.forEach((char, index) => {
        (char as HTMLElement).style.setProperty("--index", index.toString());
        (char as HTMLElement).style.setProperty(
          "--total",
          chars.length.toString()
        );
      });
    }
  }, []);

  return (
    <main className={styles.textContainer}>
      <h1 id="animated-text" className={styles.animatedText}>
        Hello, Animation!
        <br />
        This is a multi-line
        <br />
        text example
        <br />
        One more line.
      </h1>
    </main>
  );
}
