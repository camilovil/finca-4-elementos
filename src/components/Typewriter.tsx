"use client";

import { useEffect, useRef, useState, type ElementType } from "react";
import { useInView } from "./useInView";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  speed?: number; // ms por carácter
  startDelay?: number; // ms antes de empezar
  cursor?: boolean;
};

// Efecto máquina de escribir: el texto se escribe carácter a carácter
// al entrar en viewport. Respeta prefers-reduced-motion (muestra todo).
export default function Typewriter({
  text,
  as: Tag = "span",
  className = "",
  speed = 55,
  startDelay = 200,
  cursor = true,
}: Props) {
  const { ref, inView } = useInView<HTMLElement>("0px 0px -10% 0px");
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(text.length);
      setDone(true);
      return;
    }

    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      i += 1;
      setCount(i);
      if (i < text.length) {
        timer = setTimeout(tick, speed);
      } else {
        setDone(true);
      }
    };
    const startTimer = setTimeout(tick, startDelay);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(timer);
    };
  }, [inView, text, speed, startDelay]);

  return (
    <Tag ref={ref} className={`tw${className ? " " + className : ""}`}>
      <span className="tw__text">{text.slice(0, count)}</span>
      {/* reserva el ancho final para evitar saltos de layout */}
      <span className="tw__ghost" aria-hidden="true">
        {text.slice(count)}
      </span>
      {cursor && (
        <span className={`tw__cursor${done ? " tw__cursor--done" : ""}`}>
          |
        </span>
      )}
    </Tag>
  );
}
