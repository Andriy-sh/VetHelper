"use client";
import { useRef } from "react";
import { useInView } from "framer-motion";

export const useInViewOnce = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return { ref, inView };
};
