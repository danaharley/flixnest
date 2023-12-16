"use client";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface CircularProgressbarProps<T> {
  percentage: T;
}

export const CustomCircularProgressbar: React.FC<
  CircularProgressbarProps<number>
> = ({ percentage }) => {
  return (
    <CircularProgressbar
      value={Number(percentage)}
      text={String(percentage)}
      maxValue={10}
      className="shrink-0"
    />
  );
};
