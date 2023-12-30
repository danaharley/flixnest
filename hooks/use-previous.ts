"use client";

import { useRef, useEffect } from "react";

export const usePrevious = (value: string) => {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
